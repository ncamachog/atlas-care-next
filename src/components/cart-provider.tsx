"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";
import { FREE_SHIPPING } from "@/lib/shop";

interface Line { slug: string; qty: number }
export interface DetailedLine extends Line { product: Product; total: number }

interface Ctx {
  lines: DetailedLine[];
  count: number;
  subtotal: number;
  freeLeft: number;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  bagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  modalSlug: string | null;
  openProduct: (slug: string) => void;
  closeProduct: () => void;
}

const CartCtx = createContext<Ctx | null>(null);
const KEY = "atlas-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [modalSlug, setModalSlug] = useState<string | null>(null);

  // La bolsa vive en localStorage: el servidor no puede leerla, así que se hidrata al montar.
  useEffect(() => {
    try {
      const v = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Line[];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(v)) setRaw(v.filter((l) => getProduct(l.slug) && l.qty > 0));
    } catch {
      /* almacenamiento corrupto: se ignora */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(raw));
    } catch {
      /* modo privado / cuota */
    }
  }, [raw, ready]);

  const addItem = useCallback((slug: string, qty = 1) => {
    if (!getProduct(slug)) return;
    setRaw((prev) => {
      const has = prev.find((l) => l.slug === slug);
      return has ? prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(20, l.qty + qty) } : l)) : [...prev, { slug, qty }];
    });
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(20, qty) } : l))));
  }, []);
  const removeItem = useCallback((slug: string) => setRaw((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setRaw([]), []);

  const lines = useMemo<DetailedLine[]>(
    () => raw.flatMap((l) => { const p = getProduct(l.slug); return p ? [{ ...l, product: p, total: p.price * l.qty }] : []; }),
    [raw],
  );
  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  const value: Ctx = {
    lines, count, subtotal, freeLeft: Math.max(0, FREE_SHIPPING - subtotal),
    addItem, setQty, removeItem, clear,
    bagOpen, openBag: () => setBagOpen(true), closeBag: () => setBagOpen(false),
    modalSlug, openProduct: setModalSlug, closeProduct: () => setModalSlug(null),
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): Ctx {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return c;
}
