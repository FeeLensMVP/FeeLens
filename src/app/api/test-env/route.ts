// Endpoint de test pour vérifier les variables d'environnement
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    dropboxAccessToken: process.env.DROPBOX_ACCESS_TOKEN ? "✅ Défini" : "❌ NON DÉFINI",
    uploadthingSecret: process.env.UPLOADTHING_SECRET ? "✅ Défini" : "❌ NON DÉFINI",
    resendApiKey: process.env.RESEND_API_KEY ? "✅ Défini" : "❌ NON DÉFINI",
  });
}
