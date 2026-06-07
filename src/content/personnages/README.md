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

Le moteur détecte la présence de `histoire.mdx` via `hasNarrative`. Le rendu narratif valide d’abord le contenu côté serveur, puis importe le fichier MDX local avec `@next/mdx` et l’affiche sous les sections structurées de la fiche.

`@next/mdx` est configuré dans `next.config.mjs`. Le fichier `src/mdx-components.tsx` fournit la convention globale requise par Next, et les récits personnages utilisent une liste locale de composants contrôlés.

Le registre d’imports MDX `src/content/personnages/narrative-registry.ts` est généré automatiquement par `scripts/generate-personnage-narratives.mjs`. Il ne doit jamais être modifié à la main. Ce registre peut être vide, ce qui permet au projet de fonctionner même si aucun personnage ne possède encore de récit.

## Récit MDX autorisé

Pour cette première version, `histoire.mdx` doit rester simple. Sont autorisés :

* titres `#`, `##`, `###` ;
* paragraphes ;
* listes ;
* emphase Markdown ;
* citations ;
* séparateurs ;
* liens Markdown ordinaires.

Sont interdits pour le moment :

* imports MDX ;
* exports MDX ;
* composants JSX ;
* HTML brut ;
* expressions JavaScript entre accolades ;
* liens `javascript:`, `data:` ou `file:` ;
* liens internes `[[...]]` ;
* relations, magie, médias ou audio.

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

## Checklist avant publication

Un personnage peut passer de `draft` à `published` seulement si les points suivants sont validés :

* `data.json` est valide.
* `publicationStatus` est volontairement changé en `"published"`.
* `themeKey` existe et correspond au personnage.
* Le résumé court est clair.
* Le rôle est compréhensible.
* Les tags sont pertinents.
* L’identité minimale est remplie si le bloc `identity` existe.
* `histoire.mdx` existe si le personnage a besoin d’un récit long.
* Le récit MDX ne contient pas d’import, d’export, de JSX, de HTML brut ou d’expression JavaScript.
* Les informations douteuses ne sont pas présentées comme canon.
* Les collisions de noms ont été vérifiées.
* Le thème visuel a été testé localement.
* La page fonctionne en largeur normale.
* La page fonctionne en largeur intermédiaire avec VS Code à côté.
* La page reste lisible sur mobile.
* Le récit reste lisible malgré les effets d’ambiance et les particules.
* `npm run build` passe.
* Le personnage a été remis en `draft` si le test local en `published` n’était que temporaire.
* Le passage définitif en `published` fait l’objet d’un commit dédié.

Les signatures visuelles spécifiques ne sont pas obligatoires pour publier une V1. Par exemple, Kael l’Éclipsé peut rester en `draft` ou passer plus tard en `published` sans attendre son futur titre qui s’efface, ses effets de non-reconnaissance ou toute autre signature exceptionnelle.

Les signatures visuelles sont une amélioration future, pas un prérequis de publication.
