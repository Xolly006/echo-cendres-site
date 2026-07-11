# Décisions du projet

## Décisions validées

* Le projet sera construit progressivement.
* Le contenu ne sera pas extrait automatiquement en masse depuis Magic.txt.
* Chaque personnage ou entité sera vérifié manuellement avant intégration.
* Tous les personnages du lore existent canoniquement, sauf décision explicite contraire du créateur.
* Les informations concernant une entité peuvent comporter plusieurs statuts : confirmée, à confirmer, ancienne version, proposition IA ou retirée.
* La navigation fondamentale doit rester cohérente même lorsque le thème visuel change.
* L’ajout futur d’une entité ne doit pas nécessiter de copier-coller une page entière.
* La page d’accueil est la première priorité.
* Noah servira plus tard de premier personnage test, mais il ne doit pas encore être intégré.
* Les personnages en `publicationStatus: "published"` sont visibles publiquement.
* Les personnages en `publicationStatus: "draft"` restent invisibles dans `/personnages` et retournent une 404 sur leur route publique.
* Les routes publiques des personnages utilisent le format `/personnages/[slug]`.
* Le thème d’un personnage et la composition de sa page sont deux systèmes séparés.
* Un `themeKey` absent ou inconnu doit utiliser le thème `default`.

## Décisions techniques provisoires

* Next.js + React + TypeScript.
* CSS et variables CSS pour les thèmes.
* Aucun CMS ni base de données au début.
* Aucune nouvelle dépendance sans justification et validation.
* Les sections peuvent rester vides pendant la construction du squelette.
* Les fiches personnages seront lues depuis `src/content/personnages/[slug]/data.json`.
* Le slug d’un personnage est dérivé du nom de son dossier.
* Les thèmes personnages sont gérés dans un registre artistique limité sous `src/themes/personnages/`.
* La première fondation des thèmes applique uniquement des variables CSS côté serveur, sans effet animé.
* Un récit long pourra être placé dans `src/content/personnages/[slug]/histoire.mdx`.
* La présence de `histoire.mdx` est détectée par `hasNarrative`.
* Le rendu narratif MDX des personnages utilise `@next/mdx` et des imports dynamiques locaux côté serveur.
* Les imports MDX des récits personnages passent par un registre généré automatiquement, jamais maintenu manuellement.
* Le projet doit fonctionner même si aucun `histoire.mdx` n’existe.
* Les récits MDX autorisent seulement Markdown simple, citations, séparateurs et liens ordinaires pour le moment.
* Les imports, exports, composants JSX, HTML brut, expressions JavaScript et liens à protocole dangereux dans les récits MDX sont interdits dans cette première version.
* `@next/mdx` est configuré dans `next.config.mjs`; `src/mdx-components.tsx` fournit la convention globale requise par Next.

## Système de signatures visuelles — pilote

* Le garde-fou « ne pas coder les signatures maintenant » a été levé explicitement par le créateur le 2026-07-11, pour un pilote unique avant toute généralisation.
* Le système vit dans `src/components/personnages/signatures/`, séparé de `PersonnageAtmosphere` et `PersonnageParticles`, conformément aux règles existantes.
* Une signature est résolue par slug dans un registre local. Aucun nouveau champ n’est ajouté aux `data.json`.
* Un personnage absent du registre garde exactement le rendu standard.
* Une signature peut habiller le titre (`Title`) et ajouter une couche décorative (`Overlay`), sans jamais remplacer le thème.
* Toute signature doit rester lisible, décorative, non interactive, et respecter `prefers-reduced-motion` avec un repli statique sobre.
* Pilote actuel : Kael l’Éclipsé (`kael-eclipse`) — effacement lent et partiel des lettres du nom, voile froid traversant, dénégation ponctuelle de l’en-tête. Le nom complet reste accessible aux lecteurs d’écran via un texte masqué.
* Aucune autre signature ne doit être ajoutée tant que le pilote Kael n’est pas validé visuellement par le créateur.

## Règles du système d’ambiance des personnages

* `backgroundKind` sert à choisir l’ambiance de fond d’une fiche personnage : chaleur, vide, brume, cristal, étoiles ou autre direction visuelle prévue.
* `particleKind` sert uniquement aux particules décoratives légères.
* `intensity` doit rester limitée à `low` ou `medium`.
* Le thème `default` doit rester sobre et sans particules visibles.
* Le thème `feu-timide` utilise `particleKind: "embers"` pour des braises discrètes.
* Le thème `vide-oppressant` utilise `particleKind: "dust"` pour une poussière froide très rare.
* Les particules ne doivent jamais gêner la lecture du récit MDX.
* Les effets doivent rester décoratifs, désactivables ou allégés selon le contexte.
* Les interactions spéciales, comme un titre qui se disloque ou un bouton qui fuit, ne doivent pas être placées dans `PersonnageAtmosphere` ou `PersonnageParticles`.
* Les signatures visuelles propres aux personnages majeurs viendront plus tard dans un système séparé.
* Une nouvelle valeur de `particleKind` ne doit pas être ajoutée sans besoin narratif clair.
* Un effet ne doit pas être ajouté simplement parce qu’il est visuellement amusant ou spectaculaire.

