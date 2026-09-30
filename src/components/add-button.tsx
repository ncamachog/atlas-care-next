"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

/** Añade un producto a la bolsa, confirma con "Añadido" y abre el panel de la bolsa. */
export default function AddButton({ slug, className = "a-btn a-btn--brass", full = false, openBagAfter = true }: { slug: string; className?: string; full?: boolean; openBagAfter?: boolean }) {
  const { t } = useLocale();
  const { addItem, openBag } = useCart();
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className={`${className}${done ? " is-done" : ""}`}
      onClick={() => {
        addItem(slug);
        setDone(true);
        if (openBagAfter) openBag();
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 1800);
      }}
    >
      <span className="a-plus" aria-hidden="true">{done ? "✓" : "+"}</span> {done ? t.card.added : full ? t.card.add : t.card.add_short}
    </button>
  );
}
