/**
 * Alert, in every style: shadcn/ui's `bases/base/ui/alert.tsx` (the same on React Aria) with the
 * `cn-alert*` rules of its style files (MIT). Nova is the base look; the other styles override what
 * differs.
 *
 * An icon as the alert's own child takes a column of its own beside the title and description
 * (`has-[>svg]:grid-cols-[auto_1fr]`). The parts read the alert (`alertScope`): the title moves to
 * the second column beside an icon, and a destructive alert's description is tinted, both of which
 * upstream reaches in from the alert, where Kirana would write them below the part's own style.
 * Sera's alert has no corners, and a bar down its left edge in the variant's colour; its own
 * `bg-background` loses to the variant's `bg-card`, as upstream's rules order them.
 */
import { css, recipe, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The alert, read by its title and description. */
export const alertScope = relation("alert")

const WITH_ICON = ":has(> svg)"

/** `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground`. */
const links = {
  [select.descendant("a")]: {
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
  },
  [select.descendant("a:hover")]: { color: theme.foreground },
}

export const alert = {
  // The alert, read by its parts (`alertScope`).
  scope: css(alertScope.anchor),

  // cn-alert and its variants.
  root: recipe({
    base: {
      position: "relative",
      display: "grid",
      width: "100%",
      gap: { base: space["0.5"], [sera]: space[1] },
      columnGap: {
        [WITH_ICON]: {
          base: space[2],
          [vega]: spacing(2.5),
          [maia]: spacing(2.5),
          [mira]: spacing(1.5),
          [luma]: spacing(2.5),
          [rhea]: spacing(2.5),
          [sera]: spacing(2.5),
        },
      },
      gridTemplateColumns: { [WITH_ICON]: "auto 1fr" },
      borderRadius: {
        base: radius.lg,
        [lyra]: "0",
        [luma]: radius["2xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
      borderWidth: "1px",
      borderColor: theme.border,
      paddingInlineStart: {
        base: space["2.5"],
        [vega]: space[4],
        [maia]: space[4],
        [mira]: space[2],
        [luma]: space[4],
        [rhea]: space[4],
        [sera]: space[4],
      },
      // `has-data-[slot=alert-action]:pr-18`: room for the action at the end.
      paddingInlineEnd: {
        base: space["2.5"],
        ':has([data-slot="alert-action"])': spacing(18),
        [vega]: {
          base: space[4],
          ':has([data-slot="alert-action"])': spacing(18),
        },
        [maia]: {
          base: space[4],
          ':has([data-slot="alert-action"])': spacing(18),
        },
        [mira]: {
          base: space[2],
          ':has([data-slot="alert-action"])': spacing(18),
        },
        [luma]: {
          base: space[4],
          ':has([data-slot="alert-action"])': spacing(18),
        },
        [rhea]: {
          base: space[4],
          ':has([data-slot="alert-action"])': spacing(18),
        },
        [sera]: {
          base: space[4],
          ':has([data-slot="alert-action"])': spacing(18),
        },
      },
      paddingBlock: {
        base: space[2],
        [vega]: space[3],
        [maia]: space[3],
        [mira]: spacing(1.5),
        [luma]: space[3],
        [rhea]: space[3],
        [sera]: space[3],
      },
      textAlign: "left",
      fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
      lineHeight: {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: leading.relaxed,
      },
      // `*:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current`, `size-4` (Mira's 3.5).
      [select.child("svg")]: {
        gridRow: "span 2 / span 2",
        translate: { base: `0 ${space["0.5"]}`, [lyra]: "0" },
        color: "currentColor",
        width: { base: space[4], [mira]: spacing(3.5) },
        height: { base: space[4], [mira]: spacing(3.5) },
      },
      // Sera's bar down the left edge, in the variant's colour.
      "::after": {
        content: { [sera]: '""' },
        position: "absolute",
        insetBlock: "-1px",
        left: "-1px",
        width: spacing(0.5),
      },
    },
    variants: {
      variant: {
        // cn-alert-variant-default
        default: {
          backgroundColor: theme.card,
          color: theme.cardForeground,
          "::after": { backgroundColor: theme.foreground },
        },
        // cn-alert-variant-destructive
        destructive: {
          backgroundColor: theme.card,
          color: theme.destructive,
          "::after": { backgroundColor: theme.destructive },
        },
      },
    },
    defaultVariants: { variant: "default" },
  }),

  // cn-alert-title
  title: css({
    gridColumnStart: { [alertScope.parent(WITH_ICON)]: 2 },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    fontSize: { [sera]: fontSize.sm },
    lineHeight: { [sera]: lineHeight.sm },
    ...links,
  }),

  // cn-alert-description: a destructive alert's is tinted (`*:data-[slot=alert-description]:text-destructive/90`).
  description: css({
    color: {
      base: theme.mutedForeground,
      [alertScope.parent('[data-variant="destructive"]')]: alpha.destructive90,
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
    textWrap: { base: "balance", [breakpoint.md]: "pretty" },
    [select.descendant("p:not(:last-child)")]: {
      marginBottom: { base: space[4], [lyra]: space[2] },
    },
    ...links,
  }),

  // cn-alert-action
  action: css({
    position: "absolute",
    top: {
      base: space[2],
      [vega]: spacing(2.5),
      [lyra]: spacing(1.25),
      [maia]: spacing(2.5),
      [mira]: spacing(1.5),
      [luma]: spacing(2.5),
      [rhea]: spacing(2.5),
      [sera]: spacing(2.5),
    },
    right: {
      base: space[2],
      [vega]: space[3],
      [lyra]: spacing(1.25),
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
  }),
}
