import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { getAllPersonnages, getPublishedPersonnageBySlug } from '@/lib/personnages';
import { getPersonnageTheme } from '@/themes/personnages';

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

  const theme = getPersonnageTheme(personnage.themeKey);
  const themeStyle = {
    '--character-bg': theme.palette.background,
    '--character-text': theme.palette.text,
    '--character-muted': theme.palette.muted,
    '--character-accent': theme.palette.accent,
    '--character-surface': theme.palette.surface,
    '--character-border': theme.palette.border,
    '--character-title-font': theme.typography?.titleFamily,
    '--character-body-font': theme.typography?.bodyFamily,
  } as CSSProperties;

  return (
    <main className="directory-page personnage-theme-page" data-character-theme={theme.key} style={themeStyle}>
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
