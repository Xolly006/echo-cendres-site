# Composition `tranchant` — Les Chevaliers de la Cité des Héros

Direction artistique complète. À lire avec `CHEVALIERS_CANON.md`.

Cette page est conçue comme **l'inverse structurel de `palimpseste`**.
L'Arquet dérive, s'assombrit, ment et devient irréversible. L'Ordre ne
dérive pas, ne cache rien, et laisse revenir en arrière.

---

## 0. Le verbe

> **Un Chevalier est une arme consciente d'elle-même.**

Le canon oppose frontalement les deux logiques. Un Pilier ralentit une
apocalypse et se ménage pour tenir cent ans de plus. Un Chevalier entre
dans la salle, évalue en une fraction de seconde, et le fait.

### Ce que la page fait

**Elle mesure.** Tout le canon est un entonnoir : 10 % des diplômés
peuvent seulement *suivre* la formation, les candidats d'une promotion se
comptent sur les doigts d'une main, un ou deux arrivent au bout, six
Zéros dans toute l'histoire dont trois ont terminé.

La page traduit ça par **le rétrécissement**. Elle ne s'assombrit pas :
elle se resserre. La colonne se réduit à chaque phase, les blocs
s'espacent, il reste de moins en moins de choses à l'écran. Le lecteur
descend une sélection.

**Et rien n'est caché.** Aucune information conditionnée, aucune
révélation, aucun mensonge de mise en page. Là où l'Arquet convainc,
l'Ordre expose. Remonter en haut restitue exactement l'état initial —
c'est l'anti-mécanique de `maxProg`, et elle est signifiante : cet ordre
ne corrompt pas ce qu'il touche.

---

## 1. Palette — thème `acier-clair`

Nouveau fichier `src/themes/personnages/acier-clair.ts`.

| Rôle | Valeur | Intention |
|---|---|---|
| `background` | `#0e1013` | Charbon froid, légèrement bleuté |
| `text` | `#e8ecef` | Blanc froid — **plus clair que toutes les autres pages** |
| `muted` | `#8d9aa5` | Gris acier |
| `accent` | `#9fb0bd` | Acier. **Aucun or.** |
| `surface` | `rgba(20, 24, 29, 0.5)` | |
| `border` | `rgba(159, 176, 189, 0.18)` | |

**Contraste texte/fond : 14:1.** Volontairement très haut. La clarté est
le sujet ; une page sur la lucidité ne peut pas être une page où l'on
plisse les yeux.

**Aucune dérive de couleur.** Les cinq sections partagent exactement la
même palette. C'est le contraire de l'Arquet, et c'est le propos : rien
ne change pendant qu'on lit, parce que rien n'est dissimulé.

### L'exception unique — Valerian

Une seule couleur chaude sur toute la page, dans la dernière section :
**bronze `#b08d5f`**. Elle n'apparaît nulle part ailleurs, ni avant ni
après. Elle marque le seul homme du canon qui n'a jamais eu l'Écusson.

---

## 2. Typographie

| Usage | Police | Valeurs |
|---|---|---|
| Nom de la faction | Cormorant Garamond 400 | `clamp(2.6rem, 6vw, 4.8rem)`, `line-height: 1.05`, `letter-spacing: -0.01em` |
| Titres de section | Cormorant Garamond 400 | `clamp(1.8rem, 3.4vw, 2.6rem)` |
| Intitulés, labels, chiffres | Space Grotesk 600 | `0.68rem`, `letter-spacing: 0.24em`, capitales |
| Corps | Spectral 400 | `1.02rem`, `line-height: 1.72` |
| Chiffres de cohorte | Space Grotesk 300 | `clamp(2rem, 4vw, 3.2rem)`, tabulaires |

**Le titre fait la moitié de celui de l'Arquet** (4.8rem contre 8.4rem).
C'est délibéré et c'est un argument : l'Arquet est monumental parce qu'il
se met en scène. L'Ordre est précis. Il n'a pas besoin d'être grand.

`font-variant-numeric: tabular-nums` sur tous les chiffres — les nombres
doivent s'aligner verticalement d'une section à l'autre. C'est une page
qui compte.

---

## 3. La signature — la cohorte

**C'est là que la page dépense son audace, et nulle part ailleurs.**

Une bande horizontale de **encoches** court en haut de chaque section de
formation. Elle représente une promotion. À chaque phase, des encoches
s'éteignent.

