import type { Personnage } from '@/types/personnage';

/**
 * Préparation des données affichables d'une fiche personnage.
 *
 * Cette fonction est volontairement séparée des compositions : chaque
 * composition décide COMMENT afficher ces éléments (ou lesquels taire),
 * mais aucune ne redéfinit QUOI lire dans le modèle de données.
 */

export type PersonnageDetail = {
  key: string;
  label: string;
  value?: string;
  values?: string[];
};

const IDENTITY_LABELS = {
  aliases: 'Alias',
  nature: 'Nature',
  origin: 'Origine',
  status: 'Statut',
  era: 'Époque',
  appearance: 'Apparence',
} as const;

const MAGIC_LABELS = {
  concept: 'Concept',
  domain: 'Domaine',
  artifact: 'Artefact',
  anchor: 'Ancre',
  abilities: 'Capacités',
  limits: 'Limites',
} as const;

export function getIdentityDetails(personnage: Personnage): PersonnageDetail[] {
  const identity = personnage.identity;
  if (!identity) return [];

  const details: PersonnageDetail[] = [];

  if (identity.aliases && identity.aliases.length > 0) {
    details.push({ key: 'aliases', label: IDENTITY_LABELS.aliases, value: identity.aliases.join(', ') });
  }
  if (identity.nature) details.push({ key: 'nature', label: IDENTITY_LABELS.nature, value: identity.nature });
  if (identity.origin) details.push({ key: 'origin', label: IDENTITY_LABELS.origin, value: identity.origin });
  if (identity.status) details.push({ key: 'status', label: IDENTITY_LABELS.status, value: identity.status });
  if (identity.era) details.push({ key: 'era', label: IDENTITY_LABELS.era, value: identity.era });
  if (identity.appearance)
    details.push({ key: 'appearance', label: IDENTITY_LABELS.appearance, value: identity.appearance });

  return details;
}

export function getMagicDetails(personnage: Personnage): PersonnageDetail[] {
  const magic = personnage.magic;
  if (!magic) return [];

  const details: PersonnageDetail[] = [];

  if (magic.concept) details.push({ key: 'concept', label: MAGIC_LABELS.concept, value: magic.concept });
  if (magic.domain) details.push({ key: 'domain', label: MAGIC_LABELS.domain, value: magic.domain });
  if (magic.artifact) details.push({ key: 'artifact', label: MAGIC_LABELS.artifact, value: magic.artifact });
  if (magic.anchor) details.push({ key: 'anchor', label: MAGIC_LABELS.anchor, value: magic.anchor });
  if (magic.abilities && magic.abilities.length > 0) {
    details.push({ key: 'abilities', label: MAGIC_LABELS.abilities, values: magic.abilities });
  }
  if (magic.limits && magic.limits.length > 0) {
    details.push({ key: 'limits', label: MAGIC_LABELS.limits, values: magic.limits });
  }

  return details;
}

/**
 * Champs d'identité déclarés comme non consignés.
 * Ils existent dans la fiche, mais sans valeur : c'est l'absence qui est
 * l'information. Seules les compositions qui savent quoi en faire les
 * affichent — "standard" les ignore.
 */
export function getUnrecordedDetails(personnage: Personnage): PersonnageDetail[] {
  const unrecorded = personnage.identity?.unrecorded;
  if (!unrecorded || unrecorded.length === 0) return [];

  return unrecorded.map((label) => ({ key: `unrecorded-${label}`, label }));
}
