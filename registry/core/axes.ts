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

// Exported only so that a project's build does not report it unused (KF-024 in Kirana's feedback
// log, until the release that fixes it): its anchor and readers leave this module inside `axes`, but
// Kirana counts a relation as kept to its module unless the `relation()` itself is exported, and a
// project with only a button installed reads no axis.
export const ui = relation("ui")

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
} as const

/**
 * Conditions on `<html>` itself, one per value an axis can take besides its default (the default
 * is the token's own value, `tokens.ts`). P1 carries the slice's values.
 */
export const on = {
  baseColor: { stone: '[data-base-color="stone"]' },
  theme: {
    stone: '[data-theme="stone"]',
    blue: '[data-theme="blue"]',
    rose: '[data-theme="rose"]',
  },
  chartColor: {
    stone: '[data-chart-color="stone"]',
    blue: '[data-chart-color="blue"]',
    rose: '[data-chart-color="rose"]',
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
