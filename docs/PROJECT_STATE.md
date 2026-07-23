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
- Une seule mise en page, `StandardImmersivePersonnage`, partagée par tous
  les personnages.
- Système de signatures visuelles séparé (`src/components/personnages/signatures/`) :
  pilote complet sur Kael l'Éclipsé (arrivée, dissolution du nom,
  effacement au pointeur, fumée, labels rongés, dénégation périodique,
  bordures qui respirent, sortie dissoute).
- Protection `draft`/`published` stable ; preview interne
  (`/personnages/preview`) jamais exposée en production.
- Pages de sections placeholder : `/factions`, `/magie`, `/carte`,
  `/chronologie`, `/evenements`, `/archives`.

## Ce qui manque

- Une typographie réellement choisie et assumée.
- Un axe de composition (mise en page) séparé du thème.
- Des mises en page différenciées pour les personnages majeurs au-delà de Kael.
- Tout moteur structuré pour factions, lieux, événements, archives, magie transverse.

## Problème identifié

- Les 7 thèmes ne diffèrent aujourd'hui que par la palette : 7 fonds
  quasi-noirs, 7 textes crème, la même serif système et Inter partout.
- La mise en page est identique pour tous via `StandardImmersivePersonnage` :
  même grille, mêmes blocs, dans le même ordre.
- Résultat : le site ressemble à une base de données repeinte, pas à un
  Livre-Monde différencié.
- La signature de Kael est correcte en elle-même, mais elle entre en
  contradiction avec une mise en page qui affirme systématiquement la
  présence du personnage — l'effacement de Kael se joue contre sa propre
  mise en page, pas avec elle.
