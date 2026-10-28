/**
 * Marker, in every style: shadcn/ui's `bases/base/ui/marker.tsx` and `bases/aria/ui/marker.tsx` with
 * the `cn-marker*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs.
 *
 * A separator marker draws a rule on each side (its `::before` and `::after`) and keeps its content
 * to its own width, which the content reads of the marker (`markerScope`).
 */
import { css, recipe, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  leading,
  letterSpacing,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { theme } from "../core/tokens"

const { lyra, mira, sera } = axes.style

/** The marker, read by its content. */
export const markerScope = relation("marker")

const SEPARATOR = markerScope.within('[data-variant="separator"]')

/** `size-4`, `size-3.5` in Lyra and Mira. */
const ICON = { base: space[4], [lyra]: spacing(3.5), [mira]: spacing(3.5) }

const rule = {
  content: '""',
  height: "1px",
  minWidth: 0,
  flex: "1 1 0%",
  backgroundColor: theme.border,
}

export const marker = {
  // The marker, read by its content (`markerScope`).
  scope: css(markerScope.anchor),

  // cn-marker and its variants.
  root: recipe({
    base: {
      position: "relative",
      display: "flex",
      width: "100%",
      alignItems: "center",
      gap: space[2],
      minHeight: space[4],
      textAlign: "left",
      color: { base: theme.mutedForeground, ":is(a):hover": theme.foreground },
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
      textTransform: { [sera]: "uppercase" },
      letterSpacing: { [sera]: letterSpacing.wide },
      textDecorationLine: { ":is(a)": "underline" },
      textUnderlineOffset: { ":is(a)": "3px" },
      [select.descendant("svg")]: { width: ICON, height: ICON },
    },
    variants: {
      variant: {
        // cn-marker-variant-default
        default: {},
        // cn-marker-variant-separator: a rule on each side.
        separator: {
          "::before": { ...rule, marginRight: space[1] },
          "::after": { ...rule, marginLeft: space[1] },
        },
        // cn-marker-variant-border
        border: {
          borderBottomWidth: "1px",
          borderBottomColor: theme.border,
          paddingBottom: space[2],
        },
      },
    },
    defaultVariants: { variant: "default" },
  }),

  // cn-marker-icon
  icon: css({
    flexShrink: 0,
    width: ICON,
    height: ICON,
    [select.descendant("svg")]: { width: ICON, height: ICON },
  }),

  // cn-marker-content: its own width, centred, between a separator's rules.
  content: css({
    minWidth: 0,
    overflowWrap: "break-word",
    flex: { [SEPARATOR]: "none" },
    textAlign: { [SEPARATOR]: "center" },
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "3px",
    },
    [select.child("a:hover")]: { color: theme.foreground },
  }),
}
