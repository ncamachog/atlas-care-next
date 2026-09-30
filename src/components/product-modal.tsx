"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getProduct } from "@/lib/products";
import { pf, term } from "@/lib/content";
import { cop } from "@/lib/shop";
import AddButton from "./add-button";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

/** En los tres productos Body, la foto es compartida: se enfoca el frasco elegido. */
export const BODY_FOCUS: Record<string, string> = { "body-16": "26% 50%", "body-17": "52% 50%", "body-19": "84% 50%" };

export default function ProductModal() {
  const { locale, t } = useLocale();
  const { modalSlug, closeProduct } = useCart();
  const p = modalSlug ? getProduct(modalSlug) : undefined;

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeProduct();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [p, closeProduct]);

  return (
    <div className={`a-modal${p ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="a-modal-title" aria-hidden={!p} onClick={(e) => e.target === e.currentTarget && closeProduct()}>
      {p && (
        <div className="a-modal__panel">
          <button type="button" className="a-x a-modal__x" onClick={closeProduct} aria-label={t.ui.close} autoFocus>&times;</button>
          <div className="a-modal__media">
            <Image src={`/img/${p.img}`} alt={`ATLAS ${p.code} — ${p.name}`} width={1374} height={1145} sizes="(min-width:921px) 520px, 100vw" style={{ objectPosition: BODY_FOCUS[p.slug] ?? "50% 50%" }} />
          </div>
          <div className="a-modal__body">
            <p className="a-kicker">{p.code}</p>
            <h2 className="a-modal__title" id="a-modal-title">{p.name}</h2>
            <p className="a-modal__es">{pf(p, "sub", locale)}</p>
            <p className="a-price a-price--lg">{cop(p.price)} <small>COP</small></p>
            <p className="a-modal__moment">{pf(p, "moment", locale)}</p>
            <p className="a-modal__desc">{pf(p, "desc", locale)}</p>
            <p className="a-modal__label">{t.card.benefits}</p>
            <ul className="a-chips a-chips--lg">{p.benefits.map((b) => <li key={b}>{term(locale, b)}</li>)}</ul>
            {p.ingredients.length > 0 && (
              <>
                <p className="a-modal__label">{t.card.ingredients}</p>
                <ul className="a-chips a-chips--lg">{p.ingredients.map((b) => <li key={b}>{term(locale, b)}</li>)}</ul>
              </>
            )}
            <div className="a-modal__actions">
              <AddButton slug={p.slug} full />
              <Link className="a-link" href={`/product/${p.slug}`} onClick={closeProduct}>{t.card.details} →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
