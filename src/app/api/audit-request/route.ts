// Fichier : src/app/api/audit-request/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ConfirmationEmail } from "../../../emails/ConfirmationEmail";
import { NotificationEmail } from "../../../emails/NotificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- CONFIGURATION IMPORTANTE ---
// Remplacez 'feelens.us' par votre domaine VÉRIFIÉ sur Resend.
// 'noreply@' est une convention standard, mais vous pouvez utiliser 'support@', etc.
const FROM_EMAIL = 'FeeLens <noreply@revy-analyse.fr>'; 
// Remplacez par l'email où VOUS voulez recevoir les notifications.
const ADMIN_EMAIL = 'canler.maxence@gmail.com'; 
// --------------------------------

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, files } = body;

    // Utilise Promise.all pour envoyer les deux emails en parallèle
    const [confirmationData, notificationData] = await Promise.all([
      // 1. Envoyer l'email de confirmation au CFO
      resend.emails.send({
        from: FROM_EMAIL,
        to: email, // L'email du CFO
        subject: `Your Audit Request for ${company}`,
        react: ConfirmationEmail({ name, company }),
      }),
      // 2. Envoyer l'email de notification à vous-même
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL, // Votre email
        subject: `New Audit Request from ${company}`,
        react: NotificationEmail({ name, company, email, fileCount: files.length }),
      })
    ]);

    // Vérifie si l'une des deux requêtes a échoué
    if (confirmationData.error) {
      console.error("Erreur lors de l'envoi de l'email de confirmation:", confirmationData.error);
      throw new Error("Failed to send confirmation email.");
    }
    if (notificationData.error) {
      console.error("Erreur lors de l'envoi de l'email de notification:", notificationData.error);
      throw new Error("Failed to send notification email.");
    }

    console.log("--- EMAILS ENVOYÉS AVEC SUCCÈS ---");

    return NextResponse.json({ success: true, message: "Demande d'audit bien reçue." });

  } catch (error) {
    console.error("Erreur dans /api/audit-request:", error);
    // On retourne un message d'erreur plus clair au client
    return NextResponse.json({ success: false, message: "An error occurred while sending emails." }, { status: 500 });
  }
}