/**
 * Scroll Area, in every style: shadcn/ui's `bases/base/ui/scroll-area.tsx` and
 * `bases/aria/ui/scroll-area.tsx` with the `cn-scroll-area*` rules of its style files (MIT). The
 * styles draw it alike, but Lyra's and Sera's thumb is square.
 *
 * Base UI draws its own scrollbar. React Aria has none: its scroll area is the element itself,
 * with the browser's thin scrollbar in the border colour.
 */
import { css } from "@kirana-style/core"
import { ScrollArea } from "@kirana-style/states/base-ui"

import { axes } from "../core/axes"
import { duration, easing, spacing } from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"

const { lyra, sera } = axes.style

const HORIZONTAL = ScrollArea.Scrollbar.orientation.horizontal
const VERTICAL = ScrollArea.Scrollbar.orientation.vertical

/** `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1`. */
const focusRing = {
  outlineStyle: { base: "none", ":focus-visible": "solid" },
  outlineWidth: { ":focus-visible": "1px" },
  outlineColor: { ":focus-visible": alpha.ring50 },
  boxShadow: { ":focus-visible": `0 0 0 3px ${alpha.ring50}` },
} as const

export const scrollArea = {
  // cn-scroll-area on Base UI: the root, around its viewport.
  root: css({ position: "relative" }),

  // cn-scroll-area-viewport
  viewport: css({
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    transitionProperty: "color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    ...focusRing,
  }),

  // cn-scroll-area on React Aria: the element that scrolls.
  native: css({
    position: "relative",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.border} transparent`,
    ...focusRing,
  }),

  // cn-scroll-area-scrollbar
  scrollbar: css({
    display: "flex",
    touchAction: "none",
    userSelect: "none",
    padding: "1px",
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    flexDirection: { [HORIZONTAL]: "column" },
    height: { [HORIZONTAL]: spacing(2.5), [VERTICAL]: "100%" },
    width: { [VERTICAL]: spacing(2.5) },
    borderTopWidth: { [HORIZONTAL]: "1px" },
    borderTopColor: { [HORIZONTAL]: "transparent" },
    borderLeftWidth: { [VERTICAL]: "1px" },
    borderLeftColor: { [VERTICAL]: "transparent" },
  }),

  // cn-scroll-area-thumb
  thumb: css({
    position: "relative",
    flex: "1 1 0%",
    backgroundColor: theme.border,
    borderRadius: { base: radius.full, [lyra]: "0", [sera]: "0" },
  }),
}
