const archiveSections = [
  {
    title: 'Anciennes versions',
    eyebrow: 'Mémoire',
    description:
      'Cette section accueillera plus tard les versions précédentes de personnages, événements, lieux ou concepts, sans importer de contenu ancien dans cette première page.',
  },
  {
    title: 'Propositions IA',
    eyebrow: 'Non validé',
    description:
      'Les idées générées par IA devront rester séparées du canon validé. Une proposition peut être utile au processus créatif sans devenir automatiquement publique ou canonique.',
  },
  {
    title: 'Contradictions et points à vérifier',
    eyebrow: 'Arbitrage futur',
    description:
      'Les informations incohérentes, ambiguës ou à confirmer pourront être isolées ici pour être relues plus tard, sans trancher le canon à la place du créateur.',
  },
  {
    title: 'Scènes potentielles',
    eyebrow: 'Fragments',
    description:
      'Les scènes possibles, fragments narratifs et pistes futures pourront être conservés sans être confondus avec les fiches publiées ou les récits validés.',
  },
  {
    title: 'Contenus retirés',
    eyebrow: 'Écartés',
    description:
      'Les éléments abandonnés, remplacés ou non retenus pourront être préservés pour mémoire, sans être remis dans le canon public ni déplacés maintenant.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="archives-title">
        <p className="eyebrow">Mémoire du chantier</p>
        <h1 id="archives-title">Archives</h1>
        <p>
          Les archives serviront à garder la mémoire du processus créatif du Livre-Monde. Une information archivée n’est
          pas forcément fausse, mais elle n’est pas automatiquement canon public et ne remplace jamais les fiches
          publiées.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée documentaire. Elle prépare la structure sans créer encore de modèle
          d’archives, de dossier contenu, de moteur dynamique ou de liens vers personnages, lieux, factions et
          événements.
        </div>

        <div className="faction-grid" aria-label="Types d’archives futures">
          {archiveSections.map((section) => (
            <article className="faction-card" key={section.title}>
              <p className="section-card__eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
