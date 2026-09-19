# Décisions du projet

## Décisions validées

* Le projet sera construit progressivement.
* Le contenu ne sera pas extrait automatiquement en masse depuis Magic.txt.
* Chaque personnage ou entité sera vérifié manuellement avant intégration.
* Tous les personnages du lore existent canoniquement, sauf décision explicite contraire du créateur.
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

## Système de signatures visuelles — pilote

* Le garde-fou « ne pas coder les signatures maintenant » a été levé explicitement par le créateur le 2026-07-11, pour un pilote unique avant toute généralisation.
* Le système vit dans `src/components/personnages/signatures/`, séparé de `PersonnageAtmosphere` et `PersonnageParticles`, conformément aux règles existantes.
* Une signature est résolue par slug dans un registre local. Aucun nouveau champ n’est ajouté aux `data.json`.
* Un personnage absent du registre garde exactement le rendu standard.
* Une signature peut habiller le titre (`Title`) et ajouter une couche décorative (`Overlay`), sans jamais remplacer le thème.
* Toute signature doit rester lisible, décorative, non interactive, et respecter `prefers-reduced-motion` avec un repli statique sobre.
* Pilote actuel : Kael l’Éclipsé (`kael-eclipse`) — effacement lent et partiel des lettres du nom, voile froid traversant, dénégation ponctuelle de l’en-tête. Le nom complet reste accessible aux lecteurs d’écran via un texte masqué.
* Le verrou « aucune autre signature tant que le pilote Kael n’est pas
  validé visuellement » est levé le 2026-09-06 : le pilote est validé.
  Voir la frontière scène / signature dans la section datée correspondante.

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
* Critère « personnage majeur » remplacé le 2026-09-06 par la frontière
  scène / signature : une signature n'existe que quand le concept du
  personnage entre en conflit avec la fiche elle-même, jamais parce que
  le personnage est important.
* Une nouvelle valeur de `particleKind` ne doit pas être ajoutée sans besoin narratif clair.
* Un effet ne doit pas être ajouté simplement parce qu’il est visuellement amusant ou spectaculaire.

## Recette d’ambiance des futurs personnages

* Un thème personnage représente une famille sensorielle, pas un personnage unique.
* Un thème ne doit pas être seulement une couleur : il peut porter palette, typographie, fond, texture, particules, transition, intensité, comportements optionnels et ambiance générale.
* Un personnage doit d’abord utiliser un thème existant si celui-ci correspond suffisamment à son émotion dominante, son rôle narratif ou sa présence magique.
* Un nouveau thème ne doit être créé que si plusieurs personnages pourraient théoriquement l’utiliser.
* Exception contrôlée : `or-maudit` sert actuellement surtout à Aurélia / Reine Midas comme signature quasi personnelle de personnage vitrine.
* `or-maudit` ne deviendra une famille réutilisable que si un autre personnage partage plus tard une esthétique de richesse froide, trésor maudit, or ancien, argent froid et métal précieux oppressant.
* La direction artistique complète d’Aurélia reste à travailler plus tard ; aucun système d’image, portrait ou asset visuel n’est décidé pour le moment.
* Soryn la Voilée est une femme dans la fiche actuelle : utiliser le féminin pour elle dans la documentation et les futures fiches.
* Les alternances masculin/féminin du document source concernant Soryn ne sont pas retenues pour cette première fiche.
* Exception contrôlée : `masque-voile` sert actuellement surtout à Soryn comme signature quasi personnelle de personnage majeur ou vitrine.
* `masque-voile` ne deviendra une famille réutilisable que si un autre personnage partage plus tard une esthétique de masques, illusions, miroirs, théâtre fermé ou mensonge élégant.
* `masque-voile` doit rester différencié de `vide-oppressant` : Soryn doit évoquer la scène, le masque, le mensonge et le théâtre psychologique, pas seulement le vide froid.
* Les effets uniques propres à un personnage majeur doivent attendre le futur système de signatures visuelles.
* Critère « personnage majeur » remplacé le 2026-09-06 par la frontière
  scène / signature : une signature n'existe que quand le concept du
  personnage entre en conflit avec la fiche elle-même, jamais parce que
  le personnage est important.
* Les signatures visuelles spécifiques doivent rester séparées des thèmes standard, de `PersonnageAtmosphere` et de `PersonnageParticles`.
* Claude peut servir à extraire et organiser des informations depuis Magic.txt, mais le créateur doit toujours valider ce qui est canonique.

## Évolution future des thèmes personnages

Le moteur utilise actuellement `themeKey`. Aucun nouveau champ ne doit être ajouté maintenant, mais une évolution future possible est documentée :

