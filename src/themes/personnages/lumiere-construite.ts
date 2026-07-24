import type { PersonnageTheme } from '@/types/personnage-theme';

/**
 * Lumière construite.
 *
 * Canon : la lumière d'Elias n'est pas celle de l'Église.
 * "Ce n'est pas cette lueur blanche, propre et stérile de l'Église.
 *  C'est une lumière chaude. Une lumière qui brûle comme des larmes."
 *
 * Donc : pas de blanc, pas d'or pur, pas de doré liturgique. Un or patiné,
 * chaud, bas, du côté de la cire et de la pierre — jamais du côté du métal
 * poli. L'or pur et le blanc dangereux appartiennent à Métatron, pas à lui.
 *
 * Famille potentielle : cette palette pourra servir à d'autres figures de
 * foi humaine, de sacré fissuré ou de lumière tenue à bout de bras. Elle ne
 * devient une "famille" que le jour où un second personnage l'adopte
 * réellement (docs/DECISIONS.md, 2026-07-23).
 */
export const lumiereConstruiteTheme: PersonnageTheme = {
  key: 'lumiere-construite',
  palette: {
    background: '#0c0a07',
    text: '#ece2d1',
    muted: '#a08d72',
    accent: '#c2914b',
    surface: 'rgba(30, 23, 15, 0.6)',
    border: 'rgba(214, 178, 120, 0.16)',
  },
  typography: {
    titleFamily: 'var(--font-serif-titre), Georgia, serif',
    bodyFamily: 'var(--font-serif-lecture), Georgia, serif',
    titleWeight: '400',
    titleSpacing: '0.05em',
    bodyLineHeight: '1.9',
    labelSpacing: '0.26em',
  },
  atmosphere: {
    backgroundKind: 'none',
    particleKind: 'none',
    intensity: 'low',
  },
};
