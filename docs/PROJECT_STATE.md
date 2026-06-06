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
* Les personnages sont maintenant stockés dans un dossier par personnage avec `data.json`.
* Le moteur détecte optionnellement `histoire.mdx` via `hasNarrative`.
* Rendu narratif MDX serveur présent pour les fiches personnages via un registre d’imports MDX généré automatiquement.
* Aucun personnage intégré pour le moment.
* Carte, chronologie et système de thèmes avancé non encore développés.

## Technologies actuelles

* Next.js
* React
* TypeScript
* CSS
* Canvas natif pour certaines particules
* `@next/mdx` pour le rendu MDX serveur des récits personnages.

## Priorité actuelle

Stabiliser séparément le moteur personnages, les sections structurées optionnelles, le moteur de thèmes et les futures compositions avant d’intégrer des fiches validées.
