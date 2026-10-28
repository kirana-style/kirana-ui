/**
 * Empty, in every style: shadcn/ui's `bases/base/ui/empty.tsx` (the same on React Aria) with the
 * `cn-empty*` rules of its style files (MIT). Nova is the base look; the other styles override what
 * differs.
 *
 * The root's dashed border has no width of its own: a page that wants it adds `border`
 * (upstream's `empty-outline`).
 */
import { css, recipe, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
  spacing,
  containerSize,
} from "../core/scales"
import { font, radius, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The larger styles' `size-10` icon box. */
const BIG = {
  [vega]: space[10],
  [maia]: space[10],
  [luma]: space[10],
  [rhea]: space[10],
  [sera]: space[10],
}

export const empty = {
  // cn-empty
  root: css({
    display: "flex",
    width: "100%",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[4],
    textAlign: "center",
    textWrap: "balance",
    borderStyle: "dashed",
    borderColor: theme.border,
    borderRadius: {
      base: radius.xl,
      [vega]: radius.lg,
      [lyra]: "0",
      [maia]: radius.lg,
      [luma]: radius["2xl"],
      [rhea]: radius["3xl"],
      [sera]: "0",
    },
    padding: {
      base: space[6],
      [vega]: space[12],
      [maia]: space[12],
      [luma]: space[12],
      [rhea]: space[12],
      [sera]: space[12],
    },
  }),

  // cn-empty-header
  header: css({
    display: "flex",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    alignItems: "center",
    gap: { base: space[2], [mira]: space[1] },
  }),

  // cn-empty-media and its variants.
  media: recipe({
    base: {
      display: "flex",
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: space[2],
      [select.descendant("svg")]: { pointerEvents: "none", flexShrink: 0 },
    },
    variants: {
      variant: {
        // cn-empty-media-default
        default: { backgroundColor: "transparent" },
        // cn-empty-media-icon
        icon: {
          width: { base: space[8], ...BIG },
          height: { base: space[8], ...BIG },
          borderRadius: {
            base: radius.lg,
            [lyra]: "0",
            [mira]: radius.md,
            [luma]: radius.xl,
            [rhea]: radius.xl,
            [sera]: "0",
          },
          backgroundColor: theme.muted,
          color: theme.foreground,
          [select.descendant("svg")]: {
            width: {
              base: space[4],
              [vega]: space[6],
              [maia]: space[6],
              [luma]: space[5],
              [rhea]: space[5],
              [sera]: space[5],
            },
            height: {
              base: space[4],
              [vega]: space[6],
              [maia]: space[6],
              [luma]: space[5],
              [rhea]: space[5],
              [sera]: space[5],
            },
          },
        },
      },
    },
    defaultVariants: { variant: "default" },
  }),

  // cn-empty-title, in the heading face (`cn-font-heading`).
  title: css({
    fontFamily: font.heading,
    fontSize: {
      base: fontSize.sm,
      [vega]: fontSize.lg,
      [maia]: fontSize.lg,
      [luma]: fontSize.lg,
      [rhea]: fontSize.lg,
      [sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight.sm,
      [vega]: lineHeight.lg,
      [maia]: lineHeight.lg,
      [luma]: lineHeight.lg,
      [rhea]: lineHeight.lg,
      [sera]: lineHeight.lg,
    },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    letterSpacing: {
      base: letterSpacing.tight,
      [lyra]: "normal",
      [sera]: letterSpacing.wider,
    },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-empty-description
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: leading.relaxed,
    marginTop: { [sera]: space["0.5"] },
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "4px",
    },
    [select.child("a:hover")]: { color: theme.primary },
  }),

  // cn-empty-content
  content: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    minWidth: 0,
    flexDirection: "column",
    alignItems: "center",
    textWrap: "balance",
    gap: {
      base: spacing(2.5),
      [vega]: space[4],
      [maia]: space[4],
      [mira]: space[2],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
}
