import styles from './CagePersonnage.module.css';

/**
 * La Voix de Dieu — colonnes de lumière orbitale.
 *
 * "Chaque colonne impose une règle dans son rayon : ici, le mouvement est
 *  interdit ; ici, la magie corrompue se dissout ; ici, le mensonge est
 *  physiquement douloureux. Ce n'est pas de la destruction — c'est de la
 *  législation physique temporaire."
 *
 * Traduction littérale : trois colonnes verticales balaient la page. Là où
 * elles passent, une règle s'applique — le texte traversé s'aligne, passe en
 * géométrique et en capitales. La colonne s'éloigne, la règle expire.
 *
 * L'effet est porté par une couche en `mix-blend-mode`, donc il n'intercepte
 * jamais le pointeur et ne modifie jamais le contenu : la lisibilité du récit
 * reste intacte quoi qu'il arrive.
 */

const COLONNES = [
  { left: '18%', width: '11rem', duration: '38s', delay: '0s' },
  { left: '54%', width: '7rem', duration: '53s', delay: '-19s' },
  { left: '81%', width: '14rem', duration: '67s', delay: '-41s' },
];

export function Colonnes() {
  return (
    <div className={styles.colonnes} aria-hidden="true">
      {COLONNES.map((colonne) => (
        <span
          key={colonne.left}
          className={styles.colonne}
          style={{
            left: colonne.left,
            width: colonne.width,
            animationDuration: colonne.duration,
            animationDelay: colonne.delay,
          }}
        />
      ))}
    </div>
  );
}
