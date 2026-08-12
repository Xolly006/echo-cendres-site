# Composition `palimpseste` — L'Ordre de l'Arquet

Spec de direction artistique. **Remplace toutes les versions
précédentes.** La composition `fil` est abandonnée : elle dessinait un
organigramme, et l'Arquet n'en est pas un.

Écrite après relecture intégrale de la section Arquet de `Magic.txt`
(l.33231–33676), plus les blocs Sujets Nexus (l.20106, 22282) et
Ashren Veil (l.18046).

**Rien n'est codé avant validation par le créateur.**

---

## 0. Le verbe

> **L'Arquet convainc.**

Le lecteur arrive sur une page savante. On lui présente un argument, et
**il est bon** : le système des Piliers distribue les pouvoirs
fondamentaux selon un critère que personne n'a choisi ni mérité — une
structure d'âme tirée au sort à la naissance. Olympe classée « affinités
mineures » pendant des décennies avant de devenir la plus puissante
utilisatrice du Temps. Un fermier reçoit un siège pendant qu'un apprenti
s'entraîne toute sa vie pour rien.

Le lecteur est d'accord. Il continue à être d'accord pendant que la page
s'assombrit. Et en bas, il a donné raison à une organisation qui fabrique
des êtres en laboratoire, retire méthodiquement du monde les meilleurs
candidats un par un, et a consommé Eryth à la seconde où il avait fini
de produire.

**Le malaise ne vient pas d'une révélation. Il vient du fait que le
lecteur a hoché la tête tout du long.**

Le canon l'écrit : *« On peut désillusionner un croyant. On ne peut pas
désillusionner quelqu'un qui a raison sur les faits. »*

### Pourquoi `palimpseste`

Un manuscrit gratté et réécrit, où le texte ancien transparaît sous le
nouveau. Quatre noms sur un seul corps en dix-huit siècles. Et une
organisation dont le nom — l'Arché, le principe premier — annonce
qu'elle cherche la couche du dessous. *« Ce n'est pas un club de mages
puissants. C'est une entreprise archéologique avec une armée. »*

---

## 1. Les strates

La page traverse des états successifs, chacun correspondant à un visage
historique. Elle ne change pas de sujet : elle change **de registre**,
par degrés trop petits pour être remarqués.

| Strate | Époque | Ce que la page a l'air d'être |
|---|---|---|
| I | An 0 — Les Chercheurs de l'Arché | Une notice de société savante |
| II | ~An 400 — La Confrérie du Seuil | Un registre de compagnie franche |
| III | ~An 900 — L'Ordre des Éclipsés | Un livre de comptes |
| IV | An 1800 — L'Arquet | Une note de service |
| V | La main | Un tissu administratif |

**Le point de bascule ne doit jamais être identifiable.** Chaque strate
diffère peu de sa voisine ; c'est l'écart entre la I et la V qui doit
saisir quand on remonte.

C'est la structure d'Arkadia appliquée au lecteur — crédit, dépendance,
postes, inversion. *« Il n'y a pas eu de coup d'État. Il y a eu une
réunion, et tout le monde a compris en même temps. »*

### Ce qui dérive

| | I | II | III | IV | V |
|---|---|---|---|---|---|
| Corps | Spectral 1.9 | 1.8 | 1.7 | 1.6 | 1.55 |
| Intitulés | Cormorant bas-de-casse | Cormorant | Space Grotesk | Space Grotesk caps | Space Grotesk caps, tracking large |
| Colonne | 34rem | 36rem | 40rem | 44rem | 46rem |
| Accent | os `#cfc9bd` | acier `#a8adb4` | plomb `#8f949b` | argent `#c8cdd4` | argent `#c8cdd4` |
| Fond | `#0d0e10` | `#0b0c0e` | `#090a0c` | `#070809` | `#070809` |

L'accent de la strate IV est **plus clair** que celui de la III.
Délibéré : l'Arquet moderne n'est pas plus sombre, il est plus **net**.
La menace n'est pas l'obscurité, c'est la propreté administrative.

