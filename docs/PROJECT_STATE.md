# État actuel du projet

## Vision

Construire un Livre-Monde interactif pour L'Écho des Cendres : chaque
personnage majeur doit avoir une présence visuelle propre, pas une fiche
de données interchangeable derrière une couleur différente.

## Stack

- Next.js, React, TypeScript
- CSS (variables CSS pour les thèmes), canvas natif pour les effets
- `@next/mdx` pour le récit narratif des personnages
- `framer-motion` — première dépendance du projet, validée par le créateur
  sur recommandation d'un développeur tiers. Gère les entrées/sorties de
  mondes (transitions entre la page d'un hôte et celle d'une entité).

## Ce qui existe

- Moteur personnages stable : `data.json` + `histoire.mdx` par personnage,
  chargement et validation stricts (`src/lib/personnages.ts`).
- 8 personnages réels en `draft` : Kael, Varros, Elias, Ysolde, Amara,
  Aurélia, Soryn, Métatron. Plus une 9e fiche technique, `prototype-technique`,
  utilisée uniquement pour vérifier le moteur.
- 12 thèmes personnages (`default`, `vide-oppressant`, `vie-sauvage`,
  `amour-douleur`, `or-maudit`, `masque-voile`, `feu-timide`, `arche`,
  `argent-froid`, `cage-doree`, `fer-et-terre`, `lumiere-construite`),
  résolus par `themeKey`, fallback `default`.
- Typographie assumée : Cormorant Garamond (titres), Spectral (lecture,
  italique comprise), Space Grotesk (interface), chargées via `next/font/google`.
