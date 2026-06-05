# L'Écho des Cendres — prototype d'accueil

Ce dossier contient le premier squelette du site : page d'accueil animée, navigation, sections vides et structure Next.js.

## Stack choisie pour cette première passe

- Next.js App Router
- React
- TypeScript
- CSS global avec variables CSS
- Canvas natif pour les cendres

Tailwind, MDX, carte Leaflet et données de personnages viendront après. On ne met pas tout dans la première marmite, sinon ça devient une soupe technique, comme si le chaos avait appris npm.

## Lancer le projet

```bash
cd echo-cendres-site
npm install
npm run dev
```

Puis ouvrir :

```txt
http://localhost:3000
```

## Ce qui est déjà prêt

- `/` : page d'accueil animée
- `/personnages` : section vide préparée
- `/carte` : section vide préparée
- `/chronologie` : section vide préparée
- `/evenements` : section vide préparée
- `/factions` : section vide préparée
- `/magie` : section vide préparée
- `/archives` : section vide préparée

## Prochaine étape recommandée

Ne pas ajouter Noah immédiatement. D'abord stabiliser :

1. page d'accueil ;
2. rendu mobile ;
3. navigation ;
4. structure de dossier pour les entités ;
5. premier modèle de personnage ;
6. seulement ensuite Noah.
