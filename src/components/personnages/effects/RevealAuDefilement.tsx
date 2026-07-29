'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * L'apparition au défilement, déclinée par personnage.
 *
 * Le principe du projet s'applique ici aussi : la MANIÈRE dont un bloc
 * apparaît doit parler du personnage, pas seulement s'animer.
 *
 *   canopee   Ysolde   — ça POUSSE
 *   fragment  Kael     — ça se CONDENSE sur place
 *   retable   Elias    — ça S'ALLUME
 *   cage      Métatron — ça SE POSE, d'un cran
 *   titan     Varros   — ça TOMBE
 *   theatre   Soryn    — LE RIDEAU SE LÈVE
 *
 * ------------------------------------------------------------------
 * SÛRETÉ : LE CONTENU N'EST JAMAIS MASQUÉ PAR DÉFAUT
 * ------------------------------------------------------------------
 *
 * La première version posait l'état caché dans la feuille de style : les
 * blocs étaient invisibles tant que le script ne les révélait pas. Si
 * l'observateur ne se déclenchait pas — pour n'importe quelle raison —
 * la moitié de la page restait perdue DÉFINITIVEMENT.
 *
 * C'est inacceptable pour une encyclopédie. L'ordre est donc inversé :
 *
 *  1. le HTML servi est entièrement visible et lisible ;
 *  2. ce script pose `data-hidden` avant le premier rendu (useLayoutEffect),
 *     donc sans scintillement ;
 *  3. l'observateur le retire quand le bloc approche du viewport.
 *
 * Et trois filets supplémentaires :
 *  - tout bloc déjà visible ou déjà dépassé au montage est révélé
 *    immédiatement ;
 *  - un délai de sûreté révèle tout au bout de 3 secondes, quoi qu'il
 *    arrive ;
 *  - sans JavaScript, sans hydratation ou sous prefers-reduced-motion,
 *    la page reste simplement lisible.
 */

const utiliserEffetDeMiseEnPage = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function RevealAuDefilement() {
  utiliserEffetDeMiseEnPage(() => {
    const blocs = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (blocs.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const reveler = (bloc: HTMLElement, retard = 0) => {
      window.setTimeout(() => {
        bloc.removeAttribute('data-hidden');
        bloc.setAttribute('data-revealed', '');
      }, retard);
    };

    // 1. On masque avant le premier rendu : aucun scintillement.
    for (const bloc of blocs) {
      bloc.setAttribute('data-hidden', '');
    }

    // 2. Ce qui est déjà à l'écran ou déjà dépassé n'a pas à attendre.
    const hauteur = window.innerHeight;
    let enAttente = 0;
    const aObserver: HTMLElement[] = [];

    for (const bloc of blocs) {
      const rect = bloc.getBoundingClientRect();
      if (rect.top < hauteur * 0.95) {
        reveler(bloc, Math.min(enAttente, 3) * 130);
        enAttente += 1;
      } else {
        aObserver.push(bloc);
      }
    }

    let observateur: IntersectionObserver | null = null;

    if (aObserver.length > 0) {
      observateur = new IntersectionObserver(
        (entrees) => {
          for (const entree of entrees) {
            if (!entree.isIntersecting) continue;
            reveler(entree.target as HTMLElement);
            observateur?.unobserve(entree.target);
          }
        },
        // Marges volontairement permissives : mieux vaut révéler un peu
        // trop tôt que laisser un bloc caché.
        { rootMargin: '200px 0px 0px 0px', threshold: 0 },
      );

      aObserver.forEach((bloc) => observateur?.observe(bloc));
    }

    // 3. Le filet : au bout de trois secondes, tout est visible, point.
    const secours = window.setTimeout(() => {
      for (const bloc of blocs) {
        if (bloc.hasAttribute('data-hidden')) reveler(bloc);
      }
    }, 3000);

    return () => {
      observateur?.disconnect();
      window.clearTimeout(secours);
      // Au démontage, on rend le contenu : jamais de bloc laissé caché.
      for (const bloc of blocs) {
        bloc.removeAttribute('data-hidden');
      }
    };
  }, []);

  return null;
}
