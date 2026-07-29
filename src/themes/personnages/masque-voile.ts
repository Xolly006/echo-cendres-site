import type { PersonnageTheme } from '@/types/personnage-theme';

export const masqueVoileTheme: PersonnageTheme = {
  key: 'masque-voile',
  palette: {
    background: '#150a0e',
    text: '#e8e3dc',
    muted: '#a08e88',
    accent: '#b8935a',
    surface: 'rgba(42, 13, 20, 0.58)',
    border: 'rgba(184, 147, 90, 0.22)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '400',
    titleSpacing: '0.095em',
    bodyLineHeight: '1.92',
    labelSpacing: '0.3em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
