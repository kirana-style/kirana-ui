/**
 * The design system as a set of choices: what each axis can be, the defaults, and the rules
 * between axes. The site's customizer, the preview routes, the preset codes and the registry's
 * `/init` all read it from here.
 *
 * Every list is in preset-code order (`preset.ts`): index 0 is the default, and a list only ever
 * grows at its end. Reordering or removing a value changes what every saved code means. The lists
 * start as shadcn/ui's (`apps/v4/registry/config.ts` and `packages/registry/src/preset/preset.ts`,
 * MIT); a value shadcn/ui adds later is appended here too, after any of this project's own.
 */

export const FRAMEWORKS = ["react", "vue", "svelte", "solid"] as const
export type Framework = (typeof FRAMEWORKS)[number]

/** The headless library under the components: Base UI, React Aria, Ark UI. */
export const BASES = ["base", "aria", "ark"] as const
export type Base = (typeof BASES)[number]

/** Which bases each framework offers; the first is its default. */
export const FRAMEWORK_BASES: Record<Framework, readonly Base[]> = {
  react: ["base", "aria"],
  vue: ["ark"],
  svelte: ["ark"],
  solid: ["ark"],
}

export const STYLES = [
  "nova",
  "vega",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea",
] as const
export type Style = (typeof STYLES)[number]

/** shadcn/ui's eight styles, in its own words. */
export const STYLE_INFO: Record<Style, { title: string; description: string }> =
  {
    nova: { title: "Nova", description: "Reduced padding and margins." },
    vega: { title: "Vega", description: "Clean, neutral, and familiar." },
    maia: { title: "Maia", description: "Rounded, with generous spacing." },
    lyra: { title: "Lyra", description: "Boxy and sharp. For mono fonts." },
    mira: { title: "Mira", description: "Made for compact interfaces." },
    luma: { title: "Luma", description: "Fluid, luminous, and soft." },
    sera: { title: "Sera", description: "Editorial and typographic." },
    rhea: { title: "Rhea", description: "Like Luma but compact." },
  }

/** The greys: each sets every neutral colour (`palettes.ts`). */
export const BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const
export type BaseColor = (typeof BASE_COLORS)[number]

/** A theme is a base colour (its own accents) or a hue. */
export const THEMES = [
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
] as const
export type Theme = (typeof THEMES)[number]

export const CHART_COLORS = THEMES
export type ChartColor = Theme

export const ICON_LIBRARIES = [
  "lucide",
  "hugeicons",
  "tabler",
  "phosphor",
  "remixicon",
] as const
export type IconLibrary = (typeof ICON_LIBRARIES)[number]

export const FONTS = [
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
] as const
export type Font = (typeof FONTS)[number]

/** `inherit`: headings in the body font. */
export const FONT_HEADINGS = ["inherit", ...FONTS] as const
export type FontHeading = (typeof FONT_HEADINGS)[number]

/** Each font's family stack and the package that loads it (upstream's `font-definitions.ts`). */
export const FONT_INFO: Record<
  Font,
  {
    title: string
    type: "sans" | "serif" | "mono"
    family: string
    dependency: string
  }
