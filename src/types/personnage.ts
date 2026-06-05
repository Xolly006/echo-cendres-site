export type Personnage = {
  slug: string;
  nom: string;
  resumeCourt: string;
  role?: string;
  tags?: string[];
  themeKey?: string;
  publicationStatus: 'draft' | 'published';
};
