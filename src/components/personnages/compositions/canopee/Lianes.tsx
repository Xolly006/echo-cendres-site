'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './CanopeePersonnage.module.css';

/**
 * Les Lianes — enroulement autour du nom.
 *
 * Les versions précédentes faisaient pousser une plante LIBRE : elle
 * montait, serpentait, passait à côté du texte sans jamais le connaître.
 * Résultat, un gribouillis posé près du nom.
 *
 * S'enrouler autour, c'est autre chose : LE NOM EST LE SUPPORT. La liane
 * se comporte comme du lierre autour d'une poutre — elle longe le texte
 * en décrivant une hélice, et elle passe alternativement DERRIÈRE puis
 * DEVANT les lettres.
 *
 * C'est cette alternance qui crée l'enroulement. Sans elle, tout dessin
 * reste plat.
 *
 * D'où deux canvas superposés :
 *   - arrière (z-index 0), sous le texte ;
 *   - avant   (z-index 2), au-dessus.
 * Chaque segment est tracé sur l'un ou sur l'autre selon la phase de
 * l'hélice. L'épaisseur et l'opacité suivent la profondeur : plus épais
 * et plus net quand la liane passe devant, plus fin et plus sourd quand
 * elle passe derrière. Le texte reste toujours lisible : les brins qui
 * croisent les lettres sont fins et translucides, comme du vrai lierre.
 *
 * La croissance est continue et ne s'arrête jamais : une nouvelle liane
 * part périodiquement, avec un rayon et un nombre de tours différents.
 * Le nom est un peu plus enlacé à chaque minute de lecture. La forêt
 * n'attend pas le lecteur.
 */

type LianesProps = {
  children: ReactNode;
  small?: boolean;
};

const TAU = Math.PI * 2;

type Point = { x: number; y: number; w: number; devant: boolean };

type Feuille = {
  x: number;
  y: number;
  angle: number;
  taille: number;
  ouverture: number;
  devant: boolean;
};

type Liane = {
  /** Avancement le long du nom, 0 → 1. */
  t: number;
  vitesse: number;
  /** Nombre de tours effectués sur la longueur du nom. */
  tours: number;
  /** Amplitude verticale de l'hélice. */
  rayon: number;
  phase: number;
  largeur: number;
  points: Point[];
  prochaineFeuille: number;
};

