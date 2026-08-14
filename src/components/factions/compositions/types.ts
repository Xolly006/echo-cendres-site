import type { ReactNode } from 'react';
import type { PersonnageTheme } from '@/types/personnage-theme';
import type { Faction } from '@/types/faction';

/**
 * Props reçues par toute composition de fiche faction.
 * Miroir de PersonnageCompositionProps (src/components/personnages/compositions/types.ts) :
 * une composition est un remplacement complet de la mise en page, pas une
 * variante paramétrée.
 *
 * `narrative` est un `ReactNode` déjà rendu (`<NarrativeContent />`),
 * jamais le composant MDX brut : une Server Component ne peut pas passer
 * une fonction à un Client Component (`PalimpsesteFaction` est
 * `'use client'`) — seul un élément React traverse la frontière
 * serveur/client. Corrigé le 2026-08-14 : "Functions cannot be passed
 * directly to Client Components".
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
