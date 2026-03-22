const Database = require("better-sqlite3");
const path = require("path");

// Connexion à la base de données SQLite
const db = new Database(path.join(__dirname, "../database.sqlite"), {
  verbose: console.log,
});

// Activation du mode WAL pour de meilleures performances
db.pragma("journal_mode = WAL");

// Création de la table articles si elle n'existe pas encore
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    date      TEXT    DEFAULT (date('now')),
    categorie TEXT,
    tags      TEXT
  );
`);

console.log("Base de données initialisée sqns soucis.");

module.exports = db;
