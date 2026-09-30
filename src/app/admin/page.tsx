import type { Metadata } from "next";
import { listRequests } from "@/lib/ambassadors";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { listOrders, type Order } from "@/lib/orders";
import { cop } from "@/lib/shop";
import { usingRedis } from "@/lib/store";
import { logoutAction, orderStatusAction, requestDeleteAction, requestReadAction } from "./actions";
import LoginForm from "./login-form";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<Order["status"], string> = {
  new: "Nuevo", confirmed: "Confirmado", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado",
};
const fdate = (iso: string) => new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Bogota" });

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main id="primary" className="a-page a-plain">
        <section className="a-panel a-panel--light a-plain__inner">
          <h1 className="a-h2">Panel de administración</h1>
          <p className="a-body">El panel está desactivado. Define la variable de entorno <code>ADMIN_PASSWORD</code> (en Vercel: Settings → Environment Variables) y vuelve a desplegar.</p>
        </section>
      </main>
    );
  }
  if (!(await isAdmin())) {
    return (
      <main id="primary" className="a-page a-plain">
        <section className="a-panel a-panel--light a-plain__inner">
          <h1 className="a-h2">Panel de administración</h1>
          <LoginForm />
        </section>
      </main>
    );
  }

  const [orders, requests] = await Promise.all([listOrders(), listRequests()]);
  const openOrders = orders.filter((o) => o.status === "new").length;

  return (
    <main id="primary" className="a-page a-plain">
      <section className="a-panel a-panel--light a-plain__inner">
        <div className="a-head a-head--row">
          <h1 className="a-h2">Panel de administración</h1>
          <form action={logoutAction}><button className="a-btn a-btn--ghost" type="submit">Salir</button></form>
        </div>
        {!usingRedis && (
          <p className="a-note a-note--err">
            No hay base de datos conectada (Upstash Redis). Los pedidos y solicitudes de este entorno no se están guardando aquí; en producción quedan solo en los logs de Vercel. Conecta Upstash Redis desde el Marketplace de Vercel y vuelve a desplegar.
          </p>
        )}

        <h2 className="a-h3">Pedidos <small className="a-admin__count">{orders.length} · {openOrders} nuevos</small></h2>
        {orders.length === 0 ? <p className="a-body">Aún no hay pedidos.</p> : (
          <ul className="a-admin__list">
            {orders.map((o) => (
              <li className="a-admin__item" key={o.id}>
                <div className="a-admin__head">
                  <strong>{o.id}</strong>
                  <span>{fdate(o.createdAt)}</span>
                  <span className={`a-admin__status is-${o.status}`}>{STATUS_LABEL[o.status]}</span>
                  <strong className="a-admin__total">{cop(o.total)}</strong>
                </div>
                <p>{o.customer.name} · <a href={`mailto:${o.customer.email}`}>{o.customer.email}</a> · <a href={`tel:${o.customer.phone}`}>{o.customer.phone}</a></p>
                <p>{o.shipping.address}, {o.shipping.city}, {o.shipping.department}{o.shipping.notes ? ` — ${o.shipping.notes}` : ""}</p>
                <ul className="a-admin__lines">
                  {o.items.map((i) => <li key={i.slug}>{i.qty} × {i.code} {i.name} — {cop(i.price * i.qty)}</li>)}
                  <li>Envío: {o.shippingCost === 0 ? "gratis" : cop(o.shippingCost)} · Pago contra entrega · Idioma: {o.lang.toUpperCase()}</li>
                </ul>
                <form action={orderStatusAction} className="a-admin__actions">
                  <input type="hidden" name="id" value={o.id} />
                  <select name="status" defaultValue={o.status} aria-label="Estado del pedido">
                    {(Object.keys(STATUS_LABEL) as Order["status"][]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                  </select>
                  <button className="a-btn a-btn--ghost a-btn--sm" type="submit">Actualizar</button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <h2 className="a-h3" style={{ marginTop: "2.4rem" }}>Ambassadors <small className="a-admin__count">{requests.length} solicitudes</small></h2>
        {requests.length === 0 ? <p className="a-body">Aún no hay solicitudes.</p> : (
          <ul className="a-admin__list">
            {requests.map((r) => (
              <li className={`a-admin__item${r.read ? " is-read" : ""}`} key={r.id}>
                <div className="a-admin__head"><strong>{r.space}</strong><span>{r.type} · {r.city}</span><span>{fdate(r.createdAt)}</span></div>
                <p>{r.name} · <a href={`mailto:${r.email}`}>{r.email}</a>{r.phone ? <> · <a href={`tel:${r.phone}`}>{r.phone}</a></> : null}</p>
                {r.message && <p className="a-admin__msg">{r.message}</p>}
                <div className="a-admin__actions">
                  <form action={requestReadAction}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="read" value={r.read ? "0" : "1"} /><button className="a-btn a-btn--ghost a-btn--sm" type="submit">{r.read ? "Marcar como nueva" : "Marcar como leída"}</button></form>
                  <form action={requestDeleteAction}><input type="hidden" name="id" value={r.id} /><button className="a-btn a-btn--ghost a-btn--sm" type="submit">Eliminar</button></form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
