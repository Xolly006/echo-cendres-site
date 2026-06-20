# Handoff IA du projet

Ce document permet à une future session IA, Codex ou autre assistant, de reprendre le projet sans dépendre d’un historique ChatGPT.

## 1. But du projet

L’Écho des Cendres est un site Livre-Monde en Next.js. Il doit présenter progressivement une encyclopédie narrative interactive : personnages, factions, magie, événements, cartes, chronologie et archives.

Le projet doit avancer par petites étapes vérifiables. Le canon appartient au créateur : aucune IA ne doit inventer, valider ou modifier le lore sans validation explicite.

## 2. État actuel du moteur personnages

Le moteur personnages existe déjà et repose sur une source de vérité locale :

```txt
src/content/personnages/[slug]/
  data.json
  histoire.mdx
```

Éléments déjà présents :

* fiches personnages structurées en `data.json` ;
* récits longs optionnels en `histoire.mdx` ;
* registre narratif généré par `scripts/generate-personnage-narratives.mjs` ;
* rendu MDX serveur via `@next/mdx` ;
* thèmes personnages via `themeKey` ;
* filtres de catalogue sur `/personnages` ;
* état vide propre du catalogue ;
* preview interne des drafts via `/personnages/preview` ;
* page `/factions` placeholder pour les grandes forces du Livre-Monde ;
* page `/magie` placeholder pour les grands axes magiques ;
* page `/carte` placeholder pour le futur Atlas du Livre-Monde ;
* page `/chronologie` placeholder pour les grands axes temporels du Livre-Monde ;
* page `/evenements` placeholder pour les futurs types d’événements du Livre-Monde ;
* page `/archives` placeholder pour la future mémoire du processus créatif ;
* documentation de direction artistique dans `docs/SIGNATURES_VISUELLES_PERSONNAGES.md`.

La page publique `/personnages` utilise seulement les personnages en `publicationStatus: "published"`. Les drafts restent invisibles publiquement.

La page `/factions` existe comme point d’entrée statique. Elle présente L’Arquet, les Piliers de l’Existence, les Électrons libres / Anomalies et les autres forces à documenter plus tard. Elle ne crée pas encore de modèle `Faction`, de dossier `src/content/factions` ou de liens dynamiques.

La page `/magie` existe comme point d’entrée statique. Elle présente Concepts, Éveils, Domaines, Arquet / Piliers / anomalies et magie comme force narrative. Elle ne crée pas encore de modèle `Magic`, de dossier `src/content/magie` ou de liens dynamiques entre personnages, Concepts et systèmes magiques.

La page `/carte` existe comme point d’entrée statique pour le futur Atlas. Elle présente Monde physique, Abîme, plans célestes / Celestia, lieux vivants et zones sacrées, et futur atlas interactif. Elle ne crée pas encore de modèle `Lieu`, de dossier `src/content/lieux`, de carte SVG interactive, de système de coordonnées ou de liens dynamiques.

La page `/chronologie` existe comme point d’entrée statique pour la future histoire du Livre-Monde. Elle présente Âges anciens, Âges des ruptures, Ère actuelle et Chronologie future. Elle ne crée pas encore de modèle `Evenement`, de dossier `src/content/evenements`, de moteur de chronologie dynamique ou de liens dynamiques entre événements, personnages, lieux ou factions.

La page `/evenements` existe comme point d’entrée statique pour les futurs événements du Livre-Monde. Elle présente événements fondateurs, guerres et ruptures, scellements et catastrophes, rencontres et bascules, et futur moteur d’événements. Elle ne crée pas encore de modèle `Evenement`, de dossier `src/content/evenements`, de route dynamique `/evenements/[slug]`, de moteur d’événements ou de liens dynamiques.

La page `/archives` existe comme point d’entrée statique pour la future mémoire du processus créatif. Elle présente anciennes versions, propositions IA, contradictions à vérifier, scènes potentielles et contenus retirés. Une information archivée n’est pas automatiquement canon public, les archives ne remplacent pas les fiches publiées et aucun contenu existant n’a été déplacé.

## 3. Personnages réels actuellement en draft

