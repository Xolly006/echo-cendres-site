# Guide de continuation du projet

Ce guide sert à reprendre le développement du Livre-Monde proprement, même sans assistance IA forte.

## 1. État actuel du projet

Le moteur personnages est actif. Chaque personnage possède son propre dossier dans `src/content/personnages/`.

Structure actuelle d’une fiche :

```txt
src/content/personnages/[slug]/
  data.json
  histoire.mdx
```

`data.json` contient les données courtes et structurées. `histoire.mdx` contient le récit long.

Le projet possède aussi :

* des thèmes personnages ;
* une atmosphère CSS ;
* des particules légères ;
* une section Identité ;
* une section Magie ;
* plusieurs personnages réels en `draft`, dont Kael l’Éclipsé et Aurélia / Reine Midas comme personnages vitrines de preview.

## 2. Commandes importantes

* `npm run dev` : lancer le serveur local de développement.
* `npm run build` : vérifier que le projet compile en production.
* `npx tsc --noEmit --ignoreDeprecations 6.0` : vérifier TypeScript sans générer de fichiers.
* `node scripts/generate-personnage-narratives.mjs` : régénérer le registre des récits `histoire.mdx`.
* `git status --short` : voir rapidement les fichiers modifiés.
* `git add <fichier>` : ajouter seulement les fichiers voulus au commit.
* `git commit -m "message"` : créer un commit clair.
* `git push` : envoyer les commits vers le dépôt distant.

`npm run dev`, `npm run build` et `npm start` lancent automatiquement le générateur de récits avant Next.js.

## 3. Ajouter un personnage

Workflow recommandé :

1. Extraire les informations depuis `Magic.txt` ou une source privée.
2. Séparer canon, à vérifier, contradictoire et proposition.
3. Faire valider le canon par le créateur.
4. Créer `src/content/personnages/[slug]/data.json`.
5. Créer `src/content/personnages/[slug]/histoire.mdx`.
6. Garder `publicationStatus: "draft"`.
7. Lancer `node scripts/generate-personnage-narratives.mjs`.
8. Tester localement.
9. Commit/push après vérification.

Ne pas mettre tout le lore brut dans GitHub. Intégrer seulement les informations validées et nécessaires.

## 4. Tester un personnage en local

Pour tester une fiche sans la publier :

1. Garder `publicationStatus` à `"draft"`.
2. Lancer `node scripts/generate-personnage-narratives.mjs`.
3. Lancer `npm run dev`.
4. Ouvrir `/personnages/preview`.
5. Ouvrir ensuite `/personnages/preview/[slug]`.
6. Vérifier le rendu, le thème, l’identité, la magie et le récit.

Le mode preview est réservé au développement local. En production, les routes `/personnages/preview` et `/personnages/preview/[slug]` affichent un état indisponible et ne lisent pas les fiches en brouillon.

Ne jamais passer un personnage temporairement en `published` uniquement pour le tester visuellement. La route publique `/personnages` et les fiches publiques `/personnages/[slug]` doivent rester séparées de la preview.

## 5. Checklist avant publication

La checklist de publication est dans `src/content/personnages/README.md`.

Avant de passer un personnage en `published`, relire cette checklist entièrement.

## 6. Règles de sécurité du contenu MDX

Pour `histoire.mdx`, ne pas utiliser :

* import ;
* export ;
* JSX ;
* HTML brut ;
* expression JavaScript entre accolades.

Le récit long va dans `histoire.mdx`.

Les données courtes et structurées vont dans `data.json` : résumé, rôle, tags, identité, magie et futurs champs structurés.

## 7. Gestion des idées futures

Les idées de signatures visuelles doivent rester dans le backlog, un carnet ou une documentation dédiée. Ne pas les coder pendant une tâche active si elles ne sont pas explicitement demandées.

Exemples d’idées futures :

* Kael qui s’efface ;
* Aurélia avec cage de verre, gants noirs, couronne fondue et métal précieux oppressant ;
* Azazel avec une interface capricieuse ;
* Helia/Nyx avec un contraste jour-nuit ;
* Ashren avec un grésillement visuel.

Ces idées ne sont pas perdues. Elles doivent attendre le futur système de signatures visuelles spécifiques.

## 8. Ordre recommandé des prochaines étapes

1. Finir et relire cette documentation de continuation.
2. Ajouter éventuellement `links` ou une première base de relations.
3. Relire les personnages vitrines en preview, notamment Kael et Aurélia.
4. Préparer un nouveau personnage en `draft` seulement après validation du besoin.
5. Réfléchir seulement ensuite aux signatures visuelles spécifiques.

## 9. Erreurs à éviter

* Ne pas utiliser `git add .` sans vérifier.
* Ne pas commit `next-env.d.ts` si Next l’a modifié automatiquement sans raison claire.
* Ne pas commit `tsconfig.tsbuildinfo`.
* Ne pas publier un personnage par accident.
* Ne pas créer un thème pour chaque personnage.
* Ne pas mélanger thème standard et signature visuelle spéciale.
* Ne pas mettre tout le lore brut dans GitHub.
