import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send email to yourself
    await resend.emails.send({
      from: 'FeeLens Signups <onboarding@resend.dev>',
      to: 'gonzalezclement23@gmail.com', // YOUR actual email
      subject: 'New FeeLens Waitlist Signup',
      html: `<p>New signup: <strong>${email}</strong></p><p>Time: ${new Date().toLocaleString()}</p>`
    });

    console.log(`[subscribe] Email sent for: ${email}`);

    const url = new URL(req.nextUrl);
    url.pathname = "/";
    url.searchParams.set("subscribed", "1");
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}