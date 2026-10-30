/**
 * Carousel, in every style: shadcn/ui's `bases/base/ui/carousel.tsx` and
 * `bases/aria/ui/carousel.tsx` (over Embla) with the `cn-carousel*` rules of its style files (MIT).
 * Its arrows are outline Buttons, round in most styles; the orientation is the carousel's prop, so
 * each part takes its horizontal or vertical handle from it.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { radius } from "../core/tokens"

const { nova, vega, maia, mira, luma, rhea } = axes.style

/** `rounded-full`, Rhea's `rounded-2xl`; Lyra and Sera keep Button's square corners. */
const ROUND = {
  [nova]: radius.full,
  [vega]: radius.full,
  [maia]: radius.full,
  [mira]: radius.full,
  [luma]: radius.full,
  [rhea]: radius["2xl"],
}

/** An arrow: `absolute touch-manipulation` and its corners. */
const arrow = {
  position: "absolute",
  touchAction: "manipulation",
  borderRadius: ROUND,
} as const

/**
 * Between the arrows, across a vertical carousel: `left-1/2 -translate-x-1/2 rotate-90`. Pressed,
 * the arrow keeps its centring as it presses in 1px (Button's `active:translate-y-px`, which
 * Tailwind composes; Button's own pressed `translate` would drop the `-50%`).
 */
const across = {
  left: "50%",
  translate: { "*": null, base: "-50% 0", ":active": "-50% 1px" },
  rotate: "90deg",
} as const

export const carousel = {
  root: css({ position: "relative" }),
  viewport: css({ overflow: "hidden" }),
  content: css({ display: "flex", marginLeft: `calc(${space[4]} * -1)` }),
  contentVertical: css({
    display: "flex",
    flexDirection: "column",
    marginTop: `calc(${space[4]} * -1)`,
  }),
  item: css({
    minWidth: "0",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "100%",
    paddingLeft: space[4],
  }),
  itemVertical: css({
    minWidth: "0",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "100%",
    paddingTop: space[4],
  }),
  // cn-carousel-previous
  previous: css({
    ...arrow,
    top: "0",
    bottom: "0",
    left: `calc(${space[12]} * -1)`,
    marginBlock: "auto",
  }),
  previousVertical: css({
    ...arrow,
    ...across,
    top: `calc(${space[12]} * -1)`,
  }),
  // cn-carousel-next
  next: css({
    ...arrow,
    top: "0",
    bottom: "0",
    right: `calc(${space[12]} * -1)`,
    marginBlock: "auto",
  }),
  nextVertical: css({
    ...arrow,
    ...across,
    bottom: `calc(${space[12]} * -1)`,
  }),
  // `cn-rtl-flip`: the chevrons point the other way in a right-to-left page.
  flip: css({ rotate: { ":dir(rtl)": "180deg" } }),
}
