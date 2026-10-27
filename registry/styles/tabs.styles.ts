/**
 * Tabs, in every style: shadcn/ui's `bases/base/ui/tabs.tsx` and `bases/aria/ui/tabs.tsx` with the
 * `cn-tabs-*` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; the other
 * styles override what differs.
 *
 * The root anchors `tabsScope` and the list `tabsList`, which a trigger reads for the orientation
 * (`group-data-vertical/tabs:`) and the list's variant (`group-data-[variant=line]/tabs-list:`).
 * Every base writes `data-orientation` on the root, with the same values (`tabOrientation`); the chosen tab is Base UI's
 * `data-active`, React Aria's and Ark UI's `data-selected` (`tab` in `core/states.ts`). A line list
 * marks its chosen tab with a bar drawn in the trigger's `::after`.
 *
 * Different from upstream on purpose: `transition-all` is written as the properties that move.
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
  letterSpacing,
  lineHeight,
  shadow,
  space,
} from "../core/scales"
import { tab, tabOrientation, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons } from "./control"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The tabs, read by the list and the triggers for their orientation (`group/tabs`). */
export const tabsScope = relation("tabs")
/** The list, read by its triggers for its variant (`group/tabs-list`). */
export const tabsList = relation("tabs-list")

/** Inside a horizontal or vertical Tabs, under each base's key. */
const IN_HORIZONTAL = {
  base: tabsScope.within(tabOrientation.horizontal.base),
  aria: tabsScope.within(tabOrientation.horizontal.aria),
  ark: tabsScope.within(tabOrientation.horizontal.ark),
}
const IN_VERTICAL = {
  base: tabsScope.within(tabOrientation.vertical.base),
  aria: tabsScope.within(tabOrientation.vertical.aria),
  ark: tabsScope.within(tabOrientation.vertical.ark),
}
const IN_DEFAULT_LIST = tabsList.within('[data-variant="default"]')
const IN_LINE_LIST = tabsList.within('[data-variant="line"]')

/** The component's focus ring: `focus-visible:ring-[3px] ring-ring/50`, in every style. */
const RING = `0 0 0 3px ${alpha.ring50}`
/** Nova's and Vega's chosen tab is raised in a default list (`data-active:shadow-sm`). */
const RAISED = {
  ...when(tab.active, shadow.sm),
  ":focus-visible": {
    base: RING,
    ...when(tab.active, `${RING}, ${shadow.sm}`),
  },
}

