# Fiches personnages

Ce dossier est la source unique de vérité des futures fiches personnages.

Chaque personnage doit posséder son propre dossier. Le slug public est dérivé automatiquement du nom du dossier, donc le contenu JSON ne doit pas contenir de champ `slug`.

Structure attendue :

```txt
src/content/personnages/slug-du-personnage/
  data.json
```

Un récit long pourra être ajouté plus tard dans le même dossier :

```txt
src/content/personnages/slug-du-personnage/
  data.json
  histoire.mdx
```

Pour le moment, le moteur détecte seulement la présence de `histoire.mdx` via `hasNarrative`. Il ne charge pas, ne compile pas et n’affiche pas encore le contenu MDX.

`@next/mdx` est présent dans `package.json`, et `next.config.mjs` inclut `md` et `mdx` dans `pageExtensions`. Le rendu dynamique d’un récit local associé à un slug reste à implémenter et à vérifier séparément avec la version actuelle de Next.js.

Aucun personnage canonique n’est intégré à cette étape.

## Identité générale optionnelle

Une fiche peut contenir un bloc `identity` pour les informations courtes et structurées :

```json
{
  "identity": {
    "aliases": ["Nom alternatif"],
    "nature": "Nature de l'entité",
    "origin": "Origine",
    "status": "Statut connu",
    "era": "Époque associée"
  }
}
```

Tous les champs sont optionnels. La section identité ne s’affiche pas si aucune information n’est fournie.
