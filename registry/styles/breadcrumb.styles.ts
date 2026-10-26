/**
 * Breadcrumb, in every style: shadcn/ui's `bases/base/ui/breadcrumb.tsx` and
 * `bases/aria/ui/breadcrumb.tsx` with the `cn-breadcrumb-*` rules of its style files (MIT), at
 * commit `481d523`. Nova is the base look; the other styles override what differs.
 *
 * React Aria's item draws its own separator after every crumb but the current one, so it has no
 * separator part.
 *
 * Different from upstream on purpose: `transition-colors` is written as the colours that change.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"
import { theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** `sm:gap-2.5`, in the styles that open the list up on wider screens. */
const WIDE_GAP = { base: space["1.5"], [breakpoint.sm]: space["2.5"] }

export const breadcrumb = {
  // cn-breadcrumb-list and the component's own classes.
  list: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    overflowWrap: "break-word",
    color: theme.mutedForeground,
    gap: {
      base: space["1.5"],
      [vega]: WIDE_GAP,
      [maia]: WIDE_GAP,
      [luma]: WIDE_GAP,
      [rhea]: WIDE_GAP,
      [sera]: WIDE_GAP,
    },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
      [sera]: lineHeight.xs,
    },
    // Sera's crumbs are spaced capitals.
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wide },
  }),

  // cn-breadcrumb-item and the component's own classes.
  item: css({
    display: "inline-flex",
    alignItems: "center",
    gap: {
      base: space[1],
      [vega]: space["1.5"],
      [maia]: space["1.5"],
      [luma]: space["1.5"],
      [rhea]: space["1.5"],
      [sera]: space["1.5"],
    },
  }),

  // cn-breadcrumb-link
  link: css({
    color: { ":hover": theme.foreground },
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // cn-breadcrumb-page
  page: css({ color: theme.foreground, fontWeight: fontWeight.normal }),

  // cn-breadcrumb-separator: its chevron is `size-3.5`.
  separator: css({
    [select.child("svg")]: { width: space["3.5"], height: space["3.5"] },
  }),

  // cn-breadcrumb-ellipsis and the component's own classes; Mira's is smaller.
  ellipsis: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: { base: space[5], [mira]: space[4] },
    height: { base: space[5], [mira]: space[4] },
    [select.child("svg")]: {
      width: { base: space[4], [mira]: space["3.5"] },
      height: { base: space[4], [mira]: space["3.5"] },
    },
  }),
}
