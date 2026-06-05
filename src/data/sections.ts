export type SectionStatus = 'pret' | 'vide' | 'bientot';

export type HomeSection = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  status: SectionStatus;
};

export const HOME_SECTIONS: HomeSection[] = [
  {
    slug: 'personnages',
    title: 'Personnages',
    eyebrow: 'Figures, vaisseaux, anomalies',
    description: 'Le registre des êtres qui portent, fissurent ou manipulent le monde.',
    href: '/personnages',
    status: 'vide',
  },
  {
    slug: 'carte',
    title: 'Cartographie',
    eyebrow: 'Territoires, royaumes, zones mortes',
    description: 'Une future carte zoomable pour parcourir les lieux et leurs secrets.',
    href: '/carte',
    status: 'vide',
  },
  {
    slug: 'chronologie',
    title: 'Chronologie',
    eyebrow: 'Ères, chutes, renaissances',
    description: 'Les événements majeurs rangés par époque, avec leurs causes et conséquences.',
    href: '/chronologie',
    status: 'vide',
  },
  {
    slug: 'evenements',
    title: 'Événements',
    eyebrow: 'Moments qui ont brisé l’histoire',
    description: 'Chaque événement pourra devenir une page complète, sonore et thématique.',
    href: '/evenements',
    status: 'vide',
  },
  {
    slug: 'factions',
    title: 'Factions',
    eyebrow: 'Ordres, empires, cultes, conseils',
    description: 'Les forces organisées du monde, leurs membres et leurs intérêts honteusement humains.',
    href: '/factions',
    status: 'vide',
  },
  {
    slug: 'magie',
    title: 'Magie',
    eyebrow: 'Éveils, concepts, domaines',
    description: 'Le système qui permet à des convictions de casser la réalité avec panache.',
    href: '/magie',
    status: 'vide',
  },
  {
    slug: 'archives',
    title: 'Archives',
    eyebrow: 'Versions, sources, décisions',
    description: 'Le lieu où l’on mettra les anciennes versions, parce que le chaos mérite aussi des étagères.',
    href: '/archives',
    status: 'bientot',
  },
];
