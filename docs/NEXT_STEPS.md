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

Prochaine étape :

4. **Elias en composition "retable"** — mise en page dédiée pour Elias,
   une page Métatron claire (contrainte, pas identité d'Elias), et une
   transition soignée entre les deux.

Ensuite :

5. **Déploiement progressif** — étendre les compositions validées aux
   autres personnages majeurs, un par un, après validation du créateur.

## Backlog long terme

- Moteur factions (`src/content/factions`, modèle `Faction`, liens personnages ↔ factions).
- Moteur lieux (`src/content/lieux`, modèle `Lieu`, carte SVG interactive).
- Moteur événements (`src/content/evenements`, modèle `Evenement`, pages `/evenements/[slug]`).
- Moteur archives (`src/content/archives`, modèle `Archive`).
- IA experte du Livre-Monde (RAG, citation de sources, jamais d'invention de canon).
- Carte interactive et chronologie dynamique.
