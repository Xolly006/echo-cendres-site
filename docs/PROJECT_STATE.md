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
* La page `/personnages` possède maintenant une première version de filtres de catalogue : Tous, Arquet, Piliers et Électrons libres.
* Ces filtres s’appuient sur les tags existants des personnages : `arquet`, `pilier`, `electron-libre` ou `anomalie`.
* La page `/personnages` continue d’utiliser la logique publique existante : seuls les personnages en `publicationStatus: "published"` sont affichés.
* Les personnages en `draft` restent protégés et invisibles en production, y compris avec les filtres actifs.
* Les filtres préparent le futur catalogue sans publier les fiches réelles.
* La page `/personnages` possède maintenant un état vide propre : si aucun personnage publié n’existe, elle indique que les archives personnages sont en cours de stabilisation.
* Les filtres restent visibles même quand aucun personnage n’est affiché.
* Si un filtre actif ne retourne aucun résultat, un message adapté est affiché avec un lien permettant de revenir au filtre `Tous`.
* Cet état vide stabilise le moteur personnages sans rendre les fiches en `draft` visibles.
* Une route interne `/personnages/preview` existe maintenant pour le développement local.
* `/personnages/preview` liste localement les personnages en `draft` et en `published`.
* `/personnages/preview/[slug]` permet de prévisualiser une fiche complète sans modifier `publicationStatus`.
* En production, les routes preview affichent un état indisponible et ne lisent pas les personnages en `draft`.
* Les pages publiques `/personnages` et `/personnages/[slug]` conservent leur logique publique : les personnages en `draft` restent invisibles en production.
* Le mode preview remplace le besoin de passer temporairement une fiche en `published` pour la tester visuellement.
* La page `/factions` existe maintenant et remplace le placeholder générique initial.
* `/factions` présente sobrement les grandes familles ou forces actuelles : L’Arquet, les Piliers de l’Existence, les Électrons libres / Anomalies, et d’autres forces à documenter plus tard.
* Cette page sert de point d’entrée futur pour structurer les grandes forces du Livre-Monde.
* Aucun modèle `Faction`, aucun dossier `src/content/factions` et aucun lien dynamique entre personnages et factions n’existent encore.
* La navigation globale possédait déjà un lien vers `/factions`, donc elle n’a pas été modifiée pour cette étape.
* Kael l’Éclipsé existe comme premier personnage réel en `draft`.
* La fiche de Kael se trouve dans `src/content/personnages/kael-eclipse/` et contient `data.json` et `histoire.mdx`.
* Kael utilise `publicationStatus: "draft"` et `themeKey: "vide-oppressant"`.
* Kael utilise `magic` pour structurer son Concept, son Domaine, son Artefact, son Ancre, ses Capacités et ses Limites.
* Kael ne possède pas encore de `links`.
* La section “Magie” ne remplace pas `histoire.mdx` : elle sert aux informations structurées, tandis que le récit long reste dans le MDX.
* Le thème `vide-oppressant` fonctionne bien visuellement pour Kael : la page affiche l’introduction immersive, la section identité, le récit MDX et une ambiance froide et distante.
* Le test local de Kael a été fait temporairement en `published`, puis la fiche a été remise en `draft`.
* Varros le Fléau existe comme deuxième personnage réel en `draft`.
* La fiche de Varros se trouve dans `src/content/personnages/varros-fleau/` et contient `data.json` et `histoire.mdx`.
* Varros utilise `publicationStatus: "draft"` et `themeKey: "default"`.
* Varros teste un profil très différent de Kael : force, corps, culpabilité et malédiction berserker, là où Kael teste absence, silence, inexistence et thème `vide-oppressant`.
* Le rendu V1 de Varros avec le thème `default` est acceptable.
* Le test local de Varros a été fait temporairement en `published`, puis la fiche doit rester en `draft`.
* Un futur thème de famille, par exemple `titan-maudit` ou équivalent, pourra être envisagé plus tard si plusieurs personnages partagent cette ambiance.
* Elias existe comme troisième personnage réel en `draft`.
* La fiche d’Elias se trouve dans `src/content/personnages/elias-pilier-sacre/` et contient `data.json` et `histoire.mdx`.
* Elias utilise `publicationStatus: "draft"` et `themeKey: "default"`.
* Elias teste un profil très différent de Kael et Varros : Sacré, foi construite, Métatron, espoir et lumière.
* Elias a été corrigé après création : le champ `magic.artifact` lié au sceptre a été supprimé, le tag vague `pilier` a été remplacé par `pilier-existence`, le tag précis `pilier-sacre` est conservé, et sa nature précise qu’il est humain, hôte et réceptacle de Métatron, pas Métatron lui-même.
* Le rendu visuel V1 d’Elias avec le thème `default` reste acceptable provisoirement.
* Un futur thème de famille, par exemple `foi-sans-dieu`, `lumiere-construite`, `sacre-fissure` ou équivalent, pourra être envisagé plus tard si plusieurs personnages partagent cette ambiance.
* Le thème standard `vie-sauvage` existe maintenant pour les personnages liés à la Vie, à la biomasse, aux forêts conscientes, à la nature sacrée ou au cycle naturel.
* `vie-sauvage` est une famille réutilisable : ce thème ne doit pas être considéré comme réservé uniquement à Ysolde.
* Ysolde la Sauvage existe comme quatrième personnage réel en `draft`.
* La fiche de Ysolde se trouve dans `src/content/personnages/ysolde-sauvage/` et contient `data.json` et `histoire.mdx`.
* Ysolde utilise `publicationStatus: "draft"` et `themeKey: "vie-sauvage"`.
* Ysolde teste un profil très différent de Kael, Varros et Elias : Vie, biomasse, cycle naturel, forêt consciente et tristesse organique.
* Ysolde teste une ambiance plus organique, végétale et sacrée sans passer par une signature visuelle unique.
* La V1 de Ysolde reste sobre : pas de romance développée, pas d’artefact confirmé, pas de RACINE, pas d’Elara et pas de prophétie complète.
* Le thème standard `amour-douleur` existe maintenant pour les personnages liés à l’amour sacrificiel, à l’empathie, au lien, à l’Agapè, à la protection douloureuse, à la tendresse tragique et à la douleur partagée.
* `amour-douleur` est une famille réutilisable : ce thème ne doit pas être considéré comme réservé uniquement à Amara.
* Amara existe comme cinquième personnage réel en `draft`.
* La fiche d’Amara se trouve dans `src/content/personnages/amara-mere-douleurs/` et contient `data.json` et `histoire.mdx`.
* Amara utilise `publicationStatus: "draft"` et `themeKey: "amour-douleur"`.
* Amara est un électron libre : elle n’appartient ni à l’Arquet ni aux Piliers, et elle enrichit la catégorie des personnages hors institution.
* Amara est liée au Concept `LIEN / Amour / Agapè`, dirige un orphelinat neutre au milieu d’un champ de bataille, et porte les surnoms `La Mère des Douleurs` et `L’Intouchable par empathie`.
* La magie d’Amara repose sur l’empathie sacrificielle, le transfert de blessures, le partage de la violence et son Domaine absolu `Le Mariage des Âmes`.
* Carte, chronologie, moteur de factions structuré et système de thèmes avancé non encore développés.

## Technologies actuelles

* Next.js
* React
* TypeScript
* CSS
* Canvas natif pour certaines particules
* `@next/mdx` pour le rendu MDX serveur des récits personnages.

## Priorité actuelle

Stabiliser séparément le moteur personnages, les sections structurées optionnelles, le moteur de thèmes et les futures compositions avant d’intégrer des fiches validées. Les signatures visuelles spécifiques restent hors périmètre pour le moment.