### Aucune animation

**La dérive n'est pas animée.** Chaque strate porte son style en CSS
statique. Interpoler `line-height`, `letter-spacing` ou `max-width`
déclencherait un recalcul de mise en page à chaque image — saccades sur
GPU intégré, interdit par la règle du 2026-07-27.

La continuité vient de la **faible différence entre strates voisines**,
pas d'une transition. Plus robuste, plus rapide, et survit à
`prefers-reduced-motion` sans traitement particulier.

---

## 2. L'irréversibilité

Une seule chose est dynamique : le **cadre** — teinte de fond générale et
traitement du nom de la faction.

À mesure que le lecteur franchit une strate, le cadre adopte son état.
**Il ne revient jamais en arrière.** Remonter ne restitue pas la sobriété
du début : on ne peut pas revenir à l'état où l'on n'avait pas encore
accepté.

*« Ils avaient juste besoin d'être indispensables assez longtemps pour
que le retrait devienne impossible. »*

Implémentation : `IntersectionObserver`, une classe d'état sur le
conteneur racine, transition en `opacity` seule. Aucun `filter`, une
seule boucle rAF via `rafPartage` si nécessaire.

---

## 3. Contenu jamais masqué — contrainte absolue

Règle du 2026-07-29, non négociable.

- Le HTML servi est **entièrement lisible**. Sans JavaScript, la page est
  complète et les strates sont là avec leur style statique.
- Seule **l'irréversibilité du cadre** est conditionnée. Aucune
  information n'attend un défilement.
- Tous les membres sont dans le HTML dès le rendu serveur.

---

## 4. Le contenu, strate par strate

Rien n'est inventé. Tout provient de `Magic.txt`.

### Strate I — Les Chercheurs de l'Arché

L'Arché : le principe premier, ce dont tout procède. Thalès disait l'eau,
Héraclite le feu. L'organisation a tordu la question — si l'Arché précède
toute forme, ce n'est pas une matière, c'est le Vide qui précède la
Création. *« Le nom n'est pas une prétention. C'est une adresse. »*

**L'origine — l'Ombre du Cercle.** Le Cercle de l'Unité éclate quand
Klein se scelle. Sylvia meurt de chagrin, Gora devient une montagne,
Elian construit une cage, Fenris part vers le nord. Vyl s'en va sans un
mot. Ce qu'il fonde n'est pas une organisation criminelle : une société
de récupération. Cinq amis venaient de perdre le sixième, un seul a
refusé le deuil. Le vol de l'écaille de Bahamut pendant son sommeil — un
exploit de collectionneur, pas de guerrier. *« On ne cambriole pas un
Monarque endormi par hasard. On le fait parce qu'on a une liste. »*

**Ce que les membres croient chercher.** La quasi-totalité pense faire de
la philosophie radicale. Ils n'ont pas tort. Ce qu'ils ignorent : un seul
homme sait déjà ce qu'il y a en bas et ne cherche rien — il creuse vers
une serrure précise.

*Image : `cloitre.webp`*

### Strate II — La Confrérie du Seuil

Les royaumes cessent de financer la garde du cristal, l'ordre se vend.
Compagnies franches, escortes, recouvrement de dettes magiques. La leçon
fondatrice : une organisation qui rend des services indispensables ne se
fait pas dissoudre.

**La Marque Primitive.** Ni encre ni rituel : exposition directe aux
résidus dans les fissures profondes. ~40 % de survie. Amplification
incontrôlée, personnalité qui se fragmente en quelques années. *« On ne
recrutait pas — on essayait des gens. »*

### Strate III — L'Ordre des Éclipsés

Camouflage quasi religieux. Ils cessent de se battre et se mettent à
financer.

