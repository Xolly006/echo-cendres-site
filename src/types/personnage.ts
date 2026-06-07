export type Personnage = {
  slug: string;
  nom: string;
  resumeCourt: string;
  role?: string;
  tags?: string[];
  themeKey?: string;
  publicationStatus: 'draft' | 'published';
  hasNarrative: boolean;
  identity?: {
    aliases?: string[];
    nature?: string;
    origin?: string;
    status?: string;
    era?: string;
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
