const eventTypes = [
  {
    title: 'Événements fondateurs',
    eyebrow: 'Origines',
    description:
      'Cette catégorie accueillera plus tard les grands événements originels ou mythiques qui structurent le monde, sans figer toute la cosmologie dès maintenant.',
  },
  {
    title: 'Guerres et ruptures',
    eyebrow: 'Fractures',
    description:
      'Les conflits, effondrements, transitions et fractures historiques seront documentés progressivement, lorsque leur place dans la chronologie sera assez claire.',
  },
  {
    title: 'Scellements et catastrophes',
    eyebrow: 'Déséquilibres',
    description:
      'Cette section préparera les événements liés aux entités, aux zones interdites, aux sacrifices ou aux déséquilibres majeurs, sans détailler toute l’histoire maintenant.',
  },
  {
    title: 'Rencontres et bascules',
    eyebrow: 'Points de bascule',
    description:
      'Certaines rencontres entre personnages, factions ou forces majeures pourront devenir des événements dédiés. Les liens dynamiques seront ajoutés plus tard.',
  },
  {
    title: 'Futur moteur d’événements',
    eyebrow: 'À structurer',
    description:
      'Les prochaines évolutions pourront inclure un modèle Evenement, un dossier de contenu, des pages dédiées, un tri par époque, des liens vers personnages, factions, lieux et chronologie, ainsi que des filtres par type.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="evenements-title">
        <p className="eyebrow">Archives en attente</p>
        <h1 id="evenements-title">Événements</h1>
        <p>
          Les événements du Livre-Monde seront ajoutés progressivement. Ils ne sont pas encore modélisés en données, et
          les pages événement dédiées viendront plus tard, une fois les périodes, les slugs et les liens stabilisés.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée encyclopédique. Elle prépare la structure sans créer encore de moteur
          d’événements, de route dynamique ou de liens entre événements, personnages, lieux, factions et chronologie.
        </div>

        <div className="faction-grid" aria-label="Types d’événements futurs">
          {eventTypes.map((eventType) => (
            <article className="faction-card" key={eventType.title}>
              <p className="section-card__eyebrow">{eventType.eyebrow}</p>
              <h2>{eventType.title}</h2>
              <p>{eventType.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
