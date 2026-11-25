/**
 * Rating, in every style: a row of stars on Kirana UI Primitives' Rating, the registry's own
 * component in shadcn/ui's language. The root is a radio group and each star a radio the keys move
 * between, so each star draws the focus ring a control draws (`control.ts`).
 *
 * A star is drawn twice: the empty one in the quiet text colour, and over it a filled copy in the
 * foreground, shown whole on a filled star and clipped to its first half on a half one (the
 * primitive marks a half star with both `data-filled` and `data-half`, and gives no fill measure).
 *
 * The stars' sizes and the gaps between them are written here once, the same in every style; the
 * corners and the rings follow each style.
 */
import { css, recipe, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import { space } from "../core/scales"
import { ratingState, when } from "../core/states"
import { alpha, radius, theme } from "../core/tokens"
import { controlIcons, focusRing, laterRings } from "./control"

const { lyra, sera } = axes.style

/** A star, read by the filled copy inside it for whether it is filled, and by half. */
export const ratingItemScope = relation("rating-item")

const FILLED = ratingItemScope.parent(ratingState.item.filled.kirana)
const HALF = ratingItemScope.parent(ratingState.item.half.kirana)

export const rating = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    ...controlIcons,
    opacity: when(ratingState.root.disabled, 0.5),
    cursor: when(ratingState.root.disabled, "not-allowed"),
  },
  variants: {
    // The star's size (`ctx.iconSize`) and the gap between stars.
    size: {
      sm: { [ctx.iconSize]: space[4], gap: space["0.5"] },
      default: { [ctx.iconSize]: space[5], gap: space[1] },
      lg: { [ctx.iconSize]: space[6], gap: space[1] },
    },
  },
  defaultVariants: { size: "default" },
})

export const ratingItem = {
  // One star: the empty one, quiet, with the filled copy laid over it.
  item: css(ratingItemScope.anchor, {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: theme.mutedForeground,
    outlineStyle: "none",
    borderRadius: { base: radius.sm, [lyra]: "0", [sera]: "0" },
    boxShadow: {
      ":focus-visible": focusRing(alpha.ring50, laterRings(alpha.ring30)),
    },
  }),

  // The filled copy: hidden, whole on a filled star, its first half on a half one (the half at
  // the start of the line, so the right one in a right-to-left page).
  fill: css({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    color: theme.foreground,
    clipPath: {
      base: "inset(0 100% 0 0)",
      [FILLED]: {
        base: "none",
        [HALF]: { base: "inset(0 50% 0 0)", ":dir(rtl)": "inset(0 0 0 50%)" },
      },
    },
    // An icon library's star is an outline: the copy fills it.
    [select.descendant("svg")]: { fill: "currentColor" },
  }),
}
