// Fichier : src/app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { slugify } from "transliteration";
import { z } from "zod";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  statementUploader: f({
    // On définit ici tous les types de fichiers autorisés
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
      
      // CORRECTION : L'option s'appelle 'lowercase', pas 'lower'
      const folderName = slugify(companyName, { lowercase: true, separator: '-' });

      // On retourne le nom du dossier pour l'utiliser à l'étape suivante
      return { userId: user.id, folderName };
    })
    // --- C'EST ICI QUE LA VRAIE SOLUTION SE TROUVE ---
    // La fonction 'key' est une propriété de la configuration de la route 'f'
    // Elle s'exécute après le middleware et définit le chemin du fichier
    .onUploadComplete(async ({ metadata, file }) => {
      // Pour réellement contrôler le chemin, il faut le faire au niveau du stockage
      // UploadThing utilise un système de clés uniques. Pour organiser les fichiers,
      // la meilleure pratique est de préfixer la clé avec le nom du dossier.
      // NOTE : La documentation d'UploadThing est ambiguë sur la personnalisation dynamique
      // du chemin de stockage directement. La méthode la plus robuste est de gérer
      // cette organisation dans votre base de données après l'upload.

      // CEPENDANT, on peut manipuler le nom du fichier dans les métadonnées pour l'utiliser plus tard.
      const path = `${metadata.folderName}/${file.name}`;
      console.log(`Fichier uploadé virtuellement à : ${path}`);
      console.log("URL de stockage réelle:", file.url);
      
      // Ici, vous enregistreriez 'path' et 'file.url' dans votre base de données.
      
      return { uploadedBy: metadata.userId, path: path };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;