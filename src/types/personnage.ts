export type Personnage = {
  slug: string;
  nom: string;
  resumeCourt: string;
  role?: string;
  tags?: string[];
  themeKey?: string;
  composition?: string;
  /**
   * Ce que la fiche ne sait pas : lacunes des sources, contradictions non
   * tranchées, points à valider par le créateur. Ce ne sont pas des
   * éléments de lore, ce sont des constats sur l'état des sources.
   * Seules les compositions qui savent quoi en faire les affichent.
   */
  uncertainties?: string[];
  /**
   * Possession par une entité dont l'hôte n'est pas le propriétaire.
   *
   * `sync` est un paramètre de DIRECTION ARTISTIQUE, pas seulement une
   * donnée de lore : c'est lui qui détermine quelle part de la page
   * appartient encore à l'hôte. Elias tient 50. Solomon tenait 80.
   * Célestine était à 100 — sa fiche n'aura donc rien à négocier.
   */
  possession?: {
    entity: string;
    entitySlug?: string;
    sync: number;
    /** Verdicts substitués aux libellés quand l'entité tient la page. */
    verdicts?: Record<string, string>;
  };
  publicationStatus: 'draft' | 'published';
  hasNarrative: boolean;
  identity?: {
    aliases?: string[];
    nature?: string;
    origin?: string;
    status?: string;
    era?: string;
    appearance?: string;
    /** Champs volontairement non consignés, affichés vides par certaines compositions. */
    unrecorded?: string[];
  };
  magic?: {
    concept?: string;
    domain?: string;
    artifact?: string;
    anchor?: string;
    abilities?: string[];
    limits?: string[];
  };
  links?: {
    characters?: string[];
    factions?: string[];
    events?: string[];
    places?: string[];
    artifacts?: string[];
    concepts?: string[];
  };
};
