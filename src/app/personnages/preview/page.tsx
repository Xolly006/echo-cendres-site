import Link from 'next/link';
import { getAllPersonnagesForPreview } from '@/lib/personnages';

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
            <Link className="empty-state__action" href="/personnages">
              Revenir aux personnages
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const personnages = await getAllPersonnagesForPreview();

  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="preview-title">
        <p className="eyebrow">Preview interne</p>
        <h1 id="preview-title">Prévisualisation personnages</h1>
        <p>
          Cette page existe uniquement pour le développement local. Elle permet de vérifier les fiches en brouillon sans
          modifier leur statut de publication.
        </p>

        <div className="preview-banner" role="note">
          Les personnages en <strong>draft</strong> sont visibles ici seulement en local. La page publique{' '}
          <Link href="/personnages">/personnages</Link> continue de masquer les brouillons.
        </div>

        {personnages.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune fiche personnage détectée.</strong>
            <span>Ajoute un dossier personnage avec un fichier data.json pour le voir apparaître ici.</span>
          </div>
        ) : (
          <div className="personnage-grid" aria-label="Liste interne des personnages">
            {personnages.map((personnage) => (
              <Link className="personnage-card" href={`/personnages/preview/${personnage.slug}`} key={personnage.slug}>
                <div className="personnage-card__meta">
                  <p className="section-card__eyebrow">{personnage.role ?? 'Personnage'}</p>
                  <span className="preview-status" data-status={personnage.publicationStatus}>
                    {personnage.publicationStatus}
                  </span>
                </div>
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
