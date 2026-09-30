import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddButton from "@/components/add-button";
import { BODY_FOCUS } from "@/components/product-modal";
import ProductCard from "@/components/product-card";
import { fmt, getContent, pf, term } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { PRODUCTS, getProduct } from "@/lib/products";
import { FREE_SHIPPING, cop } from "@/lib/shop";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const locale = await getLocale();
  return {
    title: `${p.name} — ${p.code}`,
    description: pf(p, "desc", locale),
    openGraph: { images: [`/img/${p.img}`] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const locale = await getLocale();
  const t = getContent(locale);
  const more = [...PRODUCTS.filter((x) => x.line === p.line && x.slug !== p.slug), ...PRODUCTS.filter((x) => x.line !== p.line)].slice(0, 3);

  return (
    <main id="primary" className="a-page a-single">
      <section className="a-panel a-panel--light a-single__panel">
        <div className="a-single__media">
          <Image src={`/img/${p.img}`} alt={`ATLAS ${p.code} — ${p.name}`} width={1374} height={1145} priority sizes="(min-width:1100px) 45vw, 92vw" style={{ objectPosition: BODY_FOCUS[p.slug] ?? "50% 50%" }} />
        </div>
        <div className="a-single__body">
          <Link className="a-link" href={`/shop?line=${p.line}`}>← {t.product.back}</Link>
          <p className="a-kicker" style={{ marginTop: "1.6rem" }}>{p.code}</p>
          <h1 className="a-h2 a-single__title">{p.name}</h1>
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
          <div className="a-modal__actions"><AddButton slug={p.slug} full /></div>
          <ul className="a-single__notes">
            <li>{fmt(t.product.ship, cop(FREE_SHIPPING))}</li>
            <li>{t.product.pay}</li>
            <li>{t.product.sku}: {p.code.replace(" ", "-")}</li>
          </ul>
        </div>
      </section>

      <section className="a-panel a-panel--dark">
        <div className="a-head"><h2 className="a-h2 a-h2--light">{t.product.related}</h2></div>
        <div className="a-grid a-grid--3 a-grid--dark">
          {more.map((x) => <ProductCard key={x.slug} product={x} />)}
        </div>
      </section>
    </main>
  );
}