**Les Faux Piliers.** Après le Grand Silence le mana s'appauvrit ;
l'Univers ne produit plus assez d'humains à structure adéquate. Sièges
vacants, concepts sans porteurs. L'Arquet fournit des candidats — la
Marque amplifie assez pour tromper tout observateur extérieur, et le
plafond de verre ne se voit pas tant qu'on n'exige pas un Domaine Absolu.
**Le Tailleur** : quarante ans de règne comme Nouveau Thanatos, dissipé
en quelques secondes le jour où un véritable Pilier de la Mort a émergé.

**La Marque Rituelle.** Encre distillée, aiguille d'os. ~60 % de survie,
utilité 10 à 20 ans. C'est l'ère de **la Recousue** — élève de la Reine
Rouge, écartée par l'Univers à la succession. Sa magie n'était pas la
guérison mais **la persistance** : démembrée, chaque morceau restait
vivant et opérationnel. Sa fin : un piège creusé sur des mois, l'asphyxie
lente pendant que sa magie réparait indéfiniment.
**Le doc ne dit jamais qu'elle est morte.**

**Arkadia**, quatre phases sur trois siècles : le crédit, la dépendance,
les postes, l'inversion. *« Il n'y a pas eu de coup d'État. »*

*Images : `manuscrit.webp`, puis `galerie.webp`*

### Strate IV — L'Arquet

Astraevor vainc Karn, puis Chronos, puis comprend que le sceau du Mora
Miserium est inviolable de l'extérieur même pour un 4e Éveil. Sept
sièges, un commanditaire qui n'apparaît jamais. *Formalisé, pas fondé —
il a hérité d'un réseau vieux de mille huit cents ans.*

**Qui dirige quoi.** Instructions par rêves, prémonitions, parchemins
vierges qui ne s'écrivent que sous les yeux des Héritiers. Aucun Héritier
ne l'a rencontré plus de deux ou trois fois. **Veyran** n'a jamais été le
dirigeant et ne le prétend pas : porte-parole sans magie qui sait tout,
parce qu'un porte-parole ignorant est inutile. Il y a eu des Veyran avant
Veyran.

**Ce qui n'est jamais du combat** — l'économie, le renseignement, la
diplomatie, la collection. Khemetra est le modèle : Aurélia tient la
source du fleuve, donc le Pharaon obéit. *« L'Arquet ne renverse jamais
un pouvoir — il devient la condition de sa survie. »*

**L'Ancre.** Pas un tatouage : une archive compressée, mana corrompu et
informations condensés en une figure sur la peau. L'encre provient de
résidus prélevés près des failles où des fragments de Nihil ont été
projetés. La forme s'adapte à l'âme.

**La Marque Graduée et le cas Eryth.** Il n'a pas inventé la Marque : il
a compris que la dissolution d'identité n'est pas un effet secondaire
mais **le mécanisme**. Moins il te reste de toi, plus tu es fort. La
Combustion prend l'enfance, puis le nom, puis la raison de se battre,
dans cet ordre. Il l'a dosée — cinquante-trois sujets. Ses deux ajouts
sont des choix de conception : le plafond de verre (jamais de Domaine
Absolu) et le kill-switch. *« Il n'a pas rendu la Marque plus puissante.
Il l'a rendue sûre pour l'employeur. »*
Et à la seconde où l'upgrade a été livré, une vision falsifiée montrée à
six Héritiers l'a écarté. **Même la quintessence est consommable.** Sauf
qu'il a gardé son Ancre, ses sept Ateliers, sa méthode et ses
financements.

**L'entrée et les deux voies.** On ne reçoit pas la Marque en arrivant —
il y a un sas. La succession désignée (Soryn a succédé à Mystério) ou le
**duel de sang** : tu défies l'Héritier en poste, tu le tues, tu prends
sa place. Aucune autorisation à demander.
**La rumeur** : le vainqueur hériterait aussi des compétences et de
l'expérience. Probablement vrai — une Ancre qui consomme de l'identité
pendant des décennies finit par en contenir. *« Ce n'est pas un cadeau.
C'est un parasite avec un historique. »* Personne n'est sûr parce que
ceux à qui c'est arrivé ne savent plus très bien qui répondrait à la
question.

