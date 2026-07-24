import type { PersonnageTheme } from '@/types/personnage-theme';

/**
 * La Cage Dorée.
 *
 * Le Domaine Absolu de Métatron porte le nom du rituel qui l'a emprisonné :
 * Elian l'a piégé dans la Cage Dorée il y a 1 500 ans, et sa puissance
 * absolue consiste depuis à enfermer les autres dans la même chose.
 *
 * "L'espace se transforme en une architecture parfaite de lumière —
 *  colonnes, arches, géométries sacrées à l'infini."
 *
 * Donc : pas de noir. C'est le seul thème lumineux du Livre-Monde, et c'est
 * volontaire — la lumière de Métatron ne se retire pas. Or froid, ivoire,
 * ombres inexistantes. Tout ce qui est chaud, patiné ou bas appartient à
 * ses hôtes humains, jamais à lui.
 */
export const cageDoreeTheme: PersonnageTheme = {
  key: 'cage-doree',
  palette: {
    background: '#f7efdc',
    text: '#241d10',
    muted: '#6d5c33',
    accent: '#b08616',
    surface: 'rgba(255, 252, 244, 0.72)',
    border: 'rgba(140, 112, 38, 0.28)',
  },
  typography: {
    titleFamily: 'var(--font-grotesque-ui), system-ui, sans-serif',
    bodyFamily: 'var(--font-serif-lecture), Georgia, serif',
    titleWeight: '500',
    titleSpacing: '0.02em',
    bodyLineHeight: '1.85',
    labelSpacing: '0.3em',
  },
  atmosphere: {
    backgroundKind: 'none',
    particleKind: 'none',
    intensity: 'low',
  },
};
