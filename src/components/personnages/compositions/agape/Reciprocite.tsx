'use client';

import { useEffect } from 'react';
import styles from './AgapePersonnage.module.css';

/**
 * La Réciprocité — "Nous sommes Un."
 *
 * Miroir exact d'Aurélia. Chez la Reine Midas, ce que le lecteur touche
 * se détruit. Chez Amara, ce que le lecteur touche S'ADOUCIT — et une
 * autre part de la page s'éteint au même instant.
 *
 * Canon : "Tous les dégâts sont partagés. Si vous frappez Amara, vous
 * recevez la même blessure, au même endroit, avec la même douleur."
 *
 * Appliqué au lecteur : rien n'est gratuit. Chaque réconfort qu'il prend
 * est pris quelque part. Il ne peut pas tout réchauffer — la page compte
 * autant de blocs qu'il en éteint.
 *
 * Contrairement à la transmutation d'Aurélia, l'effet est RÉVERSIBLE :
 * quand le lecteur s'éloigne, la chaleur reflue et l'obscurité aussi.
 * Elle ne détruit rien. Elle déplace.
 */

export function Reciprocite() {
  useEffect(() => {
    const blocs = Array.from(document.querySelectorAll<HTMLElement>('[data-partage]'));
    if (blocs.length < 2) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const entrer = (event: Event) => {
      const cible = event.currentTarget as HTMLElement;
      const index = blocs.indexOf(cible);
      if (index === -1) return;

      cible.setAttribute('data-rechauffe', '');

      // Le prix est payé ailleurs, jamais sur le bloc que l'on tient.
      // Un décalage fixe : le même geste éteint toujours la même part.
      const paie = blocs[(index + Math.ceil(blocs.length / 2)) % blocs.length];
      if (paie !== cible) paie.setAttribute('data-eteint', '');
    };

    const sortir = () => {
      for (const bloc of blocs) {
        bloc.removeAttribute('data-rechauffe');
        bloc.removeAttribute('data-eteint');
      }
    };

    for (const bloc of blocs) {
      bloc.addEventListener('pointerenter', entrer);
      bloc.addEventListener('pointerleave', sortir);
    }

    return () => {
      for (const bloc of blocs) {
        bloc.removeEventListener('pointerenter', entrer);
        bloc.removeEventListener('pointerleave', sortir);
        bloc.removeAttribute('data-rechauffe');
        bloc.removeAttribute('data-eteint');
      }
    };
  }, []);

  return null;
}
