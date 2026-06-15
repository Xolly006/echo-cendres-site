# Prochaines étapes

## Étape actuelle

Stabiliser les premières fiches personnages réelles en `draft` et décider de la suite après Kael V1, Varros V1, Elias V1, Ysolde V1 et Amara V1.

## Tâches immédiates

1. Relire Kael l’Éclipsé V1 en `draft`.
2. Relire Varros le Fléau V1 en `draft`.
3. Relire Elias V1 en `draft`.
4. Relire Ysolde la Sauvage V1 en `draft`.
5. Relire Amara V1 en `draft`.
6. Vérifier la section “Magie” de Kael : Concept, Domaine, Artefact, Ancre, Capacités et Limites.
7. Vérifier la section “Magie” de Varros : Concept, Domaine, Ancre, Capacités et Limites.
8. Vérifier la section “Magie” d’Elias : Concept, Domaine, Capacités et Limites, sans champ Artefact pour le moment.
9. Vérifier la section “Magie” de Ysolde : Concept, Domaine, Capacités et Limites, sans artefact confirmé pour cette V1.
10. Vérifier la section “Magie” d’Amara : Concept, Domaine, Capacités et Limites, sans artefact confirmé pour cette V1.
11. Préparer plus tard les premiers `links` seulement après validation des slugs cibles.
12. Repousser l’affichage public et la résolution des liens à une étape dédiée.
13. Garder les filtres de `/personnages` basés sur les tags tant que cela suffit.
14. Améliorer progressivement la navigation catalogue sans créer de nouveaux champs trop tôt.
15. Améliorer l’ergonomie de la preview interne seulement si nécessaire.
16. Ajouter plus tard des filtres ou badges dans la preview si le nombre de drafts augmente.
17. Ne pas transformer la preview en vrai back-office pour le moment.
18. Garder la preview strictement séparée de la navigation publique.
19. Continuer à utiliser `publicationStatus: "draft"` comme protection principale.
20. Enrichir les filtres publics avec d’autres catégories uniquement si les tags ne suffisent plus.
21. Garder les signatures visuelles spécifiques hors périmètre pour le moment.
22. Ne pas créer de nouveaux champs de données tant que les tags suffisent.
23. Extraire plus tard les factions confirmées depuis le lore, sans créer de modèle tant que la structure n’est pas stabilisée.
24. Distinguer plus tard les groupes confirmés, ambigus, proposés ou obsolètes avant toute publication encyclopédique.
25. Créer un modèle de données `Faction` seulement quand les catégories et les slugs seront validés.
26. Relier les personnages aux factions seulement après validation des slugs et des catégories.
27. Éviter de figer trop tôt toute la géopolitique du monde.
28. Vérifier si les fiches Kael, Varros, Elias, Ysolde ou Amara doivent être légèrement améliorées avant toute publication.
29. Confirmer que `themeKey: "vide-oppressant"` reste le bon choix pour Kael.
30. Confirmer que `themeKey: "default"` reste acceptable pour Varros V1.
31. Confirmer que `themeKey: "default"` reste acceptable provisoirement pour Elias V1.
32. Confirmer que `themeKey: "vie-sauvage"` reste le bon choix pour Ysolde V1.
33. Confirmer que `themeKey: "amour-douleur"` reste le bon choix pour Amara V1.
34. Envisager plus tard un thème de famille comme `titan-maudit` uniquement si plusieurs personnages partagent cette ambiance.
35. Envisager plus tard un thème de famille comme `foi-sans-dieu`, `lumiere-construite`, `sacre-fissure` ou équivalent uniquement si plusieurs personnages partagent cette ambiance.
36. Garder Kael, Varros, Elias, Ysolde et Amara en `publicationStatus: "draft"` jusqu’à validation explicite du créateur.
37. Choisir la prochaine décision après Kael V1, Varros V1, Elias V1, Ysolde V1 et Amara V1 :
   * améliorer légèrement la fiche Kael si nécessaire ;
   * améliorer légèrement la fiche Varros si nécessaire ;
   * améliorer légèrement la fiche Elias si nécessaire ;
   * améliorer légèrement la fiche Ysolde si nécessaire ;
   * améliorer légèrement la fiche Amara si nécessaire ;
   * préparer un sixième personnage en `draft` ;
   * documenter une méthode de validation avant publication.
38. Garder les récits MDX limités au Markdown simple, sans imports, HTML brut ni JavaScript arbitraire.
39. Intégrer Noah plus tard comme fiche test validée si le créateur confirme ce choix.

## Hors périmètre pour le moment

* Ajouter Noah.
* Développer la carte.
* Développer la chronologie.
* Ajouter une base de données.
* Ajouter une bibliothèque d’animation.
* Modifier les pages de sections.
* Développer les compositions standard, scène ou exceptionnelle.
* Créer un modèle de données `Faction`.
* Créer `src/content/factions`.
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

Le document `docs/SIGNATURES_VISUELLES_PERSONNAGES.md` sert maintenant de référence de direction artistique pour distinguer familles de thèmes, signatures visuelles spécifiques et backlog à ne pas coder tout de suite.

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

### Pistes futures pour Elias

Elias ne doit recevoir aucune signature visuelle spécifique maintenant. Les pistes suivantes restent futures :

* lumière chaude imparfaite ;
* vitraux fissurés ;
* tension entre institution sacrée froide et espoir humain ;
* présence de Métatron comme contrainte, pas comme identité d’Elias.

Ces effets devront attendre le système séparé de signatures visuelles propres aux personnages majeurs. Le thème `default` reste acceptable provisoirement pour sa V1, et un futur thème de famille comme `foi-sans-dieu`, `lumiere-construite`, `sacre-fissure` ou équivalent ne devra être envisagé que si plusieurs personnages peuvent réellement le partager.

### Pistes futures pour Ysolde la Sauvage

Ysolde ne doit recevoir aucune signature visuelle spécifique maintenant. Les pistes suivantes restent futures :

* signature visuelle de forêt consciente ;
* aura verte et dorée ;
* présence de racines discrètes ;
* lianes sobres sur les bords de page ;
* brume verte sombre ;
* texture légère de mousse ou d’écorce ;
* sensation de végétation ancienne, chamanique et vivante ;
* liens futurs avec Dayu et Ibuki ;
* éventuelle page lieu pour Silvareth ;
* éventuelle famille de thèmes liée aux forêts vivantes.

Ces effets devront attendre le système séparé de signatures visuelles propres aux personnages majeurs ou les futurs moteurs de relations et de lieux. Le thème `vie-sauvage` est une famille standard réutilisable pour la Vie, la biomasse, les forêts conscientes, la nature sacrée et le cycle naturel ; il ne doit pas être traité comme un thème uniquement réservé à Ysolde.

### Pistes futures pour Amara

Amara ne doit recevoir aucune signature visuelle spécifique maintenant. Les pistes suivantes restent futures :

* page évoquant une lettre d’amour ancienne ;
* halo doux ;
* vieux papier ;
* rose fané ;
* or discret ;
* particules ou pétales très sobres plus tard, si nécessaire ;
* aucune esthétique rose bonbon ;
* aucune typographie cursive globale pour l’instant ;
* aucune signature visuelle unique codée maintenant.

Ces effets devront attendre le système séparé de signatures visuelles propres aux personnages majeurs. Le thème `amour-douleur` est une famille standard réutilisable pour l’amour sacrificiel, l’empathie, le lien, l’Agapè, la protection douloureuse, la tendresse tragique et la douleur partagée ; il ne doit pas être traité comme un thème uniquement réservé à Amara.
