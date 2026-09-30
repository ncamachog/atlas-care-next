import { es, en, type Content } from "./content-data";
import { TERMS_ES } from "./terms";
import type { Locale } from "./i18n";
import type { Product } from "./products";

export type { Content };

export const getContent = (locale: Locale): Content => (locale === "en" ? en : es);

/** Rellena %s / %d en orden. */
export function fmt(text: string, ...args: (string | number)[]): string {
  let i = 0;
  return text.replace(/%[sd]/g, () => String(args[i++] ?? ""));
}

/** Beneficios e ingredientes: en español se traducen, en inglés se dejan como en la etiqueta. */
export const term = (locale: Locale, t: string): string => (locale === "es" ? (TERMS_ES[t] ?? t) : t);

/** Texto de un producto en el idioma actual. */
export const pf = (p: Product, field: "sub" | "moment" | "desc", locale: Locale): string => p[field][locale];
