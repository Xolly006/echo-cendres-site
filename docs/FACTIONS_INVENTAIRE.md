# Inventaire des factions — extraction Magic.txt

Document de travail. **Aucun contenu inventé** : chaque entrée porte ses
lignes source dans `Magic.txt`. Statut de chaque entrée à valider par le
créateur avant toute implémentation.

Légende statut :
`CANON` validé par le doc · `À VALIDER` présent mais ambigu ·
`HORS PÉRIMÈTRE` n'est pas une faction · `CONFLIT` deux versions coexistent

---

## A. Le classement canonique — les 10 organisations

Source : `Magic.txt` l.4120–4230. Le doc les classe lui-même par ère.
C'est la colonne vertébrale du moteur Factions.

### Ère primitive & Âge d'Or — les fondations

| # | Nom | Ère | Statut |
|---|-----|-----|--------|
| 1 | **Le Clan du Soleil Couchant** — *Les Gardiens du Code* | Pré-antique, avant Klein → presque éteint | CANON |
| 2 | **Le Cercle de l'Unité** — *Les 5 Frères* | Âge d'Or, règne de Klein → brisé | CANON |
| 3 | **Les Tisseurs de l'Éther** — *Les Ingénieurs Oubliés* | Âge d'Or → dissous | CANON |

- **Clan du Soleil Couchant** (l.4125, 3517–3536) — descendance directe du
  5ème Éveillé. Pas des mages : des administrateurs de la réalité, ils
  autorisaient l'existence plutôt que de lancer des sorts. Traqués par
  Astraevor pour isoler le gène. Noah en est le dernier héritier.
- **Cercle de l'Unité** (l.4131, 42, 122, 1580) — **sept membres**, arbitrage
  créateur : Klein, Vyl, Sylvia, Gora, **Aenor**, Fenris, Elian. Seul moment
  où force, esprit, foi et ruse ont été unis. Brisé par le Grand Silence ;
  sa fracture a produit l'Église et les royaumes guerriers.
  - Le titre « Les 5 Frères » du doc est **caduc** : ni le compte ni le mot
    « frères » ne tiennent.
  - **Aenor est membre à part entière, mais les autres ne se souviennent pas
    d'elle comme telle.** Ce n'est pas une incertitude de lore : c'est le
    fait canon. Voir sa fiche (l.11241–11797, 22099–22285).
- **Tisseurs de l'Éther** (l.4140) — savants mêlant magie et technologie
  antique, forgerons des 10 Armes Originelles sous direction de Klein.
  Savaient forger des concepts. Dissous par Klein après l'Unité 734.
  Lien : `Unité 734` (l.20138).

### Âge de Fer & ère actuelle — le conflit

| # | Nom | Ère | Statut |
|---|-----|-----|--------|
| 4 | **L'Ordre de l'Arquet** — *Les Architectes de l'Ombre* | ~2000 ans → actif | CANON |
| 5 | **Le Conseil des Piliers** — *Les Gardiens de la Réalité* | Actuelle | CANON — 10 Piliers, instances intermittentes |
| 6 | **La Congrégation de la Cage Dorée** — *L'Église secrète* | 1500 ans → actif | CANON |
| 7 | **La Légion de Fer** — *L'Armée de Valeriana* | Actuelle | CANON |
| 8 | **Les Disciples de l'Abysse** — *Le Culte du Chaos* | Éternelle, souterraine | CANON |

- **Ordre de l'Arquet** (l.4149) — chef Astraevor. Fondation détaillée au
  chapitre VIII de sa biographie (l.21594). Recrute les désespérés, donne
  une Marque : puissance contre obéissance. Structure interne documentée :
  - *Le Cercle Zéro* (l.568) — Astraevor comme volonté invisible, jamais
    présent aux réunions
  - *Le Conseil des Héritiers* (l.18014) — les généraux : Soryn, Varros,
    Aurélia, Kael, Cindrel, Neihem Roshim, Dayu (morte), Eryth (écarté)
  - *Veyran l'Oracle*, chef de façade sans magie (l.17991, 20267)
  - *Ash*, le Marqué aux âmes multiples (l.18026)
  - *Les 3 corps d'armée des Marqués* (l.10109) — dont les Traqueurs
    d'Étoiles sous Kael et Soryn
  - *Les fabrications* — hybrides artificiels (l.20067)
