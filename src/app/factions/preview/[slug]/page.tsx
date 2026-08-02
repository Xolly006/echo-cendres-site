import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { getFactionComposition, getFactionCompositionKey } from '@/components/factions/compositions';
import { loadFactionNarrative } from '@/content/factions/narrative-registry';
import { getFactionForPreviewBySlug, validateFactionNarrativeSource } from '@/lib/factions';
import { getPersonnageTheme } from '@/themes/personnages';

// Rendu "standard" volontairement minimal, en miroir de
// /factions/[slug]/page.tsx : pas de DA, pas d'animation
// (docs/FACTIONS_MODELE.md §5). Même résolution de composition que la
// page publique (repli "standard" si absente ou inconnue).
//
// Différence avec la page publique : ici, les liens vers les membres
// sont TOUJOURS actifs et pointent vers /personnages/preview/<slug>,
// quel que soit le statut de publication du personnage.

type FactionPreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isPreviewAvailable = process.env.NODE_ENV !== 'production';

export default async function Page({ params }: FactionPreviewPageProps) {
  if (!isPreviewAvailable) {
    return (
      <main className="directory-page">
        <section className="directory-panel" aria-labelledby="preview-title">
          <p className="eyebrow">Preview interne</p>
          <h1 id="preview-title">Prévisualisation indisponible</h1>
          <div className="empty-state">
            <strong>Le mode preview est désactivé en production.</strong>
            <span>Les fiches en brouillon restent invisibles publiquement.</span>
            <Link className="empty-state__action" href="/factions">
              Revenir aux factions
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const { slug } = await params;
  const faction = await getFactionForPreviewBySlug(slug);

  if (!faction) {
    notFound();
  }

  const NarrativeContent = (await validateFactionNarrativeSource(faction.slug))
    ? await loadFactionNarrative(faction.slug)
    : null;

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
          backHref="/factions/preview"
          backLabel="Retour au preview"
          narrative={NarrativeContent ? <NarrativeContent /> : null}
          previewStatus={faction.publicationStatus}
        />
      </main>
    );
  }

  return (
    <main className="directory-page" data-faction-composition={compositionKey}>
      <section className="directory-panel" aria-labelledby="faction-title">
        <div className="preview-banner preview-banner--floating" role="note">
          Preview locale : <strong>{faction.publicationStatus}</strong>. Cette route n’est pas disponible en
          production. <Link href="/factions/preview">Retour au preview</Link>
        </div>

        <p className="eyebrow">
          {faction.statut} — {faction.ere}
        </p>
        <h1 id="faction-title">{faction.nom}</h1>
        {faction.epithete ? <p>{faction.epithete}</p> : null}
        <p>{faction.resume}</p>

        <h2>Membres</h2>
        <ul>
          {faction.membres.map((membre) => (
            <li key={membre.nom}>
              {membre.personnageSlug ? (
                <Link href={`/personnages/preview/${membre.personnageSlug}`}>{membre.nom}</Link>
              ) : (
                membre.nom
              )}
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
          <Link className="empty-state__action" href="/factions/preview">
            Retour au preview
          </Link>
        </p>
      </section>
    </main>
  );
}