Personnages réels intégrés en brouillon :

* Kael l’Éclipsé — `kael-eclipse` — `vide-oppressant`
* Varros le Fléau — `varros-fleau` — `default`
* Elias — `elias-pilier-sacre` — `default`
* Ysolde la Sauvage — `ysolde-sauvage` — `vie-sauvage`
* Amara — `amara-mere-douleurs` — `amour-douleur`

Tous doivent rester en `publicationStatus: "draft"` jusqu’à validation explicite du créateur.

## 4. Thèmes disponibles

Thèmes personnages disponibles :

* `default`
* `vide-oppressant`
* `vie-sauvage`
* `amour-douleur`

Ces thèmes sont des familles sensorielles réutilisables. Ils ne sont pas des signatures uniques réservées à un seul personnage.

Ne pas créer un thème pour chaque personnage. Un nouveau thème doit être justifié par une famille réutilisable, pas par un effet ponctuel.

## 5. Règles absolues

* Ne jamais changer un `publicationStatus` sans demande explicite.
* Ne jamais publier les drafts en production.
* Ne pas créer une signature visuelle unique trop tôt.
* Ne pas créer un thème par personnage.
* Ne pas modifier plusieurs systèmes dans une seule tâche.
* Ne pas mélanger canon, direction artistique, code et documentation dans un seul prompt.
* Préférer les tags existants avant d’ajouter de nouveaux champs.
* Ne pas utiliser `git add .` par défaut.
* Toujours vérifier `git status --short` avant et après une tâche.
* Restaurer `next-env.d.ts` s’il change sans raison claire.
* Ne jamais considérer une proposition IA comme canonique automatiquement.
* Ne jamais lancer `npm audit fix --force`.

## 6. Workflow Git recommandé

1. Lancer `git status --short`.
2. Donner une tâche unique à Codex.
3. Lire la réponse de Codex.
4. Vérifier `git diff`.
5. Vérifier les `publicationStatus`.
6. Ajouter les fichiers ciblés avec `git add <fichier>`.
7. Commit avec `git commit -m "..."`.
8. Push avec `git push`.
9. Relancer `git status`.
10. Documenter la feature si nécessaire.

Éviter les commits géants. Une tâche claire, un commit clair.

## 7. Convention de commits

Préfixes recommandés :

* `feat(...)` pour une nouvelle fonctionnalité ;
* `fix(...)` pour une correction ;
* `docs` pour la documentation ;
* `style(...)` pour l’apparence sans logique ;
* `refactor(...)` pour restructurer sans changer le comportement ;
* `chore` pour la maintenance technique.

Exemples :

* `feat(personnages): ajouter Amara en draft`
* `feat(personnages): ajouter la preview interne des drafts`
* `feat(personnages): ajouter les filtres de catalogue`
* `fix(personnages): corriger les détails canon d'Elias`
* `docs: noter Amara comme cinquième personnage draft`
* `docs: noter la preview interne des drafts`

## 8. Prompts Codex réutilisables

### A. Ajouter un personnage en draft

```text
Lis d’abord AGENTS.md, docs/PROJECT_STATE.md, docs/DECISIONS.md, docs/NEXT_STEPS.md, docs/CONTINUATION_GUIDE.md, src/content/personnages/README.md, src/types/personnage.ts et src/lib/personnages.ts.

Tâche unique :
Créer uniquement une fiche personnage en draft dans src/content/personnages/[slug]/ avec data.json et histoire.mdx.

Contraintes :
- ne pas modifier les autres personnages ;
- ne pas modifier les thèmes ;
- ne pas changer un publicationStatus existant ;
- le nouveau personnage doit rester en "draft" ;
- ne pas ajouter de dépendance ;
- ne pas commencer une autre tâche.

Après création :
- lancer node scripts/generate-personnage-narratives.mjs ;
- lancer npx tsc --noEmit --ignoreDeprecations 6.0 ;
- lancer npm run build ;
- indiquer précisément les fichiers créés.
```

### B. Ajouter une famille de thème

