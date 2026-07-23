import type { PersonnageTheme } from '@/types/personnage-theme';

export const amourDouleurTheme: PersonnageTheme = {
  key: 'amour-douleur',
  palette: {
    background: '#120b0b',
    text: '#f1dfcc',
    muted: '#c1a99a',
    accent: '#b77782',
    surface: 'rgba(39, 22, 24, 0.66)',
    border: 'rgba(205, 157, 139, 0.18)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.022em',
    bodyLineHeight: '1.88',
    labelSpacing: '0.18em',
  },
  atmosphere: {
    backgroundKind: 'tender',
    particleKind: 'none',
    intensity: 'low',
  },
};
