import type { PersonnageTheme } from '@/types/personnage-theme';

export const masqueVoileTheme: PersonnageTheme = {
  key: 'masque-voile',
  palette: {
    background: '#070306',
    text: '#f1edf0',
    muted: '#b9abb3',
    accent: '#8f2638',
    surface: 'rgba(31, 13, 20, 0.72)',
    border: 'rgba(215, 211, 218, 0.2)',
  },
  typography: {
    titleFamily: "'Times New Roman', Georgia, serif",
    bodyFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
