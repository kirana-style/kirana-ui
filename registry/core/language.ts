/**
 * The languages a right-to-left demo is read in, each with its direction and locale: what a page
 * framing one writes on `<html>` before the first paint (`?lang=`), with no React. The demos' side,
 * their strings and the provider, is `registry/lib/language.tsx`.
 */

export type Language = "en" | "ar" | "he"
export type Direction = "ltr" | "rtl"

/** Each language's direction and locale, for what a page sets around a demo. */
export const LANGUAGES: Record<Language, { dir: Direction; locale: string }> = {
  en: { dir: "ltr", locale: "en-US" },
  ar: { dir: "rtl", locale: "ar" },
  he: { dir: "rtl", locale: "he" },
}

export const isLanguage = (value: unknown): value is Language =>
  value === "en" || value === "ar" || value === "he"
