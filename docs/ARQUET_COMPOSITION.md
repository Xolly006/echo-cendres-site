# Composition `fil` — L'Ordre de l'Arquet

Spec de direction artistique. À lire après `ARQUET_CANON.md` et
`FACTIONS_MODELE.md`. Les étapes 1 à 5 du moteur sont faites : cette spec
ne concerne que la couche visuelle et comportementale.

**Rien n'est codé avant validation par le créateur.**

---

## 0. Le verbe

> **L'Arquet comble.**

Aucun vide ne survit sur cette page — sauf un seul, en haut, qui n'est pas
un siège.

Trois invariants canon, traduits en comportement plutôt qu'en décor :

| Canon | Comportement de la page |
|---|---|
| Le TOC d'Astraevor : un siège vide est comblé avant que le déséquilibre le dérange (l.21609) | Là où le lecteur produit un vide, la page l'a déjà refermé |
| Astraevor n'apparaît jamais aux réunions ; ses parchemins ne s'écrivent que sous les yeux des Héritiers (l.568) | Son nom ne se compose qu'une fois les sept sièges ouverts |
| La Marque n'accorde rien : elle amplifie ce qu'elle trouve (l.18038) | La page n'impose aucun rythme — elle exagère celui du lecteur |

---

## 1. La signature — les fils

**C'est le seul endroit où cette page dépense son audace.** Tout le reste
reste discipliné et silencieux. Si un choix décoratif ne sert pas les fils,
il saute.

Un fil par membre **en poste** descend de son nom et converge vers un point
unique : **Veyran l'Oracle**. C'est la version officielle, celle que le
monde croit — voilà l'homme qui tient l'Ordre.

> **Le nombre de fils dérive de `data.json`. Il n'est jamais écrit en dur,
> jamais affirmé, jamais affiché.**
>
> Le canon contient deux couches : la liste ancienne des « sept Péchés
> Capitaux » (l.575) et le roster tardif où Dayu apparaît. Le compte de
> sept vient de la version ancienne et n'est pas arbitré. Figer un nombre
> aujourd'hui reviendrait à trancher du lore par le code.
>
> Le verbe survit intact : « aucun siège vide » ne dit rien du nombre de
> sièges. La composition fonctionne à sept comme à neuf.
>
> **Corollaire : pas de chiffres romains, pas de numérotation.** Une
> numérotation doit encoder quelque chose de vrai ; ici elle mentirait.

Puis, à la révélation, les fils ne changent pas de forme. On voit
simplement qu'ils **continuent** : ils traversent Veyran et remontent hors
du cadre, vers le haut, vers un espace resté vide toute la page.

Veyran n'était pas la main. C'était un nœud. Le canon le dit mot pour mot :
il n'a aucune autorité réelle, il traduit des instructions en ordres
exécutables (l.17991, 20267).

**La page a menti au lecteur exactement comme l'Arquet ment au monde — et
le lecteur ne peut pas s'en vouloir : il a cru ce qu'on lui montrait.**

### Exécution technique

- SVG, `path` en courbes de Bézier douces. Pas de canvas ici : les fils
  sont peu nombreux, statiques en géométrie, et le SVG reste net à toute
  densité d'écran.
- Animation par `stroke-dashoffset`, `opacity` et `transform` uniquement.
  **Aucun `filter` animé** (règle du 2026-07-27).
- Les fils se recalculent sur `resize` avec un debounce, jamais à chaque
  image.
- La prolongation au-dessus de Veyran est un second groupe de `path`,
  présent dès le rendu serveur, révélé par `opacity`.

---

## 2. Palette — thème `argent-froid`

Nouveau fichier `src/themes/personnages/argent-froid.ts`, enregistré dans
`index.ts`. **Aucun thème existant n'est modifié.**

| Rôle | Valeur | Intention |
|---|---|---|
| `background` | `#0b0c0e` | Charbon très légèrement bleuté |
| `text` | `#dfe2e6` | Argent clair |
| `muted` | `#8a9099` | Gris de registre |
| `accent` | `#c8cdd4` | **Argent — pas une couleur** |
| `surface` | `rgba(18, 20, 24, 0.58)` | |
| `border` | `rgba(200, 205, 212, 0.14)` | |

**Le pari, et il est assumé : l'Arquet est la seule entité du site sans
teinte propre.** Aurélia a l'or, Ysolde le vert, Soryn le rouge sombre,
Varros la terre. L'Arquet n'a que du gris métal — parce qu'il ne possède
rien en propre. Il porte ce qu'il prend aux autres.

