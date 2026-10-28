/**
 * Kbd, in every style: shadcn/ui's `bases/base/ui/kbd.tsx` and `bases/aria/ui/kbd.tsx` with the
 * `cn-kbd` rules of its style files (MIT). Nova is the base look; the other styles override what
 * differs.
 *
 * Inside a tooltip it is drawn in the tooltip's own colours (`IN_TOOLTIP`); in Luma, Rhea and Sera
 * it is filled with the input colour inside an InputGroup; inside an InputGroup's addon it takes
 * the addon's look (upstream's addon reaches into it, which Kirana would write below its own).
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, font, radius, radiusBase, theme } from "../core/tokens"
import {
  CHILD_OF_ADDON,
  IN_ADDON,
  IN_INPUT_GROUP,
  IN_TOOLTIP,
} from "./scope.styles"

/** A Kbd in a tooltip, in the tooltip's colours. */
const TOOLTIP_FILL = `light-dark(${alpha.background20}, ${alpha.background10})`

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

export const kbd = {
  // cn-kbd
  root: css({
    pointerEvents: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    height: { base: space[5], [luma]: spacing(5.5), [sera]: spacing(5.5) },
    width: "fit-content",
    minWidth: { base: space[5], [luma]: spacing(5.5), [sera]: spacing(5.5) },
    gap: space[1],
    // In an InputGroup's addon: Nova's and Vega's own child is rounded `calc(var(--radius) - 5px)`,
    // and from Maia on any Kbd in it takes the addon's corners (`**:data-[slot=kbd]:`).
    borderRadius: {
      base: radius.sm,
      [nova]: {
        base: radius.sm,
        [CHILD_OF_ADDON]: `calc(${radiusBase.value} - 5px)`,
      },
      [vega]: {
        base: radius.sm,
        [CHILD_OF_ADDON]: `calc(${radiusBase.value} - 5px)`,
      },
      [lyra]: "0",
      [maia]: { base: radius.sm, [IN_ADDON]: radius["4xl"] },
      // `rounded-xs`, Tailwind's own: shadcn/ui's theme derives no `xs` from the radius.
      [mira]: { base: "0.125rem", [IN_ADDON]: `calc(${radius.sm} - 2px)` },
      [luma]: { base: radius.lg, [IN_ADDON]: radius["3xl"] },
      [rhea]: { base: radius.lg, [IN_ADDON]: radius["2xl"] },
      [sera]: "0",
    },
    paddingInline: {
      base: space[1],
      [maia]: { [IN_ADDON]: spacing(1.5) },
      [rhea]: { [IN_ADDON]: spacing(1.5) },
      [luma]: spacing(1.5),
      [sera]: spacing(1.5),
    },
    // `font-sans`: the design's body face.
    fontFamily: font.sans,
    fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
    // `text-xs`'s line height; Mira's `text-[0.625rem]` sets none.
    lineHeight: {
      [nova]: lineHeight.xs,
      [vega]: lineHeight.xs,
      [lyra]: lineHeight.xs,
      [maia]: lineHeight.xs,
      [luma]: lineHeight.xs,
      [rhea]: lineHeight.xs,
      [sera]: lineHeight.xs,
    },
    fontWeight: fontWeight.medium,
    backgroundColor: {
      base: theme.muted,
      [IN_TOOLTIP]: TOOLTIP_FILL,
      [maia]: {
        [IN_ADDON]: {
          base: alpha.mutedForeground10,
          [IN_TOOLTIP]: TOOLTIP_FILL,
        },
      },
      [mira]: {
        [IN_ADDON]: {
          base: alpha.mutedForeground10,
          [IN_TOOLTIP]: TOOLTIP_FILL,
        },
      },
      [luma]: {
        [IN_INPUT_GROUP]: {
          base: theme.input,
          [IN_TOOLTIP]: TOOLTIP_FILL,
          [IN_ADDON]: {
            base: alpha.mutedForeground10,
            [IN_TOOLTIP]: TOOLTIP_FILL,
          },
        },
      },
      [rhea]: {
        [IN_INPUT_GROUP]: {
          base: theme.input,
          [IN_TOOLTIP]: TOOLTIP_FILL,
          [IN_ADDON]: {
            base: alpha.mutedForeground10,
            [IN_TOOLTIP]: TOOLTIP_FILL,
          },
        },
      },
      [sera]: {
        [IN_INPUT_GROUP]: {
          base: theme.input,
          [IN_TOOLTIP]: TOOLTIP_FILL,
          [IN_ADDON]: {
            base: alpha.mutedForeground10,
            [IN_TOOLTIP]: TOOLTIP_FILL,
          },
        },
      },
    },
    color: { base: theme.mutedForeground, [IN_TOOLTIP]: theme.background },
    // `[&_svg:not([class*='size-'])]:size-3`: a descendant style, below an icon's own size.
    [select.descendant("svg")]: { width: space[3], height: space[3] },
  }),

  // cn-kbd-group
  // A group is a `kbd` too: an addon's `[&>kbd]:` corners reach it in Nova and Vega.
  group: css({
    display: "inline-flex",
    alignItems: "center",
    gap: space[1],
    borderRadius: {
      [nova]: { [CHILD_OF_ADDON]: `calc(${radiusBase.value} - 5px)` },
      [vega]: { [CHILD_OF_ADDON]: `calc(${radiusBase.value} - 5px)` },
    },
  }),
}
