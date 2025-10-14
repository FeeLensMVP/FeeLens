// src/app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// CORRECTION : On définit les règles une seule fois pour les réutiliser
const statementUploadConfig = {
  maxFileSize: "16MB" as const,
  maxFileCount: 50, // On met la limite ici
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // On nomme la route comme avant
  statementUploader: f({
    // CORRECTION : On applique la configuration à chaque type de fichier autorisé
    pdf: statementUploadConfig,
    "text/csv": statementUploadConfig,
    "application/vnd.ms-excel": statementUploadConfig,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": statementUploadConfig,
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;