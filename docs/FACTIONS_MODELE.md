# Moteur Factions — directives d'implémentation

Spec destinée à Claude Code. À lire avec `docs/FACTIONS_INVENTAIRE.md`
(périmètre) et `docs/ARQUET_CANON.md` (contenu de la première fiche).

**Rien n'est codé avant validation de ce document par le créateur.**

---

## 0. Principe directeur

Le moteur personnages a démontré une règle : *la page traduit ce que le
sujet est, elle ne le décrit pas.* Elle s'applique ici, avec une nuance —
une faction n'a pas de Domaine Absolu. Ce qu'une faction a, c'est une
**forme de lien** entre ses membres. C'est ça que la page doit traduire.

Corollaire : **un verbe par faction**, comme un verbe par personnage.

Conséquence structurante pour le modèle : une faction n'est **pas** une
liste de liens vers des fiches personnages. C'est une entité autonome qui
doit rester lisible et signifiante même quand aucun de ses membres n'a de
page.

---

## 1. Périmètre de fichiers annoncé

Création :

```
src/types/faction.ts
src/lib/factions.ts
src/content/factions/ordre-de-l-arquet/data.json
src/content/factions/ordre-de-l-arquet/histoire.mdx
src/content/factions/README.md
src/app/factions/[slug]/page.tsx
src/components/factions/compositions/          (structure vide en V1)
```

Modification :

```
src/app/factions/page.tsx    (placeholder → index réel)
scripts/generate-personnage-narratives.mjs  (étendre au MDX factions,
                                             OU script jumeau — à trancher)
```

**Hors périmètre. Ne pas toucher :**
`src/themes/`, `src/lib/personnages.ts`, `src/types/personnage.ts`, toute
composition personnage existante, tout `data.json` de personnage.

---

## 2. Modèle de données

### 2.1 Fichiers

Miroir exact du modèle personnages : `src/content/factions/<slug>/` avec
`data.json` (structure) et `histoire.mdx` (récit, Markdown simple
uniquement — pas d'import, pas de JSX, pas d'expression JS).

### 2.2 Type `Faction`

```ts
type FactionStatus = "active" | "eteinte" | "brisee" | "dormante";

type MembreStatut =
  | "en-poste"      // siège occupé aujourd'hui
  | "mort"
  | "ecarte"        // retiré vivant
  | "disparu"
  | "fondateur";

interface FactionMembre {
  /** Toujours présent. Un membre existe même sans fiche. */
  nom: string;
  titre?: string;
  concept?: string;
  statut: MembreStatut;
  /** Slug d'une fiche personnage existante. Optionnel par principe. */
  personnageSlug?: string;
  /** Chaîne de succession. Références par `nom`, pas par slug. */
  remplace?: string;
  remplacePar?: string;
  /** Rang structurel libre : "Cercle Zéro", "Conseil", "Façade"… */
  rang?: string;
  notes?: string;
}

interface Faction {
  slug: string;
  nom: string;
  epithete?: string;           // "Les Architectes de l'Ombre"
  ere: "primitive" | "age-d-or" | "age-de-fer" | "actuelle" | "aube";
  statut: FactionStatus;
  resume: string;              // 1 à 2 phrases, affiché à l'index
  themeKey: string;            // familles existantes, résolution inchangée
  composition?: string;        // repli "standard" si absent
  publicationStatus: "draft" | "published";

  membres: FactionMembre[];
  /** Sous-corps non implémentés en V1 mais modélisés dès maintenant. */
  branches?: { nom: string; role: string; commandePar?: string[] }[];
  /** Mécanique propre : la Marque, la Confiance d'Aurore, l'écusson… */
  mecanique?: { nom: string; principe: string };

  /** Champs volontairement non consignés, cf. identity.unrecorded. */
  unrecorded?: string[];
}
```

### 2.3 Ce que le modèle diffère délibérément

