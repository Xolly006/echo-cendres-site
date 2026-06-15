const factionGroups = [
  {
    title: 'L’Arquet',
    eyebrow: 'Marques et héritiers',
    description:
      'Force liée aux marques, aux héritiers et aux malédictions. Les drafts personnages donnent déjà des premiers points d’appui avec Kael et Varros, mais la structure de l’Arquet devra être détaillée plus tard avec prudence.',
  },
  {
    title: 'Les Piliers de l’Existence',
    eyebrow: 'Concepts fondamentaux',
    description:
      'Figures majeures liées aux Concepts fondamentaux. Elias et Ysolde servent actuellement de premiers repères en draft, sans figer ici toute la liste ni les règles complètes des Piliers.',
  },
  {
    title: 'Les Électrons libres / Anomalies',
    eyebrow: 'Hors institution',
    description:
      'Entités ou individus qui ne relèvent ni de l’Arquet ni des Piliers. Amara représente déjà cette catégorie en draft ; d’autres noms pourront être étudiés plus tard uniquement après validation.',
  },
  {
    title: 'Autres forces',
    eyebrow: 'À documenter',
    description:
      'Royaumes, clans, ordres, familles, forces locales ou organisations seront ajoutés progressivement lorsque leur périmètre sera assez clair pour éviter les liens fragiles.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="factions-title">
        <p className="eyebrow">Forces en attente</p>
        <h1 id="factions-title">Factions</h1>
        <p>
          Les factions et forces majeures du Livre-Monde seront structurées progressivement. Pour l’instant, les fiches
          personnages restent la source principale ; les liens internes entre personnages, factions, lieux et événements
          viendront plus tard.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée encyclopédique. Elle prépare la structure sans créer encore de modèle de
          données, de fiches factions ou de relations dynamiques.
        </div>

        <div className="faction-grid" aria-label="Familles et forces à documenter">
          {factionGroups.map((group) => (
            <article className="faction-card" key={group.title}>
              <p className="section-card__eyebrow">{group.eyebrow}</p>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
