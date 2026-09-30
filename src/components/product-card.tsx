"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { pf, term } from "@/lib/content";
import { cop } from "@/lib/shop";
import AddButton from "./add-button";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

export function Chips({ product, limit = 3, large = false }: { product: Product; limit?: number; large?: boolean }) {
  const { locale, t } = useLocale();
  const items = product.ingredients.length ? product.ingredients : product.benefits;
  return (
    <ul className={`a-chips${large ? " a-chips--lg" : ""}`} aria-label={product.ingredients.length ? t.card.ing_aria : t.card.ben_aria}>
      {items.slice(0, limit).map((i) => <li key={i}>{term(locale, i)}</li>)}
    </ul>
  );
}

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const { locale, t } = useLocale();
  const { openProduct } = useCart();
  return (
    <article className={`a-card a-reveal ${className}`} data-line={product.line}>
      <button type="button" className="a-card__media" onClick={() => openProduct(product.slug)} aria-label={`${t.card.see} ${product.code} ${product.name}`}>
        <Image src={`/img/${product.img}`} alt={`ATLAS ${product.code} — ${product.name}`} width={1374} height={1145} sizes="(min-width:1100px) 22vw, (min-width:621px) 44vw, 92vw" />
        <span className="a-card__code">{product.code}</span>
      </button>
      <div className="a-card__body">
        <h3 className="a-card__name">{product.name}</h3>
        <p className="a-card__es">{pf(product, "sub", locale)}</p>
        <Chips product={product} />
        <p className="a-price">{cop(product.price)} <small>COP</small></p>
        <div className="a-card__actions">
          <button type="button" className="a-btn a-btn--ghost" onClick={() => openProduct(product.slug)}>{t.card.details}</button>
          <AddButton slug={product.slug} />
        </div>
      </div>
    </article>
  );
}
