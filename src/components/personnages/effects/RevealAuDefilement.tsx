'use client';

import { useEffect } from 'react';

/**
 * L'apparition au défilement, déclinée par personnage.
 *
 * Le principe du projet s'applique ici aussi : la MANIÈRE dont un bloc
 * apparaît doit parler du personnage, pas seulement s'animer.
 *
 *   canopee   Ysolde   — ça POUSSE. Le bloc monte du bas et se déplie,
 *                        lent, végétal. Rien ne se presse dans une forêt.
 *   fragment  Kael     — ça N'ARRIVE PAS VRAIMENT. Il se condense depuis
 *                        un flou, sans translation : il n'a jamais été
 *                        ailleurs, la page se résout à l'admettre.
 *   retable   Elias    — ça S'ALLUME. Fondu chaud, légère montée, comme
 *                        une flamme qu'on approche.
 *   cage      Métatron — ça SE POSE. Aucun fondu progressif : le bloc
 *                        arrive d'un cran, net, en linear. Il ne
 *                        s'annonce pas, il est déclaré.
 *
 * Implémentation volontairement non invasive : le composant n'enveloppe
 * rien. Il observe les blocs déjà marqués `data-reveal` dans le DOM et
 * leur pose `data-revealed`. Toute l'animation est en CSS, dans la feuille
 * de la composition — donc chaque composition reste maîtresse de son
 * propre langage d'apparition.
 *
 * L'apparition ne se joue qu'une fois par bloc : c'est un accueil, pas un
 * effet qui se rejoue à chaque passage. Sous `prefers-reduced-motion`,
 * tout est révélé immédiatement.
 */

export function RevealAuDefilement() {
  useEffect(() => {
    const blocs = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (blocs.length === 0) return;

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduit) {
      blocs.forEach((bloc) => bloc.setAttribute('data-revealed', ''));
      return;
    }

    // Les blocs déjà visibles au chargement apparaissent en cascade douce
    // plutôt que tous à la fois.
    let dejaVus = 0;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;

          const bloc = entree.target as HTMLElement;
          const retard = dejaVus < 4 ? dejaVus * 130 : 0;
          dejaVus += 1;

          window.setTimeout(() => bloc.setAttribute('data-revealed', ''), retard);
          observateur.unobserve(bloc);
        }
      },
      // On déclenche avant que le bloc touche le bas du viewport :
      // l'apparition doit être finie quand le lecteur y arrive.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.04 },
    );

    blocs.forEach((bloc) => observateur.observe(bloc));
    return () => observateur.disconnect();
  }, []);

  return null;
}
