import type { PersonnageSignature } from './types';
import { kaelEclipseSignature } from './kael-eclipse/KaelSignature';

/**
 * Registre des signatures visuelles propres aux personnages majeurs.
 *
 * Règles (docs/SIGNATURES_VISUELLES_PERSONNAGES.md et docs/DECISIONS.md) :
 * - une signature est réservée aux personnages vitrines ou majeurs ;
 * - elle vient par-dessus une famille de thème stable, sans la remplacer ;
 * - elle est résolue par slug, sans nouveau champ dans les data.json ;
 * - un slug absent du registre garde le rendu standard, sans avertissement ;
 * - chaque signature doit rester lisible et respecter prefers-reduced-motion.
 */
const personnageSignatures: Record<string, PersonnageSignature> = {
  [kaelEclipseSignature.slug]: kaelEclipseSignature,
};

export function getPersonnageSignature(slug: string): PersonnageSignature | null {
  return personnageSignatures[slug] ?? null;
}

export type { PersonnageSignature } from './types';
