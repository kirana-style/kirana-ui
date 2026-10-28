/**
 * Hover Card, in every style: shadcn/ui's `bases/base/ui/hover-card.tsx` (Base UI's PreviewCard) and
 * `bases/aria/ui/hover-card.tsx` (React Aria's PreviewTrigger and Popover) with the
 * `cn-hover-card*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs. It comes and goes as every popup does (`popupMotion`).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
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

export const hoverCard = {
  // Base UI's positioner (`isolate z-50`).
  positioner: css({ isolation: "isolate", zIndex: zIndex.popover }),

  // cn-hover-card-content-logical: the logical sides' slide, in `popupMotion` (`overlay.styles.ts`).
  // cn-hover-card-content (cn-hover-card-content-aria) and the component's own classes.
  content: css({
    zIndex: zIndex.popover,
    width: {
      base: space[64],
      [maia]: space[72],
      [mira]: space[72],
      [luma]: space[72],
      [rhea]: space[72],
      [sera]: space[72],
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
      [lyra]: "0",
      [maia]: radius["2xl"],
      [luma]: radius["3xl"],
      [rhea]: radius["3xl"],
      [sera]: "0",
    },
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
    boxShadow: {
      base: ringAndShadow(alpha.foreground10, shadow.md),
      [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]),
      [luma]: ringAndShadow(surface.ringSoft, shadow.lg),
      [rhea]: ringAndShadow(surface.ringSoft, shadow.lg),
    },
  }),
}
