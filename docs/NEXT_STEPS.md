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
