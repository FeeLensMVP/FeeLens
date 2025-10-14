// src/app/api/audit-request/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, files } = body;

    // --- C'EST ICI QUE VOUS METTREZ VOTRE LOGIQUE BACKEND ---
    // 1. Valider les données (s'assurer que rien ne manque).
    // 2. Créer une nouvelle entrée dans votre base de données (ex: une table "Audits").
    // 3. Associer le nom, l'entreprise, l'email et la liste des URLs de fichiers à cette entrée.
    // 4. Envoyer un email de notification à vous-même et/ou un accusé de réception au client.
    // ---------------------------------------------------------

    // Pour l'instant, on affiche juste les données dans la console du serveur pour vérifier.
    console.log("--- NOUVELLE DEMANDE D'AUDIT ---");
    console.log("Nom:", name);
    console.log("Entreprise:", company);
    console.log("Email:", email);
    console.log("Fichiers:", files.map((f: any) => f.name).join(", "));
    console.log("---------------------------------");

    return NextResponse.json({ success: true, message: "Audit request received." });

  } catch (error) {
    console.error("Erreur lors de la soumission de l'audit:", error);
    return NextResponse.json({ success: false, message: "An error occurred." }, { status: 500 });
  }
}