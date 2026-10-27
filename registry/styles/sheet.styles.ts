/**
 * Sheet, in every style: shadcn/ui's `bases/base/ui/sheet.tsx` and `bases/aria/ui/sheet.tsx` with
 * the `cn-sheet-*` rules of its style files (MIT), at commit `481d523`. Nova is the base look; the
 * other styles override what differs.
 *
 * A sheet is a dialog pinned to one edge of the screen (`sheet.side`, by its `side`): it fades in
 * as it slides 2.5rem from that edge, on each base's first frame and exit (`overlay.starting`,
 * `.ending`). The close button is a ghost `icon-sm` Button placed by
 * `sheet.close`.
 *
 * Different from upstream on purpose:
 * - `transition` is written as the properties that move;
 * - `supports-backdrop-filter:` is dropped: a browser without `backdrop-filter` ignores it anyway.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  blur,
  breakpoint,
  containerSize,
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  zIndex,
} from "../core/scales"
import { overlay, when } from "../core/states"
import { font, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** How far a sheet travels in from its edge. */
const TRAVEL = "2.5rem"

/** A side's slide: from `away` on each base's first frame and exit, to rest. */
const slide = (away: string) => ({
  base: "0",
  ...when(overlay.starting, away),
  ...when(overlay.ending, away),
})

/** `border-*` on the side facing the page. */
const EDGE = "1px"

/** `p-4`, `p-6` from Maia on, `p-8` in Sera: the header's and the footer's padding. */
const BAND_PADDING = {
  base: space[4],
  [maia]: space[6],
  [mira]: space[6],
  [luma]: space[6],
  [rhea]: space[6],
  [sera]: space[8],
}

export const sheet = {
  // cn-sheet-overlay and the component's own classes.
  overlay: css({
    position: "fixed",
    inset: 0,
    zIndex: zIndex.overlay,
    transitionProperty: "opacity",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    opacity: {
      base: 1,
      ...when(overlay.starting, 0),
      ...when(overlay.ending, 0),
    },
    backgroundColor: {
      base: "rgb(0 0 0 / 0.1)",
      [maia]: "rgb(0 0 0 / 0.8)",
      [mira]: "rgb(0 0 0 / 0.8)",
      [luma]: "rgb(0 0 0 / 0.3)",
      [rhea]: "rgb(0 0 0 / 0.3)",
      [sera]: "rgb(0 0 0 / 0.2)",
    },
    backdropFilter: {
      base: `blur(${blur.xs})`,
      [luma]: `blur(${blur.sm})`,
      [rhea]: `blur(${blur.sm})`,
      [sera]: `blur(${blur.sm})`,
    },
    // Lyra's overlay sets its text small, which nothing inside it reads.
    fontSize: { [lyra]: fontSize.xs },
    lineHeight: { [lyra]: leading.relaxed },
  }),

  // cn-sheet-content and the component's own classes.
  content: css({
    position: "fixed",
    zIndex: zIndex.popover,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.popover,
    backgroundClip: "padding-box",
    color: theme.popoverForeground,
    outlineStyle: "none",
    gap: { [nova]: space[4], [vega]: space[4] },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
    boxShadow: {
      base: shadow.lg,
      [luma]: shadow.xl,
      [rhea]: shadow.xl,
      [sera]: shadow.md,
    },
    transitionProperty: "opacity, translate",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
    opacity: {
      base: 1,
      ...when(overlay.starting, 0),
      ...when(overlay.ending, 0),
    },
    borderColor: theme.border,
  }),

  // The content's own classes for each side (`data-[side=*]:`), chosen by the component from its
  // `side`: pinned to that edge, the full height and three quarters of the width at a side (a
  // small screen's width at most from `sm`), the full width at the top or bottom. The component
  // also writes `data-side`, as upstream, which no style reads: Base UI's popups write the same
  // attribute, and a handle per side needs no selector at all.
  side: {
    top: css({
      top: 0,
      left: 0,
      right: 0,
      height: "auto",
      borderBottomWidth: EDGE,
      translate: slide(`0 -${TRAVEL}`),
    }),
    right: css({
      top: 0,
      bottom: 0,
      right: 0,
      height: "100%",
      width: "75%",
      maxWidth: { [breakpoint.sm]: containerSize.sm },
      borderLeftWidth: EDGE,
      translate: slide(`${TRAVEL} 0`),
    }),
    bottom: css({
      bottom: 0,
      left: 0,
      right: 0,
      height: "auto",
      borderTopWidth: EDGE,
      translate: slide(`0 ${TRAVEL}`),
    }),
    left: css({
      top: 0,
      bottom: 0,
      left: 0,
      height: "100%",
      width: "75%",
      maxWidth: { [breakpoint.sm]: containerSize.sm },
      borderRightWidth: EDGE,
      translate: slide(`-${TRAVEL} 0`),
    }),
  },

  // React Aria's Dialog, inside the modal: it lays out as the content does.
  inner: css({
    display: "inherit",
    height: "100%",
    maxHeight: "inherit",
    flexDirection: "inherit",
    gap: "inherit",
    outlineStyle: "none",
  }),

  // cn-sheet-close: filled with `secondary` in Luma, Rhea and Sera.
  close: css({
    position: "absolute",
    top: { base: space[4], [nova]: space[3], [lyra]: space[3] },
    right: { base: space[4], [nova]: space[3], [lyra]: space[3] },
    backgroundColor: {
      [luma]: theme.secondary,
      [rhea]: theme.secondary,
      [sera]: theme.secondary,
    },
  }),

  // cn-sheet-header and the component's own classes.
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: { base: space["1.5"], [nova]: space["0.5"], [lyra]: space["0.5"] },
    padding: BAND_PADDING,
  }),

  // cn-sheet-footer and the component's own classes.
  footer: css({
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    padding: BAND_PADDING,
  }),

  // cn-sheet-title and cn-font-heading. Vega sets no size, so its title is the content's `text-sm`;
  // Sera's is a spaced, uppercase `text-lg`.
  title: css({
    fontFamily: font.heading,
    color: theme.foreground,
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    fontSize: {
      [nova]: fontSize.base,
      [lyra]: fontSize.sm,
      [maia]: fontSize.base,
      [mira]: fontSize.sm,
      [luma]: fontSize.base,
      [rhea]: fontSize.base,
      [sera]: fontSize.lg,
    },
    lineHeight: {
      [nova]: lineHeight.base,
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.base,
      [mira]: lineHeight.sm,
      [luma]: lineHeight.base,
      [rhea]: lineHeight.base,
      [sera]: lineHeight.lg,
    },
    letterSpacing: { [sera]: letterSpacing.wider },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-sheet-description
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
      [sera]: leading.relaxed,
    },
    marginTop: { [sera]: space["0.5"] },
  }),
}
