/** Límite sencillo por IP en memoria (por instancia). Frena ráfagas; no reemplaza a un WAF. */
const hits = new Map<string, number[]>();

export function tooMany(ip: string, key: string, max: number, windowMs: number): boolean {
  const k = `${key}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(k) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(k, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export const clientIp = (req: Request): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
