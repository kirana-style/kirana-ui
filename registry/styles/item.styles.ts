/**
 * Item, in every style: shadcn/ui's `bases/base/ui/item.tsx` and `bases/aria/ui/item.tsx` with the
 * `cn-item*` rules of its style files (MIT). Nova is the base look; the other styles override what
 * differs.
 *
 * The parts read the item (`itemScope`, upstream's `group/item`): its size shrinks the media, the
 * content's gap and the description, and a description beside the media moves the media to the
 * top. An extra-small item inside a dropdown menu's content loses its padding.
 */
import { css, recipe, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"
import { dropdownMenuScope } from "./scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The item, read by its parts. */
export const itemScope = relation("item")

/** A content part, read by the one after it (`[&+[data-slot=item-content]]:`). */
export const itemContentScope = relation("item-content")

const XS = itemScope.within('[data-size="xs"]')
const SM = itemScope.within('[data-size="sm"]')
const WITH_DESCRIPTION = itemScope.within(
  ':has([data-slot="item-description"])'
)

/** The item is itself a link. */
const LINK_HOVER = ":is(a):hover"

const FOCUS_RING = `0 0 0 3px ${alpha.ring50}`

export const item = {
  // The item, read by its parts (`itemScope`).
  scope: css(itemScope.anchor),

  // cn-item, its variants and sizes.
  root: recipe({
    base: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      alignItems: "center",
      outlineStyle: "none",
      borderWidth: "1px",
      borderColor: { base: "transparent", ":focus-visible": theme.ring },
      borderRadius: {
        base: radius.lg,
        [vega]: radius.md,
        [lyra]: "0",
        [maia]: radius["2xl"],
        [mira]: radius.md,
        [luma]: radius["2xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
      backgroundColor: { [LINK_HOVER]: theme.muted },
      boxShadow: { ":focus-visible": FOCUS_RING },
      fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
      lineHeight: {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: leading.relaxed,
      },
      transitionProperty: "color, background-color, border-color",
      transitionDuration: duration[100],
      transitionTimingFunction: easing.inOut,
    },
    variants: {
      variant: {
        // cn-item-variant-default
        default: {},
        // cn-item-variant-outline
        outline: {
          borderColor: { base: theme.border, ":focus-visible": theme.ring },
        },
        // cn-item-variant-muted
        muted: {
          backgroundColor: { base: alpha.muted50, [LINK_HOVER]: theme.muted },
        },
      },
      size: {
        // cn-item-size-default
        default: {
          gap: {
            base: space["2.5"],
            [vega]: space["3.5"],
            [maia]: space["3.5"],
            [luma]: space["3.5"],
            [rhea]: space["3.5"],
            [sera]: space["3.5"],
          },
          paddingInline: {
            base: space[3],
            [vega]: space[4],
            [maia]: space[4],
            [luma]: space[4],
            [rhea]: space[4],
            [sera]: space[4],
          },
          paddingBlock: {
            base: space["2.5"],
            [vega]: space["3.5"],
            [maia]: space["3.5"],
            [luma]: space["3.5"],
            [rhea]: space["3.5"],
            [sera]: space["3.5"],
          },
        },
        // cn-item-size-sm
        sm: {
          gap: {
            base: space["2.5"],
            [maia]: space["3.5"],
            [luma]: space["3.5"],
            [rhea]: space["3.5"],
            [sera]: space["3.5"],
          },
          paddingInline: {
            base: space[3],
            [maia]: space["3.5"],
            [luma]: space["3.5"],
            [rhea]: space["3.5"],
            [sera]: space["3.5"],
          },
          paddingBlock: {
            base: space["2.5"],
            [maia]: space[3],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[3],
          },
        },
        // cn-item-size-xs: none inside a dropdown menu's content.
        xs: {
          gap: {
            base: space[2],
            [maia]: space["2.5"],
            [mira]: space["2.5"],
            [luma]: space["2.5"],
            [sera]: space["2.5"],
          },
          paddingInline: {
            base: space["2.5"],
            [dropdownMenuScope.within()]: "0",
            [maia]: { base: space[3], [dropdownMenuScope.within()]: "0" },
            [luma]: { base: space[3], [dropdownMenuScope.within()]: "0" },
            [sera]: { base: space[3], [dropdownMenuScope.within()]: "0" },
          },
          paddingBlock: {
            base: space[2],
            [dropdownMenuScope.within()]: "0",
            [maia]: { base: space["2.5"], [dropdownMenuScope.within()]: "0" },
            [luma]: { base: space["2.5"], [dropdownMenuScope.within()]: "0" },
            [sera]: { base: space["2.5"], [dropdownMenuScope.within()]: "0" },
          },
        },
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }),

  // cn-item-media and its variants: at the top beside a description.
  media: recipe({
    base: {
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      gap: space[2],
      alignSelf: { [WITH_DESCRIPTION]: "flex-start" },
      translate: { [WITH_DESCRIPTION]: `0 ${space["0.5"]}` },
      [select.descendant("svg")]: { pointerEvents: "none" },
    },
    variants: {
      variant: {
        // cn-item-media-variant-default
        default: { backgroundColor: "transparent" },
        // cn-item-media-variant-icon
        icon: {
          [select.descendant("svg")]: { width: space[4], height: space[4] },
        },
        // cn-item-media-variant-image: Mira's is `size-8`.
        image: {
          width: {
            base: space[10],
            [SM]: space[8],
            [XS]: space[6],
            [mira]: { base: space[8], [SM]: space[8], [XS]: space[6] },
          },
          height: {
            base: space[10],
            [SM]: space[8],
            [XS]: space[6],
            [mira]: { base: space[8], [SM]: space[8], [XS]: space[6] },
          },
          overflow: "hidden",
          borderRadius: {
            base: radius.sm,
            [lyra]: "0",
            [maia]: { base: radius.lg, [XS]: radius.md },
            [luma]: { base: radius.xl, [XS]: radius.lg },
            [rhea]: { base: radius.xl, [XS]: radius.lg },
            [sera]: "0",
          },
          [select.descendant("img")]: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        },
      },
    },
    defaultVariants: { variant: "default" },
  }),

  // cn-item-content
  content: css(itemContentScope.anchor, {
    display: "flex",
    flex: { base: "1 1 0%", [itemContentScope.after()]: "none" },
    flexDirection: "column",
    gap: {
      base: space[1],
      [XS]: "0",
      [maia]: { base: space[1], [XS]: space["0.5"] },
      [mira]: { base: space[1], [XS]: space["0.5"] },
      [luma]: { base: space[1], [XS]: space["0.5"] },
      [rhea]: { base: space[1], [XS]: space["0.5"] },
      [sera]: { base: space[1], [XS]: space["0.5"] },
    },
  }),

  // cn-item-title: `line-clamp-1`, its box given up for the title's own `flex`.
  title: css({
    // `line-clamp-1`
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: space[2],
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    lineHeight: { base: leading.snug, [lyra]: lineHeight.xs },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    textUnderlineOffset: "4px",
  }),

  // cn-item-description
  description: css({
    // `line-clamp-2`
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    display: "-webkit-box",
    textAlign: "left",
    color: theme.mutedForeground,
    fontSize: {
      base: fontSize.sm,
      [XS]: fontSize.xs,
      [lyra]: { base: fontSize.xs, [XS]: fontSize.xs },
      [maia]: { base: fontSize.sm, [XS]: fontSize.sm },
      [mira]: { base: fontSize.xs, [XS]: fontSize.xs },
      [luma]: { base: fontSize.sm, [XS]: fontSize.sm },
      [rhea]: { base: fontSize.sm, [XS]: fontSize.sm },
      [sera]: { base: fontSize.sm, [XS]: fontSize.sm },
    },
    lineHeight: {
      // `text-xs` at extra small keeps `leading-normal`, which it reads first.
      base: leading.normal,
      [lyra]: leading.relaxed,
      [maia]: lineHeight.sm,
      [mira]: leading.relaxed,
      [luma]: lineHeight.sm,
      [rhea]: lineHeight.sm,
      [sera]: leading.relaxed,
    },
    fontWeight: fontWeight.normal,
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "4px",
    },
    [select.child("a:hover")]: { color: theme.primary },
  }),

  // cn-item-actions
  actions: css({ display: "flex", alignItems: "center", gap: space[2] }),

  // cn-item-header
  header: css({
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[2],
  }),

  // cn-item-footer
  footer: css({
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[2],
  }),

  // cn-item-group: closer together around small items.
  group: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: {
      base: space[4],
      // Extra small wins when both are there, as upstream orders them.
      ':has([data-size="sm"])': {
        base: spacing(2.5),
        ':has([data-size="xs"])': space[2],
      },
      ':has([data-size="xs"])': space[2],
    },
  }),

  // cn-item-separator
  separator: css({ marginBlock: space[2] }),
}
