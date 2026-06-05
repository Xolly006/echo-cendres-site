import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPersonnages, getPublishedPersonnageBySlug } from '@/lib/personnages';

type PersonnagePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const personnages = await getAllPersonnages();

  return personnages.map((personnage) => ({
    slug: personnage.slug,
  }));
}

export default async function Page({ params }: PersonnagePageProps) {
  const { slug } = await params;
  const personnage = await getPublishedPersonnageBySlug(slug);

  if (!personnage) {
    notFound();
  }

  return (
    <main className="directory-page">
      <article className="personnage-detail" aria-labelledby="personnage-title">
        <p className="eyebrow">{personnage.role ?? 'Personnage'}</p>
        <h1 id="personnage-title">{personnage.nom}</h1>
        <p>{personnage.resumeCourt}</p>

        {personnage.tags && personnage.tags.length > 0 ? (
          <ul className="tag-list" aria-label="Tags du personnage">
            {personnage.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <Link className="ghost-link" href="/personnages">Retour aux personnages</Link>
      </article>
    </main>
  );
}