* `themeKey` : clé actuelle utilisée par le moteur.
* `themeFamily` : famille sensorielle générale.
* `visualVariant` : variante visuelle propre à une entité dans une même famille.

`signature` ne fait pas partie de cette liste de couches de thème : elle
est définie indépendamment par l'arbitrage du 2026-09-06 (section
« Compositions — règle maintenue, vocabulaire corrigé, verrou Kael
levé » plus bas). Une signature n'existe que quand le concept du
personnage entre en conflit avec la fiche elle-même — jamais parce
qu'un personnage est « majeur » ou « vitrine », un critère d'importance
insuffisant en soi.

La logique retenue :

* les personnages secondaires ou proches esthétiquement peuvent partager une famille de thème ;
* les personnages majeurs ou vitrines peuvent avoir une variante propre ;
* une famille de thème donne une grammaire visuelle commune ;
* une variante différencie un personnage dans cette famille.

Exemples à garder en tête :

* Vide / Néant : Kael pourrait porter fumée froide, contours absents et non-existence ; Nihil pourrait porter néant cosmique, silence final et blanc mort ; Neihem pourrait porter histoire morte, poussière d’archives et nécromancie du passé.
* Or / Malédiction : Aurélia porte or ancien, argent froid, cage de verre, gants noirs et trésor maudit ; Astharoth ne devrait partager une famille proche que si son esthétique le justifie, avec une variante différente.
* Masque / Illusion : Soryn porte théâtre fermé, rideau bordeaux, porcelaine, miroir fissuré et mensonge élégant.
* Lumière brisée / Sacré : Elias pourrait porter lumière retenue, foi humaine et vitrail fissuré ; Métatron ou Célestine pourraient porter géométrie angélique, ordre inhumain et blanc dangereux.

Contraintes :

* `or-maudit` sert actuellement surtout à Aurélia et peut rester une signature quasi personnelle.
* `masque-voile` sert actuellement surtout à Soryn et peut rester une signature quasi personnelle.
* Ces thèmes ne doivent devenir des familles réutilisables que si un autre personnage partage réellement une esthétique proche.
* Le système futur `themeFamily + visualVariant` ne doit pas être codé maintenant.
* Il faut éviter de créer un thème unique pour chaque personnage mineur.
* Il faut aussi éviter que plusieurs personnages majeurs se ressemblent parce qu’ils partagent une même palette.
* Les images, portraits et assets visuels restent hors périmètre tant qu’un système propre n’est pas décidé.
* La page d’accueil V2 “Livre-Monde vivant” reste un chantier séparé.

Workflow d’ajout d’un personnage :

1. Extraire les informations depuis Magic.txt.
2. Faire valider le contenu par le créateur.
3. Choisir un thème existant ou justifier la création future d’un thème réutilisable.
4. Créer `data.json` en `draft`.
5. Créer `histoire.mdx`.
6. Tester localement la fiche personnage.
7. Commit/push après validation.

## Phase 2 — Différenciation visuelle (2026-07-23)

La phase 1 (fondations) est terminée : moteur personnages, thèmes, MDX,
preview, protection draft sont stables.

La différenciation visuelle des personnages majeurs devient désormais un
OBJECTIF, plus un risque à contenir.

Sont explicitement levés :

- « les signatures visuelles restent hors périmètre » ;
- « rester sobre » comme règle par défaut ;
- la règle interdisant une mise en page propre à un personnage.

Restent absolument en vigueur :

- aucun lore inventé sans validation du créateur ;
- `publicationStatus: "draft"` ne passe jamais à `"published"` sans demande ;
- `prefers-reduced-motion` respecté sur toute animation ;
- lisibilité du récit MDX jamais dégradée ;
- aucune nouvelle dépendance sans validation ;
- `npm run build` doit passer ;
- Varros reste le témoin de non-régression.

Nouvelle règle : un thème porte la PALETTE et l'ATMOSPHÈRE. Une
composition porte la MISE EN PAGE. Ce sont deux axes séparés. Les
compositions sont des archétypes partagés (3 à 5 au total), jamais une
par personnage.

## Étapes 2 et 3 — moteur de composition et ancrages stables (2026-07-23)

* La page d'un personnage traduit son Domaine Absolu quand il en a un, et
  sa personnalité dans tous les cas. Aucune DA n'est inventée.
* Un thème n'est pas une « famille » par décret : il le devient le jour où
  un second personnage l'adopte réellement.
* Les compositions exposent des ancrages stables (`data-personnage-content`,
  `-exit`, `-erasable`, `-withdrawable`). Les signatures ne devinent plus
  la structure du DOM.
* Non-existence ≠ invisibilité : un élément atténué demeure. Le retrait du
  flux est réservé aux éléments courts et autonomes ; le récit MDX n'est
  jamais touché.