- Moteur de composition (`src/components/personnages/compositions/`), axe
  séparé de `themeKey` : le thème porte la palette et l'atmosphère, la
  composition porte la mise en page. Neuf compositions existent —
  `standard` (repli, rendu historique), `fragment` (Kael l'Éclipsé),
  `retable` (Elias), `cage` (Métatron), `canopee` (Ysolde), `titan`
  (Varros), `theatre` (Soryn), `orfevrerie` (Aurélia) et `agape` (Amara).
  Résolues par le champ `composition` de `data.json`, repli sur `standard`
  si absent ou inconnu. Tous les personnages réels ont désormais une
  composition propre : la phase de différenciation visuelle des
  personnages est terminée (voir `docs/NEXT_STEPS.md`).
- Composition `canopee` (Ysolde) : lianes en croissance procédurale sur
  canvas s'enroulant autour du nom (deux plans avant/arrière), pluie,
  papillons, mousse qui reprend visuellement les sections déjà lues,
  pousse finale.
- Ibuki ajouté au récit et aux `links` d'Ysolde.
- Composition `titan` (Varros) : page qui penche à gauche, bras maudit qui
  pulse, impact aléatoire toutes les 11-26s, runes Elder Futhark, chaînes
  brisées en diagonale.
- Composition `theatre` (Soryn) : proscenium fixe, nom double décalé avec
  alias révélé au survol, masques de Thalie et Melpomène qui s'échangent,
  craquelure liée au défilement.
- Composition `orfevrerie` (Aurélia) : présentoir à deux montants d'or
  ouverts en haut et en bas, transmutation au contact réel du curseur
  (`pointerenter`) et définitive, compteur pondéré par la longueur du
  texte, cage de verre, Cercle d'Équilibre or/argent, Flux d'Argent au
  défilement, apparitions hésitantes.
- Récit d'Aurélia enrichi : la cage de verre, l'Ancre comme restriction et
  non comme puissance, Khemetra et le fleuve pris en otage.
- Composition `agape` (Amara) : réciprocité (ce que le lecteur réchauffe
  s'éteint ailleurs, réversible), nom et sceau qui battent au même rythme
  cardiaque, sceau en vesica piscis, récit en italique comme une lettre,
  jardin du général en fin de page.
- Fiche Amara corrigée : elle est un électron libre, ni Arquet ni Pilier.
- Système d'images : champ `images` optionnel dans `data.json`,
  `next/image` en `fill`, voile amortisseur, bascule entre deux images au
  défilement (Varros : le champ de blé cède au cratère ; Aurélia : la main
  d'or en haut, la cage brisée plus bas). Les images vivent dans
  `public/personnages/<slug>/`.
- Champ `illusions` : formulations alternatives qui changent hors du
  viewport (Soryn, « le doute comme arme ») — la formulation varie, jamais
  le fait énoncé.
- `RevealAuDefilement` (`src/components/personnages/effects/`) : apparition
  au défilement, déclinée par composition (pousse / se condense / s'allume
  / se pose / tombe / rideau qui se lève selon le personnage). Le contenu
  n'est jamais masqué par défaut : le HTML servi est lisible, le masquage
  n'intervient qu'au premier rendu client, avec révélation immédiate de ce
  qui est déjà à l'écran et un filet de sûreté à 3 secondes.
- `rafPartage` : une seule boucle `requestAnimationFrame` partagée pour
  toute la page, utilisée par les effets de la composition `canopee`.
- Champ `identity.unrecorded` : liste de champs volontairement non
  consignés, affichés vides par certaines compositions (ex. `fragment`).
- Fiche Métatron complète (`draft`, `themeKey: "cage-doree"`, composition
  `cage`).
- Mécanisme de possession : champ optionnel `possession` de `data.json`
  (`entity`, `entitySlug`, `sync`, `verdicts`), réutilisable pour toute
  fiche où une entité tient partiellement ou totalement la page d'un
  hôte. Exemples : Célestine à `sync: 100`, Solomon à `sync: 80`, Darian
  possédé par une autre entité.
- Modèle VOLUME : la synchronisation (`possession.sync`) est un curseur
  0-100, et l'état de la page EST cette valeur — pas une donnée annexe
  illustrée à côté. Territoires : 0-35 hôte pur, 35-55 présence, 55-85
  lutte, 85-100 cage, 100 page de l'entité complète.
- Système de signatures visuelles séparé (`src/components/personnages/signatures/`) :
  pilote complet sur Kael l'Éclipsé (arrivée, dissolution du nom,
  effacement au pointeur, fumée, labels rongés, dénégation périodique,
  bordures qui respirent, sortie dissoute). Les compositions exposent des
  ancrages stables (`data-personnage-content`, `-exit`, `-erasable`,
  `-withdrawable`) que la signature Kael consomme au lieu de deviner la
  structure du DOM.
- Thème `vide-oppressant` corrigé vers le canon : palette resserrée sur un
  ciel nocturne sans étoiles, plutôt qu'un vide teinté.
- Protection `draft`/`published` stable ; preview interne
  (`/personnages/preview`) jamais exposée en production.
- Pages de sections placeholder : `/factions`, `/magie`, `/carte`,
  `/chronologie`, `/evenements`, `/archives`.
- Moteur Factions complet : types (`src/types/faction.ts`), validation
  stricte et chargement (`src/lib/factions.ts`), routes
  `/factions/[slug]` et `/factions/preview/[slug]`, registre de
  compositions (`src/components/factions/compositions/`), protection
  `draft`/`published` (le membre reste affiché, seul le lien vers sa
  fiche personnage disparaît si elle n'est pas publiée).
- Première faction : L'Ordre de l'Arquet (`draft`, composition
  `palimpseste`, thème `arche`).
- Composition `palimpseste` : cinq strates en CSS statique (I Les
  Chercheurs de l'Arché → V La main), dérive de typographie, largeur de
  colonne, accent et couleur de corps entre strates voisines ; cinq
  fonds photographiques qui se relaient sur des ancres `data-fond` ;
  rail latéral avec cote de progression et curseur de niveau ; canvas de
  cendres ; voiles chaud/froid ; calque de nuit ; jauge de progression ;
  irréversibilité par `maxProg` — remonter en haut de page ne restitue
  jamais l'état initial.
- Thème `arche` : cinq états, accent or `#c9a15f` dérivant vers le gris.
- **Ordre des Chevaliers de la Cité des Héros — canon et images prêts,
  rien d'implémenté.** `docs/CHEVALIERS_CANON.md`,
  `docs/CHEVALIERS_COMPOSITION.md` et 4 images
  (`public/factions/ordre-des-chevaliers/`) existent depuis le
  2026-08-24. Aucune entrée dans `src/content/factions/`, aucune
  composition, aucun code ne référence cette faction : elle n'apparaît
  nulle part sur le site.
- **Tout le contenu est en `draft`.** 9 personnages (dont
  `prototype-technique`) et l'unique faction (Arquet) sont en
  `publicationStatus: "draft"`. Le site public n'expose donc aucune
  fiche : `/personnages` et `/factions` listent des ensembles vides,
  toute route `[slug]` renvoie 404.

## Ce qui manque

- Dette technique accumulée sur les compositions (boîtes fermées à
  retirer, gravures runiques Métatron) — détail dans `docs/NEXT_STEPS.md`.
- Moteur structuré pour lieux, événements, archives, magie transverse
  (le moteur Factions, lui, existe et fonctionne — voir ci-dessus).
- Sections vides sans contenu réel (Factions en priorité), page d'accueil,
  navigation interne des fiches personnages.

## État de build (vérifié le 2026-09-06)

- `npm run build` passe : Next.js 16.2.7, compilation ~9 s, TypeScript
  sans erreur, 12 pages générées.
- `npm run lint` est cassé : `next lint` reçoit `lint` comme argument de
  répertoire de projet et échoue immédiatement (« Invalid project
  directory provided »). À corriger séparément.
