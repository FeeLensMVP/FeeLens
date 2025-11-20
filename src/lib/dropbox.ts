// Service pour gérer l'upload vers Dropbox
import { Dropbox } from 'dropbox';

// Configuration Dropbox pour l'environnement serveur
// Utilise EXCLUSIVEMENT le flux refresh token (recommandé)
const dropboxAppKey = process.env.DROPBOX_APP_KEY;
const dropboxAppSecret = process.env.DROPBOX_APP_SECRET;
const dropboxRefreshToken = process.env.DROPBOX_REFRESH_TOKEN;

if (!dropboxAppKey || !dropboxAppSecret || !dropboxRefreshToken) {
  // On n'échoue pas au chargement pour éviter de casser le build, on échouera au runtime avec un message clair
  console.warn('Dropbox non configuré: définis DROPBOX_APP_KEY, DROPBOX_APP_SECRET et DROPBOX_REFRESH_TOKEN');
}

const dbx = new Dropbox({
  clientId: dropboxAppKey,
  clientSecret: dropboxAppSecret,
  refreshToken: dropboxRefreshToken,
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

      // Créer un lien partagé (ou récupérer s'il existe déjà)
      let shareUrl: string;
      try {
        const shareResponse = await dbx.sharingCreateSharedLinkWithSettings({
          path: filePath,
          settings: {
            requested_visibility: { '.tag': 'public' },
          },
        });
        shareUrl = shareResponse.result.url;
      } catch (error: unknown) {
        // Si le lien existe déjà (erreur 409), récupérer le lien existant
        if (error && typeof error === 'object' && 'status' in error && error.status === 409) {
          const existingLinks = await dbx.sharingListSharedLinks({
            path: filePath,
            direct_only: true,
          });
          if (existingLinks.result.links && existingLinks.result.links.length > 0) {
            shareUrl = existingLinks.result.links[0].url;
          } else {
            // Si aucun lien n'est trouvé, essayer de créer un lien sans paramètres
            const fallbackLink = await dbx.sharingCreateSharedLinkWithSettings({
              path: filePath,
            });
            shareUrl = fallbackLink.result.url;
          }
        } else {
          // Pour les autres erreurs, on propage l'erreur
          throw error;
        }
      }

      return {
        id: response.result.id,
        name: fileName,
        path: filePath,
        size: response.result.size.toString(),
        url: shareUrl,
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
      const hasRefreshFlow = !!(process.env.DROPBOX_APP_KEY && process.env.DROPBOX_APP_SECRET && process.env.DROPBOX_REFRESH_TOKEN);
      if (!hasRefreshFlow) {
        throw new Error('Configuration Dropbox manquante: définis DROPBOX_APP_KEY, DROPBOX_APP_SECRET et DROPBOX_REFRESH_TOKEN');
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