Ce n'est pas de l'obscurité. C'est de la **clarté cérémonielle qui ne
révèle rien** : beaucoup de lumière ambiante, aucun visage. Les références
fournies par le créateur (le lustre qui éclaire une salle entière sans
éclairer un seul regard, les figures de dos en tenue de cérémonie, le
cloître vide) disent toutes la même chose.

**Aucun portrait, aucune illustration de personne sur cette page. Jamais.**

---

## 3. Typographie — le conflit machine / humains

La police de titre est choisie par composition, jamais héritée (règle du
2026-07-29).

- **Le nom de la faction et les intitulés de structure** → Space Grotesk,
  capitales, interlettrage large. Registre administratif. L'Arquet n'est
  pas un temple : le canon dit qu'il est né d'une **nécessité**, pas d'une
  ambition — Astraevor avait besoin d'une infrastructure.
- **Les noms des Héritiers** → Cormorant Garamond. Ce sont des personnes.
- **Le récit MDX** → Spectral, inchangé, jamais dégradé.

La tension entre l'administration et les humains qu'elle consomme est
portée par la typographie elle-même. Rien d'autre n'a besoin de la dire.

---

## 4. Structure

```
        ┌ espace vide, haut de page ─────────────┐
        │   (rien. pendant toute la lecture)      │
        └─────────────────────────────────────────┘
                          ▲  ▲  ▲
                          │  │  │   ← prolongation révélée
        ╔═══════════════════════════════════════╗
        ║   VEYRAN L'ORACLE                     ║
        ║   chef de façade — aucune autorité    ║
        ╚═══════════════════════════════════════╝
             ╱   ╱   ╱   │   ╲   ╲   ╲
            ╱   ╱   ╱    │    ╲   ╲   ╲
          (un fil par membre en poste — nombre dérivé des données)
```

Les noms sont ceux que `data.json` déclare `en-poste`, dans leur ordre de
déclaration. Aucun indice, aucun numéro, aucun total.

**Aucun conteneur rectangulaire fermé** (règle du 2026-07-29 — trois
compositions y avaient déjà convergé). Veyran est marqué par un
resserrement des fils et un changement de graisse, pas par une boîte.

Le remplissage se fait par **rapprochement**, jamais par encadrement.

---

## 5. La substitution dans le siège

Draeven est affiché avec son concept, la Nécromancie Mécanique. Le lecteur
engage le siège : le nom cède la place à **Neihem Roshim**.

Pas de fondu croisé, pas de superposition, pas de fenêtre : **le siège
n'est jamais vide, pas même le temps d'une image**. Là où le lecteur
attend le vertige du trou, quelqu'un est déjà là.

Même mécanique pour Eryth → Aurélia (écarté, vivant) et
Dayu → Malachar (morte, arc résolu par Ysolde).

> **Correction.** Une version antérieure de ce document affirmait une
> chaîne « Therys → Dayu → Malachar ». C'était une déduction, pas du
> canon : rien dans `Magic.txt` ne dit que Therys est morte ou remplacée.
> `ARQUET_CANON.md` §3 la donne en poste, et cela fait foi.
>
> La substitution n'affiche que les successions réellement documentées.
> Therys est un membre en poste comme les autres, sans chaîne.

L'interaction exige un **geste** — un clic ou un `pointerenter` réel, pas
un survol de passage (règle du 2026-07-29, apprise sur Aurélia). Sur
tactile, un appui simple.

---

## 6. La révélation d'Astraevor

Son nom se compose **quand les sept sièges ont été ouverts**, pas avant.

Ce n'est pas une récompense à débloquer : c'est le canon appliqué à la
lettre. Les parchemins ne s'écrivent que sous les yeux des Héritiers. On ne
voit pas Astraevor de l'extérieur — il faut être dedans.

Il ne s'affiche pas : il **s'écrit**, lentement, dans l'espace resté vide
en haut de page et dont on n'avait pas compris qu'il attendait quelque
chose. Au même moment, les fils révèlent leur prolongation.

C'est ce qui garantit qu'aucune section n'est sautée : pas une barre de
progression, mais une **absence qu'on finit par remarquer**.

### ⚠️ Contrainte absolue — le contenu n'est jamais masqué

Règle du 2026-07-29, non négociable : **le HTML servi est entièrement
lisible.** Sans JavaScript, la page est complète.

Concrètement :

- Astraevor est **déjà présent** dans la liste des membres, au rang
  Cercle Zéro, comme n'importe quel autre membre. Son nom, son rôle et son
  mensonge sont dans le HTML dès le départ.
- La composition cérémonielle en haut de page est une **couche
  supplémentaire**, pas la seule occurrence de l'information.
- Draeven **et** Neihem sont tous deux dans le HTML servi. L'interaction
  change lequel est au premier plan, jamais lequel existe.
