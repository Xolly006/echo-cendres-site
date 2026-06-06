import type { PersonnageTheme } from '@/types/personnage-theme';

export const defaultPersonnageTheme: PersonnageTheme = {
  key: 'default',
  palette: {
    background: '#07070b',
    text: '#f0e8dc',
    muted: '#b5aa9d',
    accent: '#d8a85f',
    surface: 'rgba(20, 18, 25, 0.76)',
    border: 'rgba(238, 218, 185, 0.16)',
  },
  typography: {
    titleFamily: "Georgia, 'Times New Roman', serif",
    bodyFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    titleWeight: '500',
    titleSpacing: '0.03em',
    bodyLineHeight: '1.8',
    labelSpacing: '0.22em',
  },
  atmosphere: {
    backgroundKind: 'none',
    particleKind: 'none',
    intensity: 'low',
  },
};