- **Congrégation de la Cage Dorée** (l.4162) — l'élite du Vatican. Pas des
  prêtres : des geôliers. Ils savent que Dieu est mort. Mission : garder
  Métatron enchaîné dans le corps du Pilier du Sacré et l'utiliser comme
  batterie. Lien direct avec le thème `cage-doree` et la composition
  `cage` déjà implémentés. Voir aussi le rituel (l.11420) et la
  chronologie des hôtes (l.11954–12257).
  - Sous-unité : **Les Paladins de l'Aube** (l.3736) — unité secrète de
    l'Église du Sacré, l'armée d'élite d'Elias. Le doc l'appelle aussi
    « l'Ordre des Séraphins ». **À VALIDER** : un nom ou deux entités ?
- **Légion de Fer** (l.4173) — armée du Royaume d'Aethelgard. Magie de
  Régiment : 10 000 soldats frappent ensemble, l'impact fait un séisme
  magique. Extension de la volonté de Valeriana V (biographie l.20355).
- **Disciples de l'Abysse** (l.4179) — anarchistes, fous et poètes maudits
  vénérant les 7 Princes. But : ouvrir des Portes (des hôtes). Messie
  actuel : Darian, l'Anti-Pilier. Adossé à la hiérarchie démoniaque
  (l.20871–20963) et aux Cercles de l'Abysse (l.20949).

### Âge de l'Aube — le futur potentiel

| # | Nom | Ère | Statut |
|---|-----|-----|--------|
| 9 | **Les Gardiens du Seuil** — *Les Veilleurs de la Tombe* | Actuelle, Zone d'Exclusion | CANON |
| 10 | **La Cohorte du Crépuscule** | Futur proche | CANON |

- **Gardiens du Seuil** (l.4187) — alliance de monstres, esprits et
  survivants irradiés autour du cristal de Klein. Chef : Vorak, le
  Roi-Chimère ; indirectement Gora. Double mission : empêcher d'entrer,
  et empêcher Klein de sortir.
- **Cohorte du Crépuscule** (l.4195, 18382) — Noah, Cyril, Lysandra,
  Kenshin. Premier groupe depuis le Cercle de l'Unité à ne choisir aucun
  camp. Ni Ordre ni Chaos : l'Équilibre.

---

## B. Organisations documentées hors du classement

Elles existent dans le doc mais n'apparaissent pas dans le top 10 —
soit parce qu'elles ont été écrites après, soit parce qu'elles relèvent
d'un autre registre.

| Nom | Lignes | Nature | Statut |
|-----|--------|--------|--------|
| **Les Chevaliers de la Cité des Héros** | 25800–26937, 29824–30701 | Ordre mercenaire neutre | CANON — le plus documenté du doc |
| **L'Elden Circle** | 25620–25700 | Collectif de 7 sorcières, antérieur aux Éveils | CANON |
| **Les Ateliers Prométhéens** | 29050, 29147–29617 | Laboratoires d'Eryth | CANON |
| **L'Académie Solaire** | 25279, 25371, 29959 | Institution de formation | CANON |
| **L'Ordre d'Aion** | 27631–27722 | Hiérarchie angélique avant Klein | CANON |
| **Le Clan Vermillion** | 22433–22513 | Fondé ~600 ans, Valentin | CANON |
| **Le Clan de l'Éclipse** | 5184–5290 | Clan d'Ezra, miroir inversé de Noah | CANON |
| **Les Maisons de Ryushima** | 19917–19992 | Tatsumaki, Kaminari, Mizuchi, Enma | CANON |
| **Le Groupe des Ruines** | 18629–18925 | 7 Primes qui ont brisé l'équilibre | CANON |
| **Le Conseil des Khans** | 27593 | Terres Nomades, désert de l'Est | À VALIDER — le doc dit lui-même « à confirmer de ta part » |
| **La coalition contre La Synthèse** | 23336–23387 | Futur d'Echo | À VALIDER — futur, pas présent |

Détails sur les trois plus importantes :

**Les Chevaliers de la Cité des Héros** — c'est le bloc le plus complet du
document, et de loin. Il contient déjà tout ce qu'un moteur de faction
demanderait : une formation en trois phases (l'Ossature, la Chair, le
Jugement), une certification privée avec la Reine Aurore dont le contenu
n'est jamais consigné, un écusson gravé à même la peau par sa magie, une
économie tarifaire raisonnée, un Code de ce qu'ils acceptent et refusent,
et une règle informelle jamais écrite : un Chevalier ne prend pas de
mandat contre un autre Chevalier. Ils ne servent aucune nation, aucune
Église, aucun Pilier — la Cité elle-même ne peut pas les déployer sans
leur accord. Refusent structurellement l'Arquet. Chevaliers nommés :
Adrien Veyr (l.26397), Maeris le premier Zéro certifié (l.29824).

