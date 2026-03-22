const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/articleController");

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles du blog
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - auteur
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "spiritualité"
 *               contenu:
 *                 type: string
 *                 example: "la spiritualité est un monde et un état d'esprit entre les phénomènes para-normaux et la vie réelle"
 *               auteur:
 *                 type: string
 *                 example: "NZOKOU NOJOUBE HILARY SANDRA"
 *               categorie:
 *                 type: string
 *                 example: "Spiritualité"
 *               tags:
 *                 type: string
 *                 example: "Prière,jeun,pardon et partage"
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       400:
 *         description: Données invalides (titre ou auteur manquant)
 *       500:
 *         description: Erreur serveur
 */
router.post("/articles", ctrl.createArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par titre ou contenu
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher
 *         example: "Node.js"
 *     responses:
 *       200:
 *         description: Liste des articles correspondants
 *       400:
 *         description: Paramètre query manquant
 *       500:
 *         description: Erreur serveur
 */
router.get("/articles/search", ctrl.searchArticles);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles (avec filtres optionnels)
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: 
 *         schema:
 *           type: string
 *         description: Filtrer par auteur
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Filtrer par date (format YYYY-MM-DD)
 *         example: "2026-03-22"
 *     responses:
 *       200:
 *         description: Tableau JSON des articles
 *       500:
 *         description: Erreur serveur
 */
router.get("/articles", ctrl.getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Détails de l'article
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/articles/:id", ctrl.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/articles/:id", ctrl.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/articles/:id", ctrl.deleteArticle);

module.exports = router;
