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