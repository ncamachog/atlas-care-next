import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Jost } from "next/font/google";
import "./globals.css";
import BagDrawer from "@/components/bag-drawer";
import { CartProvider } from "@/components/cart-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { LocaleProvider } from "@/components/locale-provider";
import ProductModal from "@/components/product-modal";
import RevealObserver from "@/components/reveal-observer";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { DESCRIPTIONS, SITE_URL } from "@/lib/seo";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `ATLAS — ${t.meta.home_title}`, template: "%s · ATLAS" },
    description: DESCRIPTIONS.home[locale],
    openGraph: {
      title: "ATLAS",
      description: t.meta.home_title,
      images: ["/img/fondo-cartagena.jpg"],
      locale: locale === "en" ? "en_US" : "es_CO",
      type: "website",
    },
  };
}

export const viewport: Viewport = { themeColor: "#3F342B" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = getContent(locale);
  return (
    <html lang={locale} className={`${geist.variable} ${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca "js" antes del primer pintado: los bloques .a-reveal arrancan ocultos solo si hay JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.className+=' js'" }} />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <CartProvider>
            <a className="a-skip" href="#primary">{t.ui.skip}</a>
            <Header />
            {children}
            <Footer />
            <BagDrawer />
            <ProductModal />
            <RevealObserver />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
