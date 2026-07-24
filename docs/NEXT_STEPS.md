# Prochaines étapes

## Phase 2 — Différenciation visuelle

Fait :

1. **Typographie réelle** — Cormorant Garamond, Spectral et Space Grotesk
   chargées via `next/font/google`, remplacent les polices système.
2. **Moteur de composition** — axe `composition` séparé de `themeKey` dans
   `src/components/personnages/compositions/`. Le thème porte la palette
   et l'atmosphère ; la composition porte la mise en page. Deux
   compositions existent : `standard` et `fragment`.
3. **Kael l'Éclipsé en composition "fragment"** — mise en page qui affirme
   sa présence, en tension avec la signature qui l'efface.

4. **Elias en composition "retable"** — Elias en composition "retable",
   fiche Métatron en composition "cage", mécanisme de possession
   (`possession`, modèle VOLUME) et transition entre les deux pages.

Dette technique notée :

- Gravures runiques encore à faire sur la fiche Métatron.
- Réglages fins des répartitions du modèle VOLUME (seuils 35/55/85 à
  affiner à l'usage).

Prochaine étape :

5. **Personnage suivant** — choisir le prochain personnage majeur à
   porter en composition dédiée, après validation du créateur.

## Backlog long terme

- Moteur factions (`src/content/factions`, modèle `Faction`, liens personnages ↔ factions).
- Moteur lieux (`src/content/lieux`, modèle `Lieu`, carte SVG interactive).
- Moteur événements (`src/content/evenements`, modèle `Evenement`, pages `/evenements/[slug]`).
- Moteur archives (`src/content/archives`, modèle `Archive`).
- IA experte du Livre-Monde (RAG, citation de sources, jamais d'invention de canon).
- Carte interactive et chronologie dynamique.
