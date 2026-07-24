import type { ReactNode } from 'react';
import type { PersonnageTheme } from '@/types/personnage-theme';
import type { Personnage } from '@/types/personnage';

/**
 * Props reçues par toute composition de fiche personnage.
 * Identiques à celles de l'ancien StandardImmersivePersonnage : une
 * composition est un remplacement complet de la mise en page, pas une
 * variante paramétrée.
 */
export type PersonnageCompositionProps = {
  personnage: Personnage;
  atmosphere?: PersonnageTheme['atmosphere'];
  backHref?: string;
  backLabel?: string;
  narrative?: ReactNode;
  previewStatus?: Personnage['publicationStatus'];
  /**
   * En cas de possession : la fiche complète de l'entité et son récit,
   * pour que la page de l'entité puisse s'imposer À 100 % — la vraie,
   * pas une recoloration de celle de l'hôte.
   */
  entityPersonnage?: Personnage;
  entityNarrative?: ReactNode;
};

export type PersonnageCompositionComponent = (props: PersonnageCompositionProps) => ReactNode;

export type PersonnageCompositionKey = 'standard' | 'fragment';
