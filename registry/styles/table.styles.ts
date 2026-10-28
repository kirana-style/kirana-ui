/**
 * Table, in every style: shadcn/ui's `bases/base/ui/table.tsx` and `bases/aria/ui/table.tsx` with the
 * `cn-table-*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs.
 *
 * A row draws its own bottom edge. Upstream takes it away from the body's last row and the
 * footer's from outside (`[&_tr:last-child]:border-0`), which Kirana writes below the row's own
 * style, so the row reads where it is instead: `tableBody` and `tableFooter`. A header's rows are
 * edged from the header, since React Aria draws the header's row itself.
 */
import * as Aria from "@kirana-style/states/react-aria"
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, theme } from "../core/tokens"

const { lyra, maia, mira, luma, sera } = axes.style

/** A table's body, read by its rows (the last loses its edge). */
export const tableBody = relation("table-body")
/** A table's footer, read by its rows (the last loses its edge). */
export const tableFooter = relation("table-footer")

/** A head or a cell holding a checkbox has no end padding (`[&:has([role=checkbox])]:pr-0`). */
const HOLDS_CHECKBOX = ':has([role="checkbox"], [data-slot="checkbox"])'

const edge = {
  borderBottomWidth: "1px",
  borderBottomColor: theme.border,
}

/** `px-2`, `px-3` in Maia, Luma and Sera, none at the end beside a checkbox. */
const cellPadding = {
  paddingLeft: {
    base: space[2],
    [maia]: space[3],
    [luma]: space[3],
    [sera]: space[3],
  },
  paddingRight: {
    base: space[2],
    [maia]: space[3],
    [luma]: space[3],
    [sera]: space[3],
    [HOLDS_CHECKBOX]: "0",
  },
}

export const table = {
  // cn-table-container
  container: css({
    position: "relative",
    width: "100%",
    overflowX: "auto",
  }),

  // cn-table
  root: css({
    width: "100%",
    captionSide: "bottom",
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
  }),

  // cn-table-header
  header: css({ [select.descendant("tr")]: edge }),

  // cn-table-body; React Aria's empty body (`data-empty:h-24 data-empty:text-center`)
  body: css(tableBody.anchor, {
    height: { [Aria.TableBody.empty]: space[24] },
    textAlign: { [Aria.TableBody.empty]: "center" },
  }),

  // cn-table-footer
  footer: css(tableFooter.anchor, {
    backgroundColor: alpha.muted50,
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    fontWeight: fontWeight.medium,
  }),

  // cn-table-row, cn-table-row-aria
  row: css({
    ...edge,
    // The last row of a body, at any depth, or of a footer, as its child.
    borderBottomWidth: {
      base: "1px",
      [tableBody.within()]: { ":last-child": "0" },
      [tableFooter.parent()]: { ":last-child": "0" },
    },
    backgroundColor: {
      ":hover": alpha.muted50,
      ':has([aria-expanded="true"])': alpha.muted50,
      '[data-state="selected"]': theme.muted,
      [Aria.Row.selected]: theme.muted,
    },
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // cn-table-head, cn-table-head-aria
  head: css({
    ...cellPadding,
    height: {
      base: space[10],
      [maia]: space[12],
      [luma]: space[12],
      [sera]: space[12],
    },
    textAlign: "left",
    verticalAlign: "middle",
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    color: { base: theme.foreground, [sera]: theme.mutedForeground },
    fontSize: { [sera]: fontSize.xs },
    lineHeight: { [sera]: lineHeight.xs },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wider },
  }),

  // cn-table-cell, cn-table-cell-aria
  cell: css({
    ...cellPadding,
    paddingBlock: {
      base: space[2],
      [maia]: space[3],
      [luma]: space[3],
      [sera]: space[3],
    },
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  }),

  // cn-table-caption
  caption: css({
    marginTop: space[4],
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
  }),

  // React Aria's caption is a `figcaption` after the table, centred as a `caption` is.
  figcaption: css({ textAlign: "center" }),
}
