import type { Metadata } from "next";
import Image from "next/image";
import AmbassadorForm from "@/components/ambassador-form";
import PageBg from "@/components/page-bg";
import { Rich } from "@/components/rich";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { DESCRIPTIONS } from "@/lib/seo";

const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: getContent(locale).meta.amb_title, description: DESCRIPTIONS.ambassadors[locale] };
}

export default async function AmbassadorsPage() {
  const t = getContent(await getLocale());
  const a = t.amb;
  return (
    <main id="primary" className="a-page a-amb">
      <PageBg img="ambassadors-bay.jpg" />

      <section className="a-inspohero a-panel a-panel--photo">
        <Image className="a-hero__img" src="/img/ambassadors-bay.jpg" alt={a.hero_alt} width={1536} height={1024} priority sizes="100vw" />
        <div className="a-hero__scrim" />
        <div className="a-hero__inner">
          <p className="a-kicker a-kicker--light a-in" style={iv(0)}>{a.kicker}</p>
          <h1 className="a-hero__title a-in" style={iv(1)}><Rich text={a.title} /></h1>
          <p className="a-hero__lead a-in" style={iv(2)}><em>{a.tagline}</em></p>
          <div className="a-btn-row a-in" style={iv(3)}>
            <a className="a-btn a-btn--brass" href="#unete">{a.join_kicker}</a>
          </div>
        </div>
      </section>

      <section className="a-split a-panel a-panel--light">
        <div className="a-split__text a-reveal">
          <p className="a-kicker">{a.intro_kicker}</p>
          <h2 className="a-h2">{a.tagline}</h2>
          <p className="a-body">{a.p1}</p>
          <p className="a-body">{a.p2}</p>
          <p className="a-body">{a.p3}</p>
        </div>
        <div className="a-split__media a-reveal">
          <Image src="/img/ambassadors-hotel.jpg" alt={a.hotel_alt} width={1536} height={1024} sizes="(min-width:921px) 45vw, 92vw" />
        </div>
      </section>

      <section className="a-spaces a-panel a-panel--dark">
        <div className="a-head a-reveal">
          <p className="a-kicker a-kicker--light">{a.spaces_kicker}</p>
          <h2 className="a-h2 a-h2--light">{a.spaces_title}</h2>
        </div>
        <ul className="a-spaces__grid">
          {a.spaces.map((sp, i) => (
            <li className="a-space a-reveal" key={sp}>
              <span className="a-step__n">{String(i + 1).padStart(2, "0")}</span>
              <strong>{sp}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="a-join a-panel a-panel--olive" id="unete">
        <div className="a-join__text a-reveal">
          <p className="a-kicker a-kicker--light">{a.join_kicker}</p>
          <h2 className="a-h2 a-h2--light">{a.join_title}</h2>
          <p className="a-body a-body--light">{a.join_text}</p>
        </div>
        <div className="a-join__form a-reveal">
          <AmbassadorForm />
        </div>
      </section>
    </main>
  );
}
