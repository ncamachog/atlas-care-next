import Link from "next/link";
import { getContent, fmt } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { LINES, LINE_INFO } from "@/lib/products";
import { FREE_SHIPPING, cop } from "@/lib/shop";

export default async function Footer() {
  const t = getContent(await getLocale());
  return (
    <footer className="a-footer">
      <div className="a-footer__top">
        <div className="a-footer__brand">
          <p className="a-footer__word">ATLAS</p>
          <p className="a-footer__tag">Modern care, naturally refined.</p>
          <p className="a-footer__desc">{t.footer.desc}</p>
          <p className="a-footer__ship">{fmt(t.footer.shipping, cop(FREE_SHIPPING))}</p>
        </div>
        <nav className="a-footer__col" aria-label={t.footer.explore}>
          <p className="a-footer__label">{t.footer.explore}</p>
          <Link href="/">{t.nav.home}</Link>
          <Link href="/shop">{t.nav.shop}</Link>
          <Link href="/inspiration-and-science">{t.nav.inspo}</Link>
          <Link href="/ambassadors">{t.nav.ambassadors}</Link>
        </nav>
        <nav className="a-footer__col" aria-label={t.footer.lines}>
          <p className="a-footer__label">{t.footer.lines}</p>
          {LINES.map((l) => (
            <Link key={l} href={`/shop?line=${l}`}>{LINE_INFO[l].label} · {t.shop.lines[l]}</Link>
          ))}
        </nav>
        <nav className="a-footer__col" aria-label={t.footer.help}>
          <p className="a-footer__label">{t.footer.help}</p>
          <Link href="/cart">{t.footer.bag}</Link>
        </nav>
      </div>
      <div className="a-footer__bottom">
        <p>&copy; {new Date().getFullYear()} ATLAS. {t.footer.rights}</p>
        <p>Atelier · Cartagena · Colombia</p>
      </div>
    </footer>
  );
}
