import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBg from "@/components/page-bg";
import { Rich } from "@/components/rich";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { DESCRIPTIONS } from "@/lib/seo";

const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: getContent(locale).meta.inspo_title, description: DESCRIPTIONS.inspo[locale] };
}

export default async function InspirationPage() {
  const t = getContent(await getLocale());
  const s = t.inspo;
  return (
    <main id="primary" className="a-page a-inspo">
      <PageBg img="inspiration-science.jpg" />

      <section className="a-inspohero a-panel a-panel--photo">
        <Image className="a-hero__img" src="/img/inspiration-science.jpg" alt={s.hero_alt} width={1536} height={1024} priority sizes="100vw" />
        <div className="a-hero__scrim" />
        <div className="a-hero__inner">
          <p className="a-kicker a-kicker--light a-in" style={iv(0)}>ATLAS</p>
          <h1 className="a-hero__title a-in" style={iv(1)}><Rich text={s.hero_title} /></h1>
          <p className="a-hero__lead a-in" style={iv(2)}><em>{s.hero_lead}</em></p>
        </div>
      </section>

      <section className="a-story a-panel a-panel--light">
        <div className="a-story__lead a-reveal">
          <p className="a-kicker">{s.idea_kicker}</p>
          <h2 className="a-h2">{s.idea_title}</h2>
        </div>
        <div className="a-story__cols a-reveal">
          {s.idea.map((para) => <p className="a-body" key={para.slice(0, 24)}>{para}</p>)}
        </div>
      </section>

      <section className="a-science a-panel a-panel--dark">
        <div className="a-science__text a-reveal">
          <p className="a-kicker a-kicker--light">{s.sci_kicker}</p>
          <h2 className="a-h2 a-h2--light">{s.sci_title}</h2>
          <p className="a-body a-body--light">{s.sci_lead}</p>
        </div>
        <ul className="a-actives a-reveal">
          {s.actives.map((a) => <li key={a[0]}><b>{a[0]}</b><span>{a[1]}</span></li>)}
        </ul>
        <p className="a-science__quote a-reveal"><Rich text={s.sci_quote} /></p>
      </section>

      <section className="a-approach a-panel a-panel--light">
        <div className="a-head a-reveal">
          <p className="a-kicker">{s.app_kicker}</p>
          <h2 className="a-h2">{s.app_title}</h2>
        </div>
        <div className="a-approach__grid a-approach__grid--light">
          {s.steps.map((st, i) => (
            <div className="a-step a-reveal" key={st[0]}>
              <span className="a-step__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{st[0]}</h3>
              <p>{st[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a-split a-split--rev a-panel a-panel--olive">
        <div className="a-split__text a-reveal">
          <p className="a-kicker a-kicker--light">{s.int_kicker}</p>
          <h2 className="a-h2 a-h2--light">{s.int_title}</h2>
          <p className="a-body a-body--light">{s.int_text}</p>
          <p className="a-pull">{s.int_pull}</p>
        </div>
        <div className="a-split__media a-reveal">
          <Image src="/img/face-06-exfoliant.jpg" alt={s.int_alt} width={1374} height={1145} sizes="(min-width:921px) 45vw, 92vw" />
        </div>
      </section>

      <section className="a-life a-panel a-panel--photo">
        <Image className="a-life__img" src="/img/tempo-04-spf-sport.jpg" alt={s.life_alt} width={1374} height={1145} sizes="(min-width:921px) 62vw, 100vw" />
        <div className="a-life__scrim" />
        <div className="a-life__text a-reveal">
          <p className="a-kicker a-kicker--light">{s.life_kicker}</p>
          <h2 className="a-h2 a-h2--light"><Rich text={s.life_title} /></h2>
          <ul className="a-moments">{s.moments.map((m) => <li key={m}>{m}</li>)}</ul>
          <p className="a-body a-body--light">{s.life_text}</p>
        </div>
      </section>

      <section className="a-cta a-panel a-panel--light a-reveal">
        <p className="a-kicker">{s.end_kicker}</p>
        <h2 className="a-h2">{s.end_title}</h2>
        <p className="a-body a-body--center">{s.end_text}</p>
        <p className="a-signature"><Rich text={s.signature} /></p>
        <div className="a-btn-row a-btn-row--center">
          <Link className="a-btn a-btn--brass" href="/shop">{s.cta}</Link>
        </div>
      </section>
    </main>
  );
}
