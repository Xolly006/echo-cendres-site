const atlasLayers = [
  {
    title: 'Monde physique',
    eyebrow: 'Territoires',
    description:
      'Cette couche accueillera plus tard les royaumes, forêts, villes, ruines, routes et territoires du monde principal, sans figer la géographie détaillée dès maintenant.',
  },
  {
    title: 'Abîme',
    eyebrow: 'Plan distinct',
    description:
      'L’Abîme sera traité comme une couche ou un plan séparé, accessible plus tard via des transitions, seuils ou points de passage. Sa cosmologie complète reste à établir avec prudence.',
  },
  {
    title: 'Plans célestes / Celestia',
    eyebrow: 'Structures hautes',
    description:
      'Certains plans liés aux anges ou aux structures célestes pourront être représentés séparément, sans figer toute la dimension angélique dans cette première page.',
  },
  {
    title: 'Lieux vivants et zones sacrées',
    eyebrow: 'Lectures multiples',
    description:
      'Certaines forêts conscientes, sanctuaires ou zones chargées de mana pourront avoir une lecture particulière. Silvareth pourra être étudiée plus tard sans créer de fiche lieu maintenant.',
  },
  {
    title: 'Futur atlas interactif',
    eyebrow: 'À construire',
    description:
      'Les prochaines évolutions pourront inclure une carte SVG stylisée, des points cliquables, des couches dimensionnelles, des filtres par plan, des fiches lieux et des transitions visuelles entre monde physique, Abîme et plans célestes.',
  },
];

export default function Page() {
  return (
    <main className="directory-page">
      <section className="directory-panel" aria-labelledby="carte-title">
        <p className="eyebrow">Atlas en attente</p>
        <h1 id="carte-title">Carte</h1>
        <p>
          L’Atlas du Livre-Monde sera construit progressivement. La carte détaillée n’est pas encore disponible, et les
          lieux seront ajoutés plus tard lorsque leur rôle, leur plan et leurs liens seront validés.
        </p>

        <div className="directory-note" role="note">
          Cette page est un futur point d’entrée cartographique. Certaines zones pourront exister sur plusieurs plans ou
          recevoir plusieurs lectures, mais aucune carte interactive, donnée de lieu ou coordonnée n’est encore créée.
        </div>

        <div className="faction-grid" aria-label="Couches futures de l’atlas">
          {atlasLayers.map((layer) => (
            <article className="faction-card" key={layer.title}>
              <p className="section-card__eyebrow">{layer.eyebrow}</p>
              <h2>{layer.title}</h2>
              <p>{layer.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
