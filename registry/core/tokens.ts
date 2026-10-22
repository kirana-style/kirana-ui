/**
 * The design system's variable tokens: one custom property each, declared with the default
 * design (Neutral, Inter, a 0.625rem radius) and reassigned on `<html>` by `root.ts` for the other
 * values of each axis. Components read these and never know which design is on.
 *
 * The names follow `packages/ui`'s `theme/semantic.ts`, so components move here in P2 without
 * renaming.
 */
import { defineTokens } from "@kirana-style/core"

import { FONT_INFO, RADIUS_VALUES } from "./config"
import { baseColors, chartColors, themeColors } from "./palettes"

/** The colours: shadcn/ui's custom properties, each a `light-dark()` pair. */
export const theme = defineTokens(
  "theme",
  {
    ...baseColors.neutral,
    ...themeColors.neutral,
    ...chartColors.neutral,
  },
  { variable: true }
)

/** The one radius every corner derives from; the radius axis reassigns it. */
export const radiusBase = defineTokens(
  "radiusBase",
  { value: RADIUS_VALUES.default },
  { variable: true }
)

/**
 * The corner radii, derived from the base as shadcn/ui's `@theme inline` derives them
 * (sm ×0.6, md ×0.8, lg ×1, xl ×1.4, 2xl ×1.8, 3xl ×2.2, 4xl ×2.6). Each stays a `calc()` over
 * the base, so a change of radius on `<html>` reaches every corner.
 */
export const radius = defineTokens(
  "radius",
  {
    sm: `calc(${radiusBase.value} * 0.6)`,
    md: `calc(${radiusBase.value} * 0.8)`,
    lg: radiusBase.value,
    xl: `calc(${radiusBase.value} * 1.4)`,
    "2xl": `calc(${radiusBase.value} * 1.8)`,
    "3xl": `calc(${radiusBase.value} * 2.2)`,
    "4xl": `calc(${radiusBase.value} * 2.6)`,
    full: "calc(infinity * 1px)",
  },
  { variable: true }
)

/** The body and heading families; the font axes reassign them. */
export const font = defineTokens(
  "font",
  {
    sans: FONT_INFO.inter.family,
    heading: FONT_INFO.inter.family,
  },
  { variable: true }
)
