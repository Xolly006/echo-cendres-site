# Signatures visuelles des personnages

Ce document est la référence de direction artistique du Livre-Monde. Il
distingue trois axes séparés : le **thème**, la **composition** et la
**signature**. Cette distinction est actée dans `docs/DECISIONS.md`
(Phase 2 — Différenciation visuelle, 2026-07-23).

## Les trois axes

### Thème — palette et atmosphère

Un thème est une ambiance réutilisable : palette, sensation typographique,
atmosphère générale, particules légères éventuelles. Il ne doit pas être
créé pour un seul personnage si l'idée ne peut pas être réutilisée
ailleurs. Résolu aujourd'hui par `themeKey` (fallback `default`).

### Composition — mise en page

Une composition est un archétype de mise en page, indépendant du thème.
Deux personnages peuvent partager un thème proche avec des compositions
différentes, ou l'inverse. Les compositions sont des archétypes
**partagés** : 3 à 5 au total, jamais une par personnage. C'est un axe
encore à construire (voir `docs/NEXT_STEPS.md`) ; aujourd'hui, tous les
personnages utilisent la même mise en page, `StandardImmersivePersonnage`.

### Signature — détail unique

Une signature est un habillage propre à un personnage majeur, posé
par-dessus un thème et une composition stables. Elle ne remplace ni l'un
ni l'autre. Elle doit rester lisible, désactivable, respecter
`prefers-reduced-motion`, et ne jamais dégrader la lecture du récit MDX.
Pilote et référence actuelle : Kael l'Éclipsé (`src/components/personnages/signatures/kael-eclipse/`).

## Familles de thèmes existantes

### `default`
Thème neutre et lisible, pour les personnages sans ambiance dédiée en V1.

### `vide-oppressant`
Absence, silence, froid, effacement, profondeur. Utilisé par Kael l'Éclipsé.

### `vie-sauvage`
Forêt profonde, biomasse, nature sacrée, cycle naturel, brume végétale.
Utilisé par Ysolde la Sauvage ; réutilisable pour d'autres entités liées
à la Vie ou aux forêts conscientes.

### `amour-douleur`
Amour sacrificiel, empathie, lien, Agapè, protection douloureuse,
tendresse tragique. Utilisé par Amara ; réutilisable pour d'autres
entités liées à l'amour porté pour autrui.

### `or-maudit`
Or ancien, argent froid, cage de verre, gants noirs, trésor maudit.
Utilisé surtout par Aurélia / Reine Midas ; ne devient une famille
réutilisable que si un autre personnage partage réellement cette
esthétique.

### `masque-voile`
Théâtre fermé, rideau bordeaux, porcelaine, miroir fissuré, mensonge
élégant. Utilisé surtout par Soryn la Voilée ; différencié
intentionnellement de `vide-oppressant`. Même règle de réutilisation que
`or-maudit`.

### `feu-timide`
Braises discrètes (`particleKind: "embers"`), chaleur contenue.

## Exemples de familles et variantes

- **Vide / Néant** — Kael : fumée froide, contours absents, non-existence.
  Une famille proche pourrait plus tard porter Nihil (néant cosmique,
  silence final) ou Neihem (histoire morte, nécromancie du passé) avec
  des variantes distinctes.
- **Or / Malédiction** — Aurélia : or ancien, argent froid, cage de verre.
  Astharoth ne partagerait cette famille que si son esthétique le
  justifie réellement.
- **Masque / Illusion** — Soryn : théâtre fermé, porcelaine, mensonge élégant.
- **Lumière brisée / Sacré** — Elias : lumière retenue, foi humaine,
  vitrail fissuré ; Métatron ou Célestine porteraient plutôt une
  géométrie angélique, un ordre inhumain, un blanc dangereux.

## Signatures et compositions par personnage

### Kael l'Éclipsé — signature en place

Famille : `vide-oppressant`. Composition : "fragment" (planifiée, voir
`docs/NEXT_STEPS.md`). Signature : arrivée "cachot", dissolution du nom,
effacement au pointeur, fumée noire globale, labels rongés, dénégation
périodique, bordures qui respirent, sortie dissoute. Le nom complet reste
accessible aux lecteurs d'écran ; repli statique sous
`prefers-reduced-motion`.

### Elias, Pilier du Sacré — composition planifiée

Famille : `default` (provisoire). Composition : "retable" (voir
`docs/NEXT_STEPS.md`), avec une page Métatron claire et une transition
soignée. Pistes de signature à activer sur validation du créateur :
lumière chaude imparfaite, vitraux fissurés, tension entre institution
sacrée froide et espoir humain, présence de Métatron comme contrainte et
non comme identité d'Elias.

### Varros le Fléau — candidat suivant

Famille : `default`. Pistes de signature : bras gauche marqué, chaînes
brisées, impact lourd, rouge sombre discret, texture de métal et de
sang séché, sensation de titan fatigué plutôt que de berserker glorieux.

### Ysolde la Sauvage — candidate suivante

Famille : `vie-sauvage`. Pistes de signature : lianes sobres en bord de
page, racines discrètes, brume verte sombre, aura dorée organique,
sensation de forêt consciente et de deuil organique.

### Amara — candidate suivante

Famille : `amour-douleur`. Pistes de signature : lettre d'amour ancienne,
halo doux, vieux papier, rose fané, or discret — sans esthétique rose
bonbon ni typographie cursive globale.

## Règles de décision

Ajouter une signature ou une composition propre à un personnage si :

- le personnage est majeur ;
- un thème et, à terme, une composition lui sont déjà attribués ;
- l'effet sert le canon du personnage plutôt que la simple décoration ;
- elle reste lisible, désactivable, et respecte `prefers-reduced-motion` ;
- le récit MDX reste parfaitement lisible.

Ne pas ajouter de signature à un personnage mineur, et ne jamais créer
une composition ou un thème réservé à un seul personnage sans
justification de réutilisation potentielle.
