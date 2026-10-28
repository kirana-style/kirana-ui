/**
 * Popover, in every style: shadcn/ui's `bases/base/ui/popover.tsx` and `bases/aria/ui/popover.tsx`
 * with the `cn-popover*` rules of its style files (MIT). Nova is the base look; the other styles
 * override what differs. It comes and goes as every popup does (`popupMotion`).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
  zIndex,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { ringAndShadow } from "./menu.styles"
import { TRANSFORM_ORIGIN } from "./overlay.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** `text-xs`, `text-sm` with their line heights. */
const XS = { fontSize: fontSize.xs, lineHeight: lineHeight.xs }

export const popover = {
  // Base UI's positioner (`isolate z-50`).
  positioner: css({ isolation: "isolate", zIndex: zIndex.popover }),

  // cn-popover-content (cn-popover-content-aria) and the component's own classes.
  content: css({
    zIndex: zIndex.popover,
    display: "flex",
    width: space[72],
    flexDirection: "column",
    gap: {
      base: space["2.5"],
      [vega]: space[4],
      [maia]: space[4],
      [mira]: space[4],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
    padding: {
      base: space["2.5"],
      [vega]: space[4],
      [maia]: space[4],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
    transformOrigin: TRANSFORM_ORIGIN,
    outlineStyle: "none",
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["2xl"],
      [luma]: radius["3xl"],
      [rhea]: radius["3xl"],
      [sera]: "0",
    },
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    fontSize: { base: fontSize.sm, [lyra]: XS.fontSize, [mira]: XS.fontSize },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: XS.lineHeight,
      [mira]: XS.lineHeight,
    },
    boxShadow: {
      base: ringAndShadow(alpha.foreground10, shadow.md),
      [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]),
      [luma]: ringAndShadow(surface.ringSoft, shadow.lg),
      [rhea]: ringAndShadow(surface.ringSoft, shadow.lg),
    },
  }),

  // cn-popover-content-logical: the logical sides' slide, in `popupMotion` (`overlay.styles.ts`).

  // cn-popover-header
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: {
      base: space["0.5"],
      [vega]: space[1],
      [lyra]: space[1],
      [maia]: space[1],
      [mira]: space[1],
      [luma]: space[1],
      [rhea]: space[1],
      [sera]: space[1],
    },
    fontSize: { base: fontSize.sm, [lyra]: XS.fontSize, [mira]: XS.fontSize },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: XS.lineHeight,
      [mira]: XS.lineHeight,
    },
  }),

  // cn-popover-title: Maia's, Luma's and Rhea's `text-base`; Sera's small spaced capitals.
  title: css({
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    fontSize: {
      [lyra]: fontSize.sm,
      [maia]: fontSize.base,
      [mira]: fontSize.sm,
      [luma]: fontSize.base,
      [rhea]: fontSize.base,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.base,
      [mira]: lineHeight.sm,
      [luma]: lineHeight.base,
      [rhea]: lineHeight.base,
      [sera]: lineHeight.xs,
    },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-popover-description
  description: css({
    color: theme.mutedForeground,
    fontSize: { [lyra]: fontSize.xs, [sera]: fontSize.sm },
    lineHeight: { [lyra]: leading.relaxed, [sera]: leading.relaxed },
    marginTop: { [sera]: space["0.5"] },
  }),
}
