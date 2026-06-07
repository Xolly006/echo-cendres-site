# Prochaines étapes

## Étape actuelle

Stabiliser les premières fiches personnages réelles en `draft` et décider de la suite après Kael V1 et Varros V1.

## Tâches immédiates

1. Relire Kael l’Éclipsé V1 en `draft`.
2. Relire Varros le Fléau V1 en `draft`.
3. Vérifier la section “Magie” de Kael : Concept, Domaine, Artefact, Ancre, Capacités et Limites.
4. Vérifier la section “Magie” de Varros : Concept, Domaine, Ancre, Capacités et Limites.
5. Préparer plus tard les premiers `links` seulement après validation des slugs cibles.
6. Repousser l’affichage public et la résolution des liens à une étape dédiée.
7. Vérifier si les fiches Kael ou Varros doivent être légèrement améliorées avant toute publication.
8. Confirmer que `themeKey: "vide-oppressant"` reste le bon choix pour Kael.
9. Confirmer que `themeKey: "default"` reste acceptable pour Varros V1.
10. Envisager plus tard un thème de famille comme `titan-maudit` uniquement si plusieurs personnages partagent cette ambiance.
11. Garder Kael et Varros en `publicationStatus: "draft"` jusqu’à validation explicite du créateur.
12. Choisir la prochaine décision après Kael V1 et Varros V1 :
   * améliorer légèrement la fiche Kael si nécessaire ;
   * améliorer légèrement la fiche Varros si nécessaire ;
   * préparer un troisième personnage en `draft` ;
   * documenter une méthode de validation avant publication.
13. Garder les récits MDX limités au Markdown simple, sans imports, HTML brut ni JavaScript arbitraire.
14. Intégrer Noah plus tard comme fiche test validée si le créateur confirme ce choix.

## Hors périmètre pour le moment

* Ajouter Noah.
* Développer la carte.
* Développer la chronologie.
* Ajouter une base de données.
* Ajouter une bibliothèque d’animation.
* Modifier les pages de sections.
* Développer les compositions standard, scène ou exceptionnelle.
* Ajouter des effets animés liés aux thèmes.
* Ajouter des composants narratifs spéciaux, la magie, les relations ou les événements.
* Ajouter relations, lieux ou événements associés.
* Afficher ou résoudre publiquement les `links`.

## Backlog futur : IA experte du Livre-Monde

Une IA experte du site pourra plus tard aider à explorer le Livre-Monde. Elle pourrait répondre aux questions sur les personnages, comparer des personnages, expliquer des événements, retrouver des liens entre entités et citer les pages ou fragments utilisés.

Cette IA ne doit pas être développée maintenant. Elle devra attendre que les moteurs suivants soient plus avancés :

* personnages ;
* récits ;
* événements ;
* lieux ;
* factions ;
* relations ;
* recherche interne.

Contraintes à conserver pour cette future étape :

* l’IA ne devra jamais inventer du canon ;
* elle devra répondre à partir du contenu validé du site ;
* elle devra citer ses sources internes ;
* elle devra distinguer canon validé, brouillon, ancienne version et proposition IA si ces statuts existent plus tard ;
* elle pourra commencer en mode privé/admin avant d’être ouverte aux visiteurs ;
* une architecture de type RAG pourra être étudiée ;
* FastAPI ou une API route Next.js pourront être étudiés plus tard, sans décision technique définitive pour le moment.

## Backlog futur : signatures visuelles des personnages

Chaque personnage majeur pourra plus tard posséder une signature visuelle propre, au-delà du thème standard partagé par les fiches personnages.

Cette signature pourra combiner :

* arrière-plan spécifique ;
* atmosphère dédiée ;
* particules légères ;
* motifs graphiques ;
* effets narratifs ;
* interactions spéciales.

Cette étape ne doit pas être développée maintenant. Elle dépend d’abord de la stabilisation des thèmes standard, du moteur d’atmosphère, des particules légères et des premières fiches personnages réelles.

Les effets spécifiques à un personnage devront rester séparés de l’atmosphère standard afin d’éviter de rendre le projet ingérable. L’atmosphère standard doit rester réutilisable, tandis que les signatures exceptionnelles devront être ajoutées plus tard dans un système distinct et contrôlé.

### Pistes futures pour Kael l’Éclipsé

Kael ne doit recevoir aucune signature visuelle spécifique maintenant. Les pistes suivantes restent futures :

* titre qui s’efface ;
* présence mal reconnue par la page ;
* bouton ou élément oublié par l’interface ;
* effets de non-reconnaissance.

Ces effets devront attendre le système séparé de signatures visuelles propres aux personnages majeurs.

### Pistes futures pour Varros le Fléau

Varros ne doit recevoir aucune signature visuelle spécifique maintenant. Les pistes suivantes restent futures :

* bras gauche noirci ou marqué de runes rouges ;
* chaînes brisées ;
* larme gelée ;
* posture de titan fatigué;
* Ambiance violente.


Ces effets devront attendre le système séparé de signatures visuelles propres aux personnages majeurs. Le thème `default` reste acceptable pour sa V1, et un futur thème de famille comme `titan-maudit` ou équivalent ne devra être envisagé que si plusieurs personnages peuvent réellement le partager.
