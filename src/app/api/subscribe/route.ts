import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Save email to JSON file
    const emailData = { 
      email, 
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    const filePath = path.join(process.cwd(), 'subscribers.json');
    
    try {
      // Read existing subscribers or create empty array
      const existingData = await fs.readFile(filePath, 'utf8').catch(() => '[]');
      const subscribers = JSON.parse(existingData);
      
      // Check if email already exists
      const emailExists = subscribers.some((sub: any) => sub.email === email);
      if (emailExists) {
        return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
      }
      
      // Add new subscriber
      subscribers.push(emailData);
      
      // Save updated list
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2));
      
      console.log(`[subscribe] New subscriber saved: ${email}`);
    } catch (err) {
      console.error('[subscribe] Error saving subscriber:', err);
      return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
    }
    const url = new URL(req.nextUrl);
    url.pathname = "/";
    url.searchParams.set("subscribed", "1");
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error("[subscribe] Unexpected error handling signup:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


