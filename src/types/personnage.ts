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
};
