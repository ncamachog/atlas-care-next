import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { clientIp, tooMany } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (tooMany(clientIp(request), "orders", 6, 60_000)) return NextResponse.json({ error: "rate" }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  // Trampa para bots: el campo "website" está oculto y debe llegar vacío.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const r = await createOrder(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  return NextResponse.json({ order: r.value });
}
