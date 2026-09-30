export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE = "atlas-lang";

export const isLocale = (v: unknown): v is Locale => v === "es" || v === "en";
