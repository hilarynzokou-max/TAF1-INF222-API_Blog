# Blog API — INF222 TAF1

API RESTful pour gérer un blog simple, développée avec **Node.js + Express + SQLite**.

---

## Technologies utilisées

| Technologie | Rôle |
|-------------|------|
| Node.js | Environnement d'exécution JavaScript |
| Express.js | Framework web pour les routes et middlewares |
| better-sqlite3 | Base de données SQLite synchrone |
| swagger-jsdoc | Génération de la documentation OpenAPI |
| swagger-ui-express | Interface visuelle de la documentation |

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/blog-api-inf222.git
cd blog-api-inf222

# 2. Installer les dépendances
npm install

npm install express

npm install sqlite3

npm install swagger-ui-express swagger-jsdocs

# 3. Lancer le serveur
npx nodemon app.js
```

Le serveur démarre sur **http://localhost:3000**

---

## Structure du projet

```
blog-api-inf222/
├── app.js                  # Point d'entrée principal
├── package.json
├── README.md
├── config/
│   └── swagger.js          # Configuration Swagger/OpenAPI
├── models/
│   └── articleModel.js     # Connexion BDD et création de la table
├── controllers/
│   └── articleController.js # Logique métier (CRUD)
└── routes/
    └── articleRoutes.js    # Définition des endpoints + annotations Swagger
```

---

## Endpoints disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/articles` | Créer un article |
| GET | `/api/articles` | Lister tous les articles |
| GET | `/api/articles?categorie=Tech` | Filtrer par catégorie |
| GET | `/api/articles?auteur=Jean` | Filtrer par auteur |
| GET | `/api/articles?date=2026-03-21` | Filtrer par date |
| GET | `/api/articles/:id` | Lire un article par ID |
| PUT | `/api/articles/:id` | Modifier un article |
| DELETE | `/api/articles/:id` | Supprimer un article |
| GET | `/api/articles/search?query=texte` | Rechercher des articles |

---

## Exemples d'utilisation

### Créer un article
```http
POST http://localhost:3000/api/articles
Content-Type: application/json

{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript côté serveur...",
  "auteur": "Jean Dupont",
  "categorie": "Technologie",
  "tags": "nodejs,javascript,backend"
}
```
**Réponse (201):**
```json
{ "message": "Article créé avec succès.", "id": 1 }
```

### Lire tous les articles
```http
GET http://localhost:3000/api/articles
```

### Rechercher des articles
```http
GET http://localhost:3000/api/articles/search?query=Node
```

---

## Documentation Swagger

Après démarrage du serveur, accédez à :
**http://localhost:3000/docs**

---

## Codes HTTP utilisés

| Code | Signification |
|------|--------------|
| 200 | Succès (GET, PUT, DELETE) |
| 201 | Création réussie (POST) |
| 400 | Requête invalide (champ manquant, ID non numérique) |
| 404 | Ressource introuvable |
| 500 | Erreur serveur interne |
