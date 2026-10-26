/**
 * The frame upstream's examples sit in on a preview page: shadcn/ui's
 * `bases/base/components/example.tsx` (MIT), at commit `25af02b`. It is the site's, not an
 * installable component; its examples (`button-example`, `dialog-example`) are the pages the site is
 * compared with upstream on, so they keep upstream's layout exactly.
 *
 * Different from upstream on purpose: the card's `*:[div:not([class*='w-'])]:w-full` gives its
 * child rows the full width unless their class names a width. Kirana hashes class names, so a row
 * takes `example.row` (or its own width) instead. Sera's corners are square, as Lyra's.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { radius, theme } from "../core/tokens"

const { lyra, sera } = axes.style

const COLUMNS = (count: number) => `repeat(${count}, minmax(0, 1fr))`

export const example = {
  // `w-full bg-muted dark:bg-background`, behind the examples.
  page: css({
    width: "100%",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
  }),
  // ExampleWrapper: one column, two from `md`.
  wrapper: css({
    marginInline: "auto",
    display: "grid",
    minHeight: "100vh",
    width: "100%",
    minWidth: 0,
    maxWidth: {
      base: containerSize["5xl"],
      [breakpoint["2xl"]]: containerSize["6xl"],
    },
    alignContent: "center",
    alignItems: "start",
    gridTemplateColumns: { [breakpoint.md]: COLUMNS(2) },
    gap: {
      base: space[8],
      [breakpoint.sm]: space[12],
      [breakpoint.md]: space[8],
    },
    // `p-4 pt-2 sm:p-6 lg:p-12`: the top is smaller only below `sm`.
    paddingInline: {
      base: space[4],
      [breakpoint.sm]: space[6],
      [breakpoint.lg]: space[12],
    },
    paddingTop: {
      base: space[2],
      [breakpoint.sm]: space[6],
      [breakpoint.lg]: space[12],
    },
    paddingBottom: {
      base: space[4],
      [breakpoint.sm]: space[6],
      [breakpoint.lg]: space[12],
    },
  }),
  // `lg:grid-cols-1 2xl:grid-cols-1`: examples too wide for two columns (Button's).
  oneColumn: css({ gridTemplateColumns: { [breakpoint.lg]: COLUMNS(1) } }),
  // Example: its title above its card.
  root: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    minWidth: 0,
    maxWidth: { base: containerSize.lg, [breakpoint.lg]: "none" },
    flexDirection: "column",
    gap: space[1],
    alignSelf: "stretch",
  }),
  title: css({
    paddingInline: spacing(1.5),
    paddingBlock: space[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  content: css({
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
    gap: space[6],
    borderRadius: { base: radius.xl, [lyra]: "0", [sera]: "0" },
    backgroundColor: theme.card,
    padding: space[12],
    color: theme.foreground,
  }),
  // `items-center justify-center`, on the examples that hold one trigger (Dialog's).
  centred: css({ alignItems: "center", justifyContent: "center" }),
  // A row of the card: the width its `*:[div]:w-full` gave it.
  row: css({ width: "100%" }),
}