## Étapes 4 à 8 — Elias, Métatron, possession (2026-07-24)

* Le taux de synchronisation (`possession.sync`) est un paramètre de
  direction artistique, pas seulement une donnée de lore : il pilote
  directement le rendu de la page, pas une légende à côté.
* À 100 %, c'est la PAGE DE L'ENTITÉ qui s'impose — la vraie composition
  et le vrai thème de l'entité — jamais une simple recoloration de la
  page de l'hôte.
* Sur la page publique, l'entité possédante n'est chargée que si elle est
  `published` : un hôte publié ne peut jamais exposer une entité encore
  en `draft`.

## Ysolde et passe performance/responsive (2026-07-27)

* Aucun `filter` animé en transition : il force un repaint complet à
  chaque image et provoque des saccades sur GPU intégré. Seuls `opacity`
  et `transform` sont autorisés dans les transitions animées.
* Une seule boucle `requestAnimationFrame` par page, partagée entre tous
  les effets qui en ont besoin (`rafPartage`).
* Le nom de l'hôte et celui de l'entité sont deux éléments frères
  empilés, jamais un calque masquant l'autre.
* three.js est écarté : bibliothèque 3D pour un besoin 2D, et charge GPU
  supplémentaire sur un problème qui est déjà un problème de performance.

## Varros, Soryn et sûreté des apparitions (2026-07-29)

* LE CONTENU N'EST JAMAIS MASQUÉ PAR DÉFAUT. Le HTML servi est
  entièrement lisible ; le script masque avant le premier rendu puis
  révèle, avec révélation immédiate de ce qui est déjà à l'écran et un
  filet de sûreté à 3 secondes. Sans JavaScript, la page reste complète.
* Les images vivent dans `public/personnages/<slug>/`, en WebP sous
  300 Ko, champ `alt` obligatoire.
* Les illusions changent la FORMULATION, jamais le fait énoncé : aucun
  lore n'est inventé par un effet.
* La police de titre est choisie par composition, jamais héritée.
* Une fiche est d'abord un répertoire : capacités, limites, réseaux et
  contres priment sur les effets.
* three.js écarté : tous les effets restent en SVG, canvas 2D et CSS.

## Aurélia (2026-07-29)

* Un effet déclenché par le curseur doit exiger un GESTE, pas un passage :
  la proximité au pointeur dorait la page pendant la simple lecture,
  l'effet se battait contre le texte. Il faut poser le curseur sur
  l'élément.
* Aucun conteneur rectangulaire fermé : trois compositions avaient
  convergé vers le même motif de boîte à cause du système d'images.
  Encadrer sans enfermer.
