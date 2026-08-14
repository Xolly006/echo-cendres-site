'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { FactionImage } from '@/types/faction';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './PalimpsesteFond.module.css';

/**
 * Le fond, le rail, la jauge et les cendres de la fiche Arquet.
 *
 * Transposition du bloc `<script type="text/x-dc">` de
 * docs/maquettes/arquet.html — la logique est reprise intégralement (rien
 * n'est jugé superflu), mais réécrite en React/TS et fondue dans
 * `rafPartage` : UNE SEULE boucle `requestAnimationFrame` pour toute la
 * page (scroll, parallaxe, voiles, jauge, rail, cendres), là où la
 * maquette utilisait un throttle scroll→rAF pour `applique()` et une
 * seconde boucle rAF indépendante pour le canvas de cendres.
 *
 * Mécaniques transposées telles quelles :
 * - `maxProg` ne redescend jamais : c'est l'irréversibilité du cadre
 *   (voiles chaud/froid, calque de nuit). Remonter en haut de page ne
 *   restitue jamais l'état initial.
 * - Ancres `data-fond` : l'image de fond suit la strate lue, pas un
 *   pourcentage abstrait. cloître→I, manuscrit→III, galerie→Arkadia,
 *   lettres→V, hall→L'assèchement. Le fondu ne dure que la traversée de
 *   l'ancre (`mix`), jamais toute la section.
 * - Atténuation `1 - cible * 0.09` : chaque image suivante s'efface un
 *   peu plus que la précédente, la descente s'assombrit.
 * - Parallaxe `scale`/`translateY` sur l'image active.
 * - Voile chaud (haut de page) et voile froid (irréversible) qui
 *   s'échangent selon `maxProg`.
 * - Calque de nuit après 45 % de `maxProg`.
 * - Le rail (coupe des strates), la jauge de progression, le canvas de
 *   cendres.
 *
 * Comme dans la maquette, `histoire.mdx` ne référence aucune image : les
 * ancres sont retrouvées dans le DOM déjà rendu par PalimpsesteFaction
 * (les `h2` du récit portent des `id` `strate-1`..`strate-5`, posés par
 * `HeadingTwo` dans PalimpsesteFaction.tsx ; l'ancre Arkadia est le seul
 * `h3` dont le texte est exactement "Arkadia").
 *
 * `prefers-reduced-motion` : les cendres (animation continue, sans lien
 * avec une action de l'utilisateur) sont désactivées et la boucle rAF
 * partagée n'est même pas sollicitée — un simple écouteur de défilement
 * (throttlé à une frame) met à jour fond/voiles/rail/jauge à la demande,
 * sans tourner en continu. Aucun `filter` n'est jamais animé : la
 * désaturation des images est statique, posée une fois en CSS.
 */

type PalimpsesteFondProps = {
  images: FactionImage[];
};

const RAIL_STRATES = [
  { numeral: 'I', era: 'An 0' },
  { numeral: 'II', era: 'An 400' },
  { numeral: 'III', era: 'An 900' },
  { numeral: 'IV', era: 'An 1800' },
  { numeral: 'V', era: "Aujourd'hui" },
];

const ARKADIA_H3 = 'Arkadia';
const INTENSITE = 0.46;

function trouverAncres(): (HTMLElement | null)[] {
  const h2s = Array.from(document.querySelectorAll<HTMLElement>('.narrativeContent h2'));
  const h3s = Array.from(document.querySelectorAll<HTMLElement>('.narrativeContent h3'));
  const arkadia = h3s.find((h3) => h3.textContent?.trim() === ARKADIA_H3) ?? null;

  // cloître→I, manuscrit→III, galerie→Arkadia, lettres→V, hall→L'assèchement
  return [h2s[0] ?? null, h2s[2] ?? null, arkadia, h2s[4] ?? null, h2s[5] ?? null];
}

function trouverSections(): { el: HTMLElement; strate: number }[] {
  const h2s = Array.from(document.querySelectorAll<HTMLElement>('.narrativeContent h2'));
  // I, II, III, IV, V, L'assèchement (partage la strate V, comme la
  // maquette qui donne data-strate="5" aux deux).
  return h2s.map((el, index) => ({ el, strate: Math.min(index + 1, 5) }));
}