export function Lianes({ children, small = false }: LianesProps) {
  const hoteRef = useRef<HTMLSpanElement | null>(null);
  const texteRef = useRef<HTMLSpanElement | null>(null);
  const arriereRef = useRef<HTMLCanvasElement | null>(null);
  const avantRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const hote = hoteRef.current;
    const texte = texteRef.current;
    const arriere = arriereRef.current;
    const avant = avantRef.current;
    if (!hote || !texte || !arriere || !avant) return;

    const ctxArriere = arriere.getContext('2d');
    const ctxAvant = avant.getContext('2d');
    if (!ctxArriere || !ctxAvant) return;

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let graine = small ? 20260724 : 74202602;
    const alea = () => {
      graine = (graine * 1664525 + 1013904223) % 4294967296;
      return graine / 4294967296;
    };

    let largeurCss = 0;
    let hauteurCss = 0;
    /** Boîte du texte dans le repère du canvas. */
    let texteGauche = 0;
    let texteDroite = 0;
    let texteCentre = 0;
    let texteHauteur = 0;

    const lianes: Liane[] = [];
    const feuilles: Feuille[] = [];

    const nouvelleLiane = (): Liane => ({
      t: 0,
      // ~14 s pour parcourir le nom : calme, mais visible.
      // ~30 s pour parcourir le nom : une liane pousse, elle ne se déroule pas.
    vitesse: 1 / (small ? 2100 : 1850) / (0.8 + alea() * 0.5),
      tours: small ? 1.5 + alea() : 2.4 + alea() * 1.4,
      rayon: texteHauteur * (small ? 0.4 : 0.46) * (0.75 + alea() * 0.5),
      phase: alea() * TAU,
      largeur: (small ? 1.5 : 2.4) * (0.8 + alea() * 0.4),
      points: [],
      prochaineFeuille: 0.12 + alea() * 0.12,
    });

    const mesurer = () => {
      const rectHote = hote.getBoundingClientRect();
      const rectTexte = texte.getBoundingClientRect();
      if (rectTexte.width === 0) return;

      // La zone de dessin déborde le texte : la liane entre avant le
      // premier caractère et sort après le dernier.
      const margeX = rectTexte.height * 0.55;
      const margeY = rectTexte.height * 0.75;

      largeurCss = rectTexte.width + margeX * 2;
      hauteurCss = rectTexte.height + margeY * 2;

      texteGauche = margeX;
      texteDroite = margeX + rectTexte.width;
      texteCentre = margeY + rectTexte.height / 2;
      texteHauteur = rectTexte.height;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      for (const [canvas, ctx] of [
        [arriere, ctxArriere],
        [avant, ctxAvant],
      ] as const) {
        canvas.width = Math.round(largeurCss * ratio);
        canvas.height = Math.round(hauteurCss * ratio);
        canvas.style.width = `${largeurCss}px`;
        canvas.style.height = `${hauteurCss}px`;
        canvas.style.left = `${rectTexte.left - rectHote.left - margeX}px`;
        canvas.style.top = `${rectTexte.top - rectHote.top - margeY}px`;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
    };

    mesurer();

    const observateur = new ResizeObserver(mesurer);
    observateur.observe(hote);

    const couleur = () =>
      getComputedStyle(hote).getPropertyValue('--character-accent').trim() || '#a8bf6a';

    /** Position de l'hélice à l'avancement t. */
    const positionner = (liane: Liane, t: number) => {
      const x = texteGauche + (texteDroite - texteGauche) * t;
      const angle = liane.phase + t * TAU * liane.tours;
      const y = texteCentre + Math.sin(angle) * liane.rayon;
      // cos(angle) donne la profondeur : > 0 devant, < 0 derrière.
      const profondeur = Math.cos(angle);
      return { x, y, profondeur };
    };

    const avancer = (liane: Liane, pas: number) => {
      const cible = Math.min(1, liane.t + pas);
      // On échantillonne finement pour que la courbe reste lisse.
      const echantillons = Math.max(1, Math.ceil((cible - liane.t) / 0.0016));
      for (let i = 1; i <= echantillons; i++) {
        const t = liane.t + ((cible - liane.t) * i) / echantillons;
        const { x, y, profondeur } = positionner(liane, t);
        const devant = profondeur > 0;
        // Plus épais quand la liane passe devant : elle est plus proche.
        const w = liane.largeur * (0.55 + 0.45 * (profondeur * 0.5 + 0.5));
        liane.points.push({ x, y, w, devant });

        if (t >= liane.prochaineFeuille) {
          liane.prochaineFeuille = t + 0.1 + alea() * 0.1;
          const angle = Math.atan2(
            Math.cos(liane.phase + t * TAU * liane.tours) * liane.rayon,
            1,
          );
          feuilles.push({
            x,
            y,
            angle: angle + (alea() - 0.5) * 0.8,
            taille: (small ? 5.5 : 10) * (0.7 + alea() * 0.6),
            ouverture: 0,
            devant,
          });
        }
      }
      liane.t = cible;
    };

    const dessiner = () => {
      const teinte = couleur();
      for (const ctx of [ctxArriere, ctxAvant]) {
        ctx.clearRect(0, 0, largeurCss, hauteurCss);
        ctx.strokeStyle = teinte;
        ctx.fillStyle = teinte;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      for (const liane of lianes) {
        for (let i = 1; i < liane.points.length; i++) {
          const a = liane.points[i - 1];
          const b = liane.points[i];
          // Un segment appartient au plan de son point d'arrivée.
          const ctx = b.devant ? ctxAvant : ctxArriere;
          // Devant : net mais fin, pour ne jamais gêner la lecture.
          // Derrière : plus sourd, il passe sous les lettres.
          ctx.globalAlpha = b.devant ? 0.62 : 0.42;
          ctx.lineWidth = b.w;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const feuille of feuilles) {
        if (feuille.ouverture <= 0) continue;
        const ctx = feuille.devant ? ctxAvant : ctxArriere;
        const taille = feuille.taille * feuille.ouverture;
        ctx.globalAlpha = (feuille.devant ? 0.55 : 0.38) * feuille.ouverture;
        ctx.save();
        ctx.translate(feuille.x, feuille.y);
        ctx.rotate(feuille.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(taille * 0.5, -taille * 0.4, taille, 0);
        ctx.quadraticCurveTo(taille * 0.5, taille * 0.4, 0, 0);
        ctx.fill();
        ctx.restore();
      }

      ctxArriere.globalAlpha = 1;
      ctxAvant.globalAlpha = 1;
    };

    if (reduit) {
      const liane = nouvelleLiane();
      lianes.push(liane);
      avancer(liane, 1);
      for (const feuille of feuilles) feuille.ouverture = 1;
      dessiner();
      return () => observateur.disconnect();
    }

    let depuisSemis = 0;

    const pas = (dt: number) => {
      depuisSemis += dt;

      // Une nouvelle liane s'ajoute périodiquement : le nom est un peu
      // plus enlacé à chaque minute passée sur la page.
      const maxLianes = small ? 2 : 3;
      if (lianes.length < maxLianes && depuisSemis > (lianes.length === 0 ? 1200 : 34000)) {
        depuisSemis = 0;
        lianes.push(nouvelleLiane());
      }

      let bouge = false;
      for (const liane of lianes) {
        if (liane.t < 1) {
          avancer(liane, liane.vitesse * dt);
          bouge = true;
        }
      }

      for (const feuille of feuilles) {
        if (feuille.ouverture < 1) {
          feuille.ouverture = Math.min(1, feuille.ouverture + dt / 4200);
          bouge = true;
        }
      }

      // Rien n'a changé : on ne redessine pas. Une liane arrivée au bout
      // n'a aucune raison de repeindre son canvas soixante fois par
      // seconde.
      if (bouge) dessiner();
    };

    const desabonner = abonnerAuRaf(pas);

    return () => {
      desabonner();
      observateur.disconnect();
    };
  }, [small]);

  return (
    <span ref={hoteRef} className={small ? styles.lianesHoteSmall : styles.lianesHote}>
      <canvas ref={arriereRef} className={styles.lianesArriere} aria-hidden="true" />
      <span ref={texteRef} className={styles.lianesTexte}>
        {children}
      </span>
      <canvas ref={avantRef} className={styles.lianesAvant} aria-hidden="true" />
    </span>
  );
}