```text
Lis d’abord AGENTS.md, docs/PROJECT_STATE.md, docs/DECISIONS.md, docs/NEXT_STEPS.md, docs/SIGNATURES_VISUELLES_PERSONNAGES.md, src/types/personnage-theme.ts et src/themes/personnages/.

Tâche unique :
Créer une nouvelle famille de thème personnage standard appelée [theme-key].

Contraintes :
- ne pas créer de personnage ;
- ne pas modifier les data.json ;
- ne pas changer publicationStatus ;
- ne pas créer une signature visuelle unique ;
- ne pas ajouter de dépendance ;
- ne pas commencer une autre tâche.

Après modification :
- lancer npx tsc --noEmit --ignoreDeprecations 6.0 ;
- lancer npm run build ;
- indiquer les fichiers créés et modifiés.
```

### C. Documenter une feature

```text
Lis uniquement les fichiers concernés par la feature.

Tâche unique :
Mettre à jour la documentation pour refléter [feature].

Contraintes :
- ne pas modifier le code ;
- ne pas modifier les thèmes ;
- ne pas modifier les contenus personnages ;
- ne changer aucun publicationStatus ;
- ne pas commencer une autre tâche.

Après modification :
- indiquer précisément les fichiers modifiés.
```

### D. Ajouter une feature moteur personnages

```text
Lis d’abord AGENTS.md, docs/PROJECT_STATE.md, docs/DECISIONS.md, docs/NEXT_STEPS.md, src/types/personnage.ts, src/lib/personnages.ts et les composants concernés.

Tâche unique :
Ajouter [feature] au moteur personnages.

Contraintes :
- ne pas créer de personnage ;
- ne pas modifier les thèmes ;
- ne pas publier les drafts ;
- ne pas modifier les data.json sauf demande explicite ;
- ne pas ajouter de dépendance ;
- ne pas commencer une autre tâche.

Après modification :
- lancer npx tsc --noEmit --ignoreDeprecations 6.0 ;
- lancer npm run build ;
- confirmer que les drafts restent protégés.
```

### E. Vérifier les drafts

Commandes utiles :

```bash
grep -n "publicationStatus" src/content/personnages/kael-eclipse/data.json
grep -n "publicationStatus" src/content/personnages/varros-fleau/data.json
grep -n "publicationStatus" src/content/personnages/elias-pilier-sacre/data.json
grep -n "publicationStatus" src/content/personnages/ysolde-sauvage/data.json
grep -n "publicationStatus" src/content/personnages/amara-mere-douleurs/data.json
```

Tous ces personnages doivent rester en `"draft"` tant que le créateur n’a pas demandé explicitement leur publication.

## 9. Reprise sans ChatGPT Plus

Dans une nouvelle session IA, commencer par donner ce message :

```text
Lis d’abord AGENTS.md, docs/AI_HANDOFF.md, docs/PROJECT_STATE.md et docs/NEXT_STEPS.md.
Ne commence aucune tâche.
Résume d’abord l’état actuel du projet, les règles à respecter, les personnages existants, les thèmes existants et la prochaine étape recommandée.
```

Ensuite seulement, donner une tâche unique et limitée.

Ne pas supposer que la nouvelle IA connaît l’historique précédent. Tout ce qui compte doit être dans les fichiers du dépôt.

## 10. Prochaines étapes possibles

Pistes possibles, à traiter une par une :

* stabiliser la preview interne ;
* améliorer la navigation catalogue ;
* enrichir prudemment la page Factions sans créer de modèle avant validation ;
* enrichir prudemment la page Magie sans créer de modèle avant validation ;
* enrichir prudemment la page Carte sans créer de modèle avant validation ;
* enrichir prudemment la page Chronologie sans créer de modèle avant validation ;
* enrichir prudemment la page Événements sans créer de modèle avant validation ;
* enrichir prudemment la page Archives sans créer de modèle avant validation ;
* ajouter les premiers liens internes seulement après validation des slugs ;
* continuer les personnages par petits lots ;
* éviter de bloquer tout le projet sur les fiches personnages.

Le projet doit rester progressif : une tâche, un périmètre, une vérification.