**Mystério, alias Pether Rudeus.** Prédécesseur de Soryn. Horsen, cheval
de feu réduit à un crâne équin en flammes. Premier Héritier dont la magie
s'améliore proportionnellement à ce qu'il libère — la vitrine d'Eryth.
Mort contre Elias jeune, et ce duel explique pourquoi Elias médite dix
heures par jour.

**Le vivier.** Chaque Héritier choisi pour sa brisure, sa douleur
utilisable, son désespoir malléable. Ils ne promettent jamais de la
puissance : ils promettent la chose précise qui manque. L'orphelin qui
n'a pas eu la chance de Léo. Un Bora qui a refusé d'avancer. Une Calista
méchante. Un successeur de Pilier que l'Univers n'a pas choisi. **Une
veuve qui prête sa force pour que ses enfants mangent — celle-là n'a
aucune idéologie, elle a un loyer.**

**L'organigramme** — Diplomates, Marqués, Armées (Neihem invoque les
morts : la seule armée du monde dont les pertes reviennent au service le
lendemain), Classe Spéciale, Héritiers. Les sept sièges actuels : Kael,
Soryn, Varros, Aurélia, Cindrel, Neihem Roshim, Malachar.

**Lucian.** Il a rejoint l'Arquet et **il n'est pas Marqué** — exception
qui n'existe nulle part ailleurs. Marquer Lucian le débrancherait du
siège qu'il doit occuper : quelqu'un sait exactement ce qu'il est et a
donné l'instruction de ne pas y toucher. Il n'y est pas allé par colère.
*« Il les a rejoints parce qu'il n'a pas trouvé d'argument. »*

### Strate V — La main

Même registre, aucune rupture.

**Les Cinq Doigts.** La classe la plus nombreuse, la seule qui n'exige ni
magie, ni Ancre, ni serment. Chanceliers, greffiers, recteurs, juges de
paix, armateurs. Héritiers directs de la Maison de Prêt — quand on prête
à la moitié des royaumes, on finit par former, payer et promouvoir la
moitié de leurs administrations. **La plupart ne savent pas ce qu'ils
servent.**

*« On ne démantèle pas ça. Il n'y a pas de complice à retourner, pas de
réseau à décapiter, pas de repaire à fouiller. Il y a un tissu
administratif, et retirer le tissu fait s'effondrer les royaumes qui
reposent dessus. »*

Les cinq fonctions — **le Pouce** (les dettes ; il ne menace jamais, il
rappelle), **l'Index** (la désignation ; il tient la liste des porteurs
de structure d'âme non branchés), **le Majeur** (la contradiction ; le
seul dont le métier est de dire non, et le seul à pouvoir refuser un
ordre venu d'en haut), **l'Annulaire** (l'alliance ; trois générations de
résultats), **l'Auriculaire** (l'oubli ; il ne tue pratiquement jamais —
un mort produit une enquête, il déplace).

Aucun ne commande aux autres. **Aucun ne connaît l'identité des autres.**

**Le renversement.** Les Héritiers sont l'outil, les Diplomates sont
l'organisation. Tuer les sept ne ferait pas tomber l'Arquet : ça
retirerait sa force de frappe à une structure qui n'en a presque jamais
besoin, et qui en formerait sept autres en une génération.

> **Conséquence pour la mise en page.** Les sept sièges ne sont pas le
> sommet du récit. Ils arrivent **avant** la main. En faire le point
> culminant reviendrait à commettre l'erreur que le texte reproche aux
> Piliers, à Celestia et aux Académies.

*Image : `lettres.webp`*

### L'assèchement — avant la chute

L'Ancre empêche une structure d'âme de se lier à une fonction. **Chaque
Marqué est une pièce définitivement retirée du stock de l'Univers.**
Aurélia possède probablement la meilleure affinité Matière vivante du
monde. Elle est débranchée à vie, et elle ne le sait pas.

