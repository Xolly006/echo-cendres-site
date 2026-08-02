import type { ReactNode } from 'react';
import type { PersonnageTheme } from '@/types/personnage-theme';
import type { Faction } from '@/types/faction';

/**
 * Props reçues par toute composition de fiche faction.
 * Miroir de PersonnageCompositionProps (src/components/personnages/compositions/types.ts) :
 * une composition est un remplacement complet de la mise en page, pas une
 * variante paramétrée.
 */
export type FactionCompositionProps = {
  faction: Faction;
  atmosphere?: PersonnageTheme['atmosphere'];
  backHref?: string;
  backLabel?: string;
  narrative?: ReactNode;
  previewStatus?: Faction['publicationStatus'];
};

export type FactionCompositionComponent = (props: FactionCompositionProps) => ReactNode;
