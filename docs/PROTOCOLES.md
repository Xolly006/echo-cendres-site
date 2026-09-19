# Protocoles de travail

Ce document dit **comment** on travaille sur ce dépôt. Il ne dit pas ce
qu'on construit : ça, c'est `AGENTS.md` et `docs/PROJECT_STATE.md`.

Chaque règle ci-dessous correspond à une erreur déjà commise dans ce
projet. Aucune n'est préventive. Si une règle ne peut plus nommer le
dégât qu'elle évite, elle sort du document.

---

## 1. Source du canon

`Magic.txt` fait autorité. Les mentions « proposition », « à valider » ou
« à confirmer » qu'il contient **ne suspendent pas le canon** : elles se
recopient telles quelles.

Une seule exception demande l'arbitrage du créateur : deux informations
réellement différentes sur la même entité.

`histoire.mdx` est la couche révisable. Quand le canon évolue, c'est là
qu'on corrige.

> Dégât évité : une session qui bloque, ou qui invente, parce qu'elle a
> lu « à valider ».

---

## 2. Une contradiction ne se tranche pas seule

Quand deux sources se contredisent, ne pas choisir la plus pratique, ne
pas fusionner, ne pas inventer un raccord. Signaler, dans ce format :

```
Contradiction
Source A : ...
Source B : ...
État actuel du dépôt : ...
Impact : ...
Décision nécessaire : ...
```

> Dégât évité : l'ambiguïté sur Amara, enregistrée comme non résolue et
> bloquant sa publication, pendant que sa fiche l'avait déjà tranchée en
> silence. Six semaines sans que personne ne le voie.

---

## 3. Une proposition ne devient pas canon en passant par le code

Ne jamais insérer une idée non validée dans `data.json`, `histoire.mdx`,
un `*_CANON.md` ou une page publique. Une proposition se présente
explicitement comme telle :

> Proposition — non canonique tant qu'elle n'est pas validée.

> Dégât évité : les Cinq Doigts de l'Arquet, marqués « à valider » dans
> la source et affichés sur la page comme des faits.

---

## 4. Ce qui est écrit dans une fiche doit venir du canon, pas de l'état des sources

Une note sur l'avancement du travail (« à développer plus tard »,
« détails manquants ») n'a rien à faire dans un champ que le site
affiche.

> Dégât évité : `magic.limits` de Kael contenait « les détails tactiques
> avancés restent à développer plus tard » — une note de chantier
> présentée au lecteur comme une limite de son pouvoir.

---

## 5. Une décision qui en remplace une autre doit le dire

`docs/DECISIONS.md` n'est pas un journal qu'on empile. Toute nouvelle
décision qui contredit une entrée plus ancienne ajoute une ligne de
supersession **sur l'ancienne**, datée, sans la supprimer. L'historique
reste lisible ; l'état courant reste sans ambiguïté.

> Dégât évité : la règle « 3 à 5 compositions partagées, jamais une par
> personnage » est restée affichée comme validée pendant que neuf
> compositions étaient codées.

---

## 6. Un seul document décrit l'état

- `docs/PROJECT_STATE.md` — ce qui existe aujourd'hui.
- `docs/NEXT_STEPS.md` — ce qui vient ensuite.
- `docs/DECISIONS.md` — ce qui a été arbitré.

Rien d'autre ne décrit l'état du projet. Les documents de continuation
antérieurs sont dans `docs/archive/` et ne servent qu'à comprendre une
intention historique.

> Dégât évité : quatre documents d'état contradictoires, dont un qui se
> contredisait lui-même sur le moteur Factions.

---

## 7. Vérifications réelles

Après toute modification technique :

- `git diff` et `git status --short`
- `npm run build`
- `npm run lint`
- ouvrir une fiche **non concernée** par la tâche, pour détecter une
  régression
- pour une modification visuelle : comportement mobile et
  `prefers-reduced-motion`

Il n'y a pas de tests dans ce dépôt. Ne pas prétendre en lancer.

Ne jamais désactiver une validation, un type ou un garde-fou pour
obtenir un build vert. Un build vert obtenu en retirant la vérification
n'est pas une correction.

> Dégât évité : une consigne inexécutable est cochée quand même.

---

## 8. Ne rien affirmer qu'on n'a pas vérifié

Ne pas dire qu'une fonctionnalité marche sans l'avoir lancée. Ne pas
citer une règle sans avoir ouvert le fichier qui la contient. Ne pas
conclure qu'un composant est absent sans avoir cherché où il est rendu.

Un résultat partiel correctement documenté vaut mieux qu'une fausse
réussite.

> Dégât évité : une liste de règles citée comme venant d'`AGENTS.md`
> alors qu'elle n'y a jamais figuré. Et un composant `Runes` déclaré
> « jamais rendu » alors qu'il l'était, par un autre fichier.

---

## 9. Périmètre

Ne modifier que les fichiers nécessaires à la tâche. Un problème
découvert hors périmètre se note, il ne se répare pas dans la foulée :
son impact, s'il est bloquant ou non, et ce qu'on propose d'en faire.

Catégories utiles : `bloquant`, `régression`, `dette technique`,
`dette artistique`, `documentation obsolète`, `canon à arbitrer`,
`amélioration future`.

---

## 10. Compte rendu de fin de tâche

- **Réalisé** — ce qui fonctionne effectivement.
- **Fichiers modifiés** — liste courte, avec la raison de chacun.
- **Vérifications** — les commandes réellement lancées.
- **Difficultés** — erreurs rencontrées et leur état.
- **Découvert, non corrigé** — volontairement laissé de côté.
- **Canon** — le travail n'a touché aucun fait canonique / a reformulé du
  canon existant / contient des éléments à valider.
- **Suite** — une à trois actions, dans l'ordre logique.

---

## Principe directeur

Préserver avant d'inventer.
Vérifier avant de modifier.
Signaler avant de masquer.
Comprendre avant de généraliser.