L'effet n'est pas que les Piliers actuels soient faibles — c'est qu'il
devient **de plus en plus difficile d'en trouver**. Le vivier se raréfie
à chaque génération. L'Univers ne se venge pas : il distribue avec ce qui
reste.

Et si l'organisation sait cela, alors elle sait que les âmes ont une
structure, qu'elles se lient à des fonctions, que les Piliers sont des
modules dans un système. **Elle a compris la mécanique du monde avant
ceux qui l'incarnent.** Le vrai but n'a alors pas besoin d'un sabotage :
retirer assez de structures suffit à ce que le système s'arrête faute de
matériau.

*Image : `hall.webp`*

### Les deux failles — même registre plat

**Dans la main.** Personne ne peut vérifier un Doigt puisque personne ne
sait qui il est. Un Doigt qui filtrerait ce qu'il transmet ne serait
détecté par personne. *« Il n'y a pas de contrôle, parce qu'il n'y a
jamais eu besoin d'en mettre un. »*

**Dans les créations.** Les Sujets Nexus ne sont pas des soldats. Quatre
individus conçus lors d'événements Nexus qu'Astraevor peut prédire des
siècles à l'avance. Un Nexus n'amplifie pas que la magie : il amplifie
**tout, y compris l'âme**. Ils ont développé une **troisième
conscience** — et une troisième conscience ne reçoit d'ordres de
personne, **pas même d'Astraevor**. Deux se sont échappés.

### La chute — hors strate, sans ornement

Vyl a fondé ce réseau pour ramener Klein. Astraevor en a hérité pour
libérer Nihil. Les deux objectifs exigent exactement les mêmes moyens.
Des générations d'Héritiers ont travaillé à la même tâche en croyant
servir des causes opposées.

Et il reste peut-être, quelque part dans la structure, une vieille lignée
qui n'a jamais changé d'objectif et qui attend toujours le retour de
l'homme à l'écharpe.

> **Aucun traitement visuel.** Pas de grande typographie, pas
> d'apparition, pas d'accent. Le registre le plus plat de la page. C'est
> la seule façon de ne pas l'affaiblir.

---

## 5. Les images

Le type `Faction` reçoit un champ `images` optionnel, calqué sur celui
des personnages. Ajout **additif** — aucune fiche existante ne devient
invalide.

| Fichier | Placement | Ce qu'il dit |
|---|---|---|
| `cloitre.webp` | Strate I | Une communauté d'érudits. La lumière ne tombe sur personne. |
| `manuscrit.webp` | Strate III | L'or est dans l'encre, pas dans une couronne. |
| `galerie.webp` | Strate III — Arkadia | Une noblesse qui doit son arbre généalogique à l'Annulaire sans le savoir. |
| `lettres.webp` | Strate V | L'agrégat de choses non secrètes. Le vrai visage. |
| `hall.webp` | L'assèchement | Immense, institutionnel, désert. Le tissu qu'on ne peut pas retirer. |

**Exception assumée sur `galerie.webp`** — la seule image où des visages
apparaissent, et ils sont **peints**. Ce ne sont pas des membres de
l'Arquet : ce sont ses résultats.

**Écartée : la main sur l'échiquier.** Elle dit qu'un joueur unique
manipule le monde — ce que le texte réfute. Il n'y a pas de joueur : il y
a un tissu, cinq doigts qui ne se connaissent pas, personne au centre.

Traitement : `next/image` en `fill`, voile amortisseur, jamais de
conteneur fermé. L'image accompagne la strate, elle ne l'illustre pas
frontalement.

---

## 6. Ce que la page ne fait jamais

- **Aucun portrait, aucune illustration de personne** (sauf peints).
- **Aucun conteneur rectangulaire fermé** (règle du 2026-07-29).
- **Aucun jugement moral dans la mise en forme.** La page ne signale
  jamais que l'argument est un piège. Si elle le fait, le verbe meurt.
