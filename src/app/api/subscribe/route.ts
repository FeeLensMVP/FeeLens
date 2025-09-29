import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  console.log('[subscribe] Starting request');
  
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim();
    console.log('[subscribe] Email received:', email);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (resend && process.env.RESEND_API_KEY) {
      console.log('[subscribe] Sending via Resend...');
      const result = await resend.emails.send({
        from: 'FeeLens Signups <onboarding@resend.dev>',
        to: 'gonzalezclement23@gmail.com',
        subject: 'New FeeLens Waitlist Signup',
        html: `<p>New signup: <strong>${email}</strong></p><p>Time: ${new Date().toLocaleString()}</p>`
      });
      console.log('[subscribe] Resend result:', result);
    } else {
      console.log('[subscribe] Resend not configured');
    }

    const url = new URL(req.nextUrl);
    url.pathname = "/";
    url.searchParams.set("subscribed", "1");
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}