```
Entrée à l'Académie   ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
Éligibles (10 %)      ▌▌▌·······························
Phase I               ▌▌▌·······························
Phase II              ▌▌································
Phase III             ▌·································
Certifiés             ▌·································
```

### Exécution

- **SVG**, pas canvas. Les encoches sont peu nombreuses, statiques en
  géométrie, et doivent rester nettes à toute densité d'écran.
- Chaque encoche est un `<rect>` de 2 × 14 px, espacées de 6 px.
- Les encoches actives : `fill: var(--accent)`. Les éteintes :
  `fill: var(--muted)`, `opacity: 0.22`. **Elles restent visibles** —
  on ne supprime jamais un candidat, on montre qu'il a été renvoyé.
- L'extinction se joue **une seule fois**, à l'entrée de la section dans
  le viewport, via `IntersectionObserver`. Transition en `opacity` seule,
  `240 ms`, décalage de `18 ms` par encoche de la droite vers la gauche.
- Une fois éteinte, une encoche ne se rallume jamais — même si on remonte.
  Ce n'est pas de l'irréversibilité narrative : c'est un fait consigné.

**Le chiffre accompagne la bande**, en Space Grotesk 300 tabulaire, aligné
à droite. `30 → 3 → 3 → 2 → 1 → 1`.

> **Ces nombres sont illustratifs et doivent être marqués comme tels.**
> Le canon ne donne pas d'effectif de promotion. La bande dit une
> proportion, pas un recensement.

---

## 4. Le rétrécissement

La largeur de colonne se réduit à chaque étape. **CSS statique par
section, aucune interpolation** — interpoler `max-width` déclencherait un
recalcul de mise en page à chaque image (règle du 2026-07-27).

| Section | Colonne |
|---|---|
| Ouverture | `52rem` |
| I. Ce qu'est un Chevalier | `46rem` |
| II. La sélection | `44rem` |
| III. La formation — Ossature | `42rem` |
| III. La formation — Chair | `40rem` |
| III. La formation — Jugement | `37rem` |
| IV. La certification | `34rem` |
| V. Le Code | `40rem` |
| VI. Valerian | `44rem` |

La colonne se resserre jusqu'à la certification — le point le plus étroit
de la page, celui où il ne reste qu'une personne — **puis se rouvre** pour
le Code et Valerian. Parce qu'une fois certifié, on ne subit plus la
mesure : on l'exerce.

L'espacement vertical suit le même mouvement : `4rem` entre les blocs au
début, `7rem` à la Phase III. Moins il reste de monde, plus il y a de
place.

---

## 5. L'Écusson

Un SVG unique, dans la section IV, qui **se grave** à l'entrée dans le
viewport : `stroke-dashoffset` de la longueur totale à 0, sur `1400 ms`,
`ease-out`.

Il ne se rejoue pas. Il ne réapparaît nulle part ailleurs sur la page.

**Motif :** une forme géométrique simple et fermée — pas un blason
héraldique, pas de lion, pas de couronne. Le canon dit *« une signature
d'existence dans la réalité »*, pas un emblème nobiliaire. Un hexagone
irrégulier tracé d'un seul trait continu, avec une entaille qui interrompt
le contour sans le fermer.

L'entaille est le sujet : la mesure a laissé une marque.

**Section VI — Valerian : l'emplacement de l'Écusson existe et reste
vide.** Même dimensions, même position, contour en `stroke-dasharray`
pointillé à `opacity: 0.25`, aucune animation. *Il n'a jamais eu
l'Écusson. Il a eu une salle.*

C'est le seul effet de toute la page qui repose sur une absence.

---

## 6. Le canvas — la poussière

L'Arquet avait des cendres : ce qui reste après destruction. L'Ordre a
**de la poussière dans un rai de lumière** : ce qui flotte le matin dans
une salle où l'on travaille.

- Canvas plein écran, `position: fixed`, `z-index: -2`,
  `pointer-events: none`.
- **60 particules maximum.** Rayon `0.6` à `1.6 px`, `opacity` de `0.05`
  à `0.16`.
- Dérive lente : `vy` entre `-0.08` et `+0.05` px/frame, `vx` entre
  `-0.04` et `+0.04`. Certaines montent — c'est de la poussière, pas de
  la cendre.
- Une oscillation horizontale sinusoïdale de faible amplitude
  (`±0.3 px`, période 7 à 12 s selon la particule) évite le mouvement
  rectiligne.
- Couleur : `var(--accent)`, jamais blanc pur.
- **Une seule boucle `requestAnimationFrame`, via `rafPartage`**
  (règle du 2026-07-27).
