/**
 * Accordion, in every style: shadcn/ui's `bases/base/ui/accordion.tsx` and
 * `bases/aria/ui/accordion.tsx` with the `cn-accordion*` rules of its style files (MIT). Nova is the
 * base look; the other styles override what differs. Maia, Mira, Luma and Rhea frame the accordion
 * and fill an open item; the others draw only the lines between items.
 *
 * The two bases open a panel differently: Base UI's panel runs `accordion-down` and `accordion-up`
 * over `--accordion-panel-height`, the inner part holding that height; React Aria's panel moves its
 * own height (`--disclosure-panel-height`), so each base's markup takes its own panel handles.
 */
import { css, keyframes, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { accordion as accordionState, when } from "../core/states"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A trigger, read by its two chevrons (`group/accordion-trigger`). */
export const accordionTriggerScope = relation("accordion-trigger")

/** Inside an expanded trigger: `group-aria-expanded/accordion-trigger:`. */
const EXPANDED = accordionTriggerScope.within('[aria-expanded="true"]')

/** `animate-accordion-down` and `-up`: shadcn/ui's keyframes, `0.2s ease-out`. */
const accordionDown = keyframes({
  from: { height: "0" },
  to: { height: "var(--accordion-panel-height, auto)" },
})
const accordionUp = keyframes({
  from: { height: "var(--accordion-panel-height, auto)" },
  to: { height: "0" },
})

/** `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4`. */
const prose = {
  [select.descendant("a")]: {
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
  },
  [select.descendant("a:hover")]: { color: theme.foreground },
  [select.descendant("p:not(:last-child)")]: { marginBottom: space[4] },
}

/** The four framed styles. */
const FRAMED = [maia, mira, luma, rhea] as const

/** `value` under each framed style. */
const framed = <Value>(value: Value) =>
  Object.fromEntries(FRAMED.map((style) => [style, value])) as Record<
    (typeof FRAMED)[number],
    Value
  >

/** One chevron: `**:data-[slot=accordion-trigger-icon]:` from the trigger, and its own classes. */
const chevron = {
  pointerEvents: "none",
  flexShrink: 0,
  marginInlineStart: "auto",
  color: theme.mutedForeground,
  width: { base: space[4], [sera]: space["3.5"] },
  height: { base: space[4], [sera]: space["3.5"] },
} as const

export const accordion = {
  // cn-accordion
  root: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: framed("hidden"),
    borderWidth: framed("1px"),
    borderColor: theme.border,
    borderRadius: {
      [maia]: radius["2xl"],
      [mira]: radius.md,
      [luma]: radius["2xl"],
      [rhea]: radius["2xl"],
    },
  }),
  // cn-accordion-item. Its fill is `data-open:`, which React Aria's item (`data-expanded`) never
  // matches, so only Base UI's open item fills.
  item: css({
    borderBottomWidth: { ":not(:last-child)": "1px" },
    borderColor: theme.border,
    backgroundColor: framed(when(accordionState.open, alpha.muted50)),
  }),
  // The trigger's heading: `flex`.
  header: css({ display: "flex" }),
  // cn-accordion-trigger. Upstream dims a disabled trigger with `aria-disabled:` on Base UI, whose
  // native button is marked `disabled` instead, so it never dims there; kept as upstream draws it.
  trigger: css(accordionTriggerScope.anchor, {
    position: "relative",
    display: "flex",
    flex: "1 1 0%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: { ...framed(space[6]), [sera]: space[6] },
    paddingBlock: {
      base: space["2.5"],
      [vega]: space[4],
      ...framed(space[4]),
      [mira]: space[2],
      [sera]: space[4],
    },
    paddingInline: { ...framed(space[4]), [mira]: space[2] },
    borderWidth: "1px",
    borderColor: {
      base: "transparent",
      ":focus-visible": {
        base: theme.ring,
        ...framed("transparent"),
      },
    },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      ...framed("0"),
      [sera]: "0",
    },
    outlineStyle: "none",
    textAlign: "left",
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textDecorationLine: { ":hover": "underline" },
    transitionProperty: "all",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    boxShadow: {
      ":focus-visible": {
        base: `0 0 0 3px ${alpha.ring50}`,
        [lyra]: `0 0 0 1px ${alpha.ring50}`,
        ...framed("none"),
        [sera]: `0 0 0 2px ${alpha.ring30}`,
      },
    },
    pointerEvents: when(accordionState.triggerDisabled, "none"),
    opacity: when(accordionState.triggerDisabled, 0.5),
  }),
  // cn-accordion-trigger-icon, hidden while the trigger is expanded.
  iconClosed: css({ ...chevron, display: { [EXPANDED]: "none" } }),
  // cn-accordion-trigger-icon, shown only while the trigger is expanded.
  iconOpen: css({
    ...chevron,
    display: { base: "none", [EXPANDED]: "inline" },
  }),
  // cn-accordion-content
  content: css({
    overflow: "hidden",
    paddingInline: { ...framed(space[4]), [mira]: space[2] },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
  // Base UI's panel: `data-open:animate-accordion-down data-closed:animate-accordion-up`.
  contentBase: css({
    animationName: {
      ...when(accordionState.panelOpen, accordionDown),
      ...when(accordionState.panelClosed, accordionUp),
    },
    animationDuration: "0.2s",
    animationTimingFunction: "ease-out",
  }),
  // React Aria's panel: `h-(--disclosure-panel-height) overflow-clip transition-[height]`.
  contentAria: css({
    height: "var(--disclosure-panel-height)",
    overflow: "clip",
    transitionProperty: "height",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),
  // cn-accordion-content-inner
  contentInner: css({
    ...prose,
    paddingTop: "0",
    paddingBottom: {
      base: space["2.5"],
      [vega]: space[4],
      ...framed(space[4]),
      [sera]: space[4],
    },
  }),
  // Base UI's inner part holds the panel's height: `h-(--accordion-panel-height)`.
  contentInnerBase: css({ height: "var(--accordion-panel-height)" }),
}
