import type { PersonnageTheme } from '@/types/personnage-theme';

export const videOppressantTheme: PersonnageTheme = {
  key: 'vide-oppressant',
  palette: {
    background: '#030407',
    text: '#dce1e5',
    muted: '#7e8790',
    accent: '#6f7784',
    surface: 'rgba(7, 10, 14, 0.48)',
    border: 'rgba(174, 188, 202, 0.1)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '400',
    titleSpacing: '0.08em',
    bodyLineHeight: '2',
    labelSpacing: '0.34em',
  },
  atmosphere: {
    backgroundKind: 'void',
    particleKind: 'dust',
    intensity: 'low',
  },
};
