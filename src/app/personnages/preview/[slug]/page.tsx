import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { PersonnageNarrative } from '@/components/personnages/PersonnageNarrative';
import { StandardImmersivePersonnage } from '@/components/personnages/StandardImmersivePersonnage';
import { loadPersonnageNarrative } from '@/content/personnages/narrative-registry';
import {
  getPersonnageForPreviewBySlug,
  validatePersonnageNarrativeSource,
} from '@/lib/personnages';
import { getPersonnageTheme } from '@/themes/personnages';

type PersonnagePreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isPreviewAvailable = process.env.NODE_ENV !== 'production';

export default async function Page({ params }: PersonnagePreviewPageProps) {
  if (!isPreviewAvailable) {
    return (
      <main className="directory-page">
        <section className="directory-panel" aria-labelledby="preview-title">
          <p className="eyebrow">Preview interne</p>
          <h1 id="preview-title">Prévisualisation indisponible</h1>
          <div className="empty-state">
            <strong>Le mode preview est désactivé en production.</strong>
            <span>Les fiches en brouillon restent invisibles publiquement.</span>
            <Link className="empty-state__action" href="/personnages">
              Revenir aux personnages
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const { slug } = await params;
  const personnage = await getPersonnageForPreviewBySlug(slug);

  if (!personnage) {
    notFound();
  }

  const theme = getPersonnageTheme(personnage.themeKey);
  const NarrativeContent = personnage.hasNarrative && (await validatePersonnageNarrativeSource(personnage.slug))
    ? await loadPersonnageNarrative(personnage.slug)
    : null;
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
    <main className="directory-page personnage-theme-page" data-character-theme={theme.key} style={themeStyle}>
      <div className="preview-banner preview-banner--floating" role="note">
        Preview locale : <strong>{personnage.publicationStatus}</strong>. Cette route n’est pas disponible en
        production. <Link href="/personnages/preview">Retour au preview</Link>
      </div>
      <StandardImmersivePersonnage
        atmosphere={theme.atmosphere}
        backHref="/personnages/preview"
        backLabel="Retour au preview"
        personnage={personnage}
        narrative={NarrativeContent ? <PersonnageNarrative Content={NarrativeContent} /> : null}
        previewStatus={personnage.publicationStatus}
      />
    </main>
  );
}
