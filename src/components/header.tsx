"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./language-switcher";
import { useCart } from "./cart-provider";
import { useLocale } from "./locale-provider";

const NAV = [
  { href: "/", key: "home" },
  { href: "/shop", key: "shop" },
  { href: "/inspiration-and-science", key: "inspo" },
  { href: "/ambassadors", key: "ambassadors" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { count, openBag } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Cierra el menú móvil al navegar.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/shop" && pathname.startsWith("/product")));

  return (
    <>
      <header className={`a-header${scrolled ? " is-scrolled" : ""}`} id="masthead">
        <Link className="a-logo" href="/" aria-label="ATLAS">
          <span className="a-logo__word">ATLAS</span>
          <span className="a-logo__sub">Atelier · Cartagena</span>
        </Link>

        <nav className="a-nav" aria-label={t.ui.main_nav}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined} aria-current={isActive(n.href) ? "page" : undefined}>
              {t.nav[n.key]}
            </Link>
          ))}
        </nav>

        <div className="a-header__end">
          <LanguageSwitcher />
          <button type="button" className="a-ritual-btn" onClick={openBag} aria-label={t.bag.open}>
            <span>{t.bag.label}</span>
            <b className="a-count" key={count}>{count}</b>
          </button>
          <button type="button" className="a-burger" aria-label={open ? t.ui.menu_close : t.ui.menu_open} aria-expanded={open} aria-controls="a-mobile" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className="a-mobile" id="a-mobile" aria-label={t.ui.mobile_nav} hidden={!open}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={isActive(n.href) ? "is-active" : undefined}>{t.nav[n.key]}</Link>
        ))}
      </nav>
    </>
  );
}
