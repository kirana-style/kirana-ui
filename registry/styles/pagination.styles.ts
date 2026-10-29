/**
 * Pagination, in every style: shadcn/ui's `bases/base/ui/pagination.tsx` and
 * `bases/aria/ui/pagination.tsx` with the `cn-pagination*` rules of its style files (MIT). Nova is
 * the base look; the other styles override what differs. Its links are Buttons (`outline` for the
 * current page, `ghost` for the rest), so most of its look is Button's.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { breakpoint, space, spacing } from "../core/scales"

const { vega, maia, mira, luma, rhea, sera } = axes.style

/** The styles a step wider than Nova: `gap-1`, `size-9`, `pl-2!`. */
const WIDE = [vega, maia, luma, sera] as const

/** `value` under each wide style. */
const wide = <Value>(value: Value) =>
  Object.fromEntries(WIDE.map((style) => [style, value])) as Record<
    (typeof WIDE)[number],
    Value
  >

/** `pl-*!` or `pr-*!`: over every padding Button gives that side, its icon's included. */
const edge = {
  "*": null,
  base: spacing(1.5),
  ...wide(space[2]),
  [mira]: space[2],
}

/** `size-*` of the ellipsis. */
const ellipsisSize = {
  base: space[8],
  ...wide(space[9]),
  [mira]: space[7],
}

export const pagination = {
  // cn-pagination
  root: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    justifyContent: "center",
  }),
  // cn-pagination-content
  content: css({
    display: "flex",
    alignItems: "center",
    gap: {
      base: spacing(0.5),
      [vega]: space[1],
      [maia]: space[1],
      [luma]: space[1],
      [rhea]: space[1],
      [sera]: space[1],
    },
  }),
  // cn-pagination-link: no rule of its own.
  // cn-pagination-previous
  previous: css({ paddingInlineStart: edge }),
  // cn-pagination-next
  next: css({ paddingInlineEnd: edge }),
  // cn-pagination-previous-text and cn-pagination-next-text: `hidden sm:block`.
  text: css({ display: { base: "none", [breakpoint.sm]: "block" } }),
  // `cn-rtl-flip`: the chevrons point the other way in a right-to-left page.
  flip: css({ rotate: { ":dir(rtl)": "180deg" } }),
  // cn-pagination-ellipsis
  ellipsis: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ellipsisSize,
    height: ellipsisSize,
    [select.descendant("svg")]: {
      width: { base: space[4], [mira]: space["3.5"] },
      height: { base: space[4], [mira]: space["3.5"] },
    },
  }),
}
