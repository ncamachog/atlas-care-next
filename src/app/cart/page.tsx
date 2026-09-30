import type { Metadata } from "next";
import CartView from "@/components/cart-view";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  return { title: getContent(await getLocale()).cart.title, robots: { index: false } };
}

export default async function CartPage() {
  const t = getContent(await getLocale());
  return (
    <main id="primary" className="a-page a-plain">
      <section className="a-panel a-panel--light a-plain__inner">
        <h1 className="a-h2 a-plain__title">{t.cart.title}</h1>
        <CartView />
      </section>
    </main>
  );
}