* Un effet qui engage le lecteur doit être irréversible pour avoir du
  poids (transmutation d'Aurélia).

## Amara et clôture de la phase personnages (2026-07-30)

* Un personnage de l'Arquet sans Ancre voit son sceau tiré de sa PUPILLE
  de 2e Éveil.
* Un effet réversible (Amara) et un effet définitif (Aurélia) disent deux
  choses opposées : le choix fait partie de la caractérisation, pas un
  détail technique interchangeable.
* Ambiguïté de source notée sur Amara : le document source la dit à la
  fois « percutée à la naissance » et « elle n'est pas née mage ».
  **Tranchée le 2026-09-06** : Amara naît non-mage, sans lignée, et le
  Concept LIEN la percute à t=0 — il n'y a pas de vie d'avant. Le verrou
  « à trancher avant toute publication » saute.

## Arquet et la maquette (2026-08-13)

* L'ordre de travail est canon → maquette → code. La composition "fil" a
  échoué parce que le canon n'existait pas encore, et la première spec
  DA a échoué parce qu'elle décrivait un comportement sans poser de
  maquette. Ce qui a débloqué : une maquette HTML avec des valeurs
  concrètes.
* Une page de faction ne se met pas en page comme une fiche personnage.
  Une organisation a une histoire, une structure et une emprise ; un
  personnage a un nom et une intériorité.
* Le récit EST la page. Les données (membres, mécanique, branches) ne
  sont pas affichées avant lui et ne répètent pas ce qu'il dit.
* Une composition cliente ne peut pas recevoir le composant MDX en
  prop : il faut passer l'élément rendu (`<Narrative />`), pas la
  fonction.
* DETTE ASSUMÉE : le texte de l'Arquet est en dur dans
  `PalimpsesteFaction.tsx`, `histoire.mdx` n'est plus lu pour cette
  faction. Acceptable pour une page bespoke, À NE PAS REPRODUIRE. Les
  prochaines factions gardent leur texte en MDX.

## Arbitrages du créateur (2026-09-06)

Six décisions, rendues en bloc. La première change la lecture de tout le
reste du document et de ce fichier.

1. **Règle de source — Magic.txt fait autorité.** Magic.txt est le
   canon, y compris les passages marqués « proposition », « à valider »
   ou « à confirmer » : ces mentions ne suspendent pas le canon. Seule
   exception : deux informations réellement différentes portant sur la
   même entité — c'est le seul cas qui demande un arbitrage du créateur.
   `histoire.mdx` est la couche révisable quand le canon évolue.
   Conséquence : l'entrée « plusieurs statuts : confirmée, à confirmer,
   ancienne version, proposition IA ou retirée » et l'étape de tri
   « canon, à vérifier, contradictoire et proposition » du workflow
   d'ajout de personnage sont retirées de ce document — cette règle les
   remplace.

2. **Amara — ambiguïté tranchée.** L'entrée du 2026-07-30 est close.
   Amara naît non-mage, sans lignée, et le Concept LIEN la percute à
   t=0 : il n'y a pas de vie d'avant. `data.json` et `histoire.mdx`
   disent déjà cela, aucun contenu à changer. Le verrou « à trancher
   avant toute publication » est levé.

3. **Piliers — neuf, pas dix.** `docs/FACTIONS_INVENTAIRE.md` section
   D.1 affirmait « 10, pas 12 » sous « Tranché par le créateur » : c'est
   faux, corrigé en neuf. Liste nominative :
   - Guerre — Kratos
   - Éléments — Bora
   - Esprit — Calista
   - Vie — Ysolde
   - Mort — Ambroise
   - Sacré — Elias
   - Espace — Altaïr
   - Matière — Titus Fernum
   - Temps — Dame Olympe

   Le Pilier du Feu reste retiré (Bora couvre les Éléments).

4. **Le Bibliothécaire — clos.** Il n'y a pas de Pilier du Savoir.
   Dominique est surnommé « Pilier du Savoir » par les gens : titre
   humain, pas module. Requalifié en électron libre, comme Corvus. Le
   verrou de `docs/NEXT_STEPS.md` (« contradictions à arbitrer avant :
   Bibliothécaire ») est levé ; il ne reste que les chronologies.

5. **Ashren et les Doigts.** Ashren Veil (l'Arquet) et Ash la sorcière
   des poudres, élève de Kratos, sont deux personnes distinctes.
   « Ashren encadre les Armées » (Magic.txt l.33468) désigne celui de
   l'Arquet — lacune de `docs/ARQUET_COMPOSITION.md` §11.1 comblée. Par
   la règle 1, les cinq fonctions des Doigts (§11.3, marquées
   « proposition ») ne sont plus une réserve : elles sont canon.

6. **Compositions — règle maintenue, vocabulaire corrigé, verrou Kael
   levé.** Constat vérifié dans le code : les neuf « compositions »
   rendent le même squelette (scène · couche décorative · content ·
   intro · blocs · narrative · exit) ; seule la décoration varie, pas la
   disposition. Duplication mesurée : Retable partage 65 % de ses
   lignes avec Standard, Fragment 64 %, Titan/Canopée/Agapè 50 %. Il n'y
   a donc pas neuf compositions mais UNE composition et neuf couches
   narratives. La règle du 2026-07-23 (archétypes partagés, jamais un
   par personnage) n'a pas été violée sur le fond : elle l'a été dans le
   nom et dans le code. Elle est maintenue.

   Vocabulaire retenu, cinq couches :

   | Couche | Rôle | Cardinalité |
   |---|---|---|
   | SHELL ATLAS | navigation universelle | 1 |
   | SQUELETTE | primitives + ancrages `data-personnage-*` | 1, partagé |
   | SCÈNE | couche narrative de l'entité | illimité |
   | SIGNATURE | comportement qui conteste la fiche | rare |
   | THÈME | palette, typographie, atmosphère | 12 |

   Deux règles qui vont avec :
   - Le squelette NE FIXE PAS d'ordre. Il fournit des primitives ; la
     scène choisit lesquelles elle emploie, dans quel ordre, et
     lesquelles elle refuse. « intro → identité → magie → récit » est
     le défaut de `standard`, pas une loi. L'ordre et la présence des
     sections viennent du récit de l'entité.
   - Frontière scène / signature : une scène habille la page, une
     signature la conteste. Une signature n'existe que quand le concept
     du personnage entre en conflit avec la fiche elle-même (Kael efface
     son nom). Sinon, scène.

   Le pilote Kael l'Éclipsé est validé visuellement par le créateur : le
   verrou « aucune autre signature tant que le pilote n'est pas validé »
   est levé, encadré désormais par la frontière ci-dessus.

   Aucune suppression visuelle : les neuf identités actuelles sont
   conservées.
