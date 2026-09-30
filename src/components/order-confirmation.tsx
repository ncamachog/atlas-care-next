"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Order } from "@/lib/orders";
import { cop } from "@/lib/shop";
import { LAST_ORDER_KEY } from "./checkout-form";
import { useLocale } from "./locale-provider";

const subscribe = () => () => {};
const read = () => {
  try { return window.sessionStorage.getItem(LAST_ORDER_KEY); } catch { return null; }
};

export default function OrderConfirmation() {
  const { t } = useLocale();
  const o = t.order;
  const raw = useSyncExternalStore(subscribe, read, () => null);
  const order: Order | null = raw ? (JSON.parse(raw) as Order) : null;

  if (!order) {
    return (
      <div className="a-empty-cart">
        <p className="a-body a-body--center">{o.notFound}</p>
        <div className="a-btn-row a-btn-row--center">
          <Link className="a-btn a-btn--brass" href="/shop">{o.shop}</Link>
          <Link className="a-btn a-btn--ghost" href="/">{o.home}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="a-thanks">
      <p className="a-body">{o.text}</p>
      <p className="a-thanks__number"><small>{o.number}</small><strong>{order.id}</strong></p>
      <div className="a-summary">
        <h2 className="a-h3">{o.summary}</h2>
        <ul className="a-summary__items">
          {order.items.map((i) => (
            <li key={i.slug}><span className="a-summary__name">{i.name} × {i.qty}</span><span>{cop(i.price * i.qty)}</span></li>
          ))}
        </ul>
        <div className="a-summary__row"><span>{t.checkout.subtotal}</span><strong>{cop(order.subtotal)}</strong></div>
        <div className="a-summary__row"><span>{t.checkout.shipping}</span><strong>{order.shippingCost === 0 ? t.checkout.free : cop(order.shippingCost)}</strong></div>
        <div className="a-summary__row a-summary__row--total"><span>{t.checkout.total}</span><strong>{cop(order.total)}</strong></div>
        <p className="a-summary__secure">{o.payment}</p>
        <p className="a-summary__secure"><strong>{o.shipTo}:</strong> {order.shipping.address}, {order.shipping.city}, {order.shipping.department}</p>
      </div>
      <div className="a-btn-row">
        <Link className="a-btn a-btn--brass" href="/shop">{o.shop}</Link>
      </div>
    </div>
  );
}
