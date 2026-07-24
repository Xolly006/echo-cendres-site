import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { PersonnageNarrative } from '@/components/personnages/PersonnageNarrative';
import { getPersonnageComposition, getPersonnageCompositionKey } from '@/components/personnages/compositions';
import { loadPersonnageNarrative } from '@/content/personnages/narrative-registry';
import { getAllPersonnages, getPublishedPersonnageBySlug, validatePersonnageNarrativeSource } from '@/lib/personnages';
import { getPersonnageTheme } from '@/themes/personnages';

type PersonnagePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

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
  const NarrativeContent = personnage.hasNarrative && (await validatePersonnageNarrativeSource(personnage.slug))
    ? await loadPersonnageNarrative(personnage.slug)
    : null;
  // Possession : on charge la fiche et le récit de l'entité pour que sa
  // page puisse s'imposer à 100 % de synchronisation.
  const entitySlug = personnage.possession?.entitySlug;
  const entityPersonnage = entitySlug ? await getPublishedPersonnageBySlug(entitySlug) : null;
  const EntityNarrative =
    entityPersonnage?.hasNarrative && (await validatePersonnageNarrativeSource(entityPersonnage.slug))
      ? await loadPersonnageNarrative(entityPersonnage.slug)
      : null;
  const Composition = getPersonnageComposition(personnage.composition);
  const compositionKey = getPersonnageCompositionKey(personnage.composition);
  const themeStyle = {
    '--character-bg': theme.palette.background,
    '--character-text': theme.palette.text,
    '--character-muted': theme.palette.muted,
    '--character-accent': theme.palette.accent,
    '--character-surface': theme.palette.surface,
    '--character-border': theme.palette.border,
    '--character-title-font': theme.typography?.titleFamily,
    '--character-body-font': theme.typography?.bodyFamily,
    '--character-title-weight': theme.typography?.titleWeight,
    '--character-title-spacing': theme.typography?.titleSpacing,
    '--character-body-line-height': theme.typography?.bodyLineHeight,
    '--character-label-spacing': theme.typography?.labelSpacing,
  } as CSSProperties;

  return (
    <main className="directory-page personnage-theme-page" data-character-theme={theme.key}
      data-character-composition={compositionKey} style={themeStyle}>
      <Composition
        atmosphere={theme.atmosphere}
        personnage={personnage}
        narrative={NarrativeContent ? <PersonnageNarrative Content={NarrativeContent} /> : null}
        entityPersonnage={entityPersonnage ?? undefined}
        entityNarrative={EntityNarrative ? <PersonnageNarrative Content={EntityNarrative} /> : undefined}
      />
    </main>
  );
}
