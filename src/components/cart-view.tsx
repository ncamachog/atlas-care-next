"use client";

import Image from "next/image";
import Link from "next/link";
import { pf } from "@/lib/content";
import { cop } from "@/lib/shop";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

export default function CartView() {
  const { locale, t } = useLocale();
  const c = t.cart;
  const { lines, subtotal, setQty, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="a-empty-cart">
        <h2 className="a-h3">{c.empty}</h2>
        <p className="a-body a-body--center">{c.emptyText}</p>
        <Link className="a-btn a-btn--brass" href="/shop">{c.shop}</Link>
      </div>
    );
  }

  return (
    <div className="a-cartgrid">
      <ul className="a-cartlist">
        {lines.map((l) => (
          <li className="a-cartrow" key={l.slug}>
            <Link href={`/product/${l.slug}`} className="a-cartrow__img">
              <Image src={`/img/${l.product.img}`} alt={`ATLAS ${l.product.code} — ${l.product.name}`} width={120} height={120} />
            </Link>
            <div className="a-cartrow__info">
              <small>{l.product.code}</small>
              <Link href={`/product/${l.slug}`}>{l.product.name}</Link>
              <span>{pf(l.product, "sub", locale)}</span>
              <span className="a-cartrow__unit">{cop(l.product.price)} COP</span>
            </div>
            <div className="a-qty" role="group" aria-label={c.qty}>
              <button type="button" onClick={() => setQty(l.slug, l.qty - 1)} aria-label={c.dec}>−</button>
              <output aria-live="polite">{l.qty}</output>
              <button type="button" onClick={() => setQty(l.slug, l.qty + 1)} aria-label={c.inc}>+</button>
            </div>
            <p className="a-cartrow__total">{cop(l.total)}</p>
            <button type="button" className="a-cartrow__remove" onClick={() => removeItem(l.slug)} aria-label={`${c.remove} ${l.product.name}`}>&times;</button>
          </li>
        ))}
      </ul>

      <aside className="a-summary">
        <h2 className="a-h3">{c.summary}</h2>
        <div className="a-summary__row"><span>{c.subtotal}</span><strong>{cop(subtotal)}</strong></div>
        <div className="a-summary__row"><span>{c.shipping}</span><span className="a-summary__note">{c.shippingNote}</span></div>
        <Link className="a-btn a-btn--brass a-btn--block" href="/checkout">{c.checkout}</Link>
        <Link className="a-link a-summary__link" href="/shop">{c.continue}</Link>
      </aside>
    </div>
  );
}
