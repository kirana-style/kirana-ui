/**
 * Progress, in every style: shadcn/ui's `bases/base/ui/progress.tsx` and `bases/aria/ui/progress.tsx`
 * with the `cn-progress*` rules of its style files (MIT). Nova is the base look; the other styles
 * override what differs. The bar is as thin as Sera's hairline or as thick as Maia's and Luma's
 * `h-3`.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { radius, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const label = {
  fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
  lineHeight: {
    base: lineHeight.sm,
    [lyra]: lineHeight.xs,
    [mira]: leading.relaxed,
  },
}

export const progress = {
  // The component's own classes (`cn-progress-root` has no rules).
  root: css({ display: "flex", flexWrap: "wrap", gap: space[3] }),

  // cn-progress-track
  track: css({
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
    overflowX: "hidden",
    height: {
      base: space[1],
      [vega]: spacing(1.5),
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: space[2],
      [sera]: space["0.5"],
    },
    borderRadius: {
      base: radius.full,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    backgroundColor: theme.muted,
  }),

  // cn-progress-indicator
  indicator: css({
    height: "100%",
    backgroundColor: theme.primary,
    transitionProperty: "all",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // cn-progress-label: Lyra's is plain, Sera's small spaced capitals.
  label: css({
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
    fontWeight: {
      base: fontWeight.medium,
      [lyra]: "inherit",
      [sera]: fontWeight.semibold,
    },
    letterSpacing: { [sera]: letterSpacing.wide },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-progress-value
  value: css({
    ...label,
    marginLeft: "auto",
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}
