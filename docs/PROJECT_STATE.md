# État actuel du projet

## Vision

Construire un Livre-Monde interactif pour L'Écho des Cendres : chaque
personnage majeur doit avoir une présence visuelle propre, pas une fiche
de données interchangeable derrière une couleur différente.

## Stack

- Next.js, React, TypeScript
- CSS (variables CSS pour les thèmes), canvas natif pour les effets
- `@next/mdx` pour le récit narratif des personnages

## Ce qui existe

- Moteur personnages stable : `data.json` + `histoire.mdx` par personnage,
  chargement et validation stricts (`src/lib/personnages.ts`).
- 7 personnages réels en `draft` : Kael, Varros, Elias, Ysolde, Amara,
  Aurélia, Soryn.
- 7 thèmes personnages (`default`, `vide-oppressant`, `vie-sauvage`,
  `amour-douleur`, `or-maudit`, `masque-voile`, `feu-timide`), résolus par
  `themeKey`, fallback `default`.
- Typographie assumée : Cormorant Garamond (titres), Spectral (lecture,
  italique comprise), Space Grotesk (interface), chargées via `next/font/google`.
- Moteur de composition (`src/components/personnages/compositions/`), axe
  séparé de `themeKey` : le thème porte la palette et l'atmosphère, la
  composition porte la mise en page. Deux compositions existent —
  `standard` (rendu historique, utilisé par les 6 personnages non
  vitrines) et `fragment` (Kael l'Éclipsé). Résolues par le champ
  `composition` de `data.json`, repli sur `standard` si absent ou inconnu.
- Champ `identity.unrecorded` : liste de champs volontairement non
  consignés, affichés vides par certaines compositions (ex. `fragment`).
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

- Des compositions dédiées pour les personnages majeurs au-delà de Kael
  (Elias est la prochaine étape — voir `docs/NEXT_STEPS.md`).
- Tout moteur structuré pour factions, lieux, événements, archives, magie transverse.
