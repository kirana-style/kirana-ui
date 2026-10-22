/**
 * Preset codes: a whole design system in a short string, with nothing stored anywhere.
 *
 * A code is a version letter and a base-62 number whose bits hold one index per axis, the scheme
 * shadcn/ui uses (`packages/registry/src/preset/preset.ts`, MIT). This project writes `k` codes:
 * shadcn/ui's ten design axes in its order, then the base and the framework, in field widths that
 * leave room to grow and stay inside JavaScript's 53-bit integers. It also reads shadcn/ui's own
 * `a` and `b` codes, so a preset made on ui.shadcn.com opens here as it looks there.
 *
 * Rules that keep every saved code meaning the same (shadcn/ui's): a value list only grows at its
 * end (`config.ts`), each axis's default is its index 0, and a new axis is added after the last.
 */
import {
  BASES,
  BASE_COLORS,
  CHART_COLORS,
  FONTS,
  FONT_HEADINGS,
  FRAMEWORKS,
  ICON_LIBRARIES,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
  THEMES,
  resolveDesignSystem,
} from "./config"
import type { Axis, DesignSystem } from "./config"

type Field = { key: Axis; values: readonly string[]; bits: number }

/** The `k` layout, from bit 0 up: 51 bits. */
export const PRESET_FIELDS = [
  { key: "menuColor", values: MENU_COLORS, bits: 3 },
  { key: "menuAccent", values: MENU_ACCENTS, bits: 2 },
  { key: "radius", values: RADII, bits: 3 },
  { key: "font", values: FONTS, bits: 6 },
  { key: "iconLibrary", values: ICON_LIBRARIES, bits: 4 },
  { key: "theme", values: THEMES, bits: 6 },
  { key: "baseColor", values: BASE_COLORS, bits: 4 },
  { key: "style", values: STYLES, bits: 5 },
  { key: "chartColor", values: CHART_COLORS, bits: 6 },
  { key: "fontHeading", values: FONT_HEADINGS, bits: 6 },
  { key: "base", values: BASES, bits: 3 },
  { key: "framework", values: FRAMEWORKS, bits: 3 },
] as const satisfies readonly Field[]

/**
 * shadcn/ui's layouts and value lists, as they were at commit `25af02b` (2026-10-22), kept apart
 * from this project's lists: when shadcn/ui appends a value, its codes grow independently of ours.
 * `a` is its first layout (no chart colour or heading font), `b` its current one.
 */
const SHADCN_THEMES = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
  "mauve",
  "olive",
  "mist",
  "taupe",
]
const SHADCN_FONTS = [
  "inter",
  "noto-sans",
  "nunito-sans",
  "figtree",
  "roboto",
  "raleway",
  "dm-sans",
  "public-sans",
  "outfit",
  "jetbrains-mono",
  "geist",
  "geist-mono",
  "lora",
  "merriweather",
  "playfair-display",
  "noto-serif",
  "roboto-slab",
  "oxanium",
  "manrope",
  "space-grotesk",
  "montserrat",
  "ibm-plex-sans",
  "source-sans-3",
  "instrument-sans",
  "eb-garamond",
  "instrument-serif",
]
const SHADCN_FIELDS_A: readonly Field[] = [
  {
    key: "menuColor",
    values: [
      "default",
      "inverted",
      "default-translucent",
      "inverted-translucent",
    ],
    bits: 3,
  },
  { key: "menuAccent", values: ["subtle", "bold"], bits: 3 },
  {
    key: "radius",
    values: ["default", "none", "small", "medium", "large"],
    bits: 4,
  },
  { key: "font", values: SHADCN_FONTS, bits: 6 },
  {
    key: "iconLibrary",
    values: ["lucide", "hugeicons", "tabler", "phosphor", "remixicon"],
    bits: 6,
  },
  { key: "theme", values: SHADCN_THEMES, bits: 6 },
  {
    key: "baseColor",
    values: [
      "neutral",
      "stone",
      "zinc",
      "gray",
      "mauve",
      "olive",
      "mist",
      "taupe",
    ],
    bits: 6,
  },
  {
    key: "style",
    values: ["nova", "vega", "maia", "lyra", "mira", "luma", "sera", "rhea"],
    bits: 6,
  },
]
const SHADCN_FIELDS_B: readonly Field[] = [
  ...SHADCN_FIELDS_A,
  { key: "chartColor", values: SHADCN_THEMES, bits: 6 },
  { key: "fontHeading", values: ["inherit", ...SHADCN_FONTS], bits: 5 },
]

