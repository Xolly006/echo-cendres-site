# CLAUDE.md — L'Écho des Cendres : Le Livre-Monde

Ce fichier cadre chaque session Claude Code sur ce dépôt. Les règles absolues
sont dans `AGENTS.md` : elles s'appliquent intégralement. Ce fichier ajoute
le contexte opérationnel.

## Démarrage obligatoire de session

Avant tout code, lire dans cet ordre :

1. `docs/PROJECT_STATE.md` — état réel du projet.
2. `docs/NEXT_STEPS.md` — prochaines étapes ordonnées.
3. `docs/DECISIONS.md` — décisions et garde-fous en vigueur.

Ne jamais supposer l'état du projet depuis la mémoire d'une session
précédente : ces trois fichiers sont la seule source de vérité.

## Commandes

```bash
npm run dev     # dev local (régénère le registre narratif via predev)
npm run build   # build + vérification TypeScript — à lancer après toute modif
npm run lint    # lint
```

Le registre `src/content/personnages/narrative-registry.ts` est généré
automatiquement par `scripts/generate-personnage-narratives.mjs`.
Ne jamais l'éditer à la main.

## Architecture (carte rapide)

- `src/content/personnages/[slug]/` — source de vérité d'un personnage :
  `data.json` (structure) + `histoire.mdx` (récit, Markdown simple uniquement,
  sans imports, HTML, JSX ni expressions JS).
- `src/lib/personnages.ts` — chargement et validation stricte des fiches.
- `src/types/personnage.ts` — modèle de données. Ne pas ajouter de champ
  sans décision documentée dans `docs/DECISIONS.md`.
- `src/themes/personnages/` — familles de thèmes (palette, typo, atmosphère),
  résolues par `themeKey`, fallback `default`.
- `src/components/personnages/effects/` — atmosphère et particules standard,
  partagées. Aucun effet propre à un personnage ici.
- `src/components/personnages/signatures/` — signatures visuelles propres aux
  personnages majeurs, résolues par slug. Système séparé, pilote : Kael.
- `src/app/personnages/preview/` — preview locale des drafts. Ne jamais
  affaiblir la protection : les `draft` restent invisibles en production.

## Garde-fous spécifiques à ce dépôt

- `publicationStatus: "draft"` ne passe jamais à `"published"` sans demande
  explicite du créateur dans la session en cours.
- Aucun contenu de lore (noms, pouvoirs, relations, événements) n'est inventé,
  déduit ou "complété". Si une information manque : la marquer "à valider"
  et poser la question au créateur.
- Une tâche = un périmètre de fichiers annoncé à l'avance. Aucune modification
  hors périmètre sans accord.
- Pas de nouvelle dépendance, pas de refactor du moteur de thèmes, pas de
  nouveau champ de données sans validation.
- Toute animation respecte `prefers-reduced-motion` et ne dégrade jamais la
  lisibilité du récit MDX.
- Après toute modification : `npm run build` doit passer, et vérifier qu'une
  fiche SANS la fonctionnalité modifiée reste identique (Varros sert de témoin).

## Fin de session obligatoire

Avant de terminer une tâche :

1. Mettre à jour `docs/PROJECT_STATE.md` (ce qui existe maintenant).
2. Mettre à jour `docs/NEXT_STEPS.md` (ce qui reste à faire).
3. Ajouter toute décision nouvelle dans `docs/DECISIONS.md`.
4. Résumer les fichiers modifiés et comment tester.

C'est ce qui permet à la session suivante — humaine ou IA — de reprendre
sans rien perdre.

## Format de tâche attendu du créateur

Le créateur donne idéalement : objectif, fichiers autorisés, critères
d'acceptation. Si le périmètre est flou, proposer un plan en 5 points maximum
et attendre validation avant de coder.
