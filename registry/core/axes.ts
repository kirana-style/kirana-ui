/**
 * The design system on `<html>`: every axis is an attribute there (`data-style="nova"`,
 * `data-base-color="stone"` …), set by the server from the cookie or the URL and changed by the
 * customizer, so a choice changes an attribute and never writes CSS.
 *
 * Two kinds of condition read them:
 *
 * - **`on`** — conditions on `<html>` itself, for the token axes: `root.ts`, applied to `<html>`,
 *   reassigns the variable tokens under them;
 * - **`axes`** — reads through the `ui` relation anchored on `<html>`, for the axes that change
 *   which properties a component sets (the style, the menu colour, the pointer). A component writes
 *   them inside a property like any condition: `height: { base: …, [axes.style.lyra]: … }`.
 */
import { relation } from "@kirana-style/core"

export { AXIS_ATTRIBUTES, POINTER_ATTRIBUTE } from "./attributes"

const ui = relation("ui")

export const axes = {
  /** On `<html>`, with the attributes of `attributes.ts`. */
  anchor: ui.anchor,
  style: {
    nova: ui.within('[data-style="nova"]'),
    vega: ui.within('[data-style="vega"]'),
    maia: ui.within('[data-style="maia"]'),
    lyra: ui.within('[data-style="lyra"]'),
    mira: ui.within('[data-style="mira"]'),
    luma: ui.within('[data-style="luma"]'),
    sera: ui.within('[data-style="sera"]'),
    rhea: ui.within('[data-style="rhea"]'),
  },
  menuColor: {
    /** `inverted` and `inverted-translucent`: menus in the dark scheme. */
    inverted: ui.within('[data-menu-color^="inverted"]'),
    /** `default-translucent` and `inverted-translucent`: the glass surface. */
    translucent: ui.within('[data-menu-color$="translucent"]'),
  },
  pointer: ui.within("[data-pointer]"),
  /**
   * The colour mode the page chose (`data-mode`), for the few values that are not colours and so
   * cannot be a `light-dark()` pair: written with the system's scheme as `{ base, [DARK_SCHEME]:
   * { base, [mode.light]: … }, [mode.dark]: … }`.
   */
  mode: {
    light: ui.within('[data-mode="light"]'),
    dark: ui.within('[data-mode="dark"]'),
  },
} as const

/** The system's dark scheme, which `axes.mode.light` overrides. */
export const DARK_SCHEME = "@media (prefers-color-scheme: dark)"

/**
 * Conditions on `<html>` itself, one per value an axis can take besides its default (the default
 * is the token's own value, `tokens.ts`): the radius, the fonts, the menu accent, and
 * the styles that change the radius.
 */
export const on = {
  // The colour axes' conditions are written by `scripts/import-palettes.ts` into `colors.ts`.
  style: {
    lyra: '[data-style="lyra"]',
    sera: '[data-style="sera"]',
    rhea: '[data-style="rhea"]',
  },
  // Every font the axes offer but the default, whose family is the token's own (Inter).
  font: {
    "noto-sans": '[data-font="noto-sans"]',
    "nunito-sans": '[data-font="nunito-sans"]',
    figtree: '[data-font="figtree"]',
    roboto: '[data-font="roboto"]',
    raleway: '[data-font="raleway"]',
    "dm-sans": '[data-font="dm-sans"]',
    "public-sans": '[data-font="public-sans"]',
    outfit: '[data-font="outfit"]',
    "jetbrains-mono": '[data-font="jetbrains-mono"]',
    geist: '[data-font="geist"]',
    "geist-mono": '[data-font="geist-mono"]',
    lora: '[data-font="lora"]',
    merriweather: '[data-font="merriweather"]',
    "playfair-display": '[data-font="playfair-display"]',
    "noto-serif": '[data-font="noto-serif"]',
    "roboto-slab": '[data-font="roboto-slab"]',
    oxanium: '[data-font="oxanium"]',
    manrope: '[data-font="manrope"]',
    "space-grotesk": '[data-font="space-grotesk"]',
    montserrat: '[data-font="montserrat"]',
    "ibm-plex-sans": '[data-font="ibm-plex-sans"]',
    "source-sans-3": '[data-font="source-sans-3"]',
    "instrument-sans": '[data-font="instrument-sans"]',
    "eb-garamond": '[data-font="eb-garamond"]',
    "instrument-serif": '[data-font="instrument-serif"]',
  },
  fontHeading: {
    inter: '[data-font-heading="inter"]',
    "noto-sans": '[data-font-heading="noto-sans"]',
    "nunito-sans": '[data-font-heading="nunito-sans"]',
    figtree: '[data-font-heading="figtree"]',
    roboto: '[data-font-heading="roboto"]',
    raleway: '[data-font-heading="raleway"]',
    "dm-sans": '[data-font-heading="dm-sans"]',
    "public-sans": '[data-font-heading="public-sans"]',
    outfit: '[data-font-heading="outfit"]',
    "jetbrains-mono": '[data-font-heading="jetbrains-mono"]',
    geist: '[data-font-heading="geist"]',
    "geist-mono": '[data-font-heading="geist-mono"]',
    lora: '[data-font-heading="lora"]',
    merriweather: '[data-font-heading="merriweather"]',
    "playfair-display": '[data-font-heading="playfair-display"]',
    "noto-serif": '[data-font-heading="noto-serif"]',
    "roboto-slab": '[data-font-heading="roboto-slab"]',
    oxanium: '[data-font-heading="oxanium"]',
    manrope: '[data-font-heading="manrope"]',
    "space-grotesk": '[data-font-heading="space-grotesk"]',
    montserrat: '[data-font-heading="montserrat"]',
    "ibm-plex-sans": '[data-font-heading="ibm-plex-sans"]',
    "source-sans-3": '[data-font-heading="source-sans-3"]',
    "instrument-sans": '[data-font-heading="instrument-sans"]',
    "eb-garamond": '[data-font-heading="eb-garamond"]',
    "instrument-serif": '[data-font-heading="instrument-serif"]',
  },
  radius: {
    none: '[data-radius="none"]',
    small: '[data-radius="small"]',
    medium: '[data-radius="medium"]',
    large: '[data-radius="large"]',
  },
  menuAccent: { bold: '[data-menu-accent="bold"]' },
} as const
