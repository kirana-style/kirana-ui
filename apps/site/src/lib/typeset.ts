/**
 * The typeset builder's model, as shadcn/ui's (`app/(app)/(typeset)/lib`, MIT): the fonts and the
 * three rhythm values a typeset is made of, the measure of the preview and which piece of content
 * it shows. The builder (`/typeset`) and its preview (`/preview/typeset/<item>`) both read it, and
 * their routes' search validation and loader with it, which every page's route tree carries, so
 * what the builder writes from it (`components/typeset/code.ts`) is apart.
 */
import type { Font } from "@workspace/registry/core/config"
import { FONT_INFO } from "@workspace/registry/core/config"

export const TYPESET_SIZES = [
  { value: "14", label: "14px" },
  { value: "15", label: "15px" },
  { value: "16", label: "16px" },
  { value: "18", label: "18px" },
] as const

export const TYPESET_LEADINGS = [
  { value: "1.6", label: "Tight (1.6)" },
  { value: "1.75", label: "Regular (1.75)" },
  { value: "1.9", label: "Loose (1.9)" },
] as const

export const TYPESET_FLOWS = [
  { value: "1em", label: "Compact (1em)" },
  { value: "1.25em", label: "Regular (1.25em)" },
  { value: "2em", label: "Airy (2em)" },
] as const

export const TYPESET_MEASURES = [
  { value: "60", label: "60ch", width: "28em" },
  { value: "70", label: "70ch", width: "33em" },
  { value: "80", label: "80ch", width: "37em" },
  { value: "90", label: "90ch", width: "42em" },
] as const

/**
 * The fonts a typeset can take: the registry's, for reading. The preview loads each when it is
 * picked (`apps/site/src/components/typeset/fonts.ts`), so the site's other pages carry none of
 * them; a display face that reads poorly as body text is left out, as upstream leaves it out.
 */
export const TYPESET_FONTS = [
  "geist",
  "inter",
  "ibm-plex-sans",
  "lora",
  "merriweather",
  "noto-serif",
] as const satisfies readonly Font[]

export const TYPESET_MONO_FONTS = [
  "geist-mono",
  "jetbrains-mono",
] as const satisfies readonly Font[]

export type TypesetFont =
  | (typeof TYPESET_FONTS)[number]
  | (typeof TYPESET_MONO_FONTS)[number]

/** The content the preview shows (`components/typeset/fixtures.ts`). */
export const TYPESET_ITEMS = [
  { value: "docs", label: "Docs" },
  { value: "chat", label: "Chat" },
  { value: "article", label: "Article" },
  { value: "changelog", label: "Changelog" },
  { value: "notes", label: "Notes" },
] as const

export type TypesetItem = (typeof TYPESET_ITEMS)[number]["value"]

export type TypesetParams = {
  body: (typeof TYPESET_FONTS)[number]
  /** `inherit`: headings in the body font. */
  heading: "inherit" | (typeof TYPESET_FONTS)[number]
  mono: (typeof TYPESET_MONO_FONTS)[number]
  size: (typeof TYPESET_SIZES)[number]["value"]
  leading: (typeof TYPESET_LEADINGS)[number]["value"]
  flow: (typeof TYPESET_FLOWS)[number]["value"]
  measure: (typeof TYPESET_MEASURES)[number]["value"]
  item: TypesetItem
}

export const TYPESET_DEFAULTS: TypesetParams = {
  body: "geist",
  heading: "inherit",
  mono: "geist-mono",
  size: "15",
  leading: "1.75",
  flow: "1.25em",
  measure: "80",
  item: "docs",
}

/** What each parameter accepts. */
const ALLOWED: Record<keyof TypesetParams, readonly string[]> = {
  body: TYPESET_FONTS,
  heading: ["inherit", ...TYPESET_FONTS],
  mono: TYPESET_MONO_FONTS,
  size: TYPESET_SIZES.map((option) => option.value),
  leading: TYPESET_LEADINGS.map((option) => option.value),
  flow: TYPESET_FLOWS.map((option) => option.value),
  measure: TYPESET_MEASURES.map((option) => option.value),
  item: TYPESET_ITEMS.map((option) => option.value),
}

export const TYPESET_KEYS = Object.keys(ALLOWED) as (keyof TypesetParams)[]

/** The parameters a URL's search names, each checked; anything else is its default. */
export function readTypesetParams(
  search: Record<string, unknown>
): TypesetParams {
  const params = { ...TYPESET_DEFAULTS }
  for (const key of TYPESET_KEYS) {
    // A number in the URL (`size=18`) reads as its text.
    const raw = search[key]
    const value = typeof raw === "number" ? String(raw) : raw
    if (typeof value === "string" && ALLOWED[key].includes(value))
      (params as Record<string, string>)[key] = value
  }
  return params
}

/**
 * The parameters that differ from the defaults, for a URL's search: a number as a number, which
 * the router writes bare (`size=18`), where a string of digits would be quoted.
 */
export function typesetSearch(
  params: TypesetParams
): Record<string, string | number> {
  return Object.fromEntries(
    TYPESET_KEYS.filter((key) => params[key] !== TYPESET_DEFAULTS[key]).map(
      (key) => [
        key,
        /^\d+(\.\d+)?$/.test(params[key]) ? Number(params[key]) : params[key],
      ]
    )
  )
}

/** A random value for every parameter but the content shown, as upstream's shuffle. */
export function shuffleTypeset(params: TypesetParams): TypesetParams {
  const pick = <T>(values: readonly T[]) =>
    values[Math.floor(Math.random() * values.length)]!
  return {
    ...readTypesetParams(
      Object.fromEntries(
        TYPESET_KEYS.filter((key) => key !== "item").map((key) => [
          key,
          pick(ALLOWED[key]),
        ])
      )
    ),
    item: params.item,
  }
}

/** The message the builder sends its preview with the parameters, as upstream's. */
export const TYPESET_MESSAGE = "typeset-params"

/** The keys the builder answers to, sent up from the preview when it has the focus. */
export const TYPESET_COMMAND = "typeset-command"
export type TypesetCommand = "shuffle" | "reset" | "undo" | "redo"

export const familyOf = (font: TypesetFont) => FONT_INFO[font].family
export const titleOf = (font: TypesetFont) => FONT_INFO[font].title
export const measureOf = (params: TypesetParams) =>
  TYPESET_MEASURES.find((option) => option.value === params.measure)!.width

/** The heading font, the body's when it inherits. */
export const headingOf = (params: TypesetParams) =>
  params.heading === "inherit" ? params.body : params.heading

/** The preset's custom properties, as `typeset.css` reads them. */
export function typesetVariables(params: TypesetParams) {
  return {
    "--typeset-font-body": familyOf(params.body),
    "--typeset-font-heading": familyOf(headingOf(params)),
    "--typeset-font-mono": familyOf(params.mono),
    "--typeset-size": `${params.size}px`,
    "--typeset-leading": params.leading,
    "--typeset-flow": params.flow,
  }
}

/** The fonts a typeset loads: the body, the heading's when it has its own, the mono. */
export function fontsOf(params: TypesetParams): TypesetFont[] {
  return [...new Set([params.body, headingOf(params), params.mono])]
}
