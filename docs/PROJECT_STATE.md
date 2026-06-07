# État actuel du projet

## Vision

Construire un Livre-Monde interactif pour L’Écho des Cendres.

Le site doit progressivement contenir :

* une page d’accueil immersive ;
* des personnages ;
* une carte interactive ;
* une chronologie ;
* des événements ;
* des factions ;
* la magie ;
* des archives.

Les différentes entités seront ajoutées progressivement. Le squelette doit permettre d’ajouter du contenu sans recopier ou reconstruire manuellement chaque page.

## État actuel

* Projet Next.js initialisé.
* TypeScript activé.
* Serveur local fonctionnel avec `npm run dev`.
* Page d’accueil initiale présente.
* Pages de sections initiales présentes.
* Fondation du moteur personnages présente.
* Route dynamique publique `/personnages/[slug]` présente pour les futurs personnages publiés.
* Fondation du moteur de thèmes personnages présente avec résolution de `themeKey` et fallback `default`.
* Première section structurée optionnelle des fiches personnages présente : identité générale.
* Le modèle personnage possède maintenant un champ optionnel `magic`.
* La page personnage affiche une section conditionnelle “Magie” si `magic` existe.
* Un personnage sans `magic` continue de fonctionner sans section vide.
* Le modèle personnage possède maintenant un champ optionnel `links`.
* `links` prépare les futures relations vers personnages, factions, événements, lieux, artefacts et concepts.
* Les liens sont validés comme des listes de chaînes, mais les slugs ne sont pas encore résolus.
* Aucune section visuelle “Liens” n’est affichée pour le moment.
* Les personnages sont maintenant stockés dans un dossier par personnage avec `data.json`.
* Le moteur détecte optionnellement `histoire.mdx` via `hasNarrative`.
* Rendu narratif MDX serveur présent pour les fiches personnages via un registre d’imports MDX généré automatiquement.
* Kael l’Éclipsé existe comme premier personnage réel en `draft`.
* La fiche de Kael se trouve dans `src/content/personnages/kael-eclipse/` et contient `data.json` et `histoire.mdx`.
* Kael utilise `publicationStatus: "draft"` et `themeKey: "vide-oppressant"`.
* Kael utilise `magic` pour structurer son Concept, son Domaine, son Artefact, son Ancre, ses Capacités et ses Limites.
* Kael ne possède pas encore de `links`.
* La section “Magie” ne remplace pas `histoire.mdx` : elle sert aux informations structurées, tandis que le récit long reste dans le MDX.
* Le thème `vide-oppressant` fonctionne bien visuellement pour Kael : la page affiche l’introduction immersive, la section identité, le récit MDX et une ambiance froide et distante.
* Le test local de Kael a été fait temporairement en `published`, puis la fiche a été remise en `draft`.
* Carte, chronologie et système de thèmes avancé non encore développés.

## Technologies actuelles

* Next.js
* React
* TypeScript
* CSS
* Canvas natif pour certaines particules
* `@next/mdx` pour le rendu MDX serveur des récits personnages.

## Priorité actuelle

Stabiliser séparément le moteur personnages, les sections structurées optionnelles, le moteur de thèmes et les futures compositions avant d’intégrer des fiches validées. Les signatures visuelles spécifiques restent hors périmètre pour le moment.
