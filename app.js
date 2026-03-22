const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Documentation Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
app.use("/api", articleRoutes);

// Route racine
app.get("/", (req, res) => {
  res.json({
    message: "Blog API - INF222",
    documentation: `http://localhost:${PORT}/docs`,
    version: "1.0.0",
  });
});

// Middleware de gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
  console.log(`Documentation Swagger: http://localhost:${PORT}/docs`);
});

module.exports = app;
