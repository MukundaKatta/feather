import { NextResponse } from "next/server";

const WAITLIST_API = "https://waitlist-api-sigma.vercel.app/api/waitlist";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 },
      );
    }

    const upstream = await fetch(WAITLIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: "feather" }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream API error." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
}
