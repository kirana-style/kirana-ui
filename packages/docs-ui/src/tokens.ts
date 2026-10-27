/**
 * The tokens this framework is written with, from the registry's design system instead of the
 * Kirana site's `@workspace/ui`, under the names the Kirana copy uses (`spacing`, `fontFamily`, the
 * type roles), so the two copies stay easy to compare. Everything here follows the design on
 * `<html>`: the site's chrome changes with the customizer, as shadcn/ui's does.
 */
import { fontFamily as mono } from "@kirana-style/preset-scales"

import { font } from "@workspace/registry/core/tokens"

export { alpha, radius, theme } from "@workspace/registry/core/tokens"
export {
  breakpoint,
  duration,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space as spacing,
} from "@workspace/registry/core/scales"

export const pointer = { coarse: "@media (pointer: coarse)" } as const

/** The design's body and heading families; code in Tailwind's mono stack, as shadcn/ui's docs. */
export const fontFamily = {
  sans: font.sans,
  heading: font.heading,
  mono: mono.mono,
} as const

/**
 * The small type roles the frame uses: a section label, the lede under a title, the smallest
 * captions. shadcn/ui's docs set them in Tailwind's scale, untracked, rather than as the Kirana
 * site's fluid roles.
 */
export const textSize = {
  label: "0.75rem",
  lede: "1rem",
  micro: "0.75rem",
} as const
export const textLeading = {
  label: "1.33334",
  lede: "1.5",
  micro: "1.33334",
} as const
export const textTracking = {
  label: "0em",
  micro: "0em",
} as const
