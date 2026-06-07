# Décisions du projet

## Décisions validées

* Le projet sera construit progressivement.
* Le contenu ne sera pas extrait automatiquement en masse depuis Magic.txt.
* Chaque personnage ou entité sera vérifié manuellement avant intégration.
* Tous les personnages du lore existent canoniquement, sauf décision explicite contraire du créateur.
* Les informations concernant une entité peuvent comporter plusieurs statuts : confirmée, à confirmer, ancienne version, proposition IA ou retirée.
* La navigation fondamentale doit rester cohérente même lorsque le thème visuel change.
* L’ajout futur d’une entité ne doit pas nécessiter de copier-coller une page entière.
* La page d’accueil est la première priorité.
* Noah servira plus tard de premier personnage test, mais il ne doit pas encore être intégré.
* Les personnages en `publicationStatus: "published"` sont visibles publiquement.
* Les personnages en `publicationStatus: "draft"` restent invisibles dans `/personnages` et retournent une 404 sur leur route publique.
* Les routes publiques des personnages utilisent le format `/personnages/[slug]`.
* Le thème d’un personnage et la composition de sa page sont deux systèmes séparés.
* Un `themeKey` absent ou inconnu doit utiliser le thème `default`.

## Décisions techniques provisoires

* Next.js + React + TypeScript.
* CSS et variables CSS pour les thèmes.
* Aucun CMS ni base de données au début.
* Aucune nouvelle dépendance sans justification et validation.
* Les sections peuvent rester vides pendant la construction du squelette.
* Les fiches personnages seront lues depuis `src/content/personnages/[slug]/data.json`.
* Le slug d’un personnage est dérivé du nom de son dossier.
* Les thèmes personnages sont gérés dans un registre artistique limité sous `src/themes/personnages/`.
* La première fondation des thèmes applique uniquement des variables CSS côté serveur, sans effet animé.
* Un récit long pourra être placé dans `src/content/personnages/[slug]/histoire.mdx`.
* La présence de `histoire.mdx` est détectée par `hasNarrative`.
* Le rendu narratif MDX des personnages utilise `@next/mdx` et des imports dynamiques locaux côté serveur.
* Les imports MDX des récits personnages passent par un registre généré automatiquement, jamais maintenu manuellement.
* Le projet doit fonctionner même si aucun `histoire.mdx` n’existe.
* Les récits MDX autorisent seulement Markdown simple, citations, séparateurs et liens ordinaires pour le moment.
* Les imports, exports, composants JSX, HTML brut, expressions JavaScript et liens à protocole dangereux dans les récits MDX sont interdits dans cette première version.
* `@next/mdx` est configuré dans `next.config.mjs`; `src/mdx-components.tsx` fournit la convention globale requise par Next.

## Règles du système d’ambiance des personnages

* `backgroundKind` sert à choisir l’ambiance de fond d’une fiche personnage : chaleur, vide, brume, cristal, étoiles ou autre direction visuelle prévue.
* `particleKind` sert uniquement aux particules décoratives légères.
* `intensity` doit rester limitée à `low` ou `medium`.
* Le thème `default` doit rester sobre et sans particules visibles.
* Le thème `feu-timide` utilise `particleKind: "embers"` pour des braises discrètes.
* Le thème `vide-oppressant` utilise `particleKind: "dust"` pour une poussière froide très rare.
* Les particules ne doivent jamais gêner la lecture du récit MDX.
* Les effets doivent rester décoratifs, désactivables ou allégés selon le contexte.
* Les interactions spéciales, comme un titre qui se disloque ou un bouton qui fuit, ne doivent pas être placées dans `PersonnageAtmosphere` ou `PersonnageParticles`.
* Les signatures visuelles propres aux personnages majeurs viendront plus tard dans un système séparé.
* Une nouvelle valeur de `particleKind` ne doit pas être ajoutée sans besoin narratif clair.
* Un effet ne doit pas être ajouté simplement parce qu’il est visuellement amusant ou spectaculaire.
