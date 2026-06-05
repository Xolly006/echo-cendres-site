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
    titleFamily: "Georgia, 'Times New Roman', serif",
    bodyFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  atmosphere: {
    backgroundKind: 'embers',
    particleKind: 'embers',
    intensity: 'low',
  },
};
