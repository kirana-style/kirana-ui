/**
 * The page's hue, as the Kirana site's accents: each page stands in a scene (`header/nav.ts`'s
 * `SCENES`), and the scene gives it one colour, sampled from its landscape: the hero's pixel and
 * italic word, the chapters' numbers, Create's chip, the engine's tile, each menu glyph (in its
 * destination's hue). Every hue is a `light-dark()` pair, Kirana's own values.
 *
 * The hue is the page's only while the design's colour theme is a grey: once the reader picks a
 * hued theme in the customizer (blue, rose …), the design's primary takes its place, so the chrome
 * follows the design they chose. Outside any page the hue is the primary itself.
 */
import { css, defineTokens } from "@kirana-style/core"
import type { StyleHandle } from "@kirana-style/core"

import { theme } from "@workspace/registry/core/tokens"
import { schemeMarker } from "@workspace/ui/theme/scheme-marker"

export const hue = defineTokens(
  "hue",
  {
    base: theme.primary,
    /** What is drawn on the hue: a chip's arrow, the engine's mark. */
    on: theme.primaryForeground,
  },
  { variable: true }
)

/** `hue.base` mixed with transparency: `tint(12)` is a 12 % wash. */
export function tint(percent: number): string {
  return `color-mix(in oklab, ${hue.base} ${percent}%, transparent)`
}

/** Kirana's scene hues. */
export const PALETTE = {
  /** Forest on the ridges. */
  forest: "light-dark(oklch(0.5 0.1 150), oklch(0.8 0.11 150))",
  /** Tea rows and grass in the morning. */
  tea: "light-dark(oklch(0.5 0.11 128), oklch(0.83 0.13 128))",
  /** The pale sulphur water of a crater. */
  crater: "light-dark(oklch(0.5 0.09 185), oklch(0.82 0.1 185))",
  /** A lake under a clear sky. */
  lake: "light-dark(oklch(0.5 0.12 245), oklch(0.78 0.1 245))",
  /** Clay roof tiles. */
  terracotta: "light-dark(oklch(0.53 0.15 42), oklch(0.78 0.12 45))",
  /** Lime-washed walls in evening light, and ripe fields. */
  ochre: "light-dark(oklch(0.52 0.11 68), oklch(0.82 0.12 80))",
  /** The sky over a city after sunset. */
  dusk: "light-dark(oklch(0.5 0.15 290), oklch(0.78 0.11 290))",
} as const

export type HueName = keyof typeof PALETTE

/** A colour theme that is a hue, not a grey (`registry/core/config.ts`'s `THEMES` less `BASE_COLORS`). */
const HUED = schemeMarker.within(
  ':is([data-theme="amber"], [data-theme="blue"], [data-theme="cyan"], [data-theme="emerald"], [data-theme="fuchsia"], [data-theme="green"], [data-theme="indigo"], [data-theme="lime"], [data-theme="orange"], [data-theme="pink"], [data-theme="purple"], [data-theme="red"], [data-theme="rose"], [data-theme="sky"], [data-theme="teal"], [data-theme="violet"], [data-theme="yellow"])'
)

/** What is drawn on every hue: paper on the deep light-scheme hues, night on the light dark ones. */
const ON = { base: theme.background, [HUED]: theme.primaryForeground }

/** Assigns a hue to a subtree: `<div sx={hues.terracotta}>`. Written out, so each is static. */
export const hues: Record<HueName, StyleHandle> = {
  forest: css({
    [hue.base]: { base: PALETTE.forest, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  tea: css({
    [hue.base]: { base: PALETTE.tea, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  crater: css({
    [hue.base]: { base: PALETTE.crater, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  lake: css({
    [hue.base]: { base: PALETTE.lake, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  terracotta: css({
    [hue.base]: { base: PALETTE.terracotta, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  ochre: css({
    [hue.base]: { base: PALETTE.ochre, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
  dusk: css({
    [hue.base]: { base: PALETTE.dusk, [HUED]: theme.primary },
    [hue.on]: ON,
  }),
}
