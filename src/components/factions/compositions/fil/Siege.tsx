import type { FactionMembre } from '@/types/faction';
import styles from './FilFaction.module.css';

type SiegeProps = {
  membre: FactionMembre;
};

/**
 * Un siège du Conseil — un membre en poste, hors Cercle Zéro et Façade.
 * Pas de boîte : la séparation vient de l'espacement et de la
 * typographie (docs/ARQUET_COMPOSITION.md §4).
 */
export function Siege({ membre }: SiegeProps) {
  return (
    <li className={styles.siege}>
      <p className={styles.siegeNom} data-siege-nom={membre.nom}>
        {membre.nom}
      </p>
      {membre.titre ? <p className={styles.siegeTitre}>{membre.titre}</p> : null}
      {membre.concept ? <p className={styles.siegeConcept}>{membre.concept}</p> : null}
    </li>
  );
}
