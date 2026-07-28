'use client';

import { useEffect, useRef } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './CanopeePersonnage.module.css';

/**
 * Les Visiteurs de la Canopée — sur canvas.
 *
 * La première version animait des <span> en CSS : gouttes toutes
 * identiques tombant en boucle synchronisée, papillon unique suivant une
 * trajectoire scriptée en quatre étapes. D'où l'effet mécanique.
 *
 * Tout passe ici sur un canvas unique :
 *
 * LA PLUIE DE BORA — "la pluie qui tombe sur sa forêt, c'est lui".
 *   Chaque goutte a sa vitesse, sa longueur, sa transparence et son
 *   inclinaison. L'averse ne surgit pas : elle monte en intensité sur
 *   plusieurs secondes, tient, puis décroît. Une averse a un début, un
 *   milieu et une fin.
 *
 * LES PAPILLONS — c'est une jungle, il y en a plusieurs.
 *   Vol erratique : dérive par sommes de sinusoïdes désynchronisées, avec
 *   des à-coups d'altitude. Les ailes battent plus vite quand ils montent,
 *   ralentissent en vol plané. Chaque papillon a ses deux paires d'ailes,
 *   un corps, des antennes, et une inclinaison qui suit sa direction.
 *   L'un d'eux est bleu : celui de Dayu — "pas comme un fantôme, comme une
 *   décision honorée". Les autres portent les teintes de la forêt.
 *
 * Aucun de ces cycles ne dépend du lecteur. Le verbe d'Ysolde : la page se
 * passe de toi.
 */

type Goutte = {
  x: number;
  y: number;
  vitesse: number;
  longueur: number;
  alpha: number;
  inclinaison: number;
};

type Papillon = {
  x: number;
  y: number;
  /** Direction en radians. */
  cap: number;
  vitesse: number;
  /** Déphasages du vol erratique. */
  derive: [number, number, number];
  /** Avancement du battement d'ailes. */
  battement: number;
  cadence: number;
  taille: number;
  couleur: string;
  /** Le papillon de Dayu vole plus lentement, plus droit. */
  temoin: boolean;
};

const TAU = Math.PI * 2;

