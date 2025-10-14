// src/app/api/uploadthing/route.ts

// CORRECTION : Le nom de la fonction a été simplifié
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Exporte les route handlers pour les requêtes GET et POST
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});