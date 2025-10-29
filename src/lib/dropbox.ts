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
      console.log(`Création du dossier Dropbox: ${folderPath}`);
      
      // Créer le dossier principal de l'entreprise
      try {
        await dbx.filesCreateFolderV2({
          path: baseFolderPath,
          autorename: false,
        });
        console.log(`Dossier entreprise créé: ${baseFolderPath}`);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'error' in error && 
            typeof error.error === 'object' && error.error && 'error_summary' in error.error &&
            typeof error.error.error_summary === 'string' && 
            !error.error.error_summary.includes('path/conflict/folder/')) {
          throw error;
        }
        console.log(`Dossier entreprise existe déjà: ${baseFolderPath}`);
      }
      
      // Créer le sous-dossier par type
      try {
        await dbx.filesCreateFolderV2({
          path: folderPath,
          autorename: false,
        });
        console.log(`Dossier type créé: ${folderPath}`);
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'error' in error && 
            typeof error.error === 'object' && error.error && 'error_summary' in error.error &&
            typeof error.error.error_summary === 'string' && 
            !error.error.error_summary.includes('path/conflict/folder/')) {
          throw error;
        }
        console.log(`Dossier type existe déjà: ${folderPath}`);
      }
      
      return folderPath;
    } catch (error) {
      console.error('Erreur lors de la création du dossier Dropbox:', error);
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
      console.log(`Upload vers Dropbox: ${filePath}`);
      
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

      console.log(`Fichier uploadé: ${fileName}`);
      return {
        id: response.result.id,
        name: fileName,
        path: filePath,
        size: response.result.size.toString(),
        url: shareResponse.result.url,
      };
    } catch (error) {
      console.error('Erreur lors de l\'upload du fichier Dropbox:', error);
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
      console.log(`=== DÉBUT DU TRANSFERT DROPBOX ===`);
      console.log(`Fichier: ${fileName}`);
      console.log(`Entreprise: ${companyName}`);
      console.log(`Type: ${fileType}`);
      console.log(`Session ID: ${sessionId || 'Nouveau'}`);
      console.log(`Taille: ${fileBuffer.length} bytes`);
      
      // Vérifier les variables d'environnement
      console.log(`DROPBOX_ACCESS_TOKEN: ${process.env.DROPBOX_ACCESS_TOKEN ? 'Défini' : 'NON DÉFINI'}`);
      
      if (!process.env.DROPBOX_ACCESS_TOKEN) {
        throw new Error('DROPBOX_ACCESS_TOKEN non défini');
      }
      
      // 1. Créer le dossier de l'entreprise avec sous-dossier par type
      console.log(`Étape 1: Création du dossier...`);
      const folderPath = await this.createCompanyFolder(companyName, fileType, sessionId);
      console.log(`Dossier: ${folderPath}`);
      
      // 2. Uploader le fichier
      console.log(`Étape 2: Upload du fichier...`);
      const dropboxFile = await this.uploadFile(fileBuffer, fileName, folderPath);
      
      console.log(`=== TRANSFERT RÉUSSI ===`);
      console.log(`Fichier: ${dropboxFile.name}`);
      console.log(`Chemin: ${dropboxFile.path}`);
      console.log(`Lien: ${dropboxFile.url}`);
      
      return dropboxFile;
    } catch (error) {
      console.error('=== ERREUR LORS DU TRANSFERT DROPBOX ===');
      console.error('Détails de l\'erreur:', error);
      throw error;
    }
  }
}
