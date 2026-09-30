"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DEPARTMENTS, cop, shippingCost } from "@/lib/shop";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

export const LAST_ORDER_KEY = "atlas-last-order";

export default function CheckoutForm() {
  const { locale, t } = useLocale();
  const k = t.checkout;
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [department, setDepartment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const ship = department ? shippingCost(department, subtotal) : null;
  const total = subtotal + (ship ?? 0);

  if (lines.length === 0 && !busy) {
    return (
      <div className="a-empty-cart">
        <h2 className="a-h3">{k.empty}</h2>
        <p className="a-body a-body--center">{k.emptyText}</p>
        <Link className="a-btn a-btn--brass" href="/shop">{t.cart.shop}</Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: locale,
          items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
          customer: { name: d.get("name"), email: d.get("email"), phone: d.get("phone") },
          shipping: { department: d.get("department"), city: d.get("city"), address: d.get("address"), notes: d.get("notes") },
          website: d.get("website"),
        }),
      });
      const j = (await r.json()) as { order?: unknown; error?: string };
      if (!r.ok || !j.order) {
        const errs = k.errors as Record<string, string>;
        setError(errs[j.error ?? ""] ?? k.errors.generic);
        setBusy(false);
        return;
      }
      try { window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(j.order)); } catch { /* sin sessionStorage: la confirmación muestra el aviso genérico */ }
      clear();
      router.push("/order-confirmation");
    } catch {
      setError(k.errors.generic);
      setBusy(false);
    }
  }

  return (
    <form className="a-checkout" onSubmit={onSubmit}>
      <div className="a-checkout__fields">
        <fieldset>
          <legend>{k.contact}</legend>
          <label className="a-field"><span>{k.name}</span><input name="name" required autoComplete="name" /></label>
          <div className="a-field-row">
            <label className="a-field"><span>{k.email}</span><input name="email" type="email" required autoComplete="email" /></label>
            <label className="a-field"><span>{k.phone}</span><input name="phone" type="tel" required autoComplete="tel" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>{k.shippingTitle}</legend>
          <div className="a-field-row">
            <label className="a-field"><span>{k.department}</span>
              <select name="department" required value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="" disabled>{k.choose}</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label className="a-field"><span>{k.city}</span><input name="city" required autoComplete="address-level2" /></label>
          </div>
          <label className="a-field"><span>{k.address}</span><input name="address" required autoComplete="street-address" placeholder={k.addressHint} /></label>
          <label className="a-field"><span>{k.notes}</span><textarea name="notes" rows={3} /></label>
        </fieldset>

        <fieldset>
          <legend>{k.payment}</legend>
          <label className="a-pay">
            <input type="radio" name="payment" value="cod" defaultChecked readOnly />
            <span><strong>{k.cod}</strong><small>{k.codText}</small></span>
          </label>
        </fieldset>
        <input type="text" name="website" className="a-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <aside className="a-summary">
        <h2 className="a-h3">{k.summary}</h2>
        <ul className="a-summary__items">
          {lines.map((l) => (
            <li key={l.slug}>
              <span className="a-summary__thumb">
                <Image src={`/img/${l.product.img}`} alt="" width={56} height={56} />
                <b>{l.qty}</b>
              </span>
              <span className="a-summary__name">{l.product.name}</span>
              <span>{cop(l.total)}</span>
            </li>
          ))}
        </ul>
        <div className="a-summary__row"><span>{k.subtotal}</span><strong>{cop(subtotal)}</strong></div>
        <div className="a-summary__row"><span>{k.shipping}</span><strong>{ship === null ? "—" : ship === 0 ? k.free : cop(ship)}</strong></div>
        <div className="a-summary__row a-summary__row--total"><span>{k.total}</span><strong>{cop(total)}</strong></div>
        {error && <p className="a-note a-note--err" role="alert">{error}</p>}
        <button type="submit" className="a-btn a-btn--clay a-btn--block" disabled={busy}>{busy ? k.placing : k.place}</button>
        <p className="a-summary__secure">{k.secure}</p>
      </aside>
    </form>
  );
}
