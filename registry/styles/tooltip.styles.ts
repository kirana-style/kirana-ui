/**
 * Tooltip, in every style: shadcn/ui's `bases/base/ui/tooltip.tsx` and `bases/aria/ui/tooltip.tsx`
 * with the `cn-tooltip-*` rules of its style files (MIT), at commit `481d523`. Nova is the base
 * look; the other styles override its corners and, in Maia, Luma, Rhea and Sera, nudge the arrow
 * out on a side.
 *
 * The popup comes and goes as every popup does (`popupMotion`). The arrow is a square turned on
 * its corner. Base UI places it along its side with an inline `top` or `left`, which upstream
 * overrides with `top-1/2!` and recentres with `-translate-y-1/2`: the same place as Base UI's own
 * `top`, so here the arrow keeps it and is not moved. React Aria places its arrow itself, from the
 * placement (`OverlayArrow`'s style, in the component).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { fontSize, lineHeight, space, zIndex } from "../core/scales"
import { side } from "../core/states"
import { radius, theme } from "../core/tokens"
import { TRANSFORM_ORIGIN } from "./overlay.styles"

const { lyra, maia, luma, rhea, sera } = axes.style

const TOP = side.top.base
const BOTTOM = side.bottom.base
const LEFT = side.left.base
const RIGHT = side.right.base
const INLINE_START = side.inlineStart.base
const INLINE_END = side.inlineEnd.base

/** `-right-1`, `-left-1`. */
const OUT = `calc(${space[1]} * -1)`

/** Maia's, Luma's, Rhea's and Sera's arrow on an inline side: 1.5px further out. */
const NUDGED = {
  [LEFT]: "-1.5px 0",
  [RIGHT]: "1.5px 0",
  [INLINE_START]: "-1.5px 0",
  [INLINE_END]: "1.5px 0",
}

export const tooltip = {
  /** `isolate z-50` on Base UI's positioner. */
  positioner: css({ isolation: "isolate", zIndex: zIndex.popover }),

  // cn-tooltip-content (cn-tooltip-content-aria) and the component's own classes.
  content: css({
    zIndex: zIndex.popover,
    display: "inline-flex",
    width: "fit-content",
    maxWidth: "20rem",
    alignItems: "center",
    gap: space["1.5"],
    paddingInline: space[3],
    paddingBlock: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    backgroundColor: theme.foreground,
    color: theme.background,
    transformOrigin: TRANSFORM_ORIGIN,
    // `has-data-[slot=kbd]:pr-1.5`.
    paddingRight: { ':has([data-slot="kbd"])': space["1.5"] },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [maia]: radius["2xl"],
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
  }),

  // cn-tooltip-arrow (and -logical) and the component's own classes.
  arrow: css({
    zIndex: zIndex.popover,
    width: space["2.5"],
    height: space["2.5"],
    rotate: "45deg",
    backgroundColor: theme.foreground,
    fill: theme.foreground,
    borderRadius: { base: "2px", [lyra]: "0", [sera]: "0" },
    top: { [BOTTOM]: space[1] },
    bottom: { [TOP]: `calc(${space["2.5"]} * -1)` },
    right: { [LEFT]: OUT, [INLINE_START]: OUT },
    left: { [RIGHT]: OUT, [INLINE_END]: OUT },
    translate: {
      base: "0 calc(-50% - 2px)",
      [LEFT]: "0 0",
      [RIGHT]: "0 0",
      [INLINE_START]: "0 0",
      [INLINE_END]: "0 0",
      [maia]: { base: "0 calc(-50% - 2px)", ...NUDGED },
      [luma]: { base: "0 calc(-50% - 2px)", ...NUDGED },
      [rhea]: { base: "0 calc(-50% - 2px)", ...NUDGED },
      // Sera nudges it on the logical sides only.
      [sera]: {
        base: "0 calc(-50% - 2px)",
        [LEFT]: "0 0",
        [RIGHT]: "0 0",
        [INLINE_START]: "-1.5px 0",
        [INLINE_END]: "1.5px 0",
      },
    },
  }),
}
