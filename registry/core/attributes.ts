/**
 * The attribute each axis is written to on `<html>`: plain names, with no Kirana call, so code
 * that only writes them (the preview protocol, a test) needs no compiler. `axes.ts` builds the
 * conditions that read them.
 */
import type { Axis } from "./config"

/** The attribute each axis is written to on `<html>`. The framework and base change no style. */
export const AXIS_ATTRIBUTES = {
  style: "data-style",
  baseColor: "data-base-color",
  theme: "data-theme",
  chartColor: "data-chart-color",
  font: "data-font",
  fontHeading: "data-font-heading",
  radius: "data-radius",
  menuColor: "data-menu-color",
  menuAccent: "data-menu-accent",
} as const satisfies Partial<Record<Axis, string>>

/** The pointer cursor on buttons, a project option rather than a preset axis (as shadcn/ui's). */
export const POINTER_ATTRIBUTE = "data-pointer"

/** A preview page's surface under its demo (`?surface=true`), upstream's `bg-surface` previews. */
export const SURFACE_ATTRIBUTE = "data-surface"

/**
 * A charts gallery's frame (`?charts=`): the page sits 1px in, so a card's edge shows at the frame's
 * edge (upstream's gallery draws `new-york-v4`'s border; Nova's ring falls outside the card).
 */
export const CHARTS_ATTRIBUTE = "data-charts"