- `prefers-reduced-motion: reduce` → canvas non monté du tout.

**Aucun autre effet de particules.** Pas de lueur, pas de traînée, pas de
halo au curseur.

---

## 7. Les images

Quatre retenues.

| Fichier | Section | Ce qu'elle dit |
|---|---|---|
| `salle.webp` | II — La sélection | La salle d'étude où l'on est renvoyé. La lumière tombe des vitraux sur des tables vides. |
| `cour.webp` | III — La formation, Chair | Sol de pierre usé, cercles gravés effacés par l'usage, un mur, personne. Des milliers sont passés là. |
| `lame.webp` | IV — La certification | Une lame nue sur du bois usé, sans ornement. L'épée de Maeris, nommée « Simple ». |
| `archives.webp` | VI — Valerian | Des chemises de papier cornées, débordantes, sur des étagères nues. Du dossier consulté, pas rangé. Celui de Valerian est là-dedans. |

**Contrainte sur `cour.webp` :** deux idéogrammes sont lisibles sur le
mur. Cette écriture n'existe pas dans le monde. **Cadrer sous la ligne du
mur pour les exclure**, ou à défaut les noyer par un dégradé opaque en
partie haute. Non négociable — un signe étranger lisible casse la fiction.

**Écartée : la cour d'entraînement à bannières.** Château majestueux,
mannequins de paille, ciel de jeu vidéo. Le cliché exact que le canon
refuse — *« ils ne servent aucune nation »*. Elle contredirait le texte.

### Traitement

- `position: fixed`, `inset: 0`, `z-index: -3`, comme `PersonnageFond`.
- **Aucun relais au défilement.** Contrairement à l'Arquet, chaque image
  est ancrée à sa section et disparaît avec elle. Pas de fondu enchaîné
  continu : `opacity` 0 → 0.34 → 0 sur la traversée de la section.
- Désaturation **statique** : `filter: saturate(0.7) contrast(1.06)` en
  CSS non animé. Autorisé — c'est l'animation de `filter` qui est
  interdite, pas son usage.
- **Aucune image sur les sections I et V.** Le texte y est seul.
- `mask-image` en dégradé sur les quatre côtés — aucun bord net, jamais
  de conteneur rectangulaire fermé.

**Traitements particuliers :**

`cour.webp` est chaude et dorée à l'origine. La refroidir fortement pour
tenir la palette acier : `saturate(0.35)`, et un voile
`rgba(14, 16, 19, 0.55)` teinté du fond. La lumière rasante doit rester
lisible, sa couleur non.

`archives.webp` est la seule image de la section Valerian, la seule
section chaude de la page. Elle garde donc **plus de saturation que les
autres** : `saturate(0.85)`. C'est la seule fois où la page se réchauffe.

## 8. Structure de la page

```
OUVERTURE                      52rem
  eyebrow · nom · résumé · citation d'accroche
  pas de bande de cohorte

I.   CE QU'EST UN CHEVALIER     46rem
     l'opposition aux Piliers · la phrase sur Celestia

II.  LA SÉLECTION               44rem   [salle.webp]
     bande de cohorte : 30 → 3
     les deux voies · le filtre des 10 % · le comité

III. LA FORMATION               42 → 37rem
     Ossature   bande 3 → 3
     Chair      bande 3 → 2      ← la majorité des renvois
     Jugement   bande 2 → 1

IV.  LA CERTIFICATION           34rem   [lame.webp]
     l'Écusson se grave
     la Confiance d'Aurore — mécanique seulement

V.   LE CODE                    40rem
     ce qu'ils acceptent · ce qu'ils refusent
     la règle jamais écrite

VI.  VALERIAN                   44rem   [archives.webp]
     accent bronze · emplacement d'Écusson vide

INDEX DES MEMBRES
     les deux générations : Ordre de Richard, Ordre d'Aurore

pied de page
```

**Les membres sont en index de fin**, après le texte — jamais en grille
d'ouverture. C'est la leçon de l'Arquet : le récit est la page.

---

## 9. Le Code — traitement particulier

La section V est la seule à porter une mise en forme structurelle forte,
parce que son contenu est une liste de décisions.

Deux colonnes, séparées par un filet vertical de `1px` :

- **Acceptent** — texte en `--text`, puce en tiret court.
- **Refusent** — texte en `--muted`, aucune puce. L'absence de marqueur
  est le marqueur.

