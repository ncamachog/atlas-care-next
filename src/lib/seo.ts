import type { Locale } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlas-care-next.vercel.app";

export const DESCRIPTIONS: Record<"home" | "shop" | "inspo" | "ambassadors", Record<Locale, string>> = {
  home: {
    es: "ATLAS — cuidado personal para la piel, el cabello y el cuerpo. Inspirado en la naturaleza, refinado por la ciencia. Desde Cartagena, Colombia.",
    en: "ATLAS — personal care for skin, hair and body. Inspired by nature, refined by science. From Cartagena, Colombia.",
  },
  shop: {
    es: "La colección ATLAS: Face, Body, Hair y Tempo. Envíos a toda Colombia.",
    en: "The ATLAS collection: Face, Body, Hair and Tempo. Shipping across Colombia.",
  },
  inspo: {
    es: "Inspiration & Science: la inspiración y la ciencia detrás de cada fórmula ATLAS.",
    en: "Inspiration & Science: the inspiration and the science behind every ATLAS formula.",
  },
  ambassadors: {
    es: "ATLAS Ambassadors: hoteles boutique, spas, gimnasios y espacios de bienestar que comparten nuestra visión de cuidado.",
    en: "ATLAS Ambassadors: boutique hotels, spas, gyms and wellness spaces that share our vision of care.",
  },
};
