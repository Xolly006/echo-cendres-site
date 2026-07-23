import type { PersonnageTheme } from '@/types/personnage-theme';

export const orMauditTheme: PersonnageTheme = {
  key: 'or-maudit',
  palette: {
    background: '#090806',
    text: '#efe6d2',
    muted: '#b8aa91',
    accent: '#b99a4c',
    surface: 'rgba(28, 23, 18, 0.7)',
    border: 'rgba(201, 176, 116, 0.2)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.055em',
    bodyLineHeight: '1.86',
    labelSpacing: '0.24em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
