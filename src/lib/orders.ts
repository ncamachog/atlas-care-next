import { getProduct } from "./products";
import { DEPARTMENTS, shippingCost } from "./shop";
import { getOne, listAll, put, type Collection } from "./store";
import type { Locale } from "./i18n";

export interface OrderItem {
  slug: string;
  code: string;
  name: string;
  qty: number;
  /** Precio unitario (COP) al momento del pedido. */
  price: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "new" | "confirmed" | "shipped" | "delivered" | "cancelled";
  lang: Locale;
  payment: "cod";
  customer: { name: string; email: string; phone: string };
  shipping: { department: string; city: string; address: string; notes: string };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

const ORDERS: Collection = "orders";
const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Result<T> = { ok: true; value: T; persisted: boolean } | { ok: false; error: string };

/**
 * Crea un pedido. Los precios y el envío se recalculan aquí a partir del catálogo:
 * nunca se confía en los montos que manda el navegador.
 */
export async function createOrder(body: Record<string, unknown>): Promise<Result<Order>> {
  const lang: Locale = body.lang === "en" ? "en" : "es";
  const c = (body.customer ?? {}) as Record<string, unknown>;
  const s = (body.shipping ?? {}) as Record<string, unknown>;
  const customer = { name: str(c.name, 120), email: str(c.email, 160).toLowerCase(), phone: str(c.phone, 30) };
  const shipping = { department: str(s.department, 60), city: str(s.city, 80), address: str(s.address, 200), notes: str(s.notes, 500) };

  if (customer.name.length < 2) return { ok: false, error: "name" };
  if (!EMAIL.test(customer.email)) return { ok: false, error: "email" };
  if (customer.phone.replace(/\D/g, "").length < 7) return { ok: false, error: "phone" };
  if (!(DEPARTMENTS as readonly string[]).includes(shipping.department)) return { ok: false, error: "department" };
  if (shipping.city.length < 2) return { ok: false, error: "city" };
  if (shipping.address.length < 5) return { ok: false, error: "address" };

  const raw = Array.isArray(body.items) ? (body.items as { slug?: unknown; qty?: unknown }[]) : [];
  const merged = new Map<string, number>();
  for (const it of raw.slice(0, 40)) {
    const slug = str(it.slug, 40);
    const qty = Math.floor(Number(it.qty));
    if (!getProduct(slug) || !Number.isFinite(qty) || qty < 1) continue;
    merged.set(slug, Math.min(20, (merged.get(slug) ?? 0) + qty));
  }
  if (merged.size === 0) return { ok: false, error: "items" };

  const items: OrderItem[] = [...merged].map(([slug, qty]) => {
    const p = getProduct(slug)!;
    return { slug, code: p.code, name: p.name, qty, price: p.price };
  });
  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const ship = shippingCost(shipping.department, subtotal);

  const order: Order = {
    id: `ATL-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    status: "new",
    lang,
    payment: "cod",
    customer,
    shipping,
    items,
    subtotal,
    shippingCost: ship,
    total: subtotal + ship,
  };

  let persisted = false;
  try {
    persisted = await put(ORDERS, order);
  } catch (e) {
    console.error("[ATLAS] no se pudo guardar el pedido", e);
  }
  // Sin base de datos configurada el pedido queda solo en los logs: hay que rescatarlo de ahí.
  if (!persisted) console.log("[ATLAS_ORDER]", JSON.stringify(order));
  return { ok: true, value: order, persisted };
}

export const listOrders = async () =>
  (await listAll<Order>(ORDERS)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const setOrderStatus = async (id: string, status: Order["status"]) => {
  const o = await getOne<Order>(ORDERS, id);
  if (o) await put(ORDERS, { ...o, status });
};
