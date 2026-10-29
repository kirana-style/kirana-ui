/**
 * Calendar, in every style: shadcn/ui's `bases/base/ui/calendar.tsx` (react-day-picker) and
 * `bases/aria/ui/calendar.tsx` (React Aria's Calendar) with the `cn-calendar*` rules of its style
 * files (MIT). Nova is the base look; each style sets the cell's size and corners (`calendarCtx`),
 * the padding and its dropdowns' frame.
 *
 * react-day-picker takes class names, so its markup passes these handles' classes for each part
 * and each day's modifiers; React Aria's applies the same handles from its cells' render props. A
 * day's button reads its cell through `calendarDayScope`: the cell is the `td` on Base UI, React
 * Aria's cell element (a `td`'s child) on React Aria.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { calendarCtx } from "../core/context"
import {
  breakpoint,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A day's cell, read by its button (`group/day`). */
export const calendarDayScope = relation("calendar-day")

const FOCUSED = calendarDayScope.within('[data-focused="true"]')
/**
 * A selected cell at a row's end: on Base UI the `td`, on React Aria its child (`:not(td)`, or the
 * React Aria read would match a Base UI cell in the month's last row).
 */
const SELECTED_LAST = calendarDayScope.within(
  ':last-child[data-selected="true"]'
)
const SELECTED_LAST_ARIA = calendarDayScope.within(
  ':not(td):is(:last-child > [data-selected="true"])'
)
const SELECTED_FIRST = calendarDayScope.within(
  ':first-child[data-selected="true"]'
)
const SELECTED_FIRST_ARIA = calendarDayScope.within(
  ':not(td):is(:first-child > [data-selected="true"])'
)
/** With week numbers, a row's first day is its second cell. */
const SELECTED_SECOND = calendarDayScope.within(
  ':nth-child(2)[data-selected="true"]'
)
const SELECTED_SECOND_ARIA = calendarDayScope.within(
  ':not(td):is(:nth-child(2) > [data-selected="true"])'
)

/** Inside a card's content or a popover, the calendar drops its own background. */
const IN_CARD = ':is([data-slot="card-content"] *)'
const IN_POPOVER = ':is([data-slot="popover-content"] *)'

/** `rounded-r-(--cell-radius)` where `when` holds, and `rounded-l-` likewise. */
const rightCorners = <When>(when: When) => ({
  borderTopRightRadius: when,
  borderBottomRightRadius: when,
})
const leftCorners = <When>(when: When) => ({
  borderTopLeftRadius: when,
  borderBottomLeftRadius: when,
})

/**
 * A row's end rounds a selected run, over a range's square middle: upstream's
 * `[&:last-child[data-selected=true]_button]:` outranks `data-[range-middle=true]:`, so the reads
 * are restated inside the middle's condition (an attribute outranks a relation).
 */
const rowEnd = <Reads>(reads: Reads) => ({
  ...reads,
  '[data-range-middle="true"]': reads,
})

/** A range's end bleeds into the cell beside it (`after:w-4 after:bg-muted`). */
const bleed = (side: "left" | "right") =>
  ({
    position: "relative",
    isolation: "isolate",
    zIndex: 0,
    backgroundColor: theme.muted,
    "::after": {
      content: "''",
      position: "absolute",
      top: "0",
      bottom: "0",
      [side === "left" ? "right" : "left"]: "0",
      width: space[4],
      backgroundColor: theme.muted,
    },
  }) as const

