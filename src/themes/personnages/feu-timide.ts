import type { PersonnageTheme } from '@/types/personnage-theme';

export const feuTimideTheme: PersonnageTheme = {
  key: 'feu-timide',
  palette: {
    background: '#090605',
    text: '#f4e6d3',
    muted: '#c4aa91',
    accent: '#c9793f',
    surface: 'rgba(35, 20, 15, 0.68)',
    border: 'rgba(222, 144, 82, 0.2)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.018em',
    bodyLineHeight: '1.82',
    labelSpacing: '0.16em',
  },
  atmosphere: {
    backgroundKind: 'embers',
    particleKind: 'embers',
    intensity: 'low',
  },
};
