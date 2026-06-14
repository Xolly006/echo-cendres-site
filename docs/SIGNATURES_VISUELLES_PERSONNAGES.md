# Signatures visuelles des personnages

Ce document sert de garde-fou de direction artistique. Il distingue les familles de thèmes réutilisables des signatures visuelles propres aux personnages majeurs.

L’objectif est d’éviter de créer trop tôt une animation unique pour chaque personnage. Les fiches doivent rester lisibles, maintenables et cohérentes avec le Livre-Monde.

## Famille de thème

Une famille de thème est une ambiance réutilisable. Elle peut servir à plusieurs personnages, lieux ou entités proches par leur émotion, leur magie ou leur rôle narratif.

Une famille de thème définit surtout :

* une palette ;
* une sensation typographique ;
* une atmosphère générale ;
* éventuellement des particules légères ;
* un rythme visuel sobre.

Elle ne doit pas être créée pour un seul personnage si l’idée ne peut pas être réutilisée ailleurs.

## Signature visuelle spécifique

Une signature visuelle spécifique appartient à un personnage majeur. Elle peut être plus identifiable qu’un thème standard, mais elle doit rester lisible et contrôlée.

Elle peut inclure :

* un motif propre au personnage ;
* un comportement visuel rare ;
* une texture symbolique ;
* une interaction discrète ;
* une mise en scène plus personnelle.

Elle ne remplace pas le thème. Elle vient éventuellement par-dessus une famille de thème stable.

## À coder maintenant

Pour le moment, il faut coder seulement les familles de thèmes standard nécessaires aux fiches en cours.

Les signatures spécifiques doivent rester en backlog tant que :

* les fiches sont encore en `draft` ;
* le canon n’est pas stabilisé ;
* le besoin visuel n’a pas été validé ;
* la lisibilité du récit MDX n’a pas été testée ;
* le moteur de relations, de lieux et d’événements reste incomplet.

## À garder en backlog

Les signatures suivantes sont des intentions futures. Elles ne doivent pas être développées maintenant.

## Familles de thèmes existantes

### `default`

Thème neutre et lisible.

Il sert aux personnages qui n’ont pas encore besoin d’une ambiance dédiée en V1. Il permet de tester les fiches sans créer une famille sensorielle prématurée.

### `vide-oppressant`

Famille liée à l’absence, au silence, au froid, à l’effacement et à la profondeur.

Elle est actuellement utilisée par Kael l’Éclipsé.

### `vie-sauvage`

Famille liée à la forêt profonde, à la biomasse, à la nature sacrée, au cycle naturel et à une brume végétale sombre.

Elle est actuellement utilisée par Ysolde la Sauvage, mais elle reste réutilisable pour d’autres entités liées à la Vie, aux forêts conscientes ou à la nature ancienne.

## Signatures futures par personnage

### Kael l’Éclipsé

Famille actuelle : `vide-oppressant`.

Signature future possible :

* effacement partiel du nom ;
* silhouette absente ;
* froid visuel ;
* contours qui disparaissent ;
* absence de particules chaleureuses ;
* sensation que la page refuse de reconnaître sa présence.

À ne pas coder maintenant.

### Varros le Fléau

Famille actuelle : `default`.

Signature future possible :

* bras gauche marqué ;
* chaînes brisées ;
* impact lourd ;
* rouge sombre très discret ;
* texture de métal, poussière et sang séché ;
* sensation de titan fatigué, pas de berserker glorieux.

À ne pas coder maintenant.

### Elias, Pilier du Sacré

Famille actuelle : `default`.

Signature future possible :

* lumière chaude mais imparfaite ;
* vitraux fissurés ;
* halo discret ;
* tension entre institution sacrée froide et espoir humain ;
* présence de Métatron comme contrainte, pas comme identité d’Elias ;
* ambiance de foi construite après le doute, pas foi naïve.

À ne pas coder maintenant.

### Ysolde la Sauvage

Famille actuelle : `vie-sauvage`.

Signature future possible :

* lianes sobres sur les bords de page ;
* racines discrètes en arrière-plan ;
* brume verte sombre ;
* aura dorée organique ;
* texture légère de mousse ou d’écorce ;
* sensation de forêt consciente ;
* chamanisme, cycle naturel, deuil organique ;
* végétation ancienne, vivante, sacrée mais pas féerique.

À ne pas coder maintenant.

## Règles de décision

Ajouter une signature visuelle personnalisée seulement si :

* le personnage est majeur ;
* sa fiche est stabilisée ;
* le thème standard ne suffit plus ;
* la signature améliore la lecture au lieu de la gêner ;
* elle peut être désactivée ou rester sobre ;
* elle respecte `prefers-reduced-motion`.

Ne pas ajouter une signature si :

* le personnage est encore en brouillon fragile ;
* son canon est instable ;
* l’effet est seulement décoratif ;
* cela risque de casser la lisibilité ;
* cela crée une dette technique inutile.

## Backlog DA

* Définir 3 à 5 familles de thèmes maximum en V1.
* Éviter un thème unique par personnage.
* Créer plus tard des signatures pour les personnages majeurs seulement.
* Commencer par documenter les intentions avant de coder.
* Tester chaque signature avec un seul personnage avant de la généraliser.
