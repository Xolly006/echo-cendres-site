import Link from 'next/link';
import { getAllFactionsForPreview } from '@/lib/factions';

const isPreviewAvailable = process.env.NODE_ENV !== 'production';

export default async function Page() {
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

  const factions = await getAllFactionsForPreview();

  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="preview-title">
        <p className="eyebrow">Preview interne</p>
        <h1 id="preview-title">Prévisualisation factions</h1>
        <p>
          Cette page existe uniquement pour le développement local. Elle permet de vérifier les fiches en brouillon sans
          modifier leur statut de publication.
        </p>

        <div className="preview-banner" role="note">
          Les factions en <strong>draft</strong> sont visibles ici seulement en local. La page publique{' '}
          <Link href="/factions">/factions</Link> continue de masquer les brouillons.
        </div>

        {factions.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune fiche faction détectée.</strong>
            <span>Ajoute un dossier faction avec un fichier data.json pour le voir apparaître ici.</span>
          </div>
        ) : (
          <div className="faction-grid" aria-label="Liste interne des factions">
            {factions.map((faction) => (
              <Link className="faction-card" href={`/factions/preview/${faction.slug}`} key={faction.slug}>
                <p className="section-card__eyebrow">
                  {faction.statut} — {faction.ere}
                </p>
                <span className="preview-status" data-status={faction.publicationStatus}>
                  {faction.publicationStatus}
                </span>
                <h2>{faction.nom}</h2>
                <p>{faction.resume}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
