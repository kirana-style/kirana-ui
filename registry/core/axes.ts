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
 * is the token's own value, `tokens.ts`): the radius, the fonts the site loads, the menu accent, and
 * the styles that change the radius.
 */
export const on = {
  // The colour axes' conditions are written by `scripts/import-palettes.ts` into `colors.ts`.
  style: {
    lyra: '[data-style="lyra"]',
    sera: '[data-style="sera"]',
    rhea: '[data-style="rhea"]',
  },
  font: { geist: '[data-font="geist"]' },
  fontHeading: {
    inter: '[data-font-heading="inter"]',
    geist: '[data-font-heading="geist"]',
  },
  radius: {
    none: '[data-radius="none"]',
    small: '[data-radius="small"]',
    medium: '[data-radius="medium"]',
    large: '[data-radius="large"]',
  },
  menuAccent: { bold: '[data-menu-accent="bold"]' },
} as const