## Recette d’ambiance des futurs personnages

* Un thème personnage représente une famille sensorielle, pas un personnage unique.
* Un thème ne doit pas être seulement une couleur : il peut porter palette, typographie, fond, texture, particules, transition, intensité, comportements optionnels et ambiance générale.
* Un personnage doit d’abord utiliser un thème existant si celui-ci correspond suffisamment à son émotion dominante, son rôle narratif ou sa présence magique.
* Un nouveau thème ne doit être créé que si plusieurs personnages pourraient théoriquement l’utiliser.
* Exception contrôlée : `or-maudit` sert actuellement surtout à Aurélia / Reine Midas comme signature quasi personnelle de personnage vitrine.
* `or-maudit` ne deviendra une famille réutilisable que si un autre personnage partage plus tard une esthétique de richesse froide, trésor maudit, or ancien, argent froid et métal précieux oppressant.
* La direction artistique complète d’Aurélia reste à travailler plus tard ; aucun système d’image, portrait ou asset visuel n’est décidé pour le moment.
* Soryn la Voilée est une femme dans la fiche actuelle : utiliser le féminin pour elle dans la documentation et les futures fiches.
* Les alternances masculin/féminin du document source concernant Soryn ne sont pas retenues pour cette première fiche.
* Exception contrôlée : `masque-voile` sert actuellement surtout à Soryn comme signature quasi personnelle de personnage majeur ou vitrine.
* `masque-voile` ne deviendra une famille réutilisable que si un autre personnage partage plus tard une esthétique de masques, illusions, miroirs, théâtre fermé ou mensonge élégant.
* `masque-voile` doit rester différencié de `vide-oppressant` : Soryn doit évoquer la scène, le masque, le mensonge et le théâtre psychologique, pas seulement le vide froid.
* Les effets uniques propres à un personnage majeur doivent attendre le futur système de signatures visuelles.
* Les signatures visuelles spécifiques doivent rester séparées des thèmes standard, de `PersonnageAtmosphere` et de `PersonnageParticles`.
* Claude peut servir à extraire et organiser des informations depuis Magic.txt, mais le créateur doit toujours valider ce qui est canonique.

## Évolution future des thèmes personnages

Le moteur utilise actuellement `themeKey`. Aucun nouveau champ ne doit être ajouté maintenant, mais une évolution future possible est documentée :

* `themeKey` : clé actuelle utilisée par le moteur.
* `themeFamily` : famille sensorielle générale.
* `visualVariant` : variante visuelle propre à une entité dans une même famille.
* `signature` : détail unique réservé aux personnages vitrines ou majeurs.

La logique retenue :

* les personnages secondaires ou proches esthétiquement peuvent partager une famille de thème ;
* les personnages majeurs ou vitrines peuvent avoir une variante ou une signature propre ;
* une famille de thème donne une grammaire visuelle commune ;
* une variante différencie un personnage dans cette famille ;
* une signature ajoute un détail unique, seulement si nécessaire.

Exemples à garder en tête :

* Vide / Néant : Kael pourrait porter fumée froide, contours absents et non-existence ; Nihil pourrait porter néant cosmique, silence final et blanc mort ; Neihem pourrait porter histoire morte, poussière d’archives et nécromancie du passé.
* Or / Malédiction : Aurélia porte or ancien, argent froid, cage de verre, gants noirs et trésor maudit ; Astharoth ne devrait partager une famille proche que si son esthétique le justifie, avec une variante différente.
* Masque / Illusion : Soryn porte théâtre fermé, rideau bordeaux, porcelaine, miroir fissuré et mensonge élégant.
* Lumière brisée / Sacré : Elias pourrait porter lumière retenue, foi humaine et vitrail fissuré ; Métatron ou Célestine pourraient porter géométrie angélique, ordre inhumain et blanc dangereux.

Contraintes :

* `or-maudit` sert actuellement surtout à Aurélia et peut rester une signature quasi personnelle.
* `masque-voile` sert actuellement surtout à Soryn et peut rester une signature quasi personnelle.
* Ces thèmes ne doivent devenir des familles réutilisables que si un autre personnage partage réellement une esthétique proche.
* Le système futur `themeFamily + visualVariant + signature` ne doit pas être codé maintenant.
* Il faut éviter de créer un thème unique pour chaque personnage mineur.
* Il faut aussi éviter que plusieurs personnages majeurs se ressemblent parce qu’ils partagent une même palette.
* Les images, portraits et assets visuels restent hors périmètre tant qu’un système propre n’est pas décidé.
* La page d’accueil V2 “Livre-Monde vivant” reste un chantier séparé.

Workflow d’ajout d’un personnage :

1. Extraire les informations depuis Magic.txt.
2. Trier les informations entre canon, à vérifier, contradictoire et proposition.
3. Faire valider le contenu par le créateur.
4. Choisir un thème existant ou justifier la création future d’un thème réutilisable.
5. Créer `data.json` en `draft`.
6. Créer `histoire.mdx`.
7. Tester localement la fiche personnage.
8. Commit/push après validation.
