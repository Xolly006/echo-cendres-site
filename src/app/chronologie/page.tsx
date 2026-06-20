const timelineStages = [
  {
    title: 'Âges anciens',
    eyebrow: 'Origines',
    description:
      'Cette période accueillera plus tard les fondations du monde, les origines et les premiers grands bouleversements. Elle reste volontairement ouverte pour ne pas figer toute la cosmologie maintenant.',
  },
  {
    title: 'Âges des ruptures',
    eyebrow: 'Effondrements',
    description:
      'Cette couche chronologique préparera les grandes guerres, disparitions, scellements, effondrements ou transitions majeures, sans créer encore de liste détaillée d’événements.',
  },
  {
    title: 'Ère actuelle',
    eyebrow: 'Conséquences',
    description:
      'Le présent narratif sera traité comme un monde fatigué, chargé d’héritages, où les personnages actuels agissent sur des conséquences anciennes.',
  },
  {
    title: 'Chronologie future',
    eyebrow: 'À structurer',
    description:
      'Les prochaines évolutions pourront inclure des événements structurés, un tri par époque, des pages événement dédiées, des liens vers personnages, factions et lieux, des filtres par période et une éventuelle timeline interactive.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="chronologie-title">
        <p className="eyebrow">Temps en attente</p>
        <h1 id="chronologie-title">Chronologie</h1>
        <p>
          La chronologie du Livre-Monde sera construite progressivement. Les événements ne sont pas encore modélisés en
          données, et les grandes ères comme les ruptures historiques seront ajoutées plus tard.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée historique. Elle prépare la structure sans créer encore de moteur de
          chronologie dynamique, de fiches événements ou de liens entre personnages, lieux et factions.
        </div>

        <div className="faction-grid" aria-label="Grandes périodes futures">
          {timelineStages.map((stage) => (
            <article className="faction-card" key={stage.title}>
              <p className="section-card__eyebrow">{stage.eyebrow}</p>
              <h2>{stage.title}</h2>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
