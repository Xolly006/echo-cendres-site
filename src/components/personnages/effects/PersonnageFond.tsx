'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { PersonnageImage } from '@/types/personnage';
import { abonnerAuRaf } from './rafPartage';
import styles from './PersonnageFond.module.css';

/**
 * Le fond imagé d'une fiche personnage.
 *
 * Deux principes :
 *
 * 1. LE TEXTE PASSE AVANT. Une image de fond détruit la lisibilité si on
 *    ne l'amortit pas. Un voile dont l'opacité vient du thème est posé
 *    systématiquement entre l'image et le contenu, et l'image elle-même
 *    est désaturée. Le contraste du texte n'est jamais négociable.
 *
 * 2. DEUX IMAGES RACONTENT UN TRAJET. Quand une fiche déclare un
 *    `fondSecondaire`, la page bascule de l'une à l'autre au fil du
 *    défilement. Chez Varros, le champ de blé de l'homme qu'il était cède
 *    au cratère de ce qu'il est devenu : la page fait le chemin de sa vie
 *    sans une phrase d'explication.
 *
 * La progression est calculée dans la boucle d'animation partagée — pas
 * d'écouteur de scroll supplémentaire, pas de `getBoundingClientRect` à
 * chaque événement.
 */

type PersonnageFondProps = {
  fond?: PersonnageImage;
  fondSecondaire?: PersonnageImage;
  /** Opacité de l'image sous le voile. Défaut prudent. */
  intensite?: number;
};

export function PersonnageFond({ fond, fondSecondaire, intensite = 0.3 }: PersonnageFondProps) {
  const [progression, setProgression] = useState(0);
  const dernier = useRef(0);

  useEffect(() => {
    if (!fondSecondaire) return;

    const desabonner = abonnerAuRaf(() => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      if (parcourable <= 0) return;

      // La bascule se joue sur le premier tiers du défilement : le trajet
      // doit être fini bien avant le bas de page.
      const brut = Math.min(1, Math.max(0, window.scrollY / (parcourable * 0.55)));
      const arrondi = Math.round(brut * 100) / 100;

      // On ne repeint que si la valeur a réellement bougé.
      if (arrondi !== dernier.current) {
        dernier.current = arrondi;
        setProgression(arrondi);
      }
    });

    return desabonner;
  }, [fondSecondaire]);

  if (!fond) return null;

  return (
    <div className={styles.fond} aria-hidden="true">
      <div className={styles.calque} style={{ opacity: intensite * (1 - progression) }}>
        <Image
          src={fond.src}
          alt={fond.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: fond.ancrage ?? 'center' }}
        />
      </div>

      {fondSecondaire ? (
        <div className={styles.calque} style={{ opacity: intensite * progression }}>
          <Image
            src={fondSecondaire.src}
            alt={fondSecondaire.alt}
            fill
            loading="lazy"
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: fondSecondaire.ancrage ?? 'center' }}
          />
        </div>
      ) : null}

      {/* Le voile : sans lui, aucun texte n'est lisible sur une image. */}
      <div className={styles.voile} />
    </div>
  );
}
