// Service pour gérer l'upload vers Dropbox
import { Dropbox } from 'dropbox';

// Configuration Dropbox pour l'environnement serveur
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: globalThis.fetch,
});

export interface DropboxFile {
  id: string;
  name: string;
  path: string;
  size: string;
  url: string;
}

// Cache des dossiers créés (réinitialisé à chaque démarrage du serveur)
const folderCache = new Set<string>();

export class DropboxService {
  // Créer un dossier pour une entreprise avec sous-dossiers par type
  static async createCompanyFolder(companyName: string, fileType: 'statements' | 'pricing', sessionId?: string): Promise<string> {
    try {
      // Utiliser exactement le sessionId reçu, pas de génération aléatoire
      if (!sessionId) {
        throw new Error('SessionId requis pour créer le dossier');
      }
      
      // Le sessionId contient déjà le nom de l'entreprise, on l'utilise directement
      const uniqueCompanyName = sessionId;
      
      const baseFolderPath = `/FeeLens/${uniqueCompanyName}`;
      const folderPath = `${baseFolderPath}/${fileType}`;
      
      // Vérifier le cache d'abord
      if (folderCache.has(folderPath)) {
        return folderPath;
      }
      
      // Créer le dossier principal de l'entreprise
      if (!folderCache.has(baseFolderPath)) {
        try {
          await dbx.filesCreateFolderV2({
            path: baseFolderPath,
            autorename: false,
          });
          folderCache.add(baseFolderPath);
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'error' in error && 
              typeof error.error === 'object' && error.error && 'error_summary' in error.error &&
              typeof error.error.error_summary === 'string' && 
              error.error.error_summary.includes('path/conflict/folder/')) {
            folderCache.add(baseFolderPath);
          } else {
            throw error;
          }
        }
      }
      
      // Créer le sous-dossier par type
      try {
        await dbx.filesCreateFolderV2({
          path: folderPath,
          autorename: false,
        });
        folderCache.add(folderPath);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'error' in error && 
            typeof error.error === 'object' && error.error && 'error_summary' in error.error &&
            typeof error.error.error_summary === 'string' && 
            error.error.error_summary.includes('path/conflict/folder/')) {
          folderCache.add(folderPath);
        } else {
          throw error;
        }
      }
      
      return folderPath;
    } catch (error) {
      console.error('Erreur création dossier Dropbox:', error);
      throw error;
    }
  }

  // Uploader un fichier vers Dropbox
  static async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    folderPath: string
  ): Promise<DropboxFile> {
    try {
      const filePath = `${folderPath}/${fileName}`;
      
      const response = await dbx.filesUpload({
        path: filePath,
        contents: fileBuffer,
        mode: { '.tag': 'overwrite' },
        autorename: true,
      });

      // Créer un lien partagé
      const shareResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: filePath,
        settings: {
          requested_visibility: { '.tag': 'public' },
        },
      });

      return {
        id: response.result.id,
        name: fileName,
        path: filePath,
        size: response.result.size.toString(),
        url: shareResponse.result.url,
      };
    } catch (error) {
      console.error('Erreur upload Dropbox:', error);
      throw error;
    }
  }

  // Processus complet : uploader vers Dropbox
  static async transferFile(
    fileBuffer: Buffer,
    fileName: string,
    companyName: string,
    fileType: 'statements' | 'pricing',
    sessionId?: string
  ): Promise<DropboxFile> {
    try {
      if (!process.env.DROPBOX_ACCESS_TOKEN) {
        throw new Error('DROPBOX_ACCESS_TOKEN non défini');
      }
      
      // 1. Créer le dossier de l'entreprise avec sous-dossier par type
      const folderPath = await this.createCompanyFolder(companyName, fileType, sessionId);
      
      // 2. Uploader le fichier
      const dropboxFile = await this.uploadFile(fileBuffer, fileName, folderPath);
      
      console.log(`✅ ${fileName} → ${dropboxFile.path}`);
      
      return dropboxFile;
    } catch (error) {
      console.error('Erreur transfert Dropbox:', error);
      throw error;
    }
  }
}
