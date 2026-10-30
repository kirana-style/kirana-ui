/**
 * NavigationMenu, in every style: shadcn/ui's `bases/base/ui/navigation-menu.tsx` with the
 * `cn-navigation-menu-*` rules of its style files (MIT). Nova is the base look; the other styles
 * override what differs. React Aria has no navigation menu, so this is Base UI's alone.
 *
 * Upstream's style rules sit in a layer under Tailwind's utilities, so where the component's own
 * classes set a property they win in every style: the trigger is `h-9`, the popup and its panels
 * move over `0.35s`. Its rules for Radix's attributes (`data-motion`, `data-state`,
 * `group-data-[viewport=false]`) never match Base UI's parts and are left out, as is
 * `cn-navigation-menu-viewport`, which Base UI's markup does not use.
 *
 * Different from upstream: a link's active colour is Nova's and Lyra's alone. The other styles key it
 * on `data-[active=true]`, which Base UI's empty `data-active` never matches, so they draw none.
 */
import { css, relation } from "@kirana-style/core"
import * as State from "@kirana-style/states/base-ui"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
  spacing,
  zIndex,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons, focusRing, laterRings } from "./control"
import { ringAndShadow } from "./menu.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const Nav = State.NavigationMenu

/** A panel, read by the links inside it (`in-data-[slot=navigation-menu-content]:`). */
export const navigationMenuContentScope = relation("navigation-menu-content")

/** A trigger, read by its chevron (`group-data-popup-open/navigation-menu-trigger:`). */
export const navigationMenuTriggerScope = relation("navigation-menu-trigger")

