'use client';

import { useEffect, useState } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './TheatrePersonnage.module.css';

/**
 * La craquelure.
 *
 * De fines fêlures de porcelaine se propagent sur la page à mesure que le
 * lecteur descend. La page elle-même est un masque, et il se fend.
 *
 * Les tracés sont fixes — une craquelure ne bouge pas, elle s'étend. Ce
 * qui progresse, c'est la longueur révélée de chaque fêlure, via
 * stroke-dashoffset piloté par la progression du défilement.
 */

const FELURES = [
  'M 8 2 L 14 22 L 9 38 L 18 58 L 13 82 L 22 100',
  'M 92 0 L 86 18 L 93 32 L 84 54 L 90 76 L 82 100',
  'M 38 0 L 44 14 L 36 30 L 46 44 L 40 66 L 50 88 L 44 100',
  'M 64 4 L 58 20 L 68 36 L 60 52 L 70 70 L 62 92',
  'M 20 40 L 34 48 L 44 44',
  'M 76 58 L 62 64 L 52 60',
  'M 12 66 L 26 74 L 30 90',
];

export function Craquelure() {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgression(1);
      return;
    }

    let dernier = 0;
    return abonnerAuRaf(() => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      if (parcourable <= 0) return;

      const brut = Math.min(1, Math.max(0, window.scrollY / parcourable));
      const arrondi = Math.round(brut * 50) / 50;
      if (arrondi !== dernier) {
        dernier = arrondi;
        setProgression(arrondi);
      }
    });
  }, []);

  return (
    <svg
      className={styles.craquelure}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.18" strokeLinecap="round">
        {FELURES.map((d, index) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            strokeDasharray={1}
            // Chaque fêlure part à son propre seuil : elles ne se
            // propagent pas toutes en même temps.
            strokeDashoffset={Math.max(
              0,
              1 - Math.max(0, progression * 1.5 - index * 0.09),
            )}
          />
        ))}
      </g>
    </svg>
  );
}
