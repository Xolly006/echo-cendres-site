# Fiches factions

Ce dossier est la source unique de vérité des fiches factions. Il est le
miroir exact de `src/content/personnages/` : mêmes fichiers, mêmes règles.

Structure attendue :

```txt
src/content/factions/slug-de-la-faction/
  data.json
  histoire.mdx   (optionnel)
```

Le slug public est dérivé automatiquement du nom du dossier : le JSON ne
doit jamais contenir de champ `slug`.

Le registre d'imports MDX `src/content/factions/narrative-registry.ts` est
généré automatiquement par `scripts/generate-personnage-narratives.mjs`
(étendu aux factions). Il ne doit jamais être modifié à la main.

## Modèle de données

Voir `src/types/faction.ts` et `docs/FACTIONS_MODELE.md` pour le détail.
Points structurants :

* une faction n'est pas une liste de liens vers des fiches personnages :
  c'est une entité autonome, lisible même quand aucun membre n'a de page ;
* `membres[].personnageSlug` est optionnel — un membre existe même sans
  fiche ;
* `membres[].remplace` / `remplacePar` référencent un `nom` du même
  tableau `membres`, jamais un slug ;
* aucune date, aucune ancienneté pour l'instant (`chronologie` optionnel,
  à remplir plus tard) ;
* aucun compteur de membres stocké : il se dérive de `membres` ;
* tout champ futur est ajouté en optionnel, jamais en requis.

## Protection draft

Une faction en `publicationStatus: "draft"` reste invisible en production,
comme un personnage.

À l'intérieur d'une faction publiée, un membre dont le `personnageSlug`
pointe vers une fiche personnage en `draft` reste affiché normalement —
nom, titre, concept. C'est uniquement le lien vers sa fiche qui disparaît
en production. En preview (`/personnages/preview`), les liens sont actifs.

## Récit MDX autorisé

Mêmes règles que les récits personnages : Markdown simple uniquement.
Sont autorisés titres, paragraphes, listes, emphase, citations,
séparateurs, liens Markdown ordinaires. Sont interdits imports, exports,
composants JSX, HTML brut, expressions JavaScript entre accolades, liens
à protocole dangereux.

## Aucun contenu inventé

Le contenu d'une fiche faction vient exclusivement des documents
d'extraction canon (ex. `docs/ARQUET_CANON.md`). Toute information
manquante ou non tranchée dans la source est marquée « à valider » plutôt
que complétée.
