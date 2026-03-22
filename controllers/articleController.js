const db = require("../models/articleModel");

// ********************************************
// POST /api/articles — Créer un article
// ********************************************
exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;

  // Validation des champs obligatoires
  if (!titre || titre.trim() === "") {
    return res.status(400).json({ error: "veuillez entrez un titre" });
  }
  if (!auteur || auteur.trim() === "") {
    return res.status(400).json({ error: "veuillez entrez un auteur" });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)"
    );
    const info = stmt.run(
      titre.trim(),
      contenu || "",
      auteur.trim(),
      categorie || null,
      tags || null
    );
    res.status(201).json({
      message: "Article créé avec succès.",
      id: info.lastInsertRowid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création de l'article." });
  }
};

//*********************************************/
// GET /api/articles — Lire tous les articles (avec filtres optionnels)
// ********************************************
exports.getAllArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;

  let query = "SELECT * FROM articles WHERE 1=1";
  const params = [];

  if (categorie) {
    query += " AND LOWER(categorie) = LOWER(?)";
    params.push(categorie);
  }
  if (auteur) {
    query += " AND LOWER(auteur) = LOWER(?)";
    params.push(auteur);
  }
  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  query += " ORDER BY id DESC";

  try {
    const articles = db.prepare(query).all(...params);
    res.status(200).json({ articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des articles." });
  }
};

//**********************************************/
// GET /api/articles/:id — Lire un article unique
// **********************************************
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "L'ID doit être un nombre entier." });
  }

  try {
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    if (!article) {
      return res.status(404).json({ error: `Article avec l'ID ${id} introuvable.` });
    }
    res.status(200).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération de l'article." });
  }
};

// *********************************************
// PUT /api/articles/:id — Modifier un article
// *********************************************
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, categorie, tags } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "L'ID doit être un nombre entier." });
  }

  try {
    // Vérifier que l'article existe
    const existing = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: `Article avec l'ID ${id} introuvable.` });
    }

    // Valider le titre s'il est fourni
    if (titre !== undefined && titre.trim() === "") {
      return res.status(400).json({ error: "veuillez entrer un titre" });
    }

    const stmt = db.prepare(`
      UPDATE articles SET
        titre     = COALESCE(?, titre),
        contenu   = COALESCE(?, contenu),
        categorie = COALESCE(?, categorie),
        tags      = COALESCE(?, tags)
      WHERE id = ?
    `);
    stmt.run(
      titre ? titre.trim() : null,
      contenu !== undefined ? contenu : null,
      categorie !== undefined ? categorie : null,
      tags !== undefined ? tags : null,
      id
    );

    const updated = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    res.status(200).json({ message: "Article mis à jour avec succès.", article: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'article." });
  }
};

// *********************************************
// DELETE /api/articles/:id — Supprimer un article
// *********************************************
exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "L'ID doit être un nombre entier." });
  }

  try {
    const existing = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: `Article avec l'ID ${id} introuvable.` });
    }

    db.prepare("DELETE FROM articles WHERE id = ?").run(id);
    res.status(200).json({ message: `Article ID ${id} supprimé avec succès.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression de l'article." });
  }
};

// *********************************************
// GET /api/articles/search?query=texte — Rechercher des articles
// *********************************************
exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "veuillez entrer un paramètre 'query' " });
  }

  try {
    const term = `%${query.trim()}%`;
    const articles = db
      .prepare(
        "SELECT * FROM articles WHERE LOWER(titre) LIKE LOWER(?) OR LOWER(contenu) LIKE LOWER(?)"
      )
      .all(term, term);

    res.status(200).json({ articles, total: articles.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la recherche." });
  }
};
