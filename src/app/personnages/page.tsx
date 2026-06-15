import Link from 'next/link';
import { getAllPersonnages } from '@/lib/personnages';
import type { Personnage } from '@/types/personnage';

type PersonnageCategory = 'tous' | 'arquet' | 'piliers' | 'electrons-libres';

type PageProps = {
  searchParams?: Promise<{
    categorie?: string | string[];
  }>;
};

const personnageCategories: Array<{
  key: PersonnageCategory;
  label: string;
  href: string;
}> = [
  { key: 'tous', label: 'Tous', href: '/personnages' },
  { key: 'arquet', label: 'Arquet', href: '/personnages?categorie=arquet' },
  { key: 'piliers', label: 'Piliers', href: '/personnages?categorie=piliers' },
  { key: 'electrons-libres', label: 'Électrons libres', href: '/personnages?categorie=electrons-libres' },
];

function normalizeCategory(value: string | string[] | undefined): PersonnageCategory {
  const category = Array.isArray(value) ? value[0] : value;

  if (category === 'arquet' || category === 'piliers' || category === 'electrons-libres') {
    return category;
  }

  return 'tous';
}

function hasTagLike(personnage: Personnage, matcher: (tag: string) => boolean): boolean {
  return personnage.tags?.some((tag) => matcher(tag.toLowerCase())) ?? false;
}

function matchesCategory(personnage: Personnage, category: PersonnageCategory): boolean {
  if (category === 'tous') return true;
  if (category === 'arquet') return hasTagLike(personnage, (tag) => tag.includes('arquet'));
  if (category === 'piliers') return hasTagLike(personnage, (tag) => tag.includes('pilier'));

  return hasTagLike(personnage, (tag) => tag === 'electron-libre' || tag === 'anomalie');
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = normalizeCategory(params?.categorie);
  const personnages = await getAllPersonnages();
  const filteredPersonnages = personnages.filter((personnage) => matchesCategory(personnage, activeCategory));
  const activeLabel = personnageCategories.find((category) => category.key === activeCategory)?.label ?? 'Tous';

  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="personnages-title">
        <p className="eyebrow">Registre préparé</p>
        <h1 id="personnages-title">Personnages</h1>
        <p>
          Les fiches personnages seront ajoutées progressivement depuis une source de données unique, sans créer une page à la main pour chaque entrée.
        </p>

        <nav className="personnage-filters" aria-label="Filtrer les personnages">
          {personnageCategories.map((category) => {
            const isActive = category.key === activeCategory;

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className="personnage-filter"
                data-active={isActive}
                href={category.href}
                key={category.key}
              >
                {category.label}
              </Link>
            );
          })}
        </nav>

        {personnages.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune fiche personnage publiée pour le moment.</strong>
            <span>
              Les archives personnages sont en cours de stabilisation. Les fiches en brouillon restent invisibles tant
              qu’elles ne sont pas validées pour publication.
            </span>
          </div>
        ) : filteredPersonnages.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune fiche publiée dans la catégorie “{activeLabel}”.</strong>
            <span>Les personnages en brouillon restent masqués tant qu’ils ne sont pas explicitement publiés.</span>
            {activeCategory !== 'tous' ? (
              <Link className="empty-state__action" href="/personnages">
                Revenir à Tous
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="personnage-grid" aria-label="Liste des personnages">
            {filteredPersonnages.map((personnage) => (
              <Link className="personnage-card" href={`/personnages/${personnage.slug}`} key={personnage.slug}>
                <p className="section-card__eyebrow">{personnage.role ?? 'Personnage'}</p>
                <h2>{personnage.nom}</h2>
                <p>{personnage.resumeCourt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
