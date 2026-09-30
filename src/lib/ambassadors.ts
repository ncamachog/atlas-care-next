import { getOne, listAll, put, remove, type Collection } from "./store";
import type { Locale } from "./i18n";

export interface AmbassadorRequest {
  id: string;
  createdAt: string;
  lang: Locale;
  read: boolean;
  name: string;
  space: string;
  type: string;
  city: string;
  email: string;
  phone: string;
  message: string;
}

const COLL: Collection = "ambassadors";
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function addRequest(body: Record<string, unknown>): Promise<{ ok: true; persisted: boolean } | { ok: false }> {
  const r: AmbassadorRequest = {
    id: `AMB-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1296).toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    lang: body.lang === "en" ? "en" : "es",
    read: false,
    name: str(body.name, 120),
    space: str(body.space, 160),
    type: str(body.type, 60),
    city: str(body.city, 80),
    email: str(body.email, 160).toLowerCase(),
    phone: str(body.phone, 30),
    message: str(body.message, 2000),
  };
  if (r.name.length < 2 || r.space.length < 2 || r.city.length < 2 || !EMAIL.test(r.email)) return { ok: false };

  let persisted = false;
  try {
    persisted = await put(COLL, r);
  } catch (e) {
    console.error("[ATLAS] no se pudo guardar la solicitud", e);
  }
  if (!persisted) console.log("[ATLAS_AMBASSADOR]", JSON.stringify(r));
  return { ok: true, persisted };
}

export const listRequests = async () =>
  (await listAll<AmbassadorRequest>(COLL)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const setRequestRead = async (id: string, read: boolean) => {
  const r = await getOne<AmbassadorRequest>(COLL, id);
  if (r) await put(COLL, { ...r, read });
};

export const deleteRequest = (id: string) => remove(COLL, id);
