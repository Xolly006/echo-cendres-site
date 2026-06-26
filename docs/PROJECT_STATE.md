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
* Les fiches personnage ont maintenant un rendu plus lisible et plus immersif via `StandardImmersivePersonnage`.
* Le nom, le rôle et le résumé court sont mieux mis en valeur dans l’introduction de la fiche.
* Les blocs Identité et Magie sont mieux hiérarchisés.
* La section récit est mieux séparée dans le flux de lecture.
* La preview d’une fiche affiche clairement un badge de statut, par exemple `Preview draft`.
* Une fiche preview possède un retour direct vers `/personnages/preview`.
* La bannière preview est mieux intégrée au thème actif.
* Les routes publiques continuent de masquer les personnages en `draft`, tandis que les routes preview restent réservées à la lecture locale ou interne.
* La page `/factions` existe maintenant et remplace le placeholder générique initial.
* `/factions` présente sobrement les grandes familles ou forces actuelles : L’Arquet, les Piliers de l’Existence, les Électrons libres / Anomalies, et d’autres forces à documenter plus tard.
* Cette page sert de point d’entrée futur pour structurer les grandes forces du Livre-Monde.
* Aucun modèle `Faction`, aucun dossier `src/content/factions` et aucun lien dynamique entre personnages et factions n’existent encore.
* La navigation globale possédait déjà un lien vers `/factions`, donc elle n’a pas été modifiée pour cette étape.
* La page `/magie` existe maintenant et remplace le placeholder générique initial.
* `/magie` présente sobrement les grands axes de la magie : Concepts, Éveils, Domaines, Arquet / Piliers / anomalies, et magie comme force narrative.
* Cette page sert de point d’entrée futur pour structurer la magie du Livre-Monde.
* Aucun modèle `Magic`, aucun dossier `src/content/magie` et aucun lien dynamique entre personnages, Concepts et systèmes magiques n’existent encore.
* La navigation globale possédait déjà un lien vers `/magie`, donc elle n’a pas été modifiée pour cette étape.
* La page `/carte` existe maintenant et remplace le placeholder générique initial.
* `/carte` prépare la future section Atlas du Livre-Monde.
* Elle présente sobrement plusieurs couches futures : Monde physique, Abîme, plans célestes / Celestia, lieux vivants et zones sacrées, et futur atlas interactif.
* Aucun modèle `Lieu`, aucun dossier `src/content/lieux`, aucune carte SVG interactive, aucun système de coordonnées et aucun lien dynamique entre lieux, personnages, factions ou événements n’existent encore.
* La navigation globale possédait déjà un lien vers `/carte`, donc elle n’a pas été modifiée pour cette étape.
* La page `/chronologie` existe maintenant et remplace le placeholder générique initial.
* `/chronologie` prépare la future section Chronologie du Livre-Monde.
* Elle présente sobrement plusieurs axes temporels futurs : Âges anciens, Âges des ruptures, Ère actuelle et Chronologie future.
* Aucun modèle `Evenement`, aucun dossier `src/content/evenements`, aucun moteur de chronologie dynamique et aucun lien dynamique entre événements, personnages, lieux ou factions n’existent encore.
* La navigation globale possédait déjà un lien vers `/chronologie`, donc elle n’a pas été modifiée pour cette étape.
* La page `/evenements` existe maintenant et remplace le placeholder générique initial.
* `/evenements` prépare la future section Événements du Livre-Monde.
* Elle présente sobrement plusieurs types d’événements futurs : événements fondateurs, guerres et ruptures, scellements et catastrophes, rencontres majeures, et événements encore à valider.
* Aucun modèle `Evenement`, aucun dossier `src/content/evenements`, aucune page dynamique `/evenements/[slug]`, aucun moteur d’événements et aucun lien dynamique entre événements, personnages, lieux ou factions n’existent encore.
* La page `/evenements` sert de point d’entrée futur pour structurer les événements du Livre-Monde.
* La page `/archives` existe maintenant et remplace le placeholder générique initial.
* `/archives` prépare la future section Archives du Livre-Monde.
* Elle servira plus tard à conserver anciennes versions, propositions IA non validées, contradictions et points à vérifier, scènes potentielles et contenus retirés.
* Une information archivée n’est pas forcément fausse, mais elle n’est pas automatiquement canon public.
* Les archives ne remplacent pas les fiches publiées, et le canon reste sous contrôle humain.
* Aucun modèle `Archive`, aucun dossier `src/content/archives`, aucun moteur d’archives dynamique et aucun lien dynamique entre archives, personnages, lieux, factions ou événements n’existent encore.
* Aucun contenu existant n’a été déplacé vers les archives.
* Kael l’Éclipsé existe comme premier personnage réel en `draft`.
* La fiche de Kael se trouve dans `src/content/personnages/kael-eclipse/` et contient `data.json` et `histoire.mdx`.
* Kael utilise `publicationStatus: "draft"` et `themeKey: "vide-oppressant"`.
* Kael utilise `magic` pour structurer son Concept, son Domaine, son Artefact, son Ancre, ses Capacités et ses Limites.
* Kael ne possède pas encore de `links`.
* La section “Magie” ne remplace pas `histoire.mdx` : elle sert aux informations structurées, tandis que le récit long reste dans le MDX.
* Le thème `vide-oppressant` fonctionne bien visuellement pour Kael : la page affiche l’introduction immersive, la section identité, le récit MDX et une ambiance froide et distante.
* Le récit MDX de Kael dans `src/content/personnages/kael-eclipse/histoire.mdx` a été enrichi pour servir de premier test de personnage vitrine en preview.
* Ce récit développe sobrement l’enfant sans nom, le vœu accordé, la Non-existence et ce qu’il reste de Kael.
* Il renforce son concept d’Inexistence / Non-existence en rappelant que Kael n’est pas simplement invisible : sa présence est refusée par le monde, la perception et la mémoire.
* La seconde passe narrative a affiné le ton pour le rendre plus froid, plus sobre et plus cohérent avec le personnage.
* Aucun nouveau pouvoir majeur, art martial, technique avancée ou détail tactique nouveau n’a été ajouté pour le moment.
* Kael reste destiné à la preview interne locale via `/personnages/preview/kael-eclipse` tant qu’il est en `publicationStatus: "draft"`.
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
* Le thème standard ou quasi-signature `or-maudit` existe maintenant pour une ambiance de richesse froide, trésor maudit, cage précieuse, noir profond, or ancien, touches d’argent froid et ivoire discret.
* `or-maudit` sert actuellement surtout à Aurélia / Reine Midas. Il pourra devenir une famille réutilisable seulement si un autre personnage partage plus tard une esthétique proche.
* Aucun système d’image, portrait ou asset visuel n’a été ajouté avec `or-maudit`.
* Aurélia / Reine Midas existe comme sixième personnage réel en `draft`.
* La fiche d’Aurélia se trouve dans `src/content/personnages/aurelia-reine-midas/` et contient `data.json` et `histoire.mdx`.
* Aurélia utilise `publicationStatus: "draft"` et `themeKey: "or-maudit"`.
* Aurélia est Reine Midas, Banquière maudite, Héritière de l’Arquet, trésorière et source financière majeure de l’organisation.
* Aurélia est la fille du Roi Midas légendaire, liée à une malédiction de transmutation de l’or, au Flux d’Argent et à l’Arquet qui lui permet de contrôler partiellement sa malédiction et de toucher sans tuer.
* Son récit MDX développe sobrement la fille du roi d’or, la cage de verre, le premier contact avec Midas, l’Ancre de l’Arquet, la Banquière maudite et ce que vaut une main.
* Aurélia est visible uniquement via la preview interne locale `/personnages/preview/aurelia-reine-midas` tant qu’elle reste en `draft`.
* Aurélia ne doit pas être publiée tant que le créateur ne valide pas explicitement sa fiche.
* Le registre narratif `src/content/personnages/narrative-registry.ts` a été régénéré automatiquement pour inclure le récit MDX d’Aurélia.
* Le thème standard ou quasi-signature `masque-voile` existe maintenant pour une ambiance de théâtre fermé, masque de porcelaine, voile noir, mensonge, illusion, gris miroir, argent froid et rouge rideau sombre.
* `masque-voile` sert actuellement surtout à Soryn la Voilée. Il pourra devenir une famille réutilisable seulement si un autre personnage partage plus tard une esthétique liée aux masques, aux illusions ou aux miroirs.
* Le thème `masque-voile` a été ajusté pour ne pas ressembler trop au thème `vide-oppressant` de Kael : Soryn doit évoquer la scène, le masque, le mensonge et le théâtre psychologique, pas seulement le vide froid.
* Aucun système d’image, portrait ou asset visuel n’a été ajouté avec `masque-voile`.
* Soryn la Voilée existe comme septième personnage réel en `draft`.
* La fiche de Soryn se trouve dans `src/content/personnages/soryn-la-voilee/` et contient `data.json` et `histoire.mdx`.
* Soryn utilise `publicationStatus: "draft"` et `themeKey: "masque-voile"`.
* Soryn est une femme. Le féminin doit être utilisé pour elle dans la documentation et les futures fiches ; les alternances masculin/féminin du document source ne sont pas retenues pour la fiche actuelle.
* Soryn est La Mère des Masques, L’Illusionniste, Héritière n°2 de l’Arquet, liée au Mensonge incarné, ancienne artiste et peintre de génie, sans tragédie fondatrice, maîtresse des illusions, du doute, des masques et des réseaux d’espionnage.
* Son récit MDX développe sobrement l’artiste qui méprisait le réel, la Mère des Masques, l’Ancre du masque brisé, le Cauchemar Éveillé, le Théâtre des Cauchemars et celle qui repeint le monde.
* Soryn est visible uniquement via la preview interne locale `/personnages/preview/soryn-la-voilee` tant qu’elle reste en `draft`.
* Soryn ne doit pas être publiée tant que le créateur ne valide pas explicitement sa fiche.
* Le registre narratif `src/content/personnages/narrative-registry.ts` a été régénéré automatiquement pour inclure le récit MDX de Soryn.
* Moteur de chronologie structuré, moteur d’événements structuré, moteur de lieux structuré, moteur de factions structuré, moteur de magie structuré et système de thèmes avancé non encore développés.

## Technologies actuelles

* Next.js
* React
* TypeScript
* CSS
* Canvas natif pour certaines particules
* `@next/mdx` pour le rendu MDX serveur des récits personnages.

## Priorité actuelle

Stabiliser séparément le moteur personnages, les sections structurées optionnelles, le moteur de thèmes et les futures compositions avant d’intégrer des fiches validées. Les signatures visuelles spécifiques restent hors périmètre pour le moment.
