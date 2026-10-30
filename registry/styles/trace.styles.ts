/**
 * Trace, in every style: shadcn/ui's `bases/base/ui/trace.tsx` and `bases/aria/ui/trace.tsx` with
 * the `cn-trace*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs. A trace's lines sit in links, buttons or collapsible triggers; each line marks its
 * status, and a running line's title shimmers (`shimmer.styles.ts`).
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import { collapsiblePanel, when } from "../core/states"
import {
  duration,
  easing,
  fontSize,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"
import { shimmer } from "./shimmer.styles"

const { lyra, maia, mira, luma, rhea, sera } = axes.style

/** A collapsible trigger, read by its chevron (`group/trace-collapsible-trigger`). */
export const traceTriggerScope = relation("trace-collapsible-trigger")

/** A line's wrapper: a link, a button or a trigger holding one (`*:has-[>[data-slot=trace-line]]`). */
const LINE_HOLDER = ':has(> [data-slot="trace-line"])'

/** Each style's corners for a pressable line or trigger. */
const CORNERS = {
  base: radius.md,
  [lyra]: "0",
  [maia]: radius.lg,
  [mira]: radius.sm,
  [luma]: radius.lg,
  [rhea]: radius.lg,
  [sera]: "0",
}

/** Each style's focus ring. */
const RING = {
  base: `0 0 0 3px ${alpha.ring50}`,
  [lyra]: `0 0 0 1px ${alpha.ring50}`,
  [mira]: `0 0 0 2px ${alpha.ring30}`,
  [luma]: `0 0 0 3px ${alpha.ring30}`,
  [rhea]: `0 0 0 3px ${alpha.ring30}`,
  [sera]: `0 0 0 2px ${alpha.ring30}`,
}

const COLOURS = {
  transitionProperty: "color, background-color, border-color",
  transitionDuration: duration[150],
  transitionTimingFunction: easing.inOut,
} as const

/** `size-4`, `size-3.5` in Lyra and Mira. */
const ICON = { base: "1rem", [lyra]: "0.875rem", [mira]: "0.875rem" }

export const trace = {
  // cn-trace
  root: css({
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
    gap: {
      base: space[2],
      [maia]: space[3],
      [mira]: spacing(1.5),
      [luma]: space[3],
      [sera]: space[3],
    },
    [select.child(LINE_HOLDER)]: {
      display: "flex",
      width: "fit-content",
      maxWidth: "100%",
      minWidth: "0",
      textAlign: "left",
      outlineStyle: "none",
      borderRadius: CORNERS,
    },
    [select.child(`${LINE_HOLDER}:focus-visible`)]: { boxShadow: RING },
  }),
  // cn-trace-line
  line: css({
    display: "flex",
    width: "fit-content",
    maxWidth: "100%",
    minWidth: "0",
    alignItems: "center",
    gap: space[2],
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    cursor: { ":is(a *, button *)": "pointer" },
    color: {
      base: theme.mutedForeground,
      ":is(a:hover *, button:hover *)": theme.foreground,
      '[data-status="error"]': {
        base: theme.destructive,
        ":is(a:hover *, button:hover *)": theme.destructive,
      },
    },
    opacity: { '[data-status="pending"]': 0.6 },
    ...COLOURS,
    // `data-[status=running]:*:data-[slot=trace-title]:shimmer`
    [select.child('[data-slot="trace-title"]')]: {
      "--spread": { '[data-status="running"]': shimmer["--spread"] },
      "--highlight": { '[data-status="running"]': shimmer["--highlight"] },
      backgroundRepeat: { '[data-status="running"]': shimmer.backgroundRepeat },
      backgroundSize: { '[data-status="running"]': shimmer.backgroundSize },
      backgroundPosition: {
        '[data-status="running"]': shimmer.backgroundPosition,
      },
      backgroundClip: { '[data-status="running"]': shimmer.backgroundClip },
      animation: { '[data-status="running"]': shimmer.animation },
      backgroundImage: { '[data-status="running"]': shimmer.backgroundImage },
      WebkitTextFillColor: {
        '[data-status="running"]': shimmer.WebkitTextFillColor,
      },
    },
  }),
  // cn-trace-icon
  icon: css({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: ICON,
    height: ICON,
    // After a title it draws in: `[[data-slot=trace-title]~&]:-ml-1`.
    marginLeft: {
      ':is([data-slot="trace-title"] ~ *)': `calc(${space[1]} * -1)`,
    },
    [ctx.iconSize]: ICON,
    [select.descendant("svg")]: {
      pointerEvents: "none",
      width: ctx.iconSize,
      height: ctx.iconSize,
    },
  }),
  // The trigger's chevron, turned while it is open.
  chevron: css({
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    rotate: { [traceTriggerScope.within('[aria-expanded="true"]')]: "90deg" },
  }),
  // cn-trace-title
  title: css({
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  // cn-trace-description
  description: css({
    flexShrink: 0,
    color: `color-mix(in oklab, ${theme.mutedForeground} 70%, transparent)`,
    fontVariantNumeric: "tabular-nums",
  }),
  // cn-trace-collapsible
  collapsible: css({
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
  }),
  // cn-trace-collapsible-trigger
  trigger: css(traceTriggerScope.anchor, {
    display: "flex",
    width: "fit-content",
    maxWidth: "100%",
    minWidth: "0",
    cursor: "pointer",
    alignItems: "center",
    gap: space[1],
    textAlign: "left",
    outlineStyle: "none",
    borderRadius: CORNERS,
    boxShadow: { ":focus-visible": RING },
    color: {
      base: theme.mutedForeground,
      ":hover": theme.foreground,
      ':has([data-status="error"])': theme.destructive,
    },
    ...COLOURS,
  }),
  // cn-trace-collapsible-content: Base UI's panel, its height moving over `duration-200`.
  content: css({
    minWidth: "0",
    overflow: "hidden",
    height: {
      base: "var(--collapsible-panel-height)",
      ...when(collapsiblePanel.starting, "0"),
      ...when(collapsiblePanel.ending, "0"),
    },
    transitionProperty: "height",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
  }),
  // React Aria's panel moves its own height.
  contentAria: css({
    minWidth: "0",
    overflow: "clip",
    height: "var(--disclosure-panel-height)",
    transitionProperty: "height",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
  }),
  // cn-trace-collapsible-content-inner: a rule down the side, under the trigger's chevron.
  contentInner: css({
    minWidth: "0",
    overflowWrap: "break-word",
    color: theme.mutedForeground,
    marginTop: {
      base: space[2],
      [maia]: spacing(2.5),
      [mira]: spacing(1.5),
      [luma]: spacing(2.5),
      [sera]: space[3],
    },
    marginBottom: space[1],
    marginLeft: {
      base: `calc(${space[2]} - 1px)`,
      [lyra]: `calc(${spacing(1.75)} - 1px)`,
      [mira]: `calc(${spacing(1.75)} - 1px)`,
    },
    borderLeftWidth: "1px",
    borderLeftColor: theme.border,
    paddingRight: space[1],
    paddingLeft: {
      base: space[4],
      [lyra]: spacing(3.75),
      [mira]: spacing(3.75),
    },
    lineHeight: { base: leading.relaxed, [mira]: "inherit" },
  }),
}
