// Fichier : src/app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { slugify } from "transliteration";
import { z } from "zod";
// On importe l'API d'UploadThing pour pouvoir renommer les fichiers
import { UTApi } from "uploadthing/server";

// On initialise l'API
const utapi = new UTApi();
const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  statementUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 50 },
    "text/csv": { maxFileSize: "16MB", maxFileCount: 50 },
    "application/vnd.ms-excel": { maxFileSize: "16MB", maxFileCount: 50 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "16MB", maxFileCount: 50 },
  })
    .input(z.object({ companyName: z.string() }))
    .middleware(async ({ req, input }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Non autorisé");

      const { companyName } = input;
      // On nettoie le nom de l'entreprise pour l'utiliser dans le nom de fichier
      const cleanCompanyName = slugify(companyName, { lowercase: true, separator: '_' });

      return { userId: user.id, cleanCompanyName };
    })
    // La fonction onUploadComplete s'exécute sur le serveur APRÈS l'upload
    .onUploadComplete(async ({ metadata, file }) => {
      
      // --- C'EST ICI QUE LA MAGIE OPÈRE ---
      
      // 1. On nettoie le nom original du fichier
      const originalFileName = file.name.substring(0, file.name.lastIndexOf('.'));
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
      const cleanOriginalFileName = slugify(originalFileName, { lowercase: true, separator: '_' });

      // 2. On construit le nouveau nom de fichier final
      // ex: "ma_belle_entreprise_releve_janvier.pdf"
      const newFileName = `${metadata.cleanCompanyName}_${cleanOriginalFileName}${fileExtension}`;

      // 3. On commande à UploadThing de renommer le fichier
      try {
        await utapi.renameFiles({
          fileKey: file.key, // La clé unique du fichier qui vient d'être uploadé
          newName: newFileName,
        });
        console.log(`Fichier renommé avec succès en : ${newFileName}`);
      } catch (error) {
        console.error("Erreur lors du renommage du fichier:", error);
        // Vous pourriez vouloir gérer cette erreur (par ex. en supprimant le fichier)
      }
      
      // ------------------------------------

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;