> = {
  inter: {
    title: "Inter",
    type: "sans",
    family: "'Inter Variable', sans-serif",
    dependency: "@fontsource-variable/inter",
  },
  "noto-sans": {
    title: "Noto Sans",
    type: "sans",
    family: "'Noto Sans Variable', sans-serif",
    dependency: "@fontsource-variable/noto-sans",
  },
  "nunito-sans": {
    title: "Nunito Sans",
    type: "sans",
    family: "'Nunito Sans Variable', sans-serif",
    dependency: "@fontsource-variable/nunito-sans",
  },
  figtree: {
    title: "Figtree",
    type: "sans",
    family: "'Figtree Variable', sans-serif",
    dependency: "@fontsource-variable/figtree",
  },
  roboto: {
    title: "Roboto",
    type: "sans",
    family: "'Roboto Variable', sans-serif",
    dependency: "@fontsource-variable/roboto",
  },
  raleway: {
    title: "Raleway",
    type: "sans",
    family: "'Raleway Variable', sans-serif",
    dependency: "@fontsource-variable/raleway",
  },
  "dm-sans": {
    title: "DM Sans",
    type: "sans",
    family: "'DM Sans Variable', sans-serif",
    dependency: "@fontsource-variable/dm-sans",
  },
  "public-sans": {
    title: "Public Sans",
    type: "sans",
    family: "'Public Sans Variable', sans-serif",
    dependency: "@fontsource-variable/public-sans",
  },
  outfit: {
    title: "Outfit",
    type: "sans",
    family: "'Outfit Variable', sans-serif",
    dependency: "@fontsource-variable/outfit",
  },
  "jetbrains-mono": {
    title: "JetBrains Mono",
    type: "mono",
    family: "'JetBrains Mono Variable', monospace",
    dependency: "@fontsource-variable/jetbrains-mono",
  },
  geist: {
    title: "Geist",
    type: "sans",
    family: "'Geist Variable', sans-serif",
    dependency: "@fontsource-variable/geist",
  },
  "geist-mono": {
    title: "Geist Mono",
    type: "mono",
    family: "'Geist Mono Variable', monospace",
    dependency: "@fontsource-variable/geist-mono",
  },
  lora: {
    title: "Lora",
    type: "serif",
    family: "'Lora Variable', serif",
    dependency: "@fontsource-variable/lora",
  },
  merriweather: {
    title: "Merriweather",
    type: "serif",
    family: "'Merriweather Variable', serif",
    dependency: "@fontsource-variable/merriweather",
  },
  "playfair-display": {
    title: "Playfair Display",
    type: "serif",
    family: "'Playfair Display Variable', serif",
    dependency: "@fontsource-variable/playfair-display",
  },
  "noto-serif": {
    title: "Noto Serif",
    type: "serif",
    family: "'Noto Serif Variable', serif",
    dependency: "@fontsource-variable/noto-serif",
  },
  "roboto-slab": {
    title: "Roboto Slab",
    type: "serif",
    family: "'Roboto Slab Variable', serif",
    dependency: "@fontsource-variable/roboto-slab",
  },
  oxanium: {
    title: "Oxanium",
    type: "sans",
    family: "'Oxanium Variable', sans-serif",
    dependency: "@fontsource-variable/oxanium",
  },
  manrope: {
    title: "Manrope",
    type: "sans",
    family: "'Manrope Variable', sans-serif",
    dependency: "@fontsource-variable/manrope",
  },
  "space-grotesk": {
    title: "Space Grotesk",
    type: "sans",
    family: "'Space Grotesk Variable', sans-serif",
    dependency: "@fontsource-variable/space-grotesk",
  },
  montserrat: {
    title: "Montserrat",
    type: "sans",
    family: "'Montserrat Variable', sans-serif",
    dependency: "@fontsource-variable/montserrat",
  },
  "ibm-plex-sans": {
    title: "IBM Plex Sans",
    type: "sans",
    family: "'IBM Plex Sans Variable', sans-serif",
    dependency: "@fontsource-variable/ibm-plex-sans",
  },
  "source-sans-3": {
    title: "Source Sans 3",
    type: "sans",
    family: "'Source Sans 3 Variable', sans-serif",
    dependency: "@fontsource-variable/source-sans-3",
  },
  "instrument-sans": {
    title: "Instrument Sans",
    type: "sans",
    family: "'Instrument Sans Variable', sans-serif",
    dependency: "@fontsource-variable/instrument-sans",
  },
  "eb-garamond": {
    title: "EB Garamond",
    type: "serif",
    family: "'EB Garamond Variable', serif",
    dependency: "@fontsource-variable/eb-garamond",
  },
  "instrument-serif": {
    title: "Instrument Serif",
    type: "serif",
    family: "'Instrument Serif', serif",
    dependency: "@fontsource/instrument-serif",
  },
}

/** `default` keeps the base colour's radius (0.625rem in every base colour). */
export const RADII = ["default", "none", "small", "medium", "large"] as const
export type Radius = (typeof RADII)[number]

export const RADIUS_VALUES: Record<Radius, string> = {
  default: "0.625rem",
  // A length, not a bare 0: the corner radii multiply it inside `calc()`.
  none: "0rem",
  small: "0.45rem",
  medium: "0.625rem",
  large: "0.875rem",
}

export const MENU_COLORS = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent",
] as const
export type MenuColor = (typeof MENU_COLORS)[number]

