'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TheatrePersonnage.module.css';

/**
 * La valeur illusoire — "le doute comme arme".
 *
 * Quand le lecteur cesse de regarder un champ et y revient, sa
 * FORMULATION a changé. Le fait énoncé, lui, est rigoureusement le même :
 * seuls les mots bougent. Le lecteur doute de sa mémoire, jamais de la
 * vérité de la fiche.
 *
 * Trois précautions qui rendent l'effet supportable :
 *  - le changement ne se produit JAMAIS à l'écran. On attend que le champ
 *    soit entièrement sorti du viewport. Rien ne bouge sous les yeux ;
 *  - aucune transition, aucun fondu. Un mensonge ne s'annonce pas : la
 *    valeur est simplement autre, comme si elle l'avait toujours été ;
 *  - la première formulation est celle du data.json. Un lecteur qui ne
 *    défile pas voit la fiche exacte.
 *
 * Sous prefers-reduced-motion, la valeur ne change jamais.
 */

type ValeurIllusoireProps = {
  valeur: string;
  variantes?: string[];
};

export function ValeurIllusoire({ valeur, variantes }: ValeurIllusoireProps) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const etaitVisible = useRef(true);

  const toutes = variantes && variantes.length > 1 ? variantes : null;

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud || !toutes) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) {
            etaitVisible.current = false;
            continue;
          }

          // Revenu à l'écran après en être sorti : on change de
          // formulation, hors de la vue du lecteur.
          if (!etaitVisible.current) {
            etaitVisible.current = true;
            setIndex((precedent) => (precedent + 1) % toutes.length);
          }
        }
      },
      { threshold: 0 },
    );

    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, [toutes]);

  return (
    <span ref={ref} className={styles.valeur}>
      {toutes ? toutes[index] : valeur}
    </span>
  );
}
