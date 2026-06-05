# Fiches personnages

Ce dossier est la source unique de vérité des futures fiches personnages.

Chaque personnage sera ajouté plus tard sous forme de fichier JSON. Le slug public sera dérivé automatiquement du nom du fichier, donc le contenu JSON ne doit pas contenir de champ `slug`.

Aucun personnage réel ou fictif n’est intégré à cette étape.

## Identité générale optionnelle

Une fiche peut contenir un bloc `identity` pour les informations courtes et structurées :

```json
{
  "identity": {
    "aliases": ["Nom alternatif"],
    "nature": "Nature de l'entité",
    "origin": "Origine",
    "status": "Statut connu",
    "era": "Époque associée"
  }
}
```

Tous les champs sont optionnels. La section identité ne s’affiche pas si aucune information n’est fournie.
