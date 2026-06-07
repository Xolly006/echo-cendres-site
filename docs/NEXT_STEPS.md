# Prochaines étapes

## Étape actuelle

Stabiliser la séparation entre données personnage, thème visuel et future composition de page.

## Tâches immédiates

1. Vérifier le rendu vide de `/personnages`.
2. Vérifier qu’un slug inexistant retourne une 404.
3. Vérifier que `themeKey` absent ou inconnu utilise le thème `default`.
4. Vérifier que la section `identity` reste invisible quand elle est absente.
5. Vérifier que le moteur lit `src/content/personnages/[slug]/data.json`.
6. Vérifier que `hasNarrative` reflète la présence de `histoire.mdx`.
7. Vérifier que le récit MDX serveur s’affiche seulement lorsqu’il existe.
8. Vérifier que le projet compile aussi quand aucun `histoire.mdx` n’existe.
9. Garder les récits MDX limités au Markdown simple, sans imports, HTML brut ni JavaScript arbitraire.
10. Attendre validation du créateur avant d’ajouter le premier personnage réel.
11. Intégrer Noah plus tard comme première fiche test validée.

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