/**
 * Before its `b` codes, shadcn/ui gave a base colour's theme the charts of a hue; an `a` code
 * reopens with those (shadcn/ui's `V1_CHART_COLOR_MAP`).
 */
const SHADCN_A_CHARTS: Record<string, string> = {
  neutral: "blue",
  stone: "lime",
  zinc: "amber",
  mauve: "emerald",
  olive: "violet",
  mist: "rose",
  taupe: "cyan",
}

const LAYOUTS: Record<string, readonly Field[]> = {
  a: SHADCN_FIELDS_A,
  b: SHADCN_FIELDS_B,
  k: PRESET_FIELDS,
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

function toBase62(value: number): string {
  if (value === 0) return "0"
  let digits = ""
  for (let rest = value; rest > 0; rest = Math.floor(rest / 62))
    digits = BASE62[rest % 62] + digits
  return digits
}

function fromBase62(digits: string): number | null {
  let value = 0
  for (const digit of digits) {
    const index = BASE62.indexOf(digit)
    if (index === -1) return null
    value = value * 62 + index
  }
  return value
}

/** Whether `value` has the shape of a code: a known version and base-62 digits, 2 to 10 long. */
export function isPresetCode(value: string): boolean {
  return (
    value.length >= 2 &&
    value.length <= 10 &&
    value[0]! in LAYOUTS &&
    fromBase62(value.slice(1)) !== null
  )
}

/** The `k` code of a design system. Every axis is in it; the default system is `k0`. */
export function encodePreset(system: DesignSystem): string {
  // Multiplication rather than shifts: JavaScript's bitwise operators truncate to 32 bits.
  let value = 0
  let offset = 0
  for (const field of PRESET_FIELDS) {
    const index = (field.values as readonly string[]).indexOf(system[field.key])
    value += Math.max(index, 0) * 2 ** offset
    offset += field.bits
  }
  return `k${toBase62(value)}`
}

/**
 * The axes a code holds, or `null` when it is not a code. A `k` code holds every axis; shadcn/ui's
 * `a` and `b` codes hold the ten design axes, so the base and the framework come from elsewhere
 * (`readDesignSystem`). An index past the end of a list reads as the axis's default, as shadcn/ui
 * decodes it.
 */
export function decodePreset(
  code: string
): Partial<Record<Axis, string>> | null {
  if (!isPresetCode(code)) return null
  const layout = LAYOUTS[code[0]!]!
  const value = fromBase62(code.slice(1))!
  const axes: Partial<Record<Axis, string>> = {}
  let offset = 0
  for (const field of layout) {
    const index = Math.floor(value / 2 ** offset) % 2 ** field.bits
    axes[field.key] = field.values[index] ?? field.values[0]!
    offset += field.bits
  }
  if (code[0] === "a") {
    axes.fontHeading = "inherit"
    axes.chartColor = SHADCN_A_CHARTS[axes.theme!] ?? axes.theme!
  }
  return axes
}

/**
 * The design system a URL asks for: its `preset` code first, then any axis named on its own
 * (`?preset=b0&framework=vue&style=lyra`), which wins over the code, then the rules between axes
 * (`resolveDesignSystem`). A malformed code is reported as `preset` in `unknown`.
 */
export function readDesignSystem(params: {
  get: (name: string) => string | null
}): { system: DesignSystem; unknown: (Axis | "preset")[] } {
  const code = params.get("preset")
  const decoded = code ? decodePreset(code) : {}
  const asked: Partial<Record<Axis, string>> = { ...decoded }
  for (const field of PRESET_FIELDS) {
    const value = params.get(field.key)
    if (value !== null) asked[field.key] = value
  }
  const { system, unknown } = resolveDesignSystem(asked)
  return { system, unknown: decoded ? unknown : ["preset", ...unknown] }
}
