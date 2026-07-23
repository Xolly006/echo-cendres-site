import type { PersonnageTheme } from '@/types/personnage-theme';

export const vieSauvageTheme: PersonnageTheme = {
  key: 'vie-sauvage',
  palette: {
    background: '#04100b',
    text: '#edf1df',
    muted: '#a7b799',
    accent: '#c2a85d',
    surface: 'rgba(9, 26, 18, 0.62)',
    border: 'rgba(190, 176, 105, 0.17)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.025em',
    bodyLineHeight: '1.86',
    labelSpacing: '0.2em',
  },
  atmosphere: {
    backgroundKind: 'mist',
    particleKind: 'none',
    intensity: 'low',
  },
};
