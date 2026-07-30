'use client';

import { useEffect, useState } from 'react';
import styles from './OrfevreriePersonnage.module.css';

/**
 * La Transmutation.
 *
 * Le verbe d'Aurélia : LA PAGE SE LAISSE TOUCHER — ET C'EST ÇA QUI EST
 * TERRIBLE.
 *
 * Canon : "tout ce qu'elle effleurait — nourriture, draps, amants — se
 * changeait en or massif. Elle mourait de faim et de solitude au milieu
 * d'une richesse infinie." Et : "grâce au tatouage, elle peut enfin
 * toucher une peau humaine sans la tuer. C'est sa drogue."
 *
 * Kael refuse le lecteur. Ysolde l'ignore. Métatron le corrige. Aurélia
 * est la seule page du site qui RÉPOND à son contact — et ce qu'il touche
 * se dore, puis se fige pour de bon. Le lecteur devient complice : c'est
 * sa main qui tue.
 *
 * TOUCHER, PAS FRÔLER.
 *
 * La première version se déclenchait dès que le curseur passait à 130 px
 * d'un élément. Or on bouge la souris pour scroller et pour lire : la
 * page se dorait toute seule et le lecteur ne la voyait jamais vivante.
 * L'effet se battait contre la lecture.
 *
 * Il faut désormais poser le curseur SUR le texte. Lire est sûr, toucher
 * est un geste délibéré — ce qui est d'ailleurs plus juste pour elle :
 * elle ne détruit pas ce qu'elle frôle, elle détruit ce qu'elle touche.
 *
 * Deux règles qui rendent l'effet juste :
 *  - la transmutation est DÉFINITIVE. Rien ne redevient vivant, jamais.
 *    Une page qui se répare n'aurait aucun poids ;
 *  - la lisibilité n'est jamais atteinte. L'or est un changement de
 *    couleur et un arrêt du mouvement, pas un flou ni une disparition.
 *
 * Le compteur rend la complicité mesurable. Il ne redescend pas.
 */



export function Transmutation() {
  const [transmutes, setTransmutes] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cibles = Array.from(document.querySelectorAll<HTMLElement>('[data-transmutable]'));
    if (cibles.length === 0) return;


    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    /*
     * Le poids : un titre transmuté compte plus qu'une puce de liste.
     * Compter les éléments donnait un pourcentage faux — la page pouvait
     * paraître dorée aux deux tiers et afficher 6 %.
     */
    const poids = (el: HTMLElement) => Math.max(1, (el.textContent ?? '').trim().length);
    const poidsTotal = cibles.reduce((somme, el) => somme + poids(el), 0);
    let poidsFait = 0;

    const toucher = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      if (el.hasAttribute('data-transmute')) return;

      el.setAttribute('data-transmute', '');
      poidsFait += poids(el);
      setTransmutes(poidsFait);
    };

    for (const cible of cibles) {
      cible.addEventListener('pointerenter', toucher);
    }

    setTotal(poidsTotal);

    return () => {
      for (const cible of cibles) {
        cible.removeEventListener('pointerenter', toucher);
      }
    };
  }, []);

  if (total === 0) return null;

  const part = Math.round((transmutes / total) * 100);

  return (
    <p className={styles.compteur} role="status" aria-live="off">
      <span className={styles.compteurLabel}>Transmuté</span>
      <span className={styles.compteurValeur}>{part}&nbsp;%</span>
    </p>
  );
}