export function PalimpsesteFond({ images }: PalimpsesteFondProps) {
  const calqueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const voileChaudRef = useRef<HTMLDivElement | null>(null);
  const voileFroidRef = useRef<HTMLDivElement | null>(null);
  const nuitRef = useRef<HTMLDivElement | null>(null);
  const jaugeRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const railItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const niveauRef = useRef<HTMLDivElement | null>(null);
  const coteRef = useRef<HTMLSpanElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    mainRef.current = document.querySelector('main');
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ancres = trouverAncres();

    let maxProg = 0;

    // Le cœur de la mécanique, identique en mode réduit ou non : seule la
    // fréquence d'appel change (boucle continue vs écouteur de scroll).
    const appliquer = () => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      const prog = parcourable > 0 ? Math.min(1, Math.max(0, window.scrollY / parcourable)) : 0;
      if (prog > maxProg) maxProg = prog;

      const mid = window.innerHeight * 0.45;
      let cible = 0;
      let mix = 1;
      ancres.forEach((ancre, index) => {
        if (!ancre) return;
        const rect = ancre.getBoundingClientRect();
        if (rect.top < mid) {
          cible = index;
          mix = Math.min(1, (mid - rect.top) / Math.max(1, window.innerHeight * 0.35));
        }
      });

      const precedent = Math.max(0, cible - 1);
      // Chaque image s'efface un peu plus que la précédente : la
      // descente s'assombrit.
      const attenuation = 1 - cible * 0.09;
      const par = (window.scrollY % (window.innerHeight * 2)) / (window.innerHeight * 2);

      calqueRefs.current.forEach((calque, n) => {
        if (!calque) return;
        let opacite = 0;
        if (n === cible) opacite = INTENSITE * mix * attenuation;
        else if (n === precedent && precedent !== cible) opacite = INTENSITE * (1 - mix) * attenuation;
        calque.style.opacity = String(opacite);
        if (opacite > 0) {
          calque.style.transform = `scale(${1.14 - 0.06 * mix}) translateY(${-2 + par * 4}%)`;
        }
      });

      // Le cadre ne revient jamais en arrière : maxProg, jamais prog.
      if (voileFroidRef.current) voileFroidRef.current.style.opacity = String(Math.min(1, maxProg * 1.15));
      if (voileChaudRef.current) voileChaudRef.current.style.opacity = String(1 - Math.min(0.82, maxProg * 1.1));
      if (nuitRef.current) nuitRef.current.style.opacity = String(Math.min(1, Math.max(0, (maxProg - 0.45) / 0.55)));

      if (jaugeRef.current) {
        jaugeRef.current.style.width = `${(prog * 100).toFixed(2)}%`;
        const r = Math.round(201 - 41 * maxProg);
        const g = Math.round(161 + 12 * maxProg);
        const b = Math.round(95 + 117 * maxProg);
        jaugeRef.current.style.background = `linear-gradient(90deg, rgba(201,161,95,0.15), rgb(${r},${g},${b}))`;
      }

      let courante = 0;
      trouverSections().forEach(({ el, strate }) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) courante = strate;
      });
      railItemRefs.current.forEach((el, n) => {
        if (!el) return;
        const actif = n + 1 === courante;
        el.style.color = actif ? 'rgba(239,230,214,0.95)' : n + 1 < courante ? 'rgba(180,168,148,0.5)' : 'rgba(180,168,148,0.2)';
        el.style.boxShadow = actif ? 'inset 3px 0 0 rgba(201,161,95,0.8)' : 'none';
      });

      // La cote descend avec la lecture : on lit une coupe, pas une page.
      if (niveauRef.current) niveauRef.current.style.top = `${(prog * 100).toFixed(2)}%`;
      if (coteRef.current) coteRef.current.textContent = `${Math.round(prog * 100)} %`;

      // La coupe ne doit jamais chevaucher la colonne de lecture.
      const coupeVisible = window.innerWidth >= 1180;
      if (railRef.current) railRef.current.style.display = coupeVisible ? 'flex' : 'none';
      if (mainRef.current) {
        mainRef.current.style.paddingLeft = coupeVisible ? 'clamp(7rem,10vw,11rem)' : '';
      }
    };

    if (reduced) {
      // Pas de boucle continue : un écouteur de scroll/resize, throttlé à
      // une frame, garde fond/voiles/rail/jauge à jour sans faire tourner
      // rafPartage pour une page qui ne défile pas forcément.
      let en_attente = false;
      const surEvenement = () => {
        if (en_attente) return;
        en_attente = true;
        requestAnimationFrame(() => {
          en_attente = false;
          appliquer();
        });
      };
      window.addEventListener('scroll', surEvenement, { passive: true });
      window.addEventListener('resize', surEvenement);
      appliquer();

      return () => {
        window.removeEventListener('scroll', surEvenement);
        window.removeEventListener('resize', surEvenement);
      };
    }

    const cendres = canvasRef.current ? demarrerCendres(canvasRef.current) : null;

    const desabonner = abonnerAuRaf((_deltaMs, _horlogeMs) => {
      appliquer();
      cendres?.avancer();
    });

    const surResize = () => cendres?.redimensionner();
    window.addEventListener('resize', surResize);

    return () => {
      desabonner();
      window.removeEventListener('resize', surResize);
    };
  }, [images]);

  if (images.length === 0) return null;

  return (
    <>
      <div className={styles.fond} aria-hidden="true">
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              calqueRefs.current[index] = el;
            }}
            className={styles.calque}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: image.ancrage ?? 'center' }}
            />
          </div>
        ))}
        <div ref={voileChaudRef} className={styles.voileChaud} />
        <div ref={voileFroidRef} className={styles.voileFroid} />
        <div className={styles.voileCentre} />
        <div ref={nuitRef} className={styles.nuit} />
      </div>

      <div ref={jaugeRef} className={styles.jauge} />

      <canvas ref={canvasRef} aria-hidden="true" className={styles.cendres} />

      <nav ref={railRef} aria-label="Coupe des strates" className={styles.rail}>
        {RAIL_STRATES.map((strate, index) => (
          <a
            key={strate.numeral}
            ref={(el) => {
              railItemRefs.current[index] = el;
            }}
            className={styles.railItem}
            href={`#strate-${index + 1}`}
            title={`${strate.era} · strate ${strate.numeral}`}
          >
            <span className={styles.railNumeral}>{strate.numeral}</span>
            <span className={styles.railEra}>{strate.era}</span>
          </a>
        ))}
        <div ref={niveauRef} className={styles.niveau}>
          <span className={styles.niveauTrait} />
          <span className={styles.niveauPointe} />
          <span ref={coteRef} className={styles.niveauCote}>
            0 %
          </span>
        </div>
      </nav>
    </>
  );
}