/** How the popup, its panels and its place move: `duration-[0.35s]` on a settling curve. */
const MORPH = {
  transitionDuration: "0.35s",
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const

/** `transition-all`. */
const ALL = {
  transitionProperty: "all",
  transitionDuration: duration[150],
  transitionTimingFunction: easing.inOut,
} as const

/** `focus-visible:ring-3 ring-ring/50`, `/30` in the later styles. */
const FOCUS = {
  ":focus-visible": focusRing(alpha.ring50, laterRings(alpha.ring30)),
}

/** No ring, in every style that draws its own. */
const NO_RING = {
  base: "none",
  [lyra]: "none",
  [mira]: "none",
  [luma]: "none",
  [rhea]: "none",
  [sera]: "none",
}

/** What the trigger's look gives a link it is laid on (`navigationMenuTriggerStyle()`). */
const TRIGGER_BOX = {
  display: "inline-flex",
  height: space[9],
  width: "max-content",
  alignItems: "center",
  justifyContent: "center",
  outlineStyle: "none",
  fontWeight: fontWeight.medium,
  pointerEvents: { ":disabled": "none" },
  opacity: { ":disabled": 0.5 },
  // `data-popup-open:bg-muted/50`, full again while hovered or focused.
  backgroundColor: {
    ":hover": theme.muted,
    ":focus": theme.muted,
    [Nav.Trigger.popupOpen]: {
      base: alpha.muted50,
      ":hover": theme.muted,
      ":focus": theme.muted,
    },
  },
} as const

export const navigationMenu = {
  // cn-navigation-menu and the component's own classes.
  root: css({
    position: "relative",
    display: "flex",
    maxWidth: "max-content",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }),

  // cn-navigation-menu-list and the component's own classes.
  list: css({
    display: "flex",
    flex: 1,
    listStyleType: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
  }),

  // cn-navigation-menu-item
  item: css({ position: "relative" }),

  // cn-navigation-menu-trigger and the component's own classes.
  trigger: css(navigationMenuTriggerScope.anchor, {
    ...TRIGGER_BOX,
    ...ALL,
    boxShadow: FOCUS,
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["2xl"],
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    paddingInline: {
      base: space["2.5"],
      [vega]: space[4],
      [maia]: spacing(4.5),
      [luma]: spacing(4.5),
      [sera]: spacing(4.5),
    },
    paddingBlock: {
      base: space["1.5"],
      [vega]: space[2],
      [maia]: space["2.5"],
      [luma]: space["2.5"],
      [sera]: space["2.5"],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),

  // The trigger's look for a link in the bar, laid over the link's own (`navigationMenuTriggerStyle`):
  // upstream's link rule follows the trigger's, so the link keeps its padding, corners and text,
  // and takes the trigger's box, weight and open colour.
  triggerLook: css(TRIGGER_BOX),

  // cn-navigation-menu-trigger-icon: turned over while its menu is open.
  triggerIcon: css({
    position: "relative",
    top: "1px",
    marginInlineStart: space[1],
    width: space[3],
    height: space[3],
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.inOut,
    rotate: {
      [navigationMenuTriggerScope.within(Nav.Trigger.popupOpen)]: "180deg",
    },
  }),

  // cn-navigation-menu-content and the component's own classes: a panel fades, and slides in from
  // the side of the trigger that was open before.
  content: css(navigationMenuContentScope.anchor, {
    height: "100%",
    width: "auto",
    ...MORPH,
    transitionProperty: "opacity, transform, translate",
    opacity: {
      base: 1,
      [Nav.Content.startingStyle]: 0,
      [Nav.Content.endingStyle]: 0,
    },
    translate: {
      base: "0",
      [Nav.Content.startingStyle]: {
        base: "0",
        [Nav.Content.activationDirection.left]: "-50% 0",
        [Nav.Content.activationDirection.right]: "50% 0",
      },
      [Nav.Content.endingStyle]: {
        base: "0",
        [Nav.Content.activationDirection.left]: "50% 0",
        [Nav.Content.activationDirection.right]: "-50% 0",
      },
    },
    padding: {
      base: space[1],
      [vega]: space[2],
      [maia]: space["2.5"],
      [mira]: space["1.5"],
      [luma]: space["2.5"],
      [rhea]: space["1.5"],
      [sera]: space["2.5"],
    },
    paddingInlineEnd: {
      [vega]: space["2.5"],
      [maia]: space[3],
      [luma]: space[3],
      [sera]: space[3],
    },
    isolation: { [maia]: "isolate" },
    zIndex: { [maia]: zIndex.popover },
  }),

  // cn-navigation-menu-positioner and the component's own classes: it follows the open trigger.
  positioner: css({
    isolation: "isolate",
    zIndex: zIndex.popover,
    height: "var(--positioner-height)",
    width: "var(--positioner-width)",
    maxWidth: "var(--available-width)",
    ...MORPH,
    transitionProperty: {
      base: "top, left, right, bottom",
      [Nav.Positioner.instant]: "none",
    },
  }),

  // cn-navigation-menu-popup and the component's own classes: it grows and shrinks to the panel.
  popup: css({
    position: "relative",
    height: "var(--popup-height)",
    width: "var(--popup-width)",
    transformOrigin: "var(--transform-origin)",
    outlineStyle: "none",
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    ...MORPH,
    transitionProperty: "opacity, transform, width, height, scale, translate",
    opacity: {
      base: 1,
      [Nav.Popup.startingStyle]: 0,
      [Nav.Popup.endingStyle]: 0,
    },
    scale: {
      base: 1,
      [Nav.Popup.startingStyle]: 0.9,
      [Nav.Popup.endingStyle]: 0.9,
    },
    borderRadius: {
      base: radius.lg,
      [lyra]: "0",
      [maia]: radius["2xl"],
      [mira]: radius.xl,
      [luma]: radius["3xl"],
      [rhea]: radius["3xl"],
      [sera]: "0",
    },
    boxShadow: {
      base: ringAndShadow(alpha.foreground10, shadow.sm),
      [maia]: ringAndShadow(alpha.foreground5, shadow.sm),
      [luma]: ringAndShadow(surface.ringSoft, shadow.lg),
      [rhea]: ringAndShadow(surface.ringSoft, shadow.lg),
      [sera]: ringAndShadow(alpha.foreground10, shadow.md),
    },
  }),

  // The viewport the panels are shown in.
  viewport: css({
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  }),

  // cn-navigation-menu-link
  link: css({
    display: "flex",
    alignItems: "center",
    outlineStyle: "none",
    ...ALL,
    // `[&_svg:not([class*='size-'])]:size-4`: the link's icons (`controlIcons`).
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [sera]: "0.875rem" },
    gap: {
      base: space[2],
      [vega]: space["1.5"],
      [maia]: space["1.5"],
      [mira]: space["1.5"],
      [luma]: space["1.5"],
      [sera]: space["1.5"],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    // Rhea's links in the bar are medium, `px-2.5 py-1.5`; in a panel, plain, `p-2` and full width.
    fontWeight: {
      [rhea]: {
        base: fontWeight.medium,
        [navigationMenuContentScope.within()]: fontWeight.normal,
      },
    },
    width: { [rhea]: { [navigationMenuContentScope.within()]: "100%" } },
    paddingInline: {
      base: space[2],
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: {
        base: space["2.5"],
        [navigationMenuContentScope.within()]: space[2],
      },
      [sera]: space[3],
    },
    paddingBlock: {
      base: space[2],
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: {
        base: space["1.5"],
        [navigationMenuContentScope.within()]: space[2],
      },
      [sera]: space[3],
    },
    // Rounder in the bar than in a panel.
    borderRadius: {
      [nova]: {
        base: radius.lg,
        [navigationMenuContentScope.within()]: radius.md,
      },
      [vega]: {
        base: radius.md,
        [navigationMenuContentScope.within()]: radius.sm,
      },
      [lyra]: "0",
      [maia]: {
        base: radius["2xl"],
        [navigationMenuContentScope.within()]: radius.xl,
      },
      [mira]: {
        base: radius.lg,
        [navigationMenuContentScope.within()]: radius.md,
      },
      [luma]: {
        base: radius["3xl"],
        [navigationMenuContentScope.within()]: radius["2xl"],
      },
      [rhea]: {
        base: radius["2xl"],
        [navigationMenuContentScope.within()]: radius.xl,
      },
      [sera]: "0",
    },
    backgroundColor: {
      ":hover": theme.muted,
      ":focus": theme.muted,
      [nova]: {
        [Nav.Link.active]: {
          base: alpha.muted50,
          ":hover": theme.muted,
          ":focus": theme.muted,
        },
      },
      [lyra]: {
        [Nav.Link.active]: {
          base: alpha.muted50,
          ":hover": theme.muted,
          ":focus": theme.muted,
        },
      },
    },
    // A panel's links draw no ring (`**:data-[slot=navigation-menu-link]:focus:ring-0`), in every
    // style: each style's ring is restated under the panel, so the panel's wins.
    boxShadow: {
      ...FOCUS,
      [navigationMenuContentScope.within()]: { ":focus-visible": NO_RING },
    },
  }),

  // cn-navigation-menu-indicator (whose rules read Radix's `data-state`, never set by Base UI) and
  // the component's own classes: a small arrow under the open trigger.
  indicator: css({
    top: "100%",
    zIndex: 1,
    display: "flex",
    height: space["1.5"],
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
  }),

  // cn-navigation-menu-indicator-arrow and the component's own classes.
  arrow: css({
    position: "relative",
    top: "60%",
    width: space[2],
    height: space[2],
    rotate: "45deg",
    borderStartStartRadius: { base: radius.sm, [lyra]: "0", [sera]: "0" },
    backgroundColor: theme.border,
    boxShadow: shadow.md,
  }),
}
