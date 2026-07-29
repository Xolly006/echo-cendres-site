'use client';

import { useEffect, useState } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import { Runes } from './Runes';
import styles from './TitanPersonnage.module.css';

/**
 * Le Bras Gauche.
 *
 * Canon : "son bras gauche pulsait d'une lumière rouge, cherchant quelque
 * chose à détruire" — et, quelques lignes plus loin : "les veines rouges
 * gonflaient. L'Arquet prenait le contrôle. La Bête en lui se réveillait."
 *
 * D'où une bande rouge sombre le long du bord GAUCHE de la page, sur toute
 * la hauteur. Elle pulse en permanence, lentement, comme un coeur au repos.
 *
 * Et, à intervalles longs et irréguliers, ELLE FRAPPE : la page tressaute
 * d'un coup sec, la bande s'embrase brièvement. Ce n'est pas une
 * animation en boucle qu'on finit par anticiper — c'est un impact, sans
 * prévenir, que personne n'a décidé. C'est tout le personnage : la
 * violence arrive, et l'homme à l'intérieur n'y est pour rien.
 *
 * Le tressaut passe par une variable CSS sur <html> plutôt que par un
 * transform sur le contenu : rien à recalculer, aucun repaint de texte.
 *
 * Sous prefers-reduced-motion, le bras pulse encore mais ne frappe jamais.
 */

const MIN_ENTRE_COUPS = 11000;
const MAX_ENTRE_COUPS = 26000;

export function BrasGauche() {
  const [impact, setImpact] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let restant = MIN_ENTRE_COUPS + Math.random() * (MAX_ENTRE_COUPS - MIN_ENTRE_COUPS);
    let finImpact = 0;

    const desabonner = abonnerAuRaf((dt) => {
      if (finImpact > 0) {
        finImpact -= dt;
        if (finImpact <= 0) {
          finImpact = 0;
          setImpact(false);
          document.documentElement.removeAttribute('data-impact');
        }
        return;
      }

      restant -= dt;
      if (restant <= 0) {
        restant = MIN_ENTRE_COUPS + Math.random() * (MAX_ENTRE_COUPS - MIN_ENTRE_COUPS);
        finImpact = 420;
        setImpact(true);
        document.documentElement.setAttribute('data-impact', '');
      }
    });

    return () => {
      desabonner();
      document.documentElement.removeAttribute('data-impact');
    };
  }, []);

  return (
    <div className={styles.bras} data-impact={impact ? '' : undefined} aria-hidden="true">
      <span className={styles.brasVeine} />
      <span className={styles.brasRunes}>
        <Runes />
      </span>
    </div>
  );
}
