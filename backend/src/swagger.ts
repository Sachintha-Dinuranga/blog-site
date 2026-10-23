import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API documentation for Blog Application",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    tags: [
      { name: "Posts", description: "Blog post operations" },
      { name: "Comments", description: "Comments on posts" },
    ],
  },
  // Path to the API docs (where you write your JSDoc comments)
  apis: [
    "./src/v1/routes/*.ts", // dev: src/routes/*.ts
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
