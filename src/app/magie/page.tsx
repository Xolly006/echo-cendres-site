const magicAxes = [
  {
    title: 'Concepts',
    eyebrow: 'Noyaux symboliques',
    description:
      'Certains personnages sont liés à des Concepts majeurs ou à des fragments conceptuels. Les drafts actuels donnent déjà des repères : Kael touche à l’Inexistence, Varros à la Violence Pure, Elias à l’Ordre et au Sacré, Ysolde à la Biomasse et au cycle naturel, Amara au LIEN, à l’Amour et à l’Agapè.',
  },
  {
    title: 'Éveils',
    eyebrow: 'Axe futur',
    description:
      'Les Éveils seront structurés plus tard comme un axe majeur de compréhension magique. Cette page ne fige pas encore de liste complète ni de règles définitives.',
  },
  {
    title: 'Domaines',
    eyebrow: 'Manifestations',
    description:
      'Certains personnages possèdent ou manifestent des Domaines liés à leur Concept. Les fiches en draft mentionnent déjà des repères comme Gloria Sanctus / Horizon des Promesses pour Elias ou Le Mariage des Âmes pour Amara, sans développer toute la théorie maintenant.',
  },
  {
    title: 'Arquet, Piliers et anomalies',
    eyebrow: 'Ancrages narratifs',
    description:
      'Les systèmes magiques peuvent varier selon l’ancrage narratif : héritiers ou marqués de l’Arquet, Piliers liés aux Concepts fondamentaux, électrons libres ou anomalies hors institution. Cette section ne remplace pas la page Factions.',
  },
  {
    title: 'Magie et narration',
    eyebrow: 'Blessures et croyances',
    description:
      'La magie n’est pas seulement une mécanique de combat. Elle révèle les blessures, les croyances, les limites et les contradictions des personnages.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="magie-title">
        <p className="eyebrow">Systèmes en attente</p>
        <h1 id="magie-title">Magie</h1>
        <p>
          La magie du Livre-Monde sera structurée progressivement. Pour l’instant, les fiches personnages restent la
          source principale ; les Concepts, Domaines, Éveils et systèmes liés seront détaillés plus tard.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée encyclopédique. Elle prépare les grands axes sans créer encore de
          modèle de données, de dossier contenu ou de liens dynamiques entre personnages, concepts et systèmes magiques.
        </div>

        <div className="faction-grid" aria-label="Axes magiques à documenter">
          {magicAxes.map((axis) => (
            <article className="faction-card" key={axis.title}>
              <p className="section-card__eyebrow">{axis.eyebrow}</p>
              <h2>{axis.title}</h2>
              <p>{axis.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
