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
    eyebrow: 'Figures, rôles, appartenances',
    description: 'Le registre des personnages : identité, rôle et catégorie.',
    href: '/personnages',
    status: 'vide',
  },
  {
    slug: 'carte',
    title: 'Cartographie',
    eyebrow: 'Territoires, royaumes, zones mortes',
    description: 'Une carte à venir pour situer les lieux du monde.',
    href: '/carte',
    status: 'vide',
  },
  {
    slug: 'chronologie',
    title: 'Chronologie',
    eyebrow: 'Ères, chutes, renaissances',
    description: 'Les événements majeurs classés par époque, avec dates et repères.',
    href: '/chronologie',
    status: 'vide',
  },
  {
    slug: 'evenements',
    title: 'Événements',
    eyebrow: 'Dates, causes, conséquences',
    description: 'Une page par événement majeur, avec ses causes et ses conséquences.',
    href: '/evenements',
    status: 'vide',
  },
  {
    slug: 'factions',
    title: 'Factions',
    eyebrow: 'Ordres, empires, cultes, conseils',
    description: 'Les forces organisées du monde, leurs membres et leurs objectifs.',
    href: '/factions',
    status: 'vide',
  },
  {
    slug: 'magie',
    title: 'Magie',
    eyebrow: 'Éveils, concepts, domaines',
    description: 'Le système magique : concepts, domaines et manifestations.',
    href: '/magie',
    status: 'vide',
  },
  {
    slug: 'archives',
    title: 'Archives',
    eyebrow: 'Versions, sources, décisions',
    description: 'Les anciennes versions, sources et décisions conservées pour référence.',
    href: '/archives',
    status: 'bientot',
  },
];
