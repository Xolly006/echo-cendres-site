import type { PersonnageTheme } from '@/types/personnage-theme';

/**
 * Composition "palimpseste" — cinq strates historiques de l'Arquet
 * (docs/ARQUET_COMPOSITION.md §1) : Les Chercheurs de l'Arché, la
 * Confrérie du Seuil, l'Ordre des Éclipsés, l'Arquet, La main. Chaque
 * strate porte son propre accent et son propre corps de texte, en CSS
 * statique — aucune interpolation animée entre elles (règle du
 * 2026-07-27).
 *
 * `archeStrates` expose accent/texte/fond, consommés par
 * `PalimpsesteFaction` (variables CSS `--strata-N-accent`/`-text`/`-bg`).
 * `text` dérive du plus chaud (I) au plus froid et net (V), contraste
 * ≥ 4.5:1 vérifié sur le fond de page uniforme `#0d0e10` (correction du
 * 2026-08-11 : la dérive de fond ne passe plus par un background-color
 * sur les blocs de texte — conteneur fermé, règle du 2026-07-29 — mais
 * par la couleur du texte lui-même). `background` reste défini pour
 * l'irréversibilité du cadre (§2, étape séparée, non commencée) : c'est
 * la seule chose encore appelée à devenir dynamique. V reprend l'accent
 * et le fond de IV (tableau "Ce qui dérive", §1) : la bascule V n'est
 * jamais dans ces deux couleurs. `archeTheme` reste un `PersonnageTheme`
 * standard, enregistré comme n'importe quel autre thème : sa palette est
 * celle de la strate I, l'état initial avant toute dérive. Le thème
 * `argent-froid` (ancienne composition "fil") est conservé tel quel : il
 * correspond à la strate IV.
 */
export const archeStrates = [
  { id: 'i', accent: '#cfc9bd', text: '#a59c8d', background: '#0d0e10' },
  { id: 'ii', accent: '#a8adb4', text: '#a0968d', background: '#0b0c0e' },
  { id: 'iii', accent: '#8f949b', text: '#9a908d', background: '#090a0c' },
  { id: 'iv', accent: '#c8cdd4', text: '#8c969b', background: '#070809' },
  { id: 'v', accent: '#c8cdd4', text: '#8d95a0', background: '#070809' },
] as const;

export const archeTheme: PersonnageTheme = {
  key: 'arche',
  palette: {
    background: archeStrates[0].background,
    text: '#dfe2e6',
    muted: '#8a9099',
    accent: archeStrates[0].accent,
    surface: 'rgba(18, 20, 24, 0.58)',
    border: 'rgba(200, 205, 212, 0.14)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), Georgia, serif",
    titleWeight: '600',
    titleSpacing: '0.03em',
    bodyLineHeight: '1.9',
    labelSpacing: '0.18em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
