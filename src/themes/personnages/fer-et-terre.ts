import type { PersonnageTheme } from '@/types/personnage-theme';

/**
 * Fer et terre.
 *
 * Varros n'est pas une ombre : il est MATIÈRE. Pas de noir pur, donc —
 * du brun de terre labourée, du gris de fer froid, et le rouge sourd des
 * runes de l'Arquet qui pulsent dans son bras gauche.
 *
 * Canon : "sa peau, marquée par les runes de l'Arquet, fumait sous le
 * froid", "son bras gauche pulsait d'une lumière rouge, cherchant quelque
 * chose à détruire", "une montagne de muscles tristes".
 */
export const ferEtTerreTheme: PersonnageTheme = {
  key: 'fer-et-terre',
  palette: {
    background: '#100c09',
    text: '#e6ddd0',
    muted: '#9c8b78',
    accent: '#9e4436',
    surface: 'rgba(34, 26, 20, 0.62)',
    border: 'rgba(158, 68, 54, 0.2)',
  },
  typography: {
    titleFamily: 'var(--font-grotesque-ui), system-ui, sans-serif',
    bodyFamily: 'var(--font-serif-lecture), Georgia, serif',
    titleWeight: '600',
    titleSpacing: '-0.015em',
    bodyLineHeight: '1.95',
    labelSpacing: '0.22em',
  },
  atmosphere: {
    backgroundKind: 'none',
    particleKind: 'none',
    intensity: 'low',
  },
};
