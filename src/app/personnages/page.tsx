import { getAllPersonnages } from '@/lib/personnages';

export default async function Page() {
  const personnages = await getAllPersonnages();

  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="personnages-title">
        <p className="eyebrow">Registre préparé</p>
        <h1 id="personnages-title">Personnages</h1>
        <p>
          Les fiches personnages seront ajoutées progressivement depuis une source de données unique, sans créer une page à la main pour chaque entrée.
        </p>

        {personnages.length === 0 ? (
          <div className="empty-state">
            <strong>Aucune fiche personnage publiée pour le moment.</strong>
            <span>Les premières entrées apparaîtront ici dès que leurs fichiers JSON auront été ajoutés et validés.</span>
          </div>
        ) : (
          <div className="personnage-grid" aria-label="Liste des personnages">
            {personnages.map((personnage) => (
              <article className="personnage-card" key={personnage.slug}>
                <p className="section-card__eyebrow">{personnage.role ?? 'Personnage'}</p>
                <h2>{personnage.nom}</h2>
                <p>{personnage.resumeCourt}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