Sous les deux, en pleine largeur, **la règle jamais écrite** : un seul
paragraphe, sans titre, sans encadré, en italique Spectral. Le canon dit
qu'elle n'est jamais écrite ; elle ne reçoit donc aucun traitement qui la
formaliserait.

Et la phrase *« ce qui, en pratique, exclut l'Arquet »* reste dans le flux
du texte, sans emphase. C'est le premier lien inter-factions du site et il
ne doit pas être souligné.

---

## 10. Ce que la page ne fait jamais

- **Aucune dérive de couleur, de police ou de fond.** Rien ne change au
  fil de la lecture. Une seule exception assumée : le bronze de Valerian.
- **Aucune irréversibilité.** Remonter restitue l'état initial. Seules
  les encoches restent éteintes, parce qu'un renvoi est un fait.
- **Aucun conteneur rectangulaire fermé** (règle du 2026-07-29).
- **Aucune information conditionnée à une interaction.** Le HTML servi est
  entièrement lisible ; sans JavaScript la page est complète, les encoches
  s'affichent dans leur état final.
- **Aucun `filter` animé, une seule boucle rAF.**
- **Aucun portrait, aucune armure, aucune bannière, aucun blason
  héraldique.**
- **Aucun or.** C'est la couleur de l'Arquet.

---

## 11. Accessibilité

- `prefers-reduced-motion: reduce` → canvas non monté, Écusson affiché
  tracé, encoches dans leur état final sans transition. La page perd la
  mise en scène, pas le sens.
- Contraste minimum 14:1 sur le corps, 7:1 sur le `muted`.
- La bande de cohorte est `aria-hidden="true"` — l'information est donnée
  en toutes lettres dans le texte adjacent.
- Navigation clavier complète, focus visible en `--accent`.
- Responsive jusqu'à 375 px : le rétrécissement de colonne s'écrase, la
  bande de cohorte passe à `2px` d'espacement, le Code passe en une
  colonne.

---

## 12. Périmètre de fichiers

Création :
```
src/themes/personnages/acier-clair.ts
src/components/factions/compositions/tranchant/TranchantFaction.tsx
src/components/factions/compositions/tranchant/TranchantFaction.module.css
src/components/factions/compositions/tranchant/Cohorte.tsx
src/components/factions/compositions/tranchant/Ecusson.tsx
src/components/factions/compositions/tranchant/Poussiere.tsx
src/content/factions/ordre-des-chevaliers/data.json
src/content/factions/ordre-des-chevaliers/histoire.mdx
public/factions/ordre-des-chevaliers/{salle,cour,lame,archives}.webp
```

Modification :
```
src/themes/personnages/index.ts                   (additif)
src/components/factions/compositions/index.ts     (additif)
```

**Hors périmètre :** toute composition personnage, `palimpseste`,
`src/lib/`, tout thème existant.

> **Le texte reste dans `histoire.mdx`.** C'est la dette contractée sur
> l'Arquet, on ne la reproduit pas. Aucun contenu narratif en dur dans le
> TSX.

---

## 13. Ordre d'exécution

| # | Livrable | Critère |
|---|---|---|
| 1 | Thème `acier-clair` + registre | Build passe, thèmes existants intacts |
| 2 | `data.json` + `histoire.mdx` | Contenu complet, lisible sans JS |
| 3 | Socle de mise en page + rétrécissement | La page ressemble au site, colonne qui se resserre |
| 4 | La bande de cohorte | Encoches éteintes une fois, jamais rallumées |
| 5 | L'Écusson qui se grave + l'emplacement vide | Ne se rejoue pas |
| 6 | Le canvas de poussière | 60 particules max, rAF partagé |
| 7 | Les images ancrées par section | Aucun bord net, idéogrammes non visibles sur `cour.webp` |

---

## 14. Critères de refus

- une couleur, une police ou une largeur dérive sans que ce soit le
  rétrécissement prévu ;
- de l'or apparaît quelque part ;
- l'Écusson se rejoue au retour dans le viewport ;
- l'emplacement vide de Valerian a été supprimé ou rempli ;
- une information n'existe que derrière une interaction ;
- les membres apparaissent avant le récit ;
- la règle jamais écrite a reçu un encadré ou un titre ;
- une image d'armure, de bannière ou de château a été ajoutée ;
- les idéogrammes de `cour.webp` sont lisibles ;
- le texte est en dur dans le TSX au lieu du MDX ;
- plus d'une boucle rAF, ou un `filter` animé.
