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

/**
 * Translucent derivatives of the colours, replacing Tailwind's `bg-primary/80`: each a
 * `color-mix()` over the colour's variable, so it follows the design and the mode. Only the ones a
 * component uses are here; adding one is a design decision.
 */
export const alpha = defineTokens(
  "alpha",
  {
    foreground5: `color-mix(in oklab, ${theme.foreground} 5%, transparent)`,
    foreground10: `color-mix(in oklab, ${theme.foreground} 10%, transparent)`,
    primary5: `color-mix(in oklab, ${theme.primary} 5%, transparent)`,
    primary10: `color-mix(in oklab, ${theme.primary} 10%, transparent)`,
    primary20: `color-mix(in oklab, ${theme.primary} 20%, transparent)`,
    primary30: `color-mix(in oklab, ${theme.primary} 30%, transparent)`,
    primary80: `color-mix(in oklab, ${theme.primary} 80%, transparent)`,
    muted50: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
    destructive10: `color-mix(in oklab, ${theme.destructive} 10%, transparent)`,
    destructive20: `color-mix(in oklab, ${theme.destructive} 20%, transparent)`,
    destructive30: `color-mix(in oklab, ${theme.destructive} 30%, transparent)`,
    destructive40: `color-mix(in oklab, ${theme.destructive} 40%, transparent)`,
    destructive50: `color-mix(in oklab, ${theme.destructive} 50%, transparent)`,
    input30: `color-mix(in oklab, ${theme.input} 30%, transparent)`,
    input40: `color-mix(in oklab, ${theme.input} 40%, transparent)`,
    input50: `color-mix(in oklab, ${theme.input} 50%, transparent)`,
    input80: `color-mix(in oklab, ${theme.input} 80%, transparent)`,
    popover70: `color-mix(in oklab, ${theme.popover} 70%, transparent)`,
    border50: `color-mix(in oklab, ${theme.border} 50%, transparent)`,
    ring50: `color-mix(in oklab, ${theme.ring} 50%, transparent)`,
  },
  { variable: true }
)

/**
 * What shadcn/ui wrote with `dark:`, named by intent: one token, one `light-dark()` value, where
 * the light and dark halves differ in structure rather than in palette (a control is transparent in
 * light mode and a translucent fill in dark).
 */
export const surface = defineTokens(
  "surface",
  {
    /** A form control's fill: `bg-transparent dark:bg-input/30`. */
    control: `light-dark(transparent, ${alpha.input30})`,
    /** Its fill on hover: `dark:hover:bg-input/50`. */
    controlHover: `light-dark(transparent, ${alpha.input50})`,
    /** Disabled: `disabled:bg-input/50 dark:disabled:bg-input/80`. */
    controlDisabled: `light-dark(${alpha.input50}, ${alpha.input80})`,
    /** Border of anything failing validation: `aria-invalid:border-destructive dark:…/50`. */
    borderInvalid: `light-dark(${theme.destructive}, ${alpha.destructive50})`,
    /** Its ring: `aria-invalid:ring-destructive/20 dark:…/40`. */
    ringInvalid: `light-dark(${alpha.destructive20}, ${alpha.destructive40})`,
    /** A ghost control's hover: `hover:bg-muted dark:hover:bg-muted/50`. */
    hover: `light-dark(${theme.muted}, ${alpha.muted50})`,
    /** The outline button: `border-border dark:border-input`, `bg-background dark:bg-input/30` … */
    outlineBorder: `light-dark(${theme.border}, ${theme.input})`,
    outlineBackground: `light-dark(${theme.background}, ${alpha.input30})`,
    outlineHover: `light-dark(${theme.muted}, ${alpha.input50})`,
    /**
     * An outline button whose popup is open: `muted` in light, but in dark the original's
     * `dark:bg-input/30` outranks `aria-expanded:bg-muted`, so it keeps its resting fill.
     */
    outlineExpanded: `light-dark(${theme.muted}, ${alpha.input30})`,
    /** A destructive control is tinted, not filled: `bg-destructive/10 dark:…/20`, hover /20 and /30. */
    destructiveSoft: `light-dark(${alpha.destructive10}, ${alpha.destructive20})`,
    destructiveSoftHover: `light-dark(${alpha.destructive20}, ${alpha.destructive30})`,
    /** A chosen card-like label: `has-data-checked:bg-primary/5 dark:…/10`, border `/30` and `/20`. */
    checkedSoft: `light-dark(${alpha.primary5}, ${alpha.primary10})`,
    checkedSoftBorder: `light-dark(${alpha.primary30}, ${alpha.primary20})`,
  },
  { variable: true }
)
