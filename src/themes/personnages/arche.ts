import type { PersonnageTheme } from '@/types/personnage-theme';

/**
 * Composition "palimpseste" — L'Ordre de l'Arquet.
 *
 * Refonte du 2026-08-13 : reproduction de la maquette de référence
 * docs/maquettes/arquet.html (Redesign_page_Arquet_magique), qui fait foi
 * textuellement — plus une interprétation libre du tableau "Ce qui
 * dérive" de docs/ARQUET_COMPOSITION.md §1. Accent OR `#c9a15f` en strate
 * I, dérive vers le gris-acier `#c8cdd4` dès la strate IV (V reprend
 * exactement l'accent de IV). `text` (couleur du corps) suit la même
 * dérive chaud → froid, valeurs reprises telles quelles de la maquette.
 * `numeralOpacity` est l'opacité du chiffre romain géant en filigrane de
 * chaque strate (aria-hidden, cf. PalimpsesteFaction.tsx).
 *
 * Contraste vérifié ≥ 4.5:1 (WCAG) pour `text` sur le fond de page
 * uniforme `#08080a` (celui de la maquette, `html`/`body`).
 */
export const archeStrates = [
  { id: 'i', accent: '#c9a15f', text: '#b4a894', numeralOpacity: 0.055 },
  { id: 'ii', accent: '#b6a184', text: '#a89c8d', numeralOpacity: 0.05 },
  { id: 'iii', accent: '#9aa0a2', text: '#9a938d', numeralOpacity: 0.05 },
  { id: 'iv', accent: '#c8cdd4', text: '#8c969b', numeralOpacity: 0.05 },
  { id: 'v', accent: '#c8cdd4', text: '#8d95a0', numeralOpacity: 0.05 },
] as const;

export const archeTheme: PersonnageTheme = {
  key: 'arche',
  palette: {
    background: '#08080a',
    text: '#efe4cf',
    muted: '#b4a894',
    accent: archeStrates[0].accent,
    surface: 'rgba(18, 16, 14, 0.58)',
    border: 'rgba(201, 161, 95, 0.18)',
  },
  typography: {
    titleFamily: "var(--font-serif-titre), 'Cormorant Garamond', Georgia, serif",
    bodyFamily: "var(--font-serif-lecture), 'Spectral', Georgia, serif",
    titleWeight: '300',
    titleSpacing: '0.005em',
    bodyLineHeight: '1.9',
    labelSpacing: '0.24em',
  },
  atmosphere: {
    backgroundKind: 'crystal',
    particleKind: 'none',
    intensity: 'low',
  },
};
