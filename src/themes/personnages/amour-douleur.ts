import type { PersonnageTheme } from '@/types/personnage-theme';

export const amourDouleurTheme: PersonnageTheme = {
  key: 'amour-douleur',
  palette: {
    background: '#140d0b',
    text: '#f0e2d6',
    muted: '#a8817f',
    accent: '#c47a52',
    surface: 'rgba(36, 22, 18, 0.6)',
    border: 'rgba(196, 122, 82, 0.2)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '400',
    titleSpacing: '0.022em',
    bodyLineHeight: '2.1',
    labelSpacing: '0.18em',
  },
  atmosphere: {
    backgroundKind: 'tender',
    particleKind: 'none',
    intensity: 'low',
  },
};
