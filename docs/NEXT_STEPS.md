# Prochaines étapes

## Phase 2 — Différenciation visuelle

Fait :

1. **Typographie réelle** — Cormorant Garamond, Spectral et Space Grotesk
   chargées via `next/font/google`, remplacent les polices système.
2. **Moteur de composition** — axe `composition` séparé de `themeKey` dans
   `src/components/personnages/compositions/`. Le thème porte la palette
   et l'atmosphère ; la composition porte la mise en page. Neuf
   compositions existent aujourd'hui : `standard`, `fragment`, `retable`,
   `cage`, `canopee`, `titan`, `theatre`, `orfevrerie`, `agape` (elles ont
   été ajoutées progressivement, voir les points 3 à 9 ci-dessous).
3. **Kael l'Éclipsé en composition "fragment"** — mise en page qui affirme
   sa présence, en tension avec la signature qui l'efface.

4. **Elias en composition "retable"** — Elias en composition "retable",
   fiche Métatron en composition "cage", mécanisme de possession
   (`possession`, modèle VOLUME) et transition entre les deux pages.
5. **Ysolde en composition "canopee"** — lianes procédurales autour du nom,
   pluie, papillons, mousse qui reprend les sections lues, pousse finale ;
   Ibuki ajouté au récit et aux `links` d'Ysolde ; `RevealAuDefilement`
   décliné par composition ; `rafPartage`, boucle d'animation unique pour
   la page.
6. **Varros en composition "titan"** — page qui penche à gauche, bras
   maudit qui pulse, impact aléatoire toutes les 11-26s, runes Elder
   Futhark, chaînes brisées en diagonale ; système d'images (`images`,
   voile amortisseur, bascule champ de blé / cratère au défilement).
7. **Soryn en composition "theatre"** — proscenium fixe, nom double décalé
   avec alias révélé au survol, masques de Thalie et Melpomène qui
   s'échangent, craquelure liée au défilement ; champ `illusions`
   (formulations alternatives hors viewport).
8. **Aurélia en composition "orfevrerie"** — présentoir à deux montants
   d'or, transmutation au contact réel du curseur et définitive, compteur
   pondéré par la longueur du texte, cage de verre, Cercle d'Équilibre
   or/argent, Flux d'Argent au défilement, apparitions hésitantes ; récit
   enrichi (cage de verre, Ancre comme restriction, Khemetra et le fleuve
   pris en otage) ; images (main d'or en haut, cage brisée plus bas).
9. **Amara en composition "agape"** — réciprocité (ce que le lecteur
   réchauffe s'éteint ailleurs, réversible), nom et sceau qui battent au
   même rythme cardiaque, sceau en vesica piscis, récit en italique comme
   une lettre, jardin du général en fin de page ; fiche corrigée (électron
   libre, ni Arquet ni Pilier).

**Phase personnages terminée** : les 8 personnages réels ont chacun une
composition propre.

Dette technique notée :

- Boîtes rectangulaires fermées à retirer sur Varros et Soryn (motif de
  conteneur convergent, voir docs/DECISIONS.md).
- Gravures runiques encore à faire sur la fiche Métatron.

## Factions

Fait :

1. **L'Ordre de l'Arquet** — composition `palimpseste`, thème `arche`,
   maquette HTML reproduite (voir docs/DECISIONS.md, 2026-08-13).

Dette assumée : le texte de l'Arquet est en dur dans
`PalimpsesteFaction.tsx`, `histoire.mdx` n'est plus lu pour cette
faction (voir docs/DECISIONS.md). À ne pas reproduire sur les
prochaines factions.

## Prochaines pistes

- Remettre `histoire.mdx` en service sur l'Arquet (dette ci-dessus).
- Puis Chevaliers de la Cité des Héros (canon déjà complet) ou Piliers
  (contradictions à arbitrer avant : chronologies).
- Nouveaux personnages à extraire du document source, un par un, après
  validation du créateur.
- Page d'accueil.
- Navigation interne des fiches personnages (sommaire de lecture).

Dettes existantes conservées : boîtes rectangulaires fermées à retirer
sur Varros et Soryn, gravures runiques encore à faire sur la fiche
Métatron (détail dans "Dette technique notée" ci-dessus).

## Chantiers vérifiés (2026-09-06)

- **Publier une première fiche.** Tout le contenu est en `draft`
  (voir `docs/PROJECT_STATE.md`) ; le site public n'expose encore rien.
  Varros est déjà désigné témoin de non-régression (`CLAUDE.md`) : c'est
  le candidat naturel pour la première bascule vers `published`.
- **Extraction du squelette partagé** — décision 6 du lot 1
  (`docs/DECISIONS.md`, 2026-09-06). Les neuf compositions rendent le
  même squelette (scène · couche décorative · content · intro · blocs ·
  narrative · exit) ; seule la décoration varie. Environ 6 500 lignes de
  compositions à ramener vers 2 500, à rendu identique.
- **Dette Arquet — duplication canon/rendu.** 34 des 65 paragraphes de
  `src/content/factions/ordre-de-l-arquet/histoire.mdx` sont copiés à
  l'identique dans `PalimpsesteFaction.tsx`, et seul le `.tsx` s'affiche
  (voir dette assumée ci-dessus). Toute correction de canon doit être
  faite deux fois tant que ce n'est pas résolu.
- **`links` et `uncertainties` orphelins.** Déclarés dans les types
  (`src/types/personnage.ts`), validés au chargement
  (`src/lib/personnages.ts`), mais rendus presque nulle part : seule la
  composition `retable` les affiche. À brancher dans les autres
  compositions ou à retirer des types.

## Backlog long terme

- Moteur lieux (`src/content/lieux`, modèle `Lieu`, carte SVG interactive).
- Moteur événements (`src/content/evenements`, modèle `Evenement`, pages `/evenements/[slug]`).
- Moteur archives (`src/content/archives`, modèle `Archive`).
- IA experte du Livre-Monde (RAG, citation de sources, jamais d'invention de canon).
- Carte interactive et chronologie dynamique.
