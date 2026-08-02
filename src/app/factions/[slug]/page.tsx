import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { getFactionComposition, getFactionCompositionKey } from '@/components/factions/compositions';
import { loadFactionNarrative } from '@/content/factions/narrative-registry';
import { getAllFactions, getPublishedFactionBySlug, validateFactionNarrativeSource } from '@/lib/factions';
import { getPublishedPersonnageBySlug } from '@/lib/personnages';
import { getPersonnageTheme } from '@/themes/personnages';

// Rendu "standard" volontairement minimal : pas de direction artistique,
// pas d'animation (docs/FACTIONS_MODELE.md §5). Une composition dédiée
// (ex. "fil") remplace entièrement ce rendu quand elle est enregistrée
// dans src/components/factions/compositions ; en son absence, la page
// garde ce rendu "laide qui fonctionne" inchangé (repli "standard").

type FactionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const factions = await getAllFactions();

  return factions.map((faction) => ({
    slug: faction.slug,
  }));
}

export default async function Page({ params }: FactionPageProps) {
  const { slug } = await params;
  const faction = await getPublishedFactionBySlug(slug);

  if (!faction) {
    notFound();
  }

  const NarrativeContent = (await validateFactionNarrativeSource(faction.slug))
    ? await loadFactionNarrative(faction.slug)
    : null;

  // Protection draft : le membre reste affiché, seul le lien disparaît si
  // sa fiche personnage n'est pas publiée (docs/FACTIONS_MODELE.md §4).
  const membresAffiches = await Promise.all(
    faction.membres.map(async (membre) => {
      const personnage = membre.personnageSlug ? await getPublishedPersonnageBySlug(membre.personnageSlug) : null;

      return { membre, href: personnage ? `/personnages/${personnage.slug}` : null };
    }),
  );

  const Composition = getFactionComposition(faction.composition);
  const compositionKey = getFactionCompositionKey(faction.composition);

  if (Composition) {
    const theme = getPersonnageTheme(faction.themeKey);
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
      <main
        className="directory-page personnage-theme-page"
        data-character-theme={theme.key}
        data-faction-composition={compositionKey}
        style={themeStyle}
      >
        <Composition
          faction={faction}
          atmosphere={theme.atmosphere}
          backHref="/factions"
          backLabel="Retour aux factions"
          narrative={NarrativeContent ? <NarrativeContent /> : null}
        />
      </main>
    );
  }

  return (
    <main className="directory-page" data-faction-composition={compositionKey}>
      <section className="directory-panel" aria-labelledby="faction-title">
        <p className="eyebrow">
          {faction.statut} — {faction.ere}
        </p>
        <h1 id="faction-title">{faction.nom}</h1>
        {faction.epithete ? <p>{faction.epithete}</p> : null}
        <p>{faction.resume}</p>

        <h2>Membres</h2>
        <ul>
          {membresAffiches.map(({ membre, href }) => (
            <li key={membre.nom}>
              {href ? <Link href={href}>{membre.nom}</Link> : membre.nom}
              {membre.titre ? ` — ${membre.titre}` : ''}
              {membre.concept ? ` (${membre.concept})` : ''}
              {` [${membre.statut}]`}
              {membre.rang ? ` {${membre.rang}}` : ''}
              {membre.remplace ? ` — remplace ${membre.remplace}` : ''}
              {membre.remplacePar ? ` — remplacé par ${membre.remplacePar}` : ''}
              {membre.notes ? (
                <>
                  <br />
                  {membre.notes}
                </>
              ) : null}
            </li>
          ))}
        </ul>

        {faction.mecanique ? (
          <>
            <h2>{faction.mecanique.nom}</h2>
            <p>{faction.mecanique.principe}</p>
          </>
        ) : null}

        {faction.branches && faction.branches.length > 0 ? (
          <>
            <h2>Branches</h2>
            <ul>
              {faction.branches.map((branche) => (
                <li key={branche.nom}>
                  <strong>{branche.nom}</strong> — {branche.role}
                  {branche.commandePar ? ` (commandée par ${branche.commandePar.join(', ')})` : ''}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {NarrativeContent ? (
          <>
            <h2>Récit</h2>
            <NarrativeContent />
          </>
        ) : null}

        <p>
          <Link className="empty-state__action" href="/factions">
            Retour aux factions
          </Link>
        </p>
      </section>
    </main>
  );
}
