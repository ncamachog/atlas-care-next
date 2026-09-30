"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LINES, LINE_INFO, PRODUCTS, productsByLine, type Line } from "@/lib/products";
import { pf } from "@/lib/content";
import { cop } from "@/lib/shop";
import AddButton from "./add-button";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";
import ProductCard from "./product-card";

type Filter = "all" | Line;

/** Vitrina: filtros por línea. La línea inicial viene de ?line= (o de una categoría). */
export default function ShopView({ initial = "all" }: { initial?: Filter }) {
  const { locale, t } = useLocale();
  const { openProduct } = useCart();
  const [filter, setFilter] = useState<Filter>(initial);
  const grid = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initial !== "all") setTimeout(() => grid.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
  }, [initial]);

  const choose = (f: Filter) => {
    setFilter(f);
    window.history.replaceState(null, "", f === "all" ? "/shop" : `/shop?line=${f}`);
  };
  const show = (l: Line) => filter === "all" || filter === l;
  const visible = PRODUCTS.filter((p) => show(p.line)).length;

  return (
    <>
      <section className="a-shophero a-panel a-panel--dark">
        <p className="a-kicker a-kicker--light a-in" style={{ ["--i" as string]: 0 }}>{t.shop.kicker}</p>
        <h1 className="a-h1 a-in" style={{ ["--i" as string]: 1 }}>{t.shop.title}</h1>
        <p className="a-shophero__lead a-in" style={{ ["--i" as string]: 2 }}>{t.shop.lead}</p>
        <div className="a-filters a-in" style={{ ["--i" as string]: 3 }} role="group" aria-label={t.shop.filter_aria}>
          <button type="button" className={filter === "all" ? "is-active" : undefined} aria-pressed={filter === "all"} onClick={() => choose("all")}>{t.shop.all}</button>
          {LINES.map((l) => (
            <button key={l} type="button" className={filter === l ? "is-active" : undefined} aria-pressed={filter === l} onClick={() => choose(l)}>
              {LINE_INFO[l].label} <small>{t.shop.lines[l]}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="a-shopgrid a-panel a-panel--light" id="catalogo" ref={grid}>
        <div className="a-grid a-grid--3">
          {LINES.map((l) => {
            if (!show(l)) return null;
            if (l !== "body") return productsByLine(l).map((p) => <ProductCard key={p.slug} product={p} />);
            return (
              <article className="a-card a-card--set a-reveal" key="body-set">
                <div className="a-card--set__media">
                  <Image src="/img/body-trio.jpg" alt={t.shop.set_alt} width={1536} height={1024} sizes="(min-width:1100px) 60vw, 100vw" />
                </div>
                <div className="a-card--set__body">
                  <p className="a-kicker">{t.shop.set_kicker}</p>
                  <h2 className="a-h3">{t.shop.set_title}</h2>
                  <ul className="a-set">
                    {productsByLine("body").map((p) => (
                      <li key={p.slug}>
                        <button type="button" className="a-set__main" onClick={() => openProduct(p.slug)}>
                          <small>{p.code}</small>
                          <strong>{p.name}</strong>
                          <span>{pf(p, "sub", locale)}</span>
                          <span className="a-price">{cop(p.price)} <small>COP</small></span>
                        </button>
                        <AddButton slug={p.slug} className="a-btn a-btn--brass a-btn--sm" />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
        {visible === 0 && <p className="a-empty">{t.shop.empty}</p>}
      </section>
    </>
  );
}
