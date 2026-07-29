export type PersonnageImage = {
  src: string;
  alt: string;
  /** object-position CSS, par défaut "center". */
  ancrage?: string;
};

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
   * Images de fond de la fiche. Optionnelles : une fiche sans image
   * s'affiche exactement comme avant.
   *
   * `fond` est l'image d'accueil, `fondSecondaire` celle vers laquelle la
   * page bascule au fil du défilement. Deux images permettent à une page
   * de raconter un trajet — chez Varros, le champ de blé de l'homme
   * qu'il était cède au cratère de ce qu'il est devenu.
   */
  /**
   * Formulations alternatives de certains champs.
   *
   * Une fiche qui déclare des illusions change discrètement la
   * FORMULATION de ces champs quand le lecteur ne les regarde pas. Le
   * fait énoncé reste rigoureusement le même : seuls les mots bougent.
   * Le lecteur finit par douter de sa mémoire, jamais de la vérité de la
   * fiche.
   *
   * Réservé aux personnages dont le mensonge est le concept — chez Soryn,
   * "le doute comme arme".
   */
  illusions?: Record<string, string[]>;
  images?: {
    fond?: PersonnageImage;
    fondSecondaire?: PersonnageImage;
  };
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
