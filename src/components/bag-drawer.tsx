"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { fmt, pf } from "@/lib/content";
import { FREE_SHIPPING, cop } from "@/lib/shop";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

export default function BagDrawer() {
  const { locale, t } = useLocale();
  const { lines, subtotal, freeLeft, removeItem, bagOpen, closeBag } = useCart();

  useEffect(() => {
    if (!bagOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBag();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [bagOpen, closeBag]);

  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING) * 100));

  return (
    <>
      <div className={`a-scrim${bagOpen ? " is-open" : ""}`} hidden={!bagOpen} onClick={closeBag} />
      <aside className={`a-drawer${bagOpen ? " is-open" : ""}`} aria-label={t.bag.title} aria-hidden={!bagOpen}>
        <div className="a-drawer__head">
          <h2>{t.bag.title}</h2>
          <button type="button" className="a-x" onClick={closeBag} aria-label={t.ui.close}>&times;</button>
        </div>
        <p className="a-drawer__lead">{t.bag.lead}</p>

        <div className="a-drawer__body">
          <div className="a-minicart">
            {lines.length === 0 ? (
              <p className="a-drawer__empty">{t.bag.empty}</p>
            ) : (
              <>
                <ul className="a-drawer__list">
                  {lines.map((l) => (
                    <li className="a-ritem" key={l.slug}>
                      <Image src={`/img/${l.product.img}`} alt="" width={64} height={64} style={{ objectPosition: l.product.group ? "50% 50%" : undefined }} />
                      <div>
                        <small>{l.product.code}</small>
                        <strong>{l.product.name}</strong>
                        <span className="a-ritem__meta">{t.bag.qty} {l.qty} · {cop(l.total)}</span>
                        <span className="sr-only">{pf(l.product, "sub", locale)}</span>
                      </div>
                      <button type="button" onClick={() => removeItem(l.slug)} aria-label={`${t.bag.remove} ${l.product.name}`}>&times;</button>
                    </li>
                  ))}
                </ul>
                <div className="a-minicart__totals">
                  <div className="a-minicart__row"><span>{t.bag.subtotal}</span><strong>{cop(subtotal)}</strong></div>
                  <div className="a-progress" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
                  <p className="a-minicart__note">{freeLeft > 0 ? fmt(t.bag.free_left, cop(freeLeft)) : t.bag.free_ok}</p>
                  <p className="a-minicart__note">{t.bag.note}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="a-drawer__foot">
          {lines.length > 0 ? (
            <Link className="a-btn a-btn--brass a-btn--block" href="/checkout" onClick={closeBag}>{t.bag.checkout}</Link>
          ) : (
            <Link className="a-btn a-btn--brass a-btn--block" href="/shop" onClick={closeBag}>{t.bag.continue}</Link>
          )}
          <Link className="a-link" href="/cart" onClick={closeBag}>{t.bag.view}</Link>
        </div>
      </aside>
    </>
  );
}