export const tabs = {
  // cn-tabs and the component's own classes: a column when horizontal, the list above the panels.
  root: css(tabsScope.anchor, {
    display: "flex",
    flexDirection: { ...when(tabOrientation.horizontal, "column") },
    gap: space[2],
  }),

  // cn-tabs-list and the component's own classes, either variant.
  list: css(tabsList.anchor, {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    color: theme.mutedForeground,
    padding: {
      base: "3px",
      [luma]: space[1],
      [rhea]: { base: "3px", ...when(IN_VERTICAL, space[1]) },
      [sera]: space[1],
    },
    // `group-data-horizontal/tabs:h-*`, `group-data-vertical/tabs:h-fit`. Every tabs root carries
    // its orientation, so the height is the plain value; a vertical list's `h-fit` is restated
    // under each style that sets one, so it wins in tabs nested in tabs, where both reads hold.
    height: {
      base: space[8],
      [vega]: { base: space[9], ...when(IN_VERTICAL, "fit-content") },
      [maia]: { base: space[9], ...when(IN_VERTICAL, "fit-content") },
      [luma]: { base: space[9], ...when(IN_VERTICAL, "fit-content") },
      [sera]: { base: space[10], ...when(IN_VERTICAL, "fit-content") },
      ...when(IN_VERTICAL, "fit-content"),
    },
    flexDirection: { ...when(IN_VERTICAL, "column") },
  }),

  // cn-tabs-list-variant-default: a filled track with rounded ends. Sera's has no corners.
  listDefault: css({
    backgroundColor: theme.muted,
    borderRadius: {
      [nova]: radius.lg,
      [vega]: radius.lg,
      [lyra]: "0",
      [maia]: { base: radius["4xl"], ...when(IN_VERTICAL, radius["2xl"]) },
      [mira]: radius.lg,
      [luma]: { base: radius.full, ...when(IN_VERTICAL, radius["2xl"]) },
      [rhea]: radius["2xl"],
    },
  }),

  // cn-tabs-list-variant-line: no track, the chosen tab underlined.
  listLine: css({ gap: space[1], backgroundColor: "transparent" }),

  // cn-tabs-trigger (and cn-tabs-trigger-aria) and the component's own classes.
  trigger: css({
    position: "relative",
    display: "inline-flex",
    height: "calc(100% - 1px)",
    flex: 1,
    alignItems: "center",
    justifyContent: { base: "center", ...when(IN_VERTICAL, "flex-start") },
    width: { ...when(IN_VERTICAL, "100%") },
    whiteSpace: "nowrap",
    cursor: "default",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineWidth: { ":focus-visible": "1px" },
    outlineColor: { ":focus-visible": theme.ring },
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    pointerEvents: { ...when(tab.disabled, "none"), ":disabled": "none" },
    opacity: { ...when(tab.disabled, 0.5), ":disabled": 0.5 },
    ...controlIcons,
    // Mira's and Sera's icons are `size-3.5`.
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },

    color: {
      base: surface.tabText,
      ":hover": theme.foreground,
      ...when(tab.active, theme.foreground),
    },
    gap: { base: space["1.5"], [luma]: space[2], [sera]: space[2] },
    // Sera's tabs have no corners of their own.
    borderRadius: {
      [nova]: radius.md,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius.xl,
      [mira]: radius.md,
      [luma]: { base: radius.full, ...when(IN_VERTICAL, radius["2xl"]) },
      [rhea]: radius["2xl"],
    },
    borderWidth: "1px",
    borderStyle: "solid",
    // The chosen tab's edge shows in dark, not in a line list; Luma's and Rhea's never show
    // (`border-transparent!`).
    borderColor: {
      base: "transparent",
      ":focus-visible": theme.ring,
      ...when(tab.active, surface.tabActiveBorder),
      [IN_LINE_LIST]: { ...when(tab.active, "transparent") },
      [luma]: {
        base: "transparent",
        ":focus-visible": "transparent",
        ...when(tab.active, "transparent"),
      },
      [rhea]: {
        base: "transparent",
        ":focus-visible": "transparent",
        ...when(tab.active, "transparent"),
      },
    },
    // Chosen: `background` in light, `input/30` in dark; nothing in a line list.
    backgroundColor: {
      ...when(tab.active, surface.outlineBackground),
      [IN_LINE_LIST]: {
        base: "transparent",
        ...when(tab.active, "transparent"),
      },
    },
    boxShadow: {
      ":focus-visible": RING,
      [IN_DEFAULT_LIST]: { [nova]: RAISED, [vega]: RAISED },
    },
    paddingInline: {
      base: space["1.5"],
      [vega]: space[2],
      [maia]: { base: space[2], ...when(IN_VERTICAL, space["2.5"]) },
      [luma]: space[3],
      [rhea]: { base: space["1.5"], ...when(IN_VERTICAL, space[3]) },
      [sera]: space[4],
    },
    paddingBlock: {
      base: space["0.5"],
      [vega]: space[1],
      [lyra]: { base: space["0.5"], ...when(IN_VERTICAL, "0.3125rem") },
      [maia]: { base: space[1], ...when(IN_VERTICAL, space["1.5"]) },
      [mira]: { base: space["0.5"], ...when(IN_VERTICAL, "0.3125rem") },
      [luma]: { base: space[1], ...when(IN_VERTICAL, space["1.5"]) },
      [sera]: { base: space["1.5"], ...when(IN_VERTICAL, space[2]) },
    },
    // `has-data-[icon=inline-*]:p*-*`: a side holding an icon draws in. Rhea's does not.
    paddingInlineEnd: {
      ':has([data-icon="inline-end"])': {
        base: space[1],
        [vega]: space["1.5"],
        [maia]: space["1.5"],
        [luma]: space[2],
        [rhea]: space["1.5"],
        [sera]: space["2.5"],
      },
    },
    paddingInlineStart: {
      ':has([data-icon="inline-start"])': {
        base: space[1],
        [vega]: space["1.5"],
        [maia]: space["1.5"],
        [luma]: space[2],
        [rhea]: space["1.5"],
        [sera]: space["2.5"],
      },
    },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
      [sera]: lineHeight.xs,
    },
    // Sera's tabs are semibold, spaced capitals.
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wider },

    // The line list's bar under the chosen tab, or beside it when vertical.
    "::after": {
      content: "''",
      position: "absolute",
      backgroundColor: theme.foreground,
      opacity: { base: 0, [IN_LINE_LIST]: { ...when(tab.active, 1) } },
      transitionProperty: "opacity",
      transitionDuration: duration[150],
      transitionTimingFunction: easing.inOut,
      left: { ...when(IN_HORIZONTAL, 0) },
      right: {
        ...when(IN_HORIZONTAL, 0),
        ...when(IN_VERTICAL, `calc(${space[1]} * -1)`),
      },
      bottom: { ...when(IN_HORIZONTAL, "-5px"), ...when(IN_VERTICAL, 0) },
      top: { ...when(IN_VERTICAL, 0) },
      height: { ...when(IN_HORIZONTAL, space["0.5"]) },
      width: { ...when(IN_VERTICAL, space["0.5"]) },
    },
  }),

  // cn-tabs-content and the component's own classes.
  content: css({
    flex: 1,
    outlineStyle: "none",
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
  }),
}
