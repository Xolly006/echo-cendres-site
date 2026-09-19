'use client';

import { useEffect, useState } from 'react';
import { abonnerAuRaf } from '@/components/personnages/effects/rafPartage';
import { Runes, RUNES } from './Runes';
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
 * Et, ELLE FRAPPE : la page tressaute d'un coup sec, la bande s'embrase
 * brièvement. Le coup n'est plus posé sur une horloge — un lecteur qui
 * parcourait la page normalement n'en voyait jamais que deux ou trois. Il
 * est posé sur la progression du défilement : six seuils aléatoires sont
 * tirés au montage, un par tranche de page, le dernier laissant une marge
 * avant le bas. Un seuil franchi EN DESCENDANT déclenche le coup suivant.
 * Il reste imprévisible — le lecteur ne choisit ni le nombre de seuils ni
 * l'écart entre deux coups — mais il ne tombe plus pendant une lecture
 * immobile, et jamais en remontant.
 *
 * Le tressaut passe par une variable CSS sur <html> plutôt que par un
 * transform sur le contenu : rien à recalculer, aucun repaint de texte.
 *
 * Sous prefers-reduced-motion, le bras pulse encore mais ne frappe jamais.
 *
 * Chaque coup grave une rune de plus sur le bras (voir Runes.tsx), dans
 * l'ordre du tableau RUNES : six seuils, six runes, la sixième gravée
 * avant le bas de la page. Une rune gravée reste. Sous
 * prefers-reduced-motion, les six sont là dès le départ, sans qu'aucun
 * coup n'ait eu lieu.
 */

// Durée du tressaut/embrasement — inchangée depuis la version pilotée par
// horloge.
const DUREE_IMPACT = 420;

// Le dernier seuil laisse cette marge avant le bas de page (en fraction
// de la hauteur parcourable), pour que la sixième rune soit toujours
// gravée avant la fin.
const MARGE_AVANT_BAS = 0.08;

/**
 * Six seuils de progression (0 à 1), un par sixième de page, chacun tiré
 * au hasard dans sa tranche. Monotones par construction — pas besoin de
 * les trier — et imprévisibles : ni leur écart ni leur position exacte
 * ne sont fixes d'une visite à l'autre.
 */
function tirerSeuils(nombre: number): number[] {
  const largeurTranche = 1 / nombre;

  return Array.from({ length: nombre }, (_, index) => {
    const debut = index * largeurTranche;
    const fin = (index + 1) * largeurTranche - (index === nombre - 1 ? MARGE_AVANT_BAS : 0);
    return debut + Math.random() * Math.max(0, fin - debut);
  });
}

export function BrasGauche() {
  const [impact, setImpact] = useState(false);
  const [gravees, setGravees] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Défilé via rAF, pas appelé en direct dans le corps de l'effet :
      // les six runes sont là au chargement, mais l'état se met à jour
      // comme une réaction à un système externe, pas une synchronisation.
      const id = window.requestAnimationFrame(() => setGravees(RUNES.length));
      return () => window.cancelAnimationFrame(id);
    }

    const seuils = tirerSeuils(RUNES.length);
    let prochainSeuil = 0;
    let progressionPrecedente = 0;
    let finImpact = 0;

    const desabonner = abonnerAuRaf((dt) => {
      const parcourable = document.documentElement.scrollHeight - window.innerHeight;
      const progression =
        parcourable > 0 ? Math.min(1, Math.max(0, window.scrollY / parcourable)) : 0;
      const enDescente = progression > progressionPrecedente;
      progressionPrecedente = progression;

      if (finImpact > 0) {
        finImpact -= dt;
        if (finImpact <= 0) {
          finImpact = 0;
          setImpact(false);
          document.documentElement.removeAttribute('data-impact');
        }
        return;
      }

      if (prochainSeuil >= seuils.length || !enDescente) return;

      if (progression >= seuils[prochainSeuil]) {
        prochainSeuil += 1;
        finImpact = DUREE_IMPACT;
        setImpact(true);
        setGravees((g) => Math.min(g + 1, RUNES.length));
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
        <Runes count={gravees} />
      </span>
    </div>
  );
}
