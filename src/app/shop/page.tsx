import type { Metadata } from "next";
import Link from "next/link";
import ShopView from "@/components/shop-view";
import { getLocale } from "@/lib/locale";
import { getContent } from "@/lib/content";
import { LINES, type Line } from "@/lib/products";
import { DESCRIPTIONS } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: getContent(locale).meta.shop_title, description: DESCRIPTIONS.shop[locale] };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ line?: string }> }) {
  const { line } = await searchParams;
  const initial = LINES.includes(line as Line) ? (line as Line) : "all";
  return (
    <main id="primary" className="a-page a-shop">
      <ShopView initial={initial} />
      <ShopCta />
    </main>
  );
}

async function ShopCta() {
  const t = getContent(await getLocale());
  return (
    <section className="a-cta a-panel a-panel--olive a-reveal">
      <p className="a-kicker a-kicker--light">{t.shop.cta_kicker}</p>
      <h2 className="a-h2 a-h2--light">{t.shop.cta_title}</h2>
      <div className="a-btn-row a-btn-row--center">
        <Link className="a-btn a-btn--brass" href="/inspiration-and-science">{t.shop.cta_btn}</Link>
      </div>
    </section>
  );
}