type Particule = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  d: number;
  ds: number;
  o: number;
  braise: boolean;
};

function demarrerCendres(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let w = 0;
  let h = 0;
  let particules: Particule[] = [];
  let progressionCourante = 0;

  const construire = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = w < 640 ? 32 : w < 1100 ? 56 : 82;
    particules = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.4 + Math.random() * 1.5,
      vy: -0.06 - Math.random() * 0.22,
      vx: -0.06 + Math.random() * 0.12,
      d: Math.random() * Math.PI * 2,
      ds: 0.003 + Math.random() * 0.006,
      o: 0.06 + Math.random() * 0.2,
      braise: Math.random() < 0.16,
    }));
  };

  const dessiner = () => {
    const p = progressionCourante;
    ctx.clearRect(0, 0, w, h);

    for (const particule of particules) {
      particule.d += particule.ds;
      particule.x += particule.vx + Math.sin(particule.d) * 0.14;
      particule.y += particule.vy * (1 - p * 0.45);
      if (particule.y < -14) {
        particule.y = h + 14;
        particule.x = Math.random() * w;
      }
      if (particule.x < -14) particule.x = w + 14;
      if (particule.x > w + 14) particule.x = -14;

      const r = Math.round(226 - 60 * p);
      const g = Math.round(186 - 6 * p);
      const b = Math.round(118 + 80 * p);
      const alpha = particule.o * (particule.braise ? 1 : 0.62);

      if (particule.braise && p < 0.6) {
        const lueur = particule.r * 5;
        const degrade = ctx.createRadialGradient(particule.x, particule.y, 0, particule.x, particule.y, lueur);
        degrade.addColorStop(0, `rgba(${r},${g},${b},${alpha * (1 - p)})`);
        degrade.addColorStop(1, 'rgba(20,18,16,0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = degrade;
        ctx.beginPath();
        ctx.arc(particule.x, particule.y, lueur, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.ellipse(particule.x, particule.y, particule.r * 1.3, particule.r * 0.75, particule.d, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  construire();

  return {
    // Appelé une fois par tick de rafPartage : lit la progression de
    // scroll courante (déjà calculée par `appliquer`) via une clôture
    // partagée serait plus complexe qu'utile ici — le canvas recalcule
    // seulement ce dont il a besoin (0 par défaut, mis à jour ci-dessous
    // par PalimpsesteFond via `progressionCourante`).
    avancer: () => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      progressionCourante = parcourable > 0 ? Math.min(1, Math.max(0, window.scrollY / parcourable)) : 0;
      dessiner();
    },
    redimensionner: construire,
  };
}
