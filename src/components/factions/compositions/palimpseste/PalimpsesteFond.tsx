'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { FactionImage } from '@/types/faction';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './PalimpsesteFond.module.css';

/**
 * Le fond imagé de la fiche Arquet — même modèle que PersonnageFond
 * (src/components/personnages/effects/PersonnageFond.tsx), généralisé à
 * cinq images au lieu de deux.
 *
 * Fixe, plein écran, derrière le contenu : il ne défile pas. `images` est
 * attendu dans l'ordre des strates (cloître → manuscrit → galerie →
 * lettres → hall, docs/ARQUET_COMPOSITION.md §5). La position de lecture
 * (0 à 1, sur toute la hauteur défilable de la page) est répartie en
 * `images.length - 1` segments égaux ; à chaque instant, deux images
 * voisines au plus se fondent l'une dans l'autre, jamais plus.
 *
 * Une seule boucle rAF partagée (rafPartage), transition en `opacity`
 * seule, désaturation statique (aucun `filter` animé). Le voile est
 * teinté par `--character-bg`, comme PersonnageFond.
 *
 * `prefers-reduced-motion` : aucun abonnement à la boucle, aucun suivi du
 * défilement — seule la première image (cloître) s'affiche, sans
 * transition.
 */

type PalimpsesteFondProps = {
  images: FactionImage[];
  /** Opacité des images sous le voile. Défaut prudent, identique à PersonnageFond. */
  intensite?: number;
};

export function PalimpsesteFond({ images, intensite = 0.3 }: PalimpsesteFondProps) {
  const [progression, setProgression] = useState(0);
  const dernier = useRef(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const desabonner = abonnerAuRaf(() => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      if (parcourable <= 0) return;

      const brut = Math.min(1, Math.max(0, window.scrollY / parcourable));
      const arrondi = Math.round(brut * 1000) / 1000;

      if (arrondi !== dernier.current) {
        dernier.current = arrondi;
        setProgression(arrondi);
      }
    });

    return desabonner;
  }, [images.length]);

  if (images.length === 0) return null;

  const pas = images.length - 1;
  const segment = pas > 0 ? progression * pas : 0;
  const index = Math.min(Math.max(pas - 1, 0), Math.floor(segment));
  const local = pas > 0 ? segment - index : 0;

  return (
    <div className={styles.fond} aria-hidden="true">
      {images.map((image, i) => {
        const opacite = i === index ? intensite * (1 - local) : i === index + 1 ? intensite * local : 0;

        return (
          <div key={image.src} className={styles.calque} style={{ opacity: opacite }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : 'lazy'}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: image.ancrage ?? 'center' }}
            />
          </div>
        );
      })}

      <div className={styles.voile} />
    </div>
  );
}
