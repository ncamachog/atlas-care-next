import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { Rich } from "@/components/rich";
import { fmt, getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { LINES, LINE_INFO, getProduct, productsByLine } from "@/lib/products";

const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
const FEATURED = ["face-05", "face-02", "hair-12", "tempo-05"];

export default async function HomePage() {
  const t = getContent(await getLocale());
  const h = t.home;
  const featured = FEATURED.map(getProduct).filter((p) => p !== undefined);

  return (
    <main id="primary" className="a-page a-home">
      {/* Hero */}
      <section className="a-hero a-panel a-panel--photo">
        <Image className="a-hero__img" src="/img/fondo-cartagena.jpg" alt={h.hero.alt} width={1536} height={1024} priority sizes="100vw" />
        <div className="a-hero__scrim" />
        <div className="a-hero__inner">
          <p className="a-kicker a-kicker--light a-in" style={iv(0)}><Rich text={h.hero.kicker} /></p>
          <h1 className="a-hero__title a-in" style={iv(1)}><Rich text={h.hero.title} /></h1>
          <p className="a-hero__lead a-in" style={iv(2)}>{h.hero.lead}</p>
          <div className="a-btn-row a-in" style={iv(3)}>
            <Link className="a-btn a-btn--brass" href="/shop"><Rich text={h.hero.cta1} /></Link>
            <Link className="a-btn a-btn--outline" href="/inspiration-and-science"><Rich text={h.hero.cta2} /></Link>
          </div>
        </div>
        <ul className="a-hero__moments a-in" style={iv(4)} aria-label={h.moments_aria}>
          {h.moments.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>

      {/* Marquee */}
      <div className="a-marquee" aria-hidden="true">
        <div className="a-marquee__track">
          {[0, 1].map((n) => ["Hydrate", "Protect", "Renew", "Restore"].map((w) => (
            <span key={`${n}-${w}`} style={{ display: "contents" }}><span>{w}</span><i>✦</i></span>
          )))}
        </div>
      </div>

      {/* Inspiración */}
      <section className="a-split a-panel a-panel--light">
        <div className="a-split__media a-reveal">
          <Image src="/img/inspiration-science.jpg" alt={h.inspired.alt} width={1536} height={1024} sizes="(min-width:921px) 45vw, 92vw" />
        </div>
        <div className="a-split__text a-reveal">
          <p className="a-kicker">{h.inspired.kicker}</p>
          <h2 className="a-h2">{h.inspired.title}</h2>
          <p className="a-body">{h.inspired.p1}</p>
          <p className="a-body">{h.inspired.p2}</p>
          <Link className="a-link" href="/inspiration-and-science"><Rich text={h.inspired.link} /> <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* Líneas */}
      <section className="a-lines">
        <div className="a-head a-reveal">
          <p className="a-kicker a-kicker--light">{h.lines.kicker}</p>
          <h2 className="a-h2 a-h2--light">{h.lines.title}</h2>
        </div>
        <div className="a-lines__grid">
          {LINES.map((l) => (
            <Link key={l} className="a-line a-reveal" href={`/shop?line=${l}`}>
              <Image src={`/img/${LINE_INFO[l].img}`} alt={fmt(h.lines.alt, LINE_INFO[l].label)} width={1374} height={1145} sizes="(min-width:1100px) 22vw, (min-width:621px) 44vw, 92vw" />
              <span className="a-line__shade" />
              <span className="a-line__text">
                <small>{t.shop.lines[l]}</small>
                <strong>{LINE_INFO[l].label}</strong>
                <em>{fmt(h.lines.count, productsByLine(l).length)}</em>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="a-featured a-panel a-panel--light">
        <div className="a-head a-head--row a-reveal">
          <div>
            <p className="a-kicker">{h.featured.kicker}</p>
            <h2 className="a-h2">{h.featured.title}</h2>
          </div>
          <Link className="a-btn a-btn--ghost" href="/shop">{h.featured.cta}</Link>
        </div>
        <div className="a-grid a-grid--4">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Enfoque */}
      <section className="a-approach a-panel a-panel--dark">
        <div className="a-head a-reveal">
          <p className="a-kicker a-kicker--light">{h.approach.kicker}</p>
          <h2 className="a-h2 a-h2--light">{h.approach.title}</h2>
        </div>
        <div className="a-approach__grid">
          {h.approach.steps.map((s, i) => (
            <div className="a-step a-reveal" key={s[0]}>
              <span className="a-step__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s[0]}</h3>
              <p>{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ciencia simple */}
      <section className="a-science a-panel a-panel--olive">
        <div className="a-science__text a-reveal">
          <p className="a-kicker a-kicker--light">{h.science.kicker}</p>
          <h2 className="a-h2 a-h2--light"><Rich text={h.science.title} /></h2>
        </div>
        <ul className="a-actives a-reveal">
          {h.science.actives.map((a) => <li key={a[0]}><b>{a[0]}</b><span>{a[1]}</span></li>)}
        </ul>
      </section>

      {/* Vida real */}
      <section className="a-life a-panel a-panel--photo">
        <Image className="a-life__img" src="/img/tempo-05-body-wash.jpg" alt={h.life.alt} width={1374} height={1145} sizes="(min-width:921px) 62vw, 100vw" />
        <div className="a-life__scrim" />
        <div className="a-life__text a-reveal">
          <p className="a-kicker a-kicker--light">{h.life.kicker}</p>
          <h2 className="a-h2 a-h2--light"><Rich text={h.life.title} /></h2>
          <p className="a-body a-body--light">{h.life.text}</p>
          <Link className="a-btn a-btn--brass" href="/shop?line=tempo">{h.life.cta}</Link>
        </div>
      </section>

      {/* Ambassadors */}
      <section className="a-ambteaser a-panel a-panel--photo">
        <Image className="a-life__img" src="/img/ambassadors-hotel.jpg" alt={h.amb.alt} width={1536} height={1024} sizes="(min-width:921px) 62vw, 100vw" />
        <div className="a-life__scrim" />
        <div className="a-life__text a-reveal">
          <p className="a-kicker a-kicker--light">{h.amb.kicker}</p>
          <h2 className="a-h2 a-h2--light">{h.amb.title}</h2>
          <p className="a-body a-body--light">{h.amb.text}</p>
          <Link className="a-btn a-btn--brass" href="/ambassadors">{h.amb.cta}</Link>
        </div>
      </section>

      {/* Cierre */}
      <section className="a-cta a-panel a-panel--light a-reveal">
        <p className="a-kicker">{h.cta.kicker}</p>
        <h2 className="a-h2"><Rich text={h.cta.title} /></h2>
        <div className="a-btn-row a-btn-row--center">
          <Link className="a-btn a-btn--brass" href="/shop">{h.cta.cta1}</Link>
          <Link className="a-btn a-btn--ghost" href="/inspiration-and-science">{h.cta.cta2}</Link>
        </div>
      </section>
    </main>
  );
}
