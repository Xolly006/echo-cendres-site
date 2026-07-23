import type { PersonnageTheme } from '@/types/personnage-theme';

export const videOppressantTheme: PersonnageTheme = {
  key: 'vide-oppressant',
  palette: {
    background: '#040404',
    text: '#ddd8d2',
    muted: '#7d7973',
    accent: '#9a958e',
    surface: 'rgba(8, 8, 8, 0.44)',
    border: 'rgba(200, 194, 186, 0.08)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '400',
    titleSpacing: '0.14em',
    bodyLineHeight: '2',
    labelSpacing: '0.34em',
  },
  atmosphere: {
    backgroundKind: 'void',
    particleKind: 'dust',
    intensity: 'low',
  },
};
