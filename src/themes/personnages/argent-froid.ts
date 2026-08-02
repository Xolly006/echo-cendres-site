import type { PersonnageTheme } from '@/types/personnage-theme';

// L'Arquet est la seule entité du site sans teinte propre : gris métal,
// parce qu'il ne possède rien en propre — il porte ce qu'il prend aux
// autres (docs/ARQUET_COMPOSITION.md §2). Clarté cérémonielle qui ne
// révèle rien, pas de l'obscurité : aucun portrait, aucune illustration
// de personne sur ce thème.
export const argentFroidTheme: PersonnageTheme = {
  key: 'argent-froid',
  palette: {
    background: '#0b0c0e',
    text: '#dfe2e6',
    muted: '#8a9099',
    accent: '#c8cdd4',
    surface: 'rgba(18, 20, 24, 0.58)',
    border: 'rgba(200, 205, 212, 0.14)',
  },
  typography: {
    titleFamily: "var(--font-grotesque-ui), system-ui, sans-serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.16em',
    bodyLineHeight: '1.85',
    labelSpacing: '0.28em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
