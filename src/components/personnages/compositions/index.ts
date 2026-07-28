import { StandardImmersivePersonnage } from '@/components/personnages/StandardImmersivePersonnage';
import { FragmentPersonnage } from './fragment/FragmentPersonnage';
import { RetablePersonnage } from './retable/RetablePersonnage';
import { CagePersonnage } from './cage/CagePersonnage';
import { CanopeePersonnage } from './canopee/CanopeePersonnage';
import type { PersonnageCompositionComponent } from './types';

/**
 * Registre des compositions de fiche personnage.
 *
 * Un thème porte la PALETTE et l'ATMOSPHÈRE.
 * Une composition porte la MISE EN PAGE et le COMPORTEMENT.
 * Ce sont deux axes séparés (docs/DECISIONS.md, Phase 2, 2026-07-23).
 *
 * Une composition inconnue ou absente retombe sur "standard", qui est
 * exactement le rendu historique de toutes les fiches.
 */

const COMPOSITIONS: Record<string, PersonnageCompositionComponent> = {
  standard: StandardImmersivePersonnage,
  fragment: FragmentPersonnage,
  retable: RetablePersonnage,
  cage: CagePersonnage,
  canopee: CanopeePersonnage,
};

export const DEFAULT_COMPOSITION_KEY = 'standard';

export function getPersonnageComposition(key?: string): PersonnageCompositionComponent {
  if (key && key in COMPOSITIONS) {
    return COMPOSITIONS[key];
  }

  return COMPOSITIONS[DEFAULT_COMPOSITION_KEY];
}

export function getPersonnageCompositionKey(key?: string): string {
  return key && key in COMPOSITIONS ? key : DEFAULT_COMPOSITION_KEY;
}

export type { PersonnageCompositionProps, PersonnageCompositionComponent } from './types';
