import type { PersonnageTheme } from '@/types/personnage-theme';

export const orMauditTheme: PersonnageTheme = {
  key: 'or-maudit',
  palette: {
    background: '#0c0906',
    text: '#ece5d6',
    muted: '#9d9891',
    accent: '#c9a227',
    surface: 'rgba(24, 19, 12, 0.6)',
    border: 'rgba(200, 204, 208, 0.16)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '400',
    titleSpacing: '0.14em',
    bodyLineHeight: '1.86',
    labelSpacing: '0.24em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