export function VisiteursDeLaCanopee() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let graine = 190273;
    const alea = () => {
      graine = (graine * 1664525 + 1013904223) % 4294967296;
      return graine / 4294967296;
    };

    let largeur = 0;
    let hauteur = 0;

    const redimensionner = () => {
      largeur = window.innerWidth;
      hauteur = window.innerHeight;
      // Plafond bas : ce canvas couvre tout l'écran, chaque pixel compte.
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(largeur * ratio);
      canvas.height = Math.round(hauteur * ratio);
      canvas.style.width = `${largeur}px`;
      canvas.style.height = `${hauteur}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    redimensionner();
    window.addEventListener('resize', redimensionner);

    const gouttes: Goutte[] = [];
    const papillons: Papillon[] = [];

    const creerPapillon = (temoin: boolean): Papillon => ({
      x: alea() * largeur,
      y: hauteur * (0.15 + alea() * 0.7),
      cap: alea() * TAU,
      vitesse: temoin ? 0.28 : 0.42 + alea() * 0.4,
      derive: [alea() * TAU, alea() * TAU, alea() * TAU],
      battement: alea() * TAU,
      cadence: temoin ? 5.5 : 7 + alea() * 4,
      taille: temoin ? 11 : 7 + alea() * 5,
      couleur: temoin ? '#6f9ede' : ['#a8bf6a', '#c9d18a', '#8fae5c', '#d8c98a'][Math.floor(alea() * 4)],
      temoin,
    });

    // Une petite population : c'est une jungle, pas un vivarium.
    papillons.push(creerPapillon(true));
    for (let i = 0; i < 3; i++) papillons.push(creerPapillon(false));

    /** 0 = pas de pluie, 1 = averse pleine. Monte et descend doucement. */
    let intensitePluie = 0;
    let ciblePluie = 0;
    let prochainChangement = 26000;

    const dessinerPapillon = (p: Papillon) => {
      // Le battement : ouverture des ailes entre 0.12 et 1.
      const ouverture = 0.12 + (Math.sin(p.battement) * 0.5 + 0.5) * 0.88;
      const t = p.taille;

      ctx.save();
      ctx.translate(p.x, p.y);
      // Le corps s'incline dans le sens du vol.
      ctx.rotate(Math.sin(p.cap) * 0.35);

      // Paire arrière, plus petite et plus sombre.
      ctx.globalAlpha = 0.42;
      ctx.fillStyle = p.couleur;
      for (const sens of [-1, 1]) {
        ctx.save();
        ctx.scale(sens * ouverture, 1);
        ctx.beginPath();
        ctx.moveTo(0, t * 0.1);
        ctx.quadraticCurveTo(t * 0.75, t * 0.35, t * 0.62, t * 0.85);
        ctx.quadraticCurveTo(t * 0.28, t * 0.7, 0, t * 0.28);
        ctx.fill();
        ctx.restore();
      }

      // Paire avant, plus grande.
      ctx.globalAlpha = 0.62;
      for (const sens of [-1, 1]) {
        ctx.save();
        ctx.scale(sens * ouverture, 1);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(t * 0.55, -t * 0.95, t * 1.05, -t * 0.42);
        ctx.quadraticCurveTo(t * 0.85, t * 0.12, 0, t * 0.14);
        ctx.fill();
        ctx.restore();
      }

      // Corps et antennes.
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = p.temoin ? '#3d5680' : '#4a5232';
      ctx.beginPath();
      ctx.ellipse(0, t * 0.2, t * 0.09, t * 0.5, 0, 0, TAU);
      ctx.fill();

      ctx.strokeStyle = p.temoin ? '#3d5680' : '#4a5232';
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -t * 0.28);
      ctx.quadraticCurveTo(t * 0.2, -t * 0.55, t * 0.3, -t * 0.6);
      ctx.moveTo(0, -t * 0.28);
      ctx.quadraticCurveTo(-t * 0.2, -t * 0.55, -t * 0.3, -t * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const pas = (dt: number, horloge: number) => {
      {
        ctx.clearRect(0, 0, largeur, hauteur);

        /* ---- La pluie de Bora ---- */
        prochainChangement -= dt;
        if (prochainChangement <= 0) {
          // Une averse dure 25-40 s, les accalmies 50-90 s.
          ciblePluie = ciblePluie > 0.05 ? 0 : 0.55 + alea() * 0.45;
          prochainChangement = ciblePluie > 0 ? 25000 + alea() * 15000 : 50000 + alea() * 40000;
        }
        // Montée et descente lentes : une averse a un début et une fin.
        intensitePluie += (ciblePluie - intensitePluie) * (dt / 4200);

        const voulues = Math.round(intensitePluie * 46);
        while (gouttes.length < voulues) {
          gouttes.push({
            x: alea() * largeur,
            y: -alea() * hauteur,
            // Vitesses variées : c'est ça qui enlève l'effet mécanique.
            vitesse: 0.16 + alea() * 0.26,
            longueur: 14 + alea() * 30,
            alpha: 0.12 + alea() * 0.3,
            inclinaison: 0.06 + alea() * 0.05,
          });
        }
        while (gouttes.length > voulues) gouttes.pop();

        ctx.lineCap = 'round';
        for (const goutte of gouttes) {
          goutte.y += goutte.vitesse * dt;
          goutte.x += goutte.inclinaison * goutte.vitesse * dt;
          if (goutte.y > hauteur + goutte.longueur) {
            goutte.y = -goutte.longueur - alea() * 200;
            goutte.x = alea() * largeur;
          }

          const gradient = ctx.createLinearGradient(
            goutte.x,
            goutte.y,
            goutte.x - goutte.inclinaison * goutte.longueur,
            goutte.y + goutte.longueur,
          );
          gradient.addColorStop(0, 'rgba(157, 184, 216, 0)');
          gradient.addColorStop(1, `rgba(157, 184, 216, ${goutte.alpha * intensitePluie})`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(goutte.x, goutte.y);
          ctx.lineTo(
            goutte.x - goutte.inclinaison * goutte.longueur,
            goutte.y + goutte.longueur,
          );
          ctx.stroke();
        }

        /* ---- Les papillons ---- */
        const secondes = horloge / 1000;
        for (const p of papillons) {
          const d = p.derive;
          // Vol erratique : trois sinusoïdes désynchronisées.
          p.cap +=
            (Math.sin(secondes * 0.8 + d[0]) * 0.03 +
              Math.sin(secondes * 2.3 + d[1]) * 0.018 +
              Math.sin(secondes * 0.37 + d[2]) * 0.012) *
            (p.temoin ? 0.5 : 1);

          const dx = Math.cos(p.cap) * p.vitesse * (dt / 16);
          const dy = Math.sin(p.cap) * p.vitesse * (dt / 16) * 0.6;
          p.x += dx;
          p.y += dy;

          // Ils battent plus vite en montée, planent en descente.
          const effort = dy < 0 ? 1.4 : 0.7;
          p.battement += (p.cadence * effort * dt) / 1000;

          // Rebouclage souple par les bords.
          if (p.x < -40) p.x = largeur + 40;
          if (p.x > largeur + 40) p.x = -40;
          if (p.y < -40) p.y = hauteur * 0.85;
          if (p.y > hauteur + 40) p.y = hauteur * 0.15;

          dessinerPapillon(p);
        }

        ctx.globalAlpha = 1;
      }
    };

    const desabonner = abonnerAuRaf(pas);

    return () => {
      desabonner();
      window.removeEventListener('resize', redimensionner);
    };
  }, []);

  // "Croissance." — les sections dépassées sont reprises par la mousse.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-canopee-lisible]'));
    if (sections.length === 0) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting && entree.boundingClientRect.bottom < 0) {
            entree.target.setAttribute('data-canopee-repris', '');
          }
        }
      },
      { threshold: 0 },
    );

    sections.forEach((section) => observateur.observe(section));
    return () => observateur.disconnect();
  }, []);

  return (
    <div className={styles.visiteurs} aria-hidden="true">
      <div className={styles.brume} />
      <div className={styles.brume} data-nappe="2" />
      <canvas ref={canvasRef} className={styles.visiteursCanvas} />
    </div>
  );
}
