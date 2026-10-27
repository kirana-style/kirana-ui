/**
 * Accents: the one colour a subtree is tinted with: a page, a docs tab, a callout.
 *
 * `accent.base` is a variable token. A wrapper assigns it (`sx={accents.forest}`) and everything
 * inside reads it. Shades are mixed where they are used, with `tint()`, never in the token's
 * default: a default resolves on `:root`, so a shade written there would ignore the wrapper.
 *
 * shadcn/ui's docs have no hues, so every name here is the design's foreground: a page, a tab and a
 * callout read in the ink of the design the reader chose. The names are the Kirana copy's, whose
 * brand gives each a hue, so the API stays the same in both.
 */
import { css, defineTokens } from "@kirana-style/core"
import type { StyleHandle } from "@kirana-style/core"

import { theme } from "./tokens.ts"

export const accent = defineTokens(
  "accent",
  {
    base: theme.foreground,
    /**
     * What is drawn on the accent (a keycap's glyph). The background colour: paper on the deep
     * hues of the light scheme, night on the light hues of the dark one.
     */
    on: theme.background,
  },
  { variable: true }
)

/** `accent.base` mixed with transparency: `tint(12)` is a 12 % wash. */
export function tint(percent: number): string {
  return `color-mix(in oklab, ${accent.base} ${percent}%, transparent)`
}

export const PALETTE = {
  neutral: theme.foreground,
  forest: theme.foreground,
  tea: theme.foreground,
  crater: theme.foreground,
  lake: theme.foreground,
  terracotta: theme.foreground,
  ochre: theme.foreground,
  dusk: theme.foreground,
} as const

export type AccentName = keyof typeof PALETTE

/** Assigns an accent to a subtree: `<section sx={accents.terracotta}>`. */
export const accents: Record<AccentName, StyleHandle> = {
  neutral: css({
    [accent.base]: PALETTE.neutral,
    [accent.on]: theme.background,
  }),
  forest: css({ [accent.base]: PALETTE.forest, [accent.on]: theme.background }),
  tea: css({ [accent.base]: PALETTE.tea, [accent.on]: theme.background }),
  crater: css({ [accent.base]: PALETTE.crater, [accent.on]: theme.background }),
  lake: css({ [accent.base]: PALETTE.lake, [accent.on]: theme.background }),
  terracotta: css({
    [accent.base]: PALETTE.terracotta,
    [accent.on]: theme.background,
  }),
  ochre: css({ [accent.base]: PALETTE.ochre, [accent.on]: theme.background }),
  dusk: css({ [accent.base]: PALETTE.dusk, [accent.on]: theme.background }),
}
