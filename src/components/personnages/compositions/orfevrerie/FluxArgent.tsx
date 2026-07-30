'use client';

import { useEffect, useState } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import styles from './OrfevreriePersonnage.module.css';

/**
 * Le Flux d'Argent.
 *
 * Canon : "L'argent est conducteur de magie. Elle manipule l'argent sous
 * forme liquide, comme du mercure, pour créer des armes mouvantes."
 *
 * Une coulée argentée descend le long de la page au défilement — vive,
 * mobile, jamais figée. Elle dit exactement le contraire de l'or :
 *
 *   l'or est la mort, l'argent est la vie.
 *
 * C'est le seul élément de sa page qui bouge encore quand tout le reste
 * a été doré.
 */

export function FluxArgent() {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let dernier = 0;
    return abonnerAuRaf(() => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      if (parcourable <= 0) return;

      const brut = Math.min(1, Math.max(0, window.scrollY / parcourable));
      const arrondi = Math.round(brut * 100) / 100;
      if (arrondi !== dernier) {
        dernier = arrondi;
        setProgression(arrondi);
      }
    });
  }, []);

  return (
    <div className={styles.flux} aria-hidden="true">
      <span
        className={styles.fluxGoutte}
        style={{ top: `${8 + progression * 78}%` }}
      />
      <span
        className={styles.fluxTrainee}
        style={{ height: `${8 + progression * 78}%` }}
      />
    </div>
  );
}