- **Aucun nombre de membres écrit en dur** — tout dérivé de `data.json`.

---

## 7. Accessibilité

- `prefers-reduced-motion: reduce` → cadre en état final d'emblée, aucune
  transition. Les strates restent distinctes : la dérive est du CSS
  statique.
- Contraste minimum 4.5:1 sur chaque strate. La V est la plus à risque.
- Navigation clavier complète, focus visible.
- Responsive jusqu'à 375 px : la dérive de colonne s'écrase, celle de
  typographie et d'accent demeure.

---

## 8. Périmètre de fichiers

Création :
```
src/components/factions/compositions/palimpseste/Strate.tsx
```

Modification :
```
src/types/faction.ts                     (champ `images` optionnel)
src/themes/personnages/arche.ts          (5 états au lieu de 4)
src/components/factions/compositions/palimpseste/PalimpsesteFaction.tsx
src/components/factions/compositions/palimpseste/PalimpsesteFaction.module.css
src/content/factions/ordre-de-l-arquet/histoire.mdx
src/content/factions/ordre-de-l-arquet/data.json    (champ images)
```

**Hors périmètre :** toute composition personnage, `src/lib/`, tout thème
existant, tout `data.json` personnage.

---

## 9. Ordre d'exécution

| # | Livrable | Critère |
|---|---|---|
| ~~1~~ | ~~Suppression `fil/`, thème `arche`~~ | ✅ fait |
| ~~2~~ | ~~Socle de mise en page~~ | ✅ fait |
| 3 | `histoire.mdx` réécrit — strate par strate | Contenu complet, lisible sans JS |
| 4 | Les strates en CSS statique | Écart I↔V saisissant, I↔II imperceptible |
| 5 | Champ `images` + placement des 5 visuels | Aucun conteneur fermé |
| 6 | Irréversibilité du cadre | Remonter ne restitue pas l'état initial |

**L'étape 3 se fait strate par strate**, avec validation du ton avant
d'enchaîner. Si la voix savante de la strate I n'est pas juste, les
suivantes partent de travers.

---

## 10. Critères de refus

- une information n'existe que derrière une interaction ;
- le point de bascule entre deux strates est identifiable ;
- remonter en haut de page restitue l'état initial ;
- la mise en forme signale que l'argument est un piège ;
- la chute finale a reçu un traitement emphatique ;
- les sept sièges sont présentés comme le sommet du récit ;
- un `filter` est animé, ou une seconde boucle rAF créée ;
- une boîte rectangulaire fermée est apparue ;
- le récit MDX est moins lisible qu'avant ;
- un nombre de membres est écrit en dur.

---

## 11. Lacunes et pistes — non comblées

1. **Ashren Veil ≠ Ash.** Deux personnages distincts portent ce nom :
   Ashren Veil (l.18046, l'enfant aux deux consciences) et Ash, élève de
   Kratos. Redondance signalée par le créateur, **à arbitrer**. La
   mention « Ashren encadre les Armées » (l.33468) est donc ambiguë.
2. **Sujets Nexus** — quatre individus, noms de code seulement. Ils
   méritent leur propre entité : **faction future**, pas sous-partie de
   l'Arquet. Non développés ici.
3. **Les cinq fonctions des Doigts** sont marquées « proposition — noms
   et rôles à valider » dans `Magic.txt`. Utilisées telles quelles.
4. **Malachar** — aucune fonction déclarée. Ne rien inventer.
5. **Piste ouverte, à traiter en session dédiée** : existe-t-il un moyen
   de se libérer d'une Ancre ? Si oui, tout l'assèchement devient
   réversible. **Ne pas trancher ici.**
6. **Bloc dupliqué** dans `Magic.txt` : « Pourquoi la prescience ne
   suffit pas » et « Trois sièges sur sept sont des postes de collecte »
   apparaissent deux fois à l'identique.