export const calendar = {
  // cn-calendar
  root: css({
    width: "fit-content",
    backgroundColor: {
      base: theme.background,
      [IN_CARD]: "transparent",
      [IN_POPOVER]: "transparent",
    },
    padding: {
      base: space[2],
      [vega]: space[3],
      [maia]: space[3],
      [mira]: space[3],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    [calendarCtx.cellSize]: {
      base: space[7],
      [vega]: space[8],
      [maia]: space[8],
      [mira]: space[6],
      [luma]: space[8],
      [rhea]: space[8],
      [sera]: space[8],
    },
    [calendarCtx.cellRadius]: {
      base: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [luma]: radius["4xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
  }),
  months: css({
    position: "relative",
    display: "flex",
    flexDirection: { base: "column", [breakpoint.md]: "row" },
    gap: space[4],
  }),
  month: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[4],
  }),
  nav: css({
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[1],
  }),
  // `size-(--cell-size) p-0 select-none aria-disabled:opacity-50`, over a Button.
  navButton: css({
    width: { "*": null, base: calendarCtx.cellSize },
    height: { "*": null, base: calendarCtx.cellSize },
    paddingTop: { "*": null, base: "0" },
    paddingBottom: { "*": null, base: "0" },
    paddingInlineStart: { "*": null, base: "0" },
    paddingInlineEnd: { "*": null, base: "0" },
    userSelect: "none",
    opacity: { '[aria-disabled="true"]': 0.5 },
  }),
  // `cn-rtl-flip size-4`
  chevron: css({
    width: space[4],
    height: space[4],
    rotate: { ":dir(rtl)": "180deg" },
  }),
  // The dropdown's caret: its `size-4`, which the caption label's `[&>svg]:size-3.5` outranks.
  chevronDown: css({ width: spacing(3.5), height: spacing(3.5) }),
  monthCaption: css({
    display: "flex",
    height: calendarCtx.cellSize,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: calendarCtx.cellSize,
  }),
  // React Aria's caption holds both dropdowns: `gap-1`.
  monthCaptionAria: css({ gap: space[1] }),
  dropdowns: css({
    display: "flex",
    height: calendarCtx.cellSize,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing(1.5),
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  // cn-calendar-dropdown-root
  dropdownRoot: css({
    position: "relative",
    borderRadius: { base: calendarCtx.cellRadius, [lyra]: "0", [sera]: "0" },
    borderWidth: "1px",
    borderColor: {
      base: theme.input,
      [rhea]: "transparent",
      ":has(:focus)": theme.ring,
    },
    boxShadow: {
      [vega]: shadow.xs,
      ":has(:focus)": {
        base: `0 0 0 3px ${alpha.ring50}`,
        [vega]: `0 0 0 3px ${alpha.ring50}, ${shadow.xs}`,
        [lyra]: `0 0 0 1px ${alpha.ring50}`,
        [mira]: `0 0 0 2px ${alpha.ring30}`,
        [luma]: `0 0 0 3px ${alpha.ring30}`,
        [rhea]: `0 0 0 3px ${alpha.ring30}`,
        [sera]: `0 0 0 2px ${alpha.ring30}`,
      },
    },
  }),
  // The real select, invisible over the label.
  dropdown: css({
    position: "absolute",
    inset: "0",
    backgroundColor: theme.popover,
    opacity: 0,
  }),
  // cn-calendar-caption: the month's name.
  caption: css({
    // Sera's hook sets `text-xs font-semibold` too, which the part's own `text-sm font-medium`
    // outrank: only its case and tracking reach it.
    fontWeight: fontWeight.medium,
    userSelect: "none",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wide },
  }),
  // cn-calendar-caption-label: the dropdown's face.
  captionLabel: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    borderRadius: { base: calendarCtx.cellRadius, [lyra]: "0" },
    // Sera's hook sets `text-xs font-semibold` too, which the part's own `text-sm font-medium`
    // outrank: only its case and tracking reach it.
    fontWeight: fontWeight.medium,
    userSelect: "none",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wide },
    height: {
      base: space[6],
      [vega]: space[8],
      [maia]: space[8],
      [mira]: space[7],
      [luma]: space[8],
      [rhea]: space[8],
      [sera]: space[8],
    },
    paddingRight: {
      base: space[1],
      [maia]: space[2],
      [mira]: spacing(1.5),
      [luma]: space[2],
      [rhea]: space[2],
      [sera]: space[2],
    },
    paddingLeft: {
      base: spacing(1.5),
      [vega]: space[2],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    backgroundColor: { [mira]: surface.controlSoft },
    [select.child("svg")]: {
      width: spacing(3.5),
      height: spacing(3.5),
      color: theme.mutedForeground,
    },
  }),
  monthGrid: css({ width: "100%", borderCollapse: "collapse" }),
  weekdays: css({ display: "flex" }),
  weekday: css({
    flex: "1 1 0%",
    borderRadius: calendarCtx.cellRadius,
    fontSize: "0.8rem",
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
    userSelect: "none",
  }),
  week: css({ marginTop: space[2], display: "flex", width: "100%" }),
  weekNumberHeader: css({ width: calendarCtx.cellSize, userSelect: "none" }),
  weekNumber: css({
    fontSize: "0.8rem",
    color: theme.mutedForeground,
    userSelect: "none",
  }),
  weekNumberCell: css({
    display: "flex",
    width: calendarCtx.cellSize,
    height: calendarCtx.cellSize,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }),
  // A day's cell (`group/day`).
  day: css(calendarDayScope.anchor, {
    position: "relative",
    aspectRatio: "1 / 1",
    height: "100%",
    width: "100%",
    borderRadius: calendarCtx.cellRadius,
    padding: "0",
    textAlign: "center",
    userSelect: "none",
  }),
  // React Aria's cell takes the week's `mt-2` and its pointer.
  dayAria: css({ marginTop: space[2], cursor: "default" }),
  rangeStart: css({
    ...bleed("left"),
    ...leftCorners({ base: calendarCtx.cellRadius }),
  }),
  rangeMiddle: css({ borderRadius: "0" }),
  rangeEnd: css({
    ...bleed("right"),
    ...rightCorners({ base: calendarCtx.cellRadius }),
  }),
  today: css({
    borderRadius: {
      base: calendarCtx.cellRadius,
      '[data-selected="true"]': "0",
    },
    backgroundColor: theme.muted,
    color: theme.foreground,
  }),
  outside: css({ color: theme.mutedForeground }),
  disabled: css({ color: theme.mutedForeground, opacity: 0.5 }),
  // React Aria's unavailable day: dimmed and struck through.
  unavailable: css({
    color: theme.mutedForeground,
    opacity: 0.5,
    [select.child("div")]: { textDecorationLine: "line-through" },
  }),
  hidden: css({ visibility: "hidden" }),
  // cn-calendar-day-button: a ghost icon Button filling its cell.
  dayButton: css({
    position: "relative",
    isolation: "isolate",
    zIndex: 10,
    display: "flex",
    aspectRatio: "1 / 1",
    width: { "*": null, base: "100%" },
    height: { "*": null, base: "auto" },
    minWidth: calendarCtx.cellSize,
    flexDirection: "column",
    gap: space[1],
    borderWidth: "0",
    lineHeight: { "*": null, base: "1" },
    fontWeight: { "*": null, base: fontWeight.normal },
    borderColor: { [FOCUSED]: theme.ring },
    boxShadow: { [FOCUSED]: `0 0 0 3px ${alpha.ring50}` },
    backgroundColor: {
      '[data-selected-single="true"]': theme.primary,
      '[data-range-start="true"]': theme.primary,
      '[data-range-end="true"]': theme.primary,
      '[data-range-middle="true"]': theme.muted,
    },
    color: {
      '[data-selected-single="true"]': theme.primaryForeground,
      '[data-range-start="true"]': theme.primaryForeground,
      '[data-range-end="true"]': theme.primaryForeground,
      '[data-range-middle="true"]': theme.foreground,
    },
    borderRadius: {
      '[data-range-middle="true"]': "0",
      '[data-range-start="true"]': calendarCtx.cellRadius,
      '[data-range-end="true"]': calendarCtx.cellRadius,
    },
    // A selected run rounds where a week's row starts or ends, over the middle's square corners.
    ...rightCorners(
      rowEnd({
        [SELECTED_LAST]: calendarCtx.cellRadius,
        [SELECTED_LAST_ARIA]: calendarCtx.cellRadius,
      })
    ),
    [select.child("span")]: {
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      opacity: 0.7,
    },
  }),
  // The row's first day: its first cell, or its second beside week numbers.
  dayButtonFirst: css(
    leftCorners(
      rowEnd({
        [SELECTED_FIRST]: calendarCtx.cellRadius,
        [SELECTED_FIRST_ARIA]: calendarCtx.cellRadius,
      })
    )
  ),
  dayButtonSecond: css(
    leftCorners(
      rowEnd({
        [SELECTED_SECOND]: calendarCtx.cellRadius,
        [SELECTED_SECOND_ARIA]: calendarCtx.cellRadius,
      })
    )
  ),
}
