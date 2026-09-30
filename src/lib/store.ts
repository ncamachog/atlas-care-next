import { promises as fs } from "fs";
import path from "path";

/**
 * Persistencia simple por colección (pedidos, solicitudes de Ambassadors).
 *  - Producción: Upstash Redis por REST (`KV_REST_API_URL` + `KV_REST_API_TOKEN`, o `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`).
 *    Cada colección es un hash `atlas:<colección>` (id → JSON), así que dos pedidos simultáneos no se pisan.
 *  - Desarrollo sin Redis: archivo `.data/<colección>.json`.
 *  - Producción sin Redis: no se puede escribir en disco; `put` devuelve false y el llamador registra el dato en los logs.
 */
const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const dataDir = path.join(process.cwd(), ".data");

export const usingRedis = Boolean(URL_ && TOKEN);
export type Collection = "orders" | "ambassadors";

async function redis(cmd: (string | number)[]): Promise<unknown> {
  const r = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`Redis ${r.status}`);
  return ((await r.json()) as { result: unknown }).result;
}

async function readFile<T>(name: Collection): Promise<Record<string, T>> {
  try {
    return JSON.parse(await fs.readFile(path.join(dataDir, `${name}.json`), "utf8")) as Record<string, T>;
  } catch {
    return {};
  }
}

export async function listAll<T>(name: Collection): Promise<T[]> {
  if (usingRedis) {
    const flat = ((await redis(["HGETALL", `atlas:${name}`])) as string[] | null) ?? [];
    const out: T[] = [];
    for (let i = 1; i < flat.length; i += 2) out.push(JSON.parse(flat[i]) as T);
    return out;
  }
  return Object.values(await readFile<T>(name));
}

/** Guarda (o reemplaza) un registro. Devuelve false si no hay dónde persistirlo. */
export async function put<T extends { id: string }>(name: Collection, item: T): Promise<boolean> {
  if (usingRedis) {
    await redis(["HSET", `atlas:${name}`, item.id, JSON.stringify(item)]);
    return true;
  }
  if (process.env.NODE_ENV === "production") return false;
  const all = await readFile<T>(name);
  all[item.id] = item;
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, `${name}.json`), JSON.stringify(all, null, 2));
  return true;
}

export async function getOne<T>(name: Collection, id: string): Promise<T | null> {
  if (usingRedis) {
    const raw = (await redis(["HGET", `atlas:${name}`, id])) as string | null;
    return raw ? (JSON.parse(raw) as T) : null;
  }
  return (await readFile<T>(name))[id] ?? null;
}

export async function remove(name: Collection, id: string): Promise<void> {
  if (usingRedis) {
    await redis(["HDEL", `atlas:${name}`, id]);
    return;
  }
  const all = await readFile<unknown>(name);
  delete all[id];
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, `${name}.json`), JSON.stringify(all, null, 2));
}
