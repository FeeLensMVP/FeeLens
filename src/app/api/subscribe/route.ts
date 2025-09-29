import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

// Only initialize Resend if API key exists
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
  
  export async function POST(req: NextRequest) {
  console.log('[subscribe] Starting request');
  console.log('[subscribe] Resend configured:', !!resend);
  console.log('[subscribe] API key exists:', !!process.env.RESEND_API_KEY);
  
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim();
    console.log('[subscribe] Email received:', email);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Send email to yourself (only if resend is configured)
    if (resend && process.env.RESEND_API_KEY) {
      console.log('[subscribe] Attempting to send email via Resend...');
      const result = await resend.emails.send({
        from: 'FeeLens Signups <onboarding@resend.dev>',
        to: 'gonzalezclement23@gmail.com',
        subject: 'New FeeLens Waitlist Signup',
        html: `<p>New signup: <strong>${email}</strong></p><p>Time: ${new Date().toLocaleString()}</p>`
      });
      console.log('[subscribe] Resend result:', result);
    } else {
      console.log('[subscribe] Resend not configured - skipping email');
    }

    // Store email in JSON file (fallback)
    const fs = require('fs');
    const path = require('path');
    
    try {
      const subscribersPath = path.join(process.cwd(), 'subscribers.json');
      let subscribers = [];
      
      if (fs.existsSync(subscribersPath)) {
        const data = fs.readFileSync(subscribersPath, 'utf8');
        subscribers = JSON.parse(data);
      }
      
      // Check if email already exists
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
        console.log('[subscribe] Email stored in subscribers.json');
      } else {
        console.log('[subscribe] Email already exists in subscribers.json');
      }
    } catch (error) {
      console.error('[subscribe] Error storing email:', error);
    }

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });
    
  } catch (error) {
    console.error('[subscribe] Error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}