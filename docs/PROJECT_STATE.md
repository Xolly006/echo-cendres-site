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
  Aurélia, Soryn, Métatron.
- 7 thèmes personnages (`default`, `vide-oppressant`, `vie-sauvage`,
  `amour-douleur`, `or-maudit`, `masque-voile`, `feu-timide`), résolus par
  `themeKey`, fallback `default`.
- Typographie assumée : Cormorant Garamond (titres), Spectral (lecture,
  italique comprise), Space Grotesk (interface), chargées via `next/font/google`.
- Moteur de composition (`src/components/personnages/compositions/`), axe
  séparé de `themeKey` : le thème porte la palette et l'atmosphère, la
  composition porte la mise en page. Sept compositions existent —
  `standard` (rendu historique), `fragment` (Kael l'Éclipsé), `retable`
  (Elias), `cage` (Métatron), `canopee` (Ysolde), `titan` (Varros) et
  `theatre` (Soryn). Résolues par le champ `composition` de `data.json`,
  repli sur `standard` si absent ou inconnu.
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
- Système d'images : champ `images` optionnel dans `data.json`,
  `next/image` en `fill`, voile amortisseur, bascule entre deux images au
  défilement (Varros : le champ de blé cède au cratère). Les images
  vivent dans `public/personnages/<slug>/`.
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

## Ce qui manque

- Des compositions dédiées pour les personnages majeurs restants
  (voir `docs/NEXT_STEPS.md` pour le prochain personnage).
- Dette technique accumulée sur les compositions (gravures runiques,
  réglages fins, récits trop courts) — détail dans `docs/NEXT_STEPS.md`.
- Tout moteur structuré pour factions, lieux, événements, archives, magie transverse.
