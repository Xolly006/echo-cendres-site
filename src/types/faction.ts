export type FactionStatus = 'active' | 'eteinte' | 'brisee' | 'dormante';

export type MembreStatut =
  | 'en-poste' // siège occupé aujourd'hui
  | 'mort'
  | 'ecarte' // retiré vivant
  | 'disparu'
  | 'fondateur';

export type FactionMembre = {
  /** Toujours présent. Un membre existe même sans fiche. */
  nom: string;
  titre?: string;
  concept?: string;
  statut: MembreStatut;
  /** Slug d'une fiche personnage existante. Optionnel par principe. */
  personnageSlug?: string;
  /** Chaîne de succession. Références par `nom`, pas par slug. */
  remplace?: string;
  remplacePar?: string;
  /** Rang structurel libre : "Cercle Zéro", "Conseil", "Façade"… */
  rang?: string;
  notes?: string;
};

export type FactionBranche = {
  nom: string;
  role: string;
  commandePar?: string[];
};

/** Mécanique propre : la Marque, la Confiance d'Aurore, l'écusson… */
export type FactionMecanique = {
  nom: string;
  principe: string;
};

/**
 * Datation gelée le temps du chantier chronologies (docs/FACTIONS_MODELE.md
 * §2.3). Champ optionnel : aucune fiche existante ne devient invalide tant
 * qu'il n'est pas rempli.
 */
export type FactionChronologie = {
  fondation?: string; // texte, pas nombre : "Après la chute de Karn"
  dissolution?: string;
  jalons?: { quand: string; quoi: string }[];
};

export type Faction = {
  slug: string;
  nom: string;
  epithete?: string; // "Les Architectes de l'Ombre"
  ere: 'primitive' | 'age-d-or' | 'age-de-fer' | 'actuelle' | 'aube';
  statut: FactionStatus;
  resume: string; // 1 à 2 phrases, affiché à l'index
  themeKey: string; // familles existantes, résolution inchangée
  composition?: string; // repli "standard" si absent
  publicationStatus: 'draft' | 'published';

  membres: FactionMembre[];
  /** Sous-corps non implémentés en V1 mais modélisés dès maintenant. */
  branches?: FactionBranche[];
  mecanique?: FactionMecanique;
  chronologie?: FactionChronologie;

  /** Champs volontairement non consignés, cf. identity.unrecorded. */
  unrecorded?: string[];
};
