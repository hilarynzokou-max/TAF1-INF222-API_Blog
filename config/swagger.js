const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tp1 — INF2221: Conception d'un Blog (Backend)",
      version: "1.0.0",
      description:
        "API pour la gestion d'un blog. Permettant de créer, lire, modifier, supprimer et rechercher des articles.",
      contact: {
        name: "NZOKOU NOJOUBE HILARY SANDRA 24F2543",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Mon Serveur",
      },
    ],
  },
  apis: ["./routes/*.js"], // Scanner des annotations Swagger dans les fichiers routes
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