/** `bold`: a menu row is highlighted in the primary colour. */
export const MENU_ACCENTS = ["subtle", "bold"] as const
export type MenuAccent = (typeof MENU_ACCENTS)[number]

export type DesignSystem = {
  framework: Framework
  base: Base
  style: Style
  baseColor: BaseColor
  theme: Theme
  chartColor: ChartColor
  iconLibrary: IconLibrary
  font: Font
  fontHeading: FontHeading
  radius: Radius
  menuColor: MenuColor
  menuAccent: MenuAccent
}

/** Each axis and its values, in the order the customizer shows them. */
export const AXES = {
  framework: FRAMEWORKS,
  base: BASES,
  style: STYLES,
  baseColor: BASE_COLORS,
  theme: THEMES,
  chartColor: CHART_COLORS,
  iconLibrary: ICON_LIBRARIES,
  font: FONTS,
  fontHeading: FONT_HEADINGS,
  radius: RADII,
  menuColor: MENU_COLORS,
  menuAccent: MENU_ACCENTS,
} as const satisfies { [Name in keyof DesignSystem]: readonly string[] }

export type Axis = keyof DesignSystem

/** Every axis at its first value: Nova, Neutral, Inter, Lucide, Base UI on React. */
export const DEFAULT_DESIGN_SYSTEM = Object.freeze({
  framework: "react",
  base: "base",
  style: "nova",
  baseColor: "neutral",
  theme: "neutral",
  chartColor: "neutral",
  iconLibrary: "lucide",
  font: "inter",
  fontHeading: "inherit",
  radius: "default",
  menuColor: "default",
  menuAccent: "subtle",
} satisfies DesignSystem)

/** The themes a base colour allows: itself, or any hue. */
export function themesFor(baseColor: BaseColor): readonly Theme[] {
  return THEMES.filter(
    (theme) =>
      theme === baseColor || !(BASE_COLORS as readonly string[]).includes(theme)
  )
}

function isValue<Name extends Axis>(
  axis: Name,
  value: unknown
): value is DesignSystem[Name] {
  return (AXES[axis] as readonly unknown[]).includes(value)
}

/**
 * A complete, consistent design system from whatever was asked for (a decoded preset, query
 * parameters): unknown values fall back to the axis's default and are listed in `unknown`, then the
 * rules between axes apply, as shadcn/ui's customizer applies them:
 *
 * - the base must be one the framework offers, else the framework's first;
 * - the theme and the chart colour must be the base colour or a hue, else the base colour;
 * - a heading font that is the body font is `inherit`, so it follows a later change of font;
 * - the bold menu accent is subtle on a translucent menu.
 *
 * The radius is kept as chosen: Lyra and Sera draw square corners and Rhea has no large radius in
 * the stylesheet (`root.ts`), not by rewriting the choice, so it comes back when the style changes,
 * as on shadcn/ui's site.
 */
export function resolveDesignSystem(
  asked: Partial<Record<Axis, string | undefined>>
): { system: DesignSystem; unknown: Axis[] } {
  const unknown: Axis[] = []
  const pick = <Name extends Axis>(axis: Name): DesignSystem[Name] => {
    const value = asked[axis]
    if (value === undefined) return DEFAULT_DESIGN_SYSTEM[axis]
    if (isValue(axis, value)) return value
    unknown.push(axis)
    return DEFAULT_DESIGN_SYSTEM[axis]
  }

  const system: DesignSystem = {
    framework: pick("framework"),
    base: pick("base"),
    style: pick("style"),
    baseColor: pick("baseColor"),
    theme: pick("theme"),
    chartColor: pick("chartColor"),
    iconLibrary: pick("iconLibrary"),
    font: pick("font"),
    fontHeading: pick("fontHeading"),
    radius: pick("radius"),
    menuColor: pick("menuColor"),
    menuAccent: pick("menuAccent"),
  }

  const bases = FRAMEWORK_BASES[system.framework]
  if (!bases.includes(system.base)) system.base = bases[0]!
  const themes = themesFor(system.baseColor)
  if (!themes.includes(system.theme)) system.theme = system.baseColor
  if (!themes.includes(system.chartColor)) system.chartColor = system.baseColor
  if (system.fontHeading === system.font) system.fontHeading = "inherit"
  if (system.menuAccent === "bold" && system.menuColor.endsWith("-translucent"))
    system.menuAccent = "subtle"

  return { system, unknown }
}
