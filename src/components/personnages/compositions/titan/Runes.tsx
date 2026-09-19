import styles from './TitanPersonnage.module.css';

/**
 * Les runes de l'Arquet, le long du bras gauche.
 *
 * La première version dessinait des tirets qui défilaient : aucune forme,
 * aucun sens. Ce sont ici de vraies runes de l'Elder Futhark, tracées en
 * segments droits — une rune est GRAVÉE, elle n'a aucune courbe.
 *
 * Une deuxième version les faisait défiler en boucle : une rune gravée ne
 * défile pas, elle reste. `count` dit combien de runes, dans l'ordre
 * ci-dessous, ont déjà été gravées par un impact du bras ; le tracé
 * apparaît une fois, sans rejouer son apparition, et ne bouge plus.
 *
 * Les six retenues disent quelque chose de lui :
 *   ᚾ Naudiz    "besoin, détresse"        — ce qu'il est
 *   ᚦ Thurisaz  le géant, la force brute  — ce qu'on a fait de lui
 *   ᚢ Uruz      l'aurochs, la puissance   — son corps
 *   ᛁ Isa       la glace, l'arrêt         — ce qu'il voudrait
 *   ᛏ Tiwaz     le guerrier, le sacrifice — les arènes
 *   ᚺ Hagalaz   la grêle, la destruction  — la Bête
 */

export const RUNES: Array<{ nom: string; d: string }> = [
  // ᚾ Naudiz — hampe verticale barrée d'une diagonale.
  { nom: 'naudiz', d: 'M 12 0 L 12 34 M 2 22 L 22 12' },
  // ᚦ Thurisaz — hampe et pointe triangulaire à droite.
  { nom: 'thurisaz', d: 'M 6 0 L 6 34 M 6 8 L 20 17 L 6 26' },
  // ᚢ Uruz — deux hampes, la droite plus courte, reliées en haut.
  { nom: 'uruz', d: 'M 4 34 L 4 6 L 20 0 L 20 28' },
  // ᛁ Isa — une seule hampe.
  { nom: 'isa', d: 'M 12 0 L 12 34' },
  // ᛏ Tiwaz — flèche vers le haut.
  { nom: 'tiwaz', d: 'M 12 34 L 12 4 M 2 14 L 12 2 L 22 14' },
  // ᚺ Hagalaz — deux hampes reliées par une barre oblique.
  { nom: 'hagalaz', d: 'M 4 0 L 4 34 M 20 0 L 20 34 M 4 13 L 20 21' },
];

export function Runes({ count }: { count: number }) {
  // `slice` depuis le début : l'index dans ce sous-tableau reste l'index
  // d'origine, donc une rune déjà gravée ne change jamais de position
  // quand la suivante apparaît.
  const gravees = RUNES.slice(0, count);

  return (
    <svg
      className={styles.runes}
      viewBox={`0 0 24 ${RUNES.length * 34}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {gravees.map((rune, index) => (
          <path key={rune.nom} d={rune.d} transform={`translate(0 ${index * 34})`} />
        ))}
      </g>
    </svg>
  );
}
