/**
 * Marquee, in every style: a run of items scrolling in a loop, the registry's own component in
 * shadcn/ui's language, plain markup moved by CSS alone. The root draws the run twice, side by side
 * (the second copy hidden from a screen reader and from the keyboard), and both copies slide by one
 * run's length and the gap after it, so the loop has no seam.
 *
 * - `marquee.root`, and `marquee.vertical` after it for a column.
 * - `marquee.content`, one run; `marquee.contentVertical`, `marquee.reverse`, `marquee.pause`
 *   (paused while the pointer is over the marquee) and `marquee.duplicate` (the second copy) after
 *   it. The marquee hands these to its own two copies.
 * - `marquee.item`, one item, which never shrinks.
 * - `marquee.fadeX`, `marquee.fadeY`: the two edges faded with a mask, so the items dissolve over
 *   any background.
 *
 * Anything focused inside it stops it, whichever props it has. Without motion
 * (`prefers-reduced-motion: reduce`) it stands still: the second copy is not drawn and the person
 * scrolls the run when it overflows.
 *
 * The directions are physical: `left` moves the items to the left on a right-to-left page too,
 * where the copies are laid out from the left so the loop stays whole.
 *
 * Its knobs are tokens set on the root (`marqueeCtx`): `duration`, one loop (40s), and `gap`, the
 * space between items and between the copies (`space[4]`); the fade's depth is scroll-fade's
 * `scrollFadeCtx.size` (`min(25%, space[24])` here). The marquee sets the first two from its `speed`
 * and `gap`. Every value is the same in every style: a marquee has no chrome of its own.
 */
import { css, fallback, keyframes, relation } from "@kirana-style/core"

import { marqueeCtx, scrollFadeCtx } from "../core/context"
import { space } from "../core/scales"

/** The root, read by its copies for whether it is hovered or holds focus. */
export const marqueeScope = relation("marquee")

const REDUCED = "@media (prefers-reduced-motion: reduce)"
const GAP = fallback(marqueeCtx.gap, space[4])
const DURATION = fallback(marqueeCtx.duration, "40s")
const DEPTH = fallback(scrollFadeCtx.size, `min(25%, ${space[24]})`)

// One run and the gap after it: the second copy then sits where the first began.
const scrollX = keyframes({
  from: { translate: "0 0" },
  to: { translate: `calc(-100% - ${GAP}) 0` },
})
const scrollY = keyframes({
  from: { translate: "0 0" },
  to: { translate: `0 calc(-100% - ${GAP})` },
})

const fade = (to: string) =>
  `linear-gradient(${to}, transparent 0, #000 ${DEPTH}, #000 calc(100% - ${DEPTH}), transparent 100%)`

export const marquee = {
  root: css(marqueeScope.anchor, {
    display: "flex",
    // On a right-to-left page the copies are laid out from the left, so the second follows the
    // first as they move; standing still, the run lies as the page reads.
    flexDirection: {
      base: "row",
      ":dir(rtl)": { base: "row-reverse", [REDUCED]: "row" },
    },
    gap: GAP,
    overflow: { base: "hidden", [REDUCED]: "auto" },
  }),

  vertical: css({
    flexDirection: { "*": null, base: "column" },
  }),

  content: css({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "space-around",
    gap: GAP,
    minWidth: "100%",
    animationName: { base: scrollX, [REDUCED]: "none" },
    animationDuration: DURATION,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    // Stopped while anything inside holds focus, so a focused item does not slide away.
    animationPlayState: {
      base: "running",
      [marqueeScope.parent(":focus-within")]: "paused",
    },
  }),

  contentVertical: css({
    flexDirection: "column",
    minWidth: { "*": null, base: "auto" },
    minHeight: "100%",
    animationName: { base: scrollY },
  }),

  reverse: css({ animationDirection: "reverse" }),

  pause: css({
    animationPlayState: { [marqueeScope.parent(":hover")]: "paused" },
  }),

  duplicate: css({
    display: { [REDUCED]: "none" },
  }),

  item: css({ flexShrink: 0 }),

  fadeX: css({ maskImage: fade("to right") }),

  fadeY: css({ maskImage: fade("to bottom") }),
}
