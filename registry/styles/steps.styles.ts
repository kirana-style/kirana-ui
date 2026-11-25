/**
 * Steps, in every style: a task taken in steps, on Kirana UI Primitives' Steps. Its marks and lines
 * are drawn from the theme's tokens, so they follow the design; its text follows each style's size
 * as Tabs' and Combobox's text does.
 *
 * Each part carries its own orientation (`data-orientation`), so each reads it on itself. The list
 * resets a counter that each item steps: an indicator given nothing to draw shows its step's
 * number from it, and the part draws a check in its place once the step is done. An indicator is
 * the current step's in the primary colour (an outline, as Pagination's current page), filled once
 * done, muted while to come; the line after a step takes the primary colour once that step is done.
 *
 * Its own sizes, the same in every style: the round mark (`size-6`, `text-xs`), the gaps between a
 * mark, its text and its line (`gap-2`), a line's least length (`min-w-4` across, `min-h-6` down).
 * A step's content is hidden by the primitive (`hidden`), so no part here sets its `display`.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../core/scales"
import { stepsState, when } from "../core/states"
import { alpha, radius, theme } from "../core/tokens"
import { controlIcons } from "./control"

const { lyra, mira } = axes.style

/** An item, read by its separator: the last one draws none. */
export const stepsItemScope = relation("steps-item")
/** A trigger, read by its indicator: beside a description it spans the title's and its rows. */
export const stepsTriggerScope = relation("steps-trigger")

/** In a trigger that holds a description. */
const BESIDE_DESCRIPTION = stepsTriggerScope.parent(
  ':has([data-slot="steps-description"])'
)
/**
 * A done step's mark, read off its trigger: the indicator's own `data-complete` and
 * `data-incomplete` would tie, since no configuration says yet that they never meet.
 */
const DONE = stepsTriggerScope.parent(stepsState.trigger.complete.kirana)

/** The counter the list resets and each item steps: an indicator's number. */
const COUNTER = "steps-item"
/** The mark's size. */
const MARK = space[6]

/** The text of a step, as each style sizes body text. */
const TEXT_SIZE = {
  base: fontSize.sm,
  [lyra]: fontSize.xs,
  [mira]: fontSize.xs,
}
const TEXT_LEADING = {
  base: lineHeight.sm,
  [lyra]: lineHeight.xs,
  [mira]: leading.relaxed,
}

const COLOURS = {
  transitionProperty: "color, background-color, border-color, box-shadow",
  transitionDuration: duration[150],
  transitionTimingFunction: easing.inOut,
}

export const steps = {
  // A column across (the list above the content), a row down (the list beside it).
  root: css({
    display: "flex",
    flexDirection: {
      ...when(stepsState.root.orientation.horizontal, "column"),
      ...when(stepsState.root.orientation.vertical, "row"),
    },
    gap: space[6],
    width: "100%",
  }),

  list: css({
    display: "flex",
    flexDirection: {
      ...when(stepsState.list.orientation.horizontal, "row"),
      ...when(stepsState.list.orientation.vertical, "column"),
    },
    alignItems: { ...when(stepsState.list.orientation.horizontal, "center") },
    gap: space[2],
    flexShrink: 0,
    counterReset: COUNTER,
  }),

  // Across, each item but the last fills the room to the next with its line.
  item: css(stepsItemScope.anchor, {
    display: "flex",
    flexDirection: {
      ...when(stepsState.item.orientation.horizontal, "row"),
      ...when(stepsState.item.orientation.vertical, "column"),
    },
    alignItems: {
      ...when(stepsState.item.orientation.horizontal, "center"),
      ...when(stepsState.item.orientation.vertical, "flex-start"),
    },
    flex: {
      ...when(stepsState.item.orientation.horizontal, {
        base: "1 1 0%",
        ":last-child": "none",
      }),
    },
    gap: space[2],
    minWidth: 0,
    counterIncrement: COUNTER,
  }),

  // The mark in the first column, the title and description in the second.
  trigger: css(stepsTriggerScope.anchor, {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, auto)",
    columnGap: space[2],
    alignItems: "center",
    flexShrink: 0,
    textAlign: "start",
    borderRadius: radius.md,
    outlineStyle: "none",
    boxShadow: { ":focus-visible": `0 0 0 3px ${alpha.ring50}` },
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
    fontWeight: fontWeight.medium,
    color: {
      base: theme.foreground,
      ...when(stepsState.trigger.incomplete, theme.mutedForeground),
    },
    cursor: { ...when(stepsState.trigger.disabled, "not-allowed") },
    ...COLOURS,
  }),

  indicator: css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    gridRow: { [BESIDE_DESCRIPTION]: "span 2" },
    alignSelf: { [BESIDE_DESCRIPTION]: "start" },
    width: MARK,
    height: MARK,
    borderRadius: radius.full,
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
    ...controlIcons,
    [ctx.iconSize]: space["3.5"],
    // The current step's look is the base: a step is current, done or to come.
    color: {
      base: theme.primary,
      [DONE]: theme.primaryForeground,
      ...when(stepsState.indicator.incomplete, theme.mutedForeground),
    },
    backgroundColor: {
      base: theme.background,
      [DONE]: theme.primary,
      ...when(stepsState.indicator.incomplete, theme.muted),
    },
    borderColor: {
      base: theme.primary,
      ...when(stepsState.indicator.incomplete, "transparent"),
    },
    ...COLOURS,
    // Its step's number, while it is given nothing else to draw.
    "::before": { content: { ":empty": `counter(${COUNTER})` } },
  }),

  // A line to the next step: across, it fills the item; down, it hangs under the mark's centre.
  separator: css({
    display: { [stepsItemScope.within(":last-child")]: "none" },
    flexShrink: 0,
    flexGrow: { ...when(stepsState.separator.orientation.horizontal, 1) },
    height: {
      ...when(stepsState.separator.orientation.horizontal, "1px"),
    },
    minWidth: {
      ...when(stepsState.separator.orientation.horizontal, space[4]),
    },
    width: { ...when(stepsState.separator.orientation.vertical, "1px") },
    minHeight: {
      ...when(stepsState.separator.orientation.vertical, space[6]),
    },
    marginInlineStart: {
      ...when(
        stepsState.separator.orientation.vertical,
        `calc(${MARK} / 2 - 0.5px)`
      ),
    },
    backgroundColor: {
      base: theme.border,
      ...when(stepsState.separator.complete, theme.primary),
    },
    transitionProperty: "background-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // What a step shows, and what is shown once every step is done.
  content: css({
    flex: 1,
    minWidth: 0,
    outlineStyle: "none",
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
  }),

  title: css({
    display: "block",
    gridColumn: 2,
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
    fontWeight: fontWeight.medium,
  }),

  description: css({
    display: "block",
    gridColumn: 2,
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.normal,
  }),
}