- **Aucune date, aucune durée, aucune ancienneté — pour l'instant.** Les
  années ne sont pas abandonnées : elles sont **gelées** le temps du
  chantier chronologies. Le champ `ere` reste vrai quoi qu'il arrive et sert
  de socle. Quand les datations seront arbitrées, on ajoute un bloc
  optionnel :

  ```ts
  chronologie?: {
    fondation?: string;   // texte, pas nombre : "Après la chute de Karn"
    dissolution?: string;
    jalons?: { quand: string; quoi: string }[];
  };
  ```

  Champ optionnel ajouté à un type existant : aucune fiche déjà écrite ne
  devient invalide, aucun build ne casse. On remplit au fur et à mesure.

- **Aucun compteur de membres stocké.** Il se dérive de `membres`. Un
  chiffre écrit en dur diverge de la liste à la première correction.

- **Aucun champ `allies` / `ennemis` en V1.** Même logique : ce sont des
  champs optionnels qu'on ajoutera quand trois factions existeront et qu'on
  saura quelle forme la relation doit prendre. Les ajouter maintenant, c'est
  deviner.

### 2.4 Règle d'extension

Tout ajout futur au type `Faction` se fait par **champ optionnel**. Jamais
par champ requis, jamais par renommage. C'est ce qui garantit qu'ajouter les
années, les relations inter-factions ou les lieux plus tard ne cassera
aucune fiche existante ni aucun build.

---

## 3. Règles de validation stricte

Calquées sur `src/lib/personnages.ts`. Échec = erreur au build, pas de
repli silencieux.

1. `slug` unique, en kebab-case, identique au nom du dossier.
2. `nom`, `resume`, `ere`, `statut`, `themeKey`, `publicationStatus`
   obligatoires.
3. `membres` non vide.
4. Chaque `personnageSlug` renseigné **doit** correspondre à une fiche
   personnage existante. Un slug mort casse le build.
5. `remplace` / `remplacePar` doivent référencer un `nom` présent dans le
   même tableau `membres`. Une chaîne de succession ne pointe jamais dans
   le vide.
6. `themeKey` inconnu → repli `default` (comportement personnages inchangé).
7. `composition` inconnue ou absente → repli `standard`.

---

## 4. Protection draft — la contrainte critique

Les quatre Héritiers présents sur le site sont en `draft`. La règle est
absolue et déjà en vigueur : **un `draft` reste invisible en production.**

Conséquence pour les factions, et c'est le point à ne pas rater :

> Le membre doit rester **affiché**. C'est **le lien** qui disparaît.

Un membre dont le `personnageSlug` pointe vers un `draft` s'affiche
normalement en production — nom, titre, concept — mais n'est pas cliquable.
La page ne doit ni sauter le membre, ni afficher un trou, ni signaler
qu'une fiche existe ailleurs.

Raison de fond, en plus de la protection : c'est **exactement conforme au
lore**. L'Arquet est une organisation dont on connaît les noms sans pouvoir
les atteindre. Le comportement technique et le canon disent la même chose.

En preview (`/personnages/preview`), les liens sont actifs.

---

## 5. Ordre d'exécution

| Étape | Livrable | Critère de réussite |
|---|---|---|
| 1 | `src/types/faction.ts` | `npm run build` passe |
| 2 | `src/lib/factions.ts` + validation | Un `personnageSlug` volontairement faux casse le build |
| 3 | `data.json` + `histoire.mdx` de l'Arquet | Chargement sans erreur |
| 4 | `/factions/[slug]` en rendu `standard` | Page lisible, liens draft neutralisés en prod |
| 5 | `/factions` index | Les factions `draft` n'apparaissent pas en prod |

**La DA et la composition n'interviennent qu'après l'étape 5.** On veut
d'abord une page laide qui marche, pas une belle page dont le modèle est
faux. C'est la seule étape où « acceptable » est le bon niveau : elle sera
remplacée.

---

## 6. Ce qui reste à trancher avant la DA

- Le **verbe** de l'Arquet. Trois invariants canon sont disponibles : un
  chef qui n'apparaît jamais, un Conseil qui ne peut structurellement pas
  avoir de siège vide, une Marque qui n'accorde rien mais amplifie ce qui
  est déjà là.
- Le rattachement de **Malachar** à un siège (cf. `ARQUET_CANON.md` §3).
  Sans effet sur le modèle.
