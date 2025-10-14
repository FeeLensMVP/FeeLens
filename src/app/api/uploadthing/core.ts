// src/app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Simule une authentification - à remplacer par votre vraie logique utilisateur plus tard
const auth = (req: Request) => ({ id: "fake-user-id" }); 

// FileRouter pour votre application, peut contenir plusieurs FileRoutes
export const ourFileRouter = {
  // Définissez une route pour l'upload, donnez-lui un nom parlant
  statementUploader: f({ 
    // Types de fichiers autorisés
    pdf: { maxFileSize: "16MB" },
    "text/csv": { maxFileSize: "16MB" },
    "application/vnd.ms-excel": { maxFileSize: "16MB" }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "16MB" }, // .xlsx
  })
    // Mettez en place des permissions et une logique qui s'exécute AVANT l'upload
    .middleware(async ({ req }) => {
      // Ce code s'exécute sur votre serveur avant l'upload
      const user = auth(req);

      // Si l'utilisateur n'est pas authentifié, on lève une erreur
      if (!user) throw new Error("Unauthorized");

      // Tout ce qui est retourné ici est disponible dans onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Ce code s'exécute sur votre serveur APRÈS l'upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      // !!! C'est ici que vous sauvegarderiez l'URL du fichier dans votre base de données !!!
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;