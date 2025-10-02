import { NextRequest, NextResponse } from "next/server";

type FormFields = {
  company: string;
  email: string;
};

const FORM_ENDPOINT =
  process.env.FORMSPREE_FORM_ENDPOINT ?? "https://formspree.io/f/xnngpygq";

function validateFields(formData: FormData): FormFields | null {
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!company || !email) {
    return null;
  }

  return { company, email };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fields = validateFields(formData);

  if (!fields) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!FORM_ENDPOINT) {
    console.error("FORMSPREE_FORM_ENDPOINT is not configured.");
    return NextResponse.json({ error: "Form endpoint not configured." }, { status: 500 });
  }

  try {
    const formspreeResponse = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!formspreeResponse.ok) {
      const errorBody = await formspreeResponse.text().catch(() => "");
      console.error(
        `Formspree request failed with status ${formspreeResponse.status}: ${errorBody}`,
      );
      return NextResponse.json(
        { error: "Unable to submit your request right now. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Formspree request failed", error);
    return NextResponse.json(
      { error: "Unexpected error submitting your request." },
      { status: 500 },
    );
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set("subscribed", "1");
  redirectUrl.hash = "audit";

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