- Filet de sûreté à 3 secondes, comme `RevealAuDefilement`.

**Aucune information n'est conditionnée à une interaction.** Ce qui est
conditionné, c'est la mise en scène.

---

## 7. Le rythme amplifié

La Marque n'accorde rien : elle aggrave ce qu'elle trouve.

La page mesure la vitesse de défilement du lecteur et l'exagère
légèrement. Lecture lente → les apparitions s'appesantissent, les fils
ralentissent. Défilement rapide → tout s'emballe.

Aucune autre composition du site ne fait ça : elles proposent toutes un
rythme. Celle-ci renvoie au lecteur le sien, en pire.

**Amplitude faible.** L'effet doit être ressenti sans être identifié. S'il
devient perceptible comme un effet, il est raté. Plafond et plancher stricts
pour que la lecture ne soit jamais empêchée.

Une seule boucle `requestAnimationFrame`, via `rafPartage`
(règle du 2026-07-27).

---

## 8. Accessibilité — plancher de qualité, sans l'annoncer

- `prefers-reduced-motion: reduce` → les fils sont **statiques et déjà
  prolongés**, Astraevor est visible d'emblée, aucune amplification de
  rythme. La page reste juste ; elle perd la mise en scène, pas le sens.
- Navigation clavier complète : chaque siège est atteignable au `Tab`,
  focus visible, la substitution se déclenche à `Enter`.
- Chaque siège porte un `aria-label` explicite ; les changements de nom
  sont annoncés en `aria-live="polite"`.
- Les fils SVG sont `aria-hidden="true"` — ils sont décoratifs,
  l'information est dans le texte.
- Responsive jusqu'à 375 px : sous 640 px les fils passent en colonne
  simple, la prolongation reste lisible.

---

## 9. Périmètre de fichiers

Création :
```
src/themes/personnages/argent-froid.ts
src/components/factions/compositions/fil/FilFaction.tsx
src/components/factions/compositions/fil/FilFaction.module.css
src/components/factions/compositions/fil/Fils.tsx
src/components/factions/compositions/fil/Siege.tsx
src/components/factions/compositions/index.ts
src/components/factions/compositions/types.ts
```

Modification :
```
src/themes/personnages/index.ts       (enregistrement additif du thème)
src/content/factions/ordre-de-l-arquet/data.json  (themeKey, composition, Veyran)
src/app/factions/[slug]/page.tsx      (résolution de composition)
src/app/factions/preview/[slug]/page.tsx
```

**Hors périmètre :** toute composition personnage, `src/lib/personnages.ts`,
`src/types/personnage.ts`, tout thème existant, tout `data.json` personnage.

### ⚠️ Changement de périmètre à valider

**Veyran doit entrer en V1.** `ARQUET_CANON.md` §5 le classait hors
périmètre, mais toute la signature repose sur lui : sans le chef de façade,
il n'y a pas de mensonge à révéler.

Il rejoint `membres` avec `rang: "Façade"` et `statut: "en-poste"`,
contenu strictement issu de l.17991–18025 et 20267. **Décision du
créateur requise avant implémentation.**

---

## 10. Ordre d'exécution

| # | Livrable | Critère |
|---|---|---|
| 1 | Thème `argent-froid` + registre | Build passe, thèmes existants intacts |
| 2 | Registre de compositions factions + repli `standard` | Une composition inconnue retombe sur `standard` |
| 3 | Structure `fil` statique — sièges, Veyran, aucun fil | Lisible sans JS, aucune boîte fermée |
| 4 | Les fils SVG, état initial (convergence sur Veyran) | Statique sous `reduced-motion` |
| 5 | Substitution dans les sièges | Draeven **et** Neihem dans le HTML servi |
| 6 | Révélation d'Astraevor + prolongation des fils | Visible d'emblée sous `reduced-motion` |
| 7 | Amplification du rythme | Imperceptible comme effet ; plafonnée |

Chaque étape : `npm run build` passe, diff annoncé avant application.

---

## 11. Critères de refus

La livraison est rejetée si :

- une information n'existe que derrière une interaction ;
- un nombre de membres est écrit en dur, affiché, ou déduit ailleurs que
  de `data.json` ;
- une succession non documentée dans `ARQUET_CANON.md` a été inventée ;
- une boîte rectangulaire fermée est apparue ;
- un `filter` est animé, ou une seconde boucle `rAF` a été créée ;
- l'amplification du rythme se remarque comme un effet ;
- le récit MDX est moins lisible qu'avant ;
- un portrait ou une illustration de personne a été ajouté ;
- la page tient encore debout si on retire les fils — cela voudrait dire
  qu'ils décoraient au lieu de dire.
