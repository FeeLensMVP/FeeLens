import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // In a real app, persist to your DB or ESP here.
    // For now, no-op and redirect with a success flag.
    const url = new URL(req.nextUrl);
    url.pathname = "/";
    url.searchParams.set("subscribed", "1");
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}


