import { FilFaction } from './fil/FilFaction';
import type { FactionCompositionComponent } from './types';

/**
 * Registre des compositions de fiche faction.
 *
 * Un thème porte la PALETTE et l'ATMOSPHÈRE.
 * Une composition porte la MISE EN PAGE et le COMPORTEMENT.
 * Ce sont deux axes séparés (docs/DECISIONS.md, Phase 2, 2026-07-23).
 *
 * Une composition inconnue ou absente retombe sur "standard" : la mise en
 * page existante de /factions/[slug] et /factions/preview/[slug], gérée
 * directement par la page tant qu'aucune composition dédiée n'est
 * enregistrée ici. Contrairement au registre personnages, "standard" n'a
 * volontairement pas de composant propre : `getFactionComposition` renvoie
 * `null` dans ce cas, et la page garde son rendu existant inchangé.
 */

const COMPOSITIONS: Record<string, FactionCompositionComponent> = {
  fil: FilFaction,
};

export const DEFAULT_COMPOSITION_KEY = 'standard';

export function getFactionComposition(key?: string): FactionCompositionComponent | null {
  if (key && key in COMPOSITIONS) {
    return COMPOSITIONS[key];
  }

  return null;
}

export function getFactionCompositionKey(key?: string): string {
  return key && key in COMPOSITIONS ? key : DEFAULT_COMPOSITION_KEY;
}

export type { FactionCompositionProps, FactionCompositionComponent } from './types';