**L'Elden Circle** (l.25620) — collectif de sept sorcières actif depuis
plusieurs générations, antérieur au système des Éveils. Opéraient dans
les zones mortes du Vieux Monde, là où le Flux Mana ne passait pas. Leurs
grimoires sont les premiers textes qui ont donné à Nihil un langage pour
ce que sa magie faisait. Sept disciplines, dont la Magie Sacrificielle et
la Nécromancie.

**Les Ateliers Prométhéens** (l.29147) — fondés par Eryth, 4ème Héritier
de l'Arquet écarté et remplacé par Aurélia. Concept : la corruption
biologique. Le Projet IGNIS n'a jamais été fermé, seulement reclassifié.
Faïa est officiellement toujours leur propriété. Menace persistante :
elle sait qu'ils viennent, pas quand.

---

## C. Faux positifs — à ne PAS traiter comme factions

Ces expressions ressemblent à des organisations mais n'en sont pas.
Consignées ici pour qu'on ne les reprenne pas par erreur.

| Expression | Ce que c'est réellement | Ligne |
|---|---|---|
| Le Sanctuaire des Larmes Perdues | Domaine Absolu | 1891 |
| Le Tribunal de la Dette | Domaine Absolu (Malthus) | 1277 |
| Le Royaume des Cieux | Domaine Absolu (un hôte de Métatron) | 28941 |
| L'Ordre Absolu | Le *but* des Anges, pas leur nom | 3695 |
| Ordre Froid / Calculateur / Parfait / Stérile | Qualificatifs narratifs | divers |
| Le Sanctuaire de l'Aube | Lieu | 6290 |
| Le Coffre-Fort d'Ivoire | Banque dimensionnelle de Malthus (objet) | 1257 |
| L'Alliance Impossible | Événement ponctuel — Guerre des Cendres | 8456 |
| La Grande Résurrection | Événement | 20984 |

**Royaumes et lieux** — arbitrage en attente : Vane (l.26435, 27397),
Aethelgard, Othrys, Ryushima (l.21792), la Zone d'Exclusion, l'Abysse
(l.20839), la Cité des Héros. Ce sont des lieux qui *abritent* des
factions. Proposition : moteur `Lieux` séparé, avec relation
`faction ↔ lieu`. À trancher.

---

## D. Arbitrages rendus

### Tranché par le créateur

1. **Nombre de Piliers — 10, pas 12.** Le « Conseil des 12 Piliers »
   (l.4168) est caduc.
   - **Il n'y a pas de Pilier du Savoir.** Définitif.
   - **Il n'y a pas de Pilier du Feu.** Il a existé en conception puis a
     été retiré : Bora couvre les Éléments, un Pilier du Feu ferait doublon.
   - Conséquence à traiter : « Le Bibliothécaire (Savoir) » apparaît encore
     dans d'anciennes listes (l.2870). Statut à requalifier — probablement
     électron libre, comme Corvus. **Seul point encore ouvert.**

2. **Le Conseil des Piliers existe.** Ils tiennent parfois des instances.
   C'est donc une faction réelle — mais une faction intermittente et
   dysfonctionnelle, pas une institution permanente. La désunion n'est pas
   un défaut du groupe : c'est sa forme.

3. **Cercle de l'Unité — sept membres**, Aenor comprise. Voir section A.

4. **Les Domaines Absolus ne sont pas des factions.** Confirmé. La
   section C tient.

### Encore ouvert

5. **Paladins de l'Aube / Ordre des Séraphins** (l.3736) — un nom pour la
   même unité, ou deux corps distincts ?

6. **Les chronologies sont à revoir intégralement.** Jugement du créateur :
   certaines durées sont abusives et incohérentes entre elles. Concerne au
   minimum la chronologie des Piliers Sacrés (l.11954–12257), celle
   d'Astraevor (l.21765), les 4èmes Éveillés (l.20650–20838) et
   l'ancienneté annoncée de l'Arquet (« 2000 ans », l.4152).
   **Chantier à part entière, à traiter après les factions** — pas de
   date reprise telle quelle d'ici là.

---

## E. Proposition de périmètre

Le classement de la section A donne une structure déjà pensée pour la
narration : trois ères, dix organisations, un arc tragique explicite
(le plus fort est mort, le plus noble est brisé, le plus dangereux
contrôle le jeu, l'espoir n'est que des gamins brisés).

Suggestion : le moteur Factions reprend cette structure d'ère plutôt
qu'un classement alphabétique, et les entrées de la section B viennent
s'y greffer après validation individuelle.

Rien n'est implémenté tant que ce document n'est pas validé.
