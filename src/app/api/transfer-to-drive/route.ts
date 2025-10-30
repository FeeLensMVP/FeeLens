// API endpoint pour transférer un fichier vers Dropbox
import { NextResponse } from "next/server";
import { DropboxService } from "@/lib/dropbox";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const companyName = formData.get('companyName') as string;
    const fileType = formData.get('fileType') as 'statements' | 'pricing';
    const sessionId = formData.get('sessionId') as string;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 });
    }

    // Convertir le fichier en Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Uploader vers Dropbox
    const dropboxFile = await DropboxService.transferFile(
      fileBuffer,
      fileName,
      companyName,
      fileType,
      sessionId
    );

    return NextResponse.json({
      success: true,
      dropboxFile: {
        id: dropboxFile.id,
        name: dropboxFile.name,
        path: dropboxFile.path,
        url: dropboxFile.url
      }
    });

  } catch (error) {
    console.error('❌ Erreur transfert:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
