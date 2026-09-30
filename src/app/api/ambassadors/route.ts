import { NextResponse } from "next/server";
import { addRequest } from "@/lib/ambassadors";
import { clientIp, tooMany } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (tooMany(clientIp(request), "amb", 3, 60_000)) return NextResponse.json({ error: "rate" }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  // Honeypot: se responde "ok" sin guardar para no darle pistas al bot.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const r = await addRequest(body);
  if (!r.ok) return NextResponse.json({ error: "invalid" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
