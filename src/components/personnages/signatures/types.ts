import type { ComponentType, ReactNode } from 'react';

/**
 * Signature visuelle propre à un personnage majeur.
 *
 * Système volontairement séparé de PersonnageAtmosphere et PersonnageParticles,
 * conformément aux règles du projet (docs/SIGNATURES_VISUELLES_PERSONNAGES.md).
 *
 * Une signature est résolue par slug dans un registre local. Elle n'ajoute
 * aucun champ aux data.json des personnages. Un personnage sans signature
 * garde exactement le rendu standard.
 */
export type PersonnageSignature = {
  /** Slug du personnage concerné (clé du registre). */
  slug: string;
  /**
   * Habillage optionnel du contenu du titre (h1).
   * Reçoit le nom du personnage en children et doit le restituer lisiblement.
   */
  Title?: ComponentType<{ children: ReactNode }>;
  /**
   * Couche ambiante optionnelle, décorative et non interactive.
   * Rendue en aria-hidden au-dessus de l'atmosphère standard.
   */
  Overlay?: ComponentType;
};
