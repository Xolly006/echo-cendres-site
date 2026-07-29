'use client';

import styles from './TheatrePersonnage.module.css';

/**
 * Le nom double.
 *
 * Première version : le nom réel et l'alias superposés. Défaut fatal —
 * "La Mère des Masques" est bien plus long que "Soryn la Voilée", donc
 * l'alias débordait du viewport et se faisait couper. Le problème était
 * la largeur, pas la position : aucun centrage ne pouvait le régler.
 *
 * Ici, le fantôme est LE MÊME NOM, décalé : une impression mal calée,
 * qui par construction ne peut jamais déborder. Au repos on croit lire un
 * mot légèrement flou.
 *
 * Au survol, deux choses arrivent en même temps : les deux copies se
 * séparent franchement, et l'alias apparaît en dessous, en petit. On
 * découvre qu'on ne lisait ni un seul nom, ni le bon.
 *
 * Seul le nom réel est dans le flux du document ; le fantôme et l'alias
 * sont aria-hidden. Les lecteurs d'écran n'entendent jamais l'illusion.
 */

type NomDoubleProps = {
  nom: string;
  double?: string;
};

export function NomDouble({ nom, double }: NomDoubleProps) {
  return (
    <span className={styles.nomDouble}>
      <span className={styles.nomVrai}>{nom}</span>
      <span className={styles.nomFantome} aria-hidden="true">
        {nom}
      </span>
      {double ? (
        <span className={styles.nomAlias} aria-hidden="true">
          {double}
        </span>
      ) : null}
    </span>
  );
}
