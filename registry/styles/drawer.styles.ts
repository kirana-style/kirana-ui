/**
 * Drawer, in every style: shadcn/ui's `bases/base/ui/drawer.tsx`, Base UI's Drawer on both bases
 * (upstream's React Aria copy is the same file), with the `cn-drawer-*` rules of its style files
 * (MIT). Nova is the base look; the other styles override what differs.
 *
 * A drawer is a popup pinned to the edge it is swiped from (`data-swipe-direction`). Base UI hands
 * it its swipe, its snap points and its nested drawers as custom properties, which the popup reads
 * to place itself (`--translate-x`, `--translate-y`), to stack behind a nested one (`--stack-*`)
 * and to leave (`--closed-transform`). Maia, Mira, Luma and Rhea float the popup in from the edge
 * (`--drawer-inset`), rounded all round. The parts read the popup (`drawerScope`, upstream's
 * `group/drawer-popup`): its axis, its direction, a nested drawer open.
 *
 * Different from upstream on purpose:
 * - `supports-backdrop-filter:` is dropped, as Dialog's;
 * - the backdrop's `data-swiping:duration-0`: Base UI's backdrop writes no `data-swiping`.
 */
import { css, relation } from "@kirana-style/core"
import { Drawer } from "@kirana-style/states/base-ui"

import { axes, DARK_SCHEME } from "../core/axes"
import {
  blur,
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  spacing,
  zIndex,
} from "../core/scales"
import { font, radius, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const { Popup, Backdrop } = Drawer

/** The popup, read by its parts. */
export const drawerScope = relation("drawer-popup")

const Y = '[data-swipe-axis="y"]'
const X = '[data-swipe-axis="x"]'
const DOWN = Popup.swipeDirection.down
const UP = Popup.swipeDirection.up
const LEFT = Popup.swipeDirection.left
const RIGHT = Popup.swipeDirection.right
const SNAP = "[data-snap-points]"

const IN_Y = drawerScope.within(Y)

/** The swipe handle, the popup's own child, reads its axis there: one popup, one axis. */
const ON_Y = drawerScope.parent(Y)
const ON_X = drawerScope.parent(X)

/** The popup's open and close: Base UI's swipe strength sets how fast it leaves. */
const SWIPE_DURATION = "calc(var(--drawer-swipe-strength) * 400ms)"

/** `rounded-*-xl` on the side facing the page, by direction; none in Lyra and Sera. */
const CORNER = {
  base: radius.xl,
  [lyra]: "0",
  [sera]: "0",
}

/** Maia's, Mira's, Luma's and Rhea's corners, all round. */
const FLOATING_CORNER = {
  [maia]: radius["4xl"],
  [mira]: radius.xl,
  [luma]: radius["4xl"],
  [rhea]: `min(${radius["4xl"]}, 24px)`,
}

/**
 * A corner facing the page: the direction's attribute outranks a style, so the floating styles'
 * corners are restated under it.
 */
const FACING_CORNER = {
  ...CORNER,
  [maia]: radius["4xl"],
  [mira]: radius.xl,
  [luma]: radius["4xl"],
  [rhea]: `min(${radius["4xl"]}, 24px)`,
}

/** `border-*` on the side facing the page; all round where it floats. */
const edge = (on: string) => ({
  [on]: "1px",
  [maia]: "1px",
  [mira]: "1px",
  [luma]: "1px",
  [rhea]: "1px",
})

export const drawer = {
  // cn-drawer-overlay and the component's own classes: it fades as the drawer is swiped away, to
  // half at a snap point.
  overlay: css({
    position: {
      base: "fixed",
      "@supports (-webkit-touch-callout: none)": "absolute",
    },
    inset: 0,
    zIndex: zIndex.overlay,
    minHeight: "100dvh",
    userSelect: "none",
    "--drawer-overlay-min-opacity": { [SNAP]: "0.5" },
    opacity: {
      base: "max(var(--drawer-overlay-min-opacity, 0), calc(1 - var(--drawer-swipe-progress)))",
      [Backdrop.startingStyle]: 0,
      [Backdrop.endingStyle]: 0,
    },
    pointerEvents: { [Backdrop.endingStyle]: "none" },
    transitionProperty: "opacity",
    transitionDuration: {
      base: "450ms",
      [Backdrop.endingStyle]: SWIPE_DURATION,
    },
    transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
    backgroundColor: {
      base: "rgb(0 0 0 / 0.1)",
      [maia]: "rgb(0 0 0 / 0.8)",
      [mira]: "rgb(0 0 0 / 0.8)",
      [luma]: "rgb(0 0 0 / 0.3)",
      [rhea]: "rgb(0 0 0 / 0.3)",
      [sera]: "rgb(0 0 0 / 0.2)",
    },
    backdropFilter: {
      base: `blur(${blur.xs})`,
      [luma]: `blur(${blur.sm})`,
      [rhea]: `blur(${blur.sm})`,
      [sera]: `blur(${blur.sm})`,
    },
  }),

  // The viewport the popup sits in: it takes the page's pointer only while the drawer is modal.
  viewport: css({
    pointerEvents: { base: "none", '[data-modal="true"]': "auto" },
    position: "fixed",
    inset: 0,
    zIndex: zIndex.popover,
    userSelect: "none",
  }),

  // cn-drawer-popup and the component's own classes.
  popup: css(drawerScope.anchor, {
    pointerEvents: "auto",
    position: "fixed",
    zIndex: zIndex.popover,
    display: "flex",
    flexDirection: { base: "column", [X]: "row" },
    marginTop: "var(--drawer-inset, 0px)",
    marginRight: "var(--drawer-inset, 0px)",
    marginBottom: "var(--drawer-inset, 0px)",
    marginLeft: "var(--drawer-inset, 0px)",
    height: {
      base: "var(--drawer-content-height)",
      [Popup.nestedDrawerOpen]: { [Y]: "var(--stack-height)" },
    },
    maxHeight: "var(--drawer-content-max-height, none)",
    minHeight: 0,
    width: "var(--drawer-content-width, auto)",
    transform:
      "translate3d(var(--translate-x, 0px), var(--translate-y, 0px), 0) scale(var(--stack-scale))",
    transitionProperty: "transform, height, opacity, filter",
    transitionDuration: {
      base: "450ms",
      [Popup.endingStyle]: SWIPE_DURATION,
      [Popup.swiping]: { base: "0s", [Popup.endingStyle]: SWIPE_DURATION },
      [Popup.nestedDrawerSwiping]: {
        base: "0s",
        [Popup.endingStyle]: SWIPE_DURATION,
      },
    },
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "transform",
    outlineStyle: "none",
    userSelect: "none",
    interpolateSize: "allow-keywords",
    overflow: { [Popup.nestedDrawerOpen]: "hidden" },
    filter: { [Popup.nestedDrawerOpen]: "brightness(0.95)" },
    opacity: { [Popup.endingStyle]: 0.9999 },

    // Sizing.
    "--drawer-content-height": {
      base: "var(--drawer-height, auto)",
      [Y]: { [SNAP]: "100dvh" },
    },
    "--drawer-content-width": {
      [X]: { base: "75%", [breakpoint.sm]: "24rem" },
    },
    "--drawer-content-max-height": { [Y]: "calc(100dvh - 6rem)" },

    // Stack.
    "--bleed": "3rem",
    "--peek": "1rem",
    "--stack-height":
      "var(--drawer-frontmost-height, var(--drawer-height, 0px))",
    "--stack-peek-offset":
      "max(0px, calc((var(--nested-drawers) - var(--stack-progress)) * var(--peek)))",
    "--stack-progress": "clamp(0, var(--drawer-swipe-progress), 1)",
    "--stack-scale-base":
      "max(0, calc(1 - (var(--nested-drawers) * var(--stack-step))))",
    "--stack-scale":
      "clamp(0, calc(var(--stack-scale-base) + (var(--stack-step) * var(--stack-progress))), 1)",
    "--stack-shrink": "calc(1 - var(--stack-scale))",
    "--stack-step": "0.05",

    // Where it floats, the bleed below it is clear and it sits in from the edge.
    "--drawer-bleed-background": {
      [maia]: "transparent",
      [mira]: "transparent",
      [luma]: "transparent",
      [rhea]: "transparent",
    },
    "--drawer-inset": {
      [maia]: space[2],
      [mira]: space[2],
      [luma]: space[2],
      [rhea]: space[2],
    },

    // Direction: the edge it is pinned to, where it scales from, where it leaves to and how far
    // the swipe and the stack move it.
    top: { [UP]: 0 },
    bottom: { [DOWN]: 0 },
    left: { [X]: { [LEFT]: 0 }, [Y]: 0 },
    right: { [X]: { [RIGHT]: 0 }, [Y]: 0 },
    insetBlock: { [X]: 0 },
    transformOrigin: {
      [DOWN]: "bottom",
      [UP]: "top",
      [LEFT]: "left",
      [RIGHT]: "right",
    },
    "--closed-transform": {
      [DOWN]: "translate3d(0, calc(100% + var(--drawer-inset, 0px) + 2px), 0)",
      [UP]: "translate3d(0, calc(-100% - var(--drawer-inset, 0px) - 2px), 0)",
      [LEFT]: "translate3d(calc(-100% - var(--drawer-inset, 0px) - 2px), 0, 0)",
      [RIGHT]: "translate3d(calc(100% + var(--drawer-inset, 0px) + 2px), 0, 0)",
    },
    "--translate-y": {
      [DOWN]:
        "calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y) - var(--stack-peek-offset) - (var(--stack-shrink) * var(--stack-height)))",
      [UP]: "calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y) + var(--stack-peek-offset) + (var(--stack-shrink) * var(--stack-height)))",
    },
    "--translate-x": {
      [LEFT]:
        "calc(var(--drawer-swipe-movement-x) + var(--stack-peek-offset) + (var(--stack-shrink) * 100%))",
      [RIGHT]:
        "calc(var(--drawer-swipe-movement-x) - var(--stack-peek-offset) - (var(--stack-shrink) * 100%))",
    },

    // cn-drawer-popup: the surface, its edge and corners on the side facing the page.
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
    borderColor: {
      base: theme.border,
      [maia]: { base: theme.popover, [DARK_SCHEME]: theme.border },
      [mira]: { base: theme.popover, [DARK_SCHEME]: theme.border },
      [luma]: { base: theme.popover, [DARK_SCHEME]: theme.border },
      [rhea]: { base: theme.popover, [DARK_SCHEME]: theme.border },
    },
    borderTopWidth: edge(DOWN),
    borderBottomWidth: edge(UP),
    borderLeftWidth: edge(RIGHT),
    borderRightWidth: edge(LEFT),
    borderTopLeftRadius: {
      [DOWN]: FACING_CORNER,
      [RIGHT]: FACING_CORNER,
      ...FLOATING_CORNER,
    },
    borderTopRightRadius: {
      [DOWN]: FACING_CORNER,
      [LEFT]: FACING_CORNER,
      ...FLOATING_CORNER,
    },
    borderBottomLeftRadius: {
      [UP]: FACING_CORNER,
      [RIGHT]: FACING_CORNER,
      ...FLOATING_CORNER,
    },
    borderBottomRightRadius: {
      [UP]: FACING_CORNER,
      [LEFT]: FACING_CORNER,
      ...FLOATING_CORNER,
    },
    boxShadow: {
      [luma]: {
        base: shadow.xl,
        [Popup.nestedDrawerOpen]: { [DOWN]: "var(--drawer-stacked-shadow)" },
      },
      [rhea]: {
        base: shadow.xl,
        [Popup.nestedDrawerOpen]: { [DOWN]: "var(--drawer-stacked-shadow)" },
      },
    },
    "--drawer-stacked-shadow": {
      [luma]:
        "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
      [rhea]:
        "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
    },

    // The bleed: the surface carried on past the edge, so a swipe past it shows no gap.
    "::after": {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      backgroundColor: `var(--drawer-bleed-background, ${theme.popover})`,
      insetBlock: { [X]: 0 },
      insetInline: { [Y]: 0 },
      width: { [X]: "var(--bleed)" },
      height: { [Y]: "var(--bleed)" },
      top: { [DOWN]: "100%" },
      right: { [LEFT]: "100%" },
      left: { [RIGHT]: "100%" },
      bottom: { [UP]: "100%" },
    },
  }),

  // Its first frame and exit: from where it leaves to.
  motion: css({
    transform: {
      [Popup.startingStyle]: "var(--closed-transform)",
      [Popup.endingStyle]: "var(--closed-transform)",
    },
  }),

  // cn-drawer-swipe-handle and the component's own classes: a bar across the popup's start, or
  // down its side.
  swipeHandle: css({
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexShrink: 0,
    cursor: { base: "grab", ":active": "grabbing" },
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    opacity: {
      [drawerScope.within(Popup.nestedDrawerOpen)]: {
        base: 0,
        [drawerScope.within(Popup.nestedDrawerSwiping)]: 1,
      },
    },
    order: {
      [drawerScope.parent(LEFT)]: 9999,
      [drawerScope.parent(UP)]: 9999,
    },
    height: { [ON_Y]: space[3], [ON_X]: "100%" },
    width: { [ON_Y]: "100%", [ON_X]: space[3] },
    // A direction implies its axis: each is read under it.
    justifyContent: {
      [ON_Y]: "center",
      [ON_X]: {
        [drawerScope.parent(LEFT)]: "flex-start",
        [drawerScope.parent(RIGHT)]: "flex-end",
      },
    },
    alignItems: {
      [ON_Y]: {
        [drawerScope.parent(DOWN)]: "flex-end",
        [drawerScope.parent(UP)]: "flex-start",
      },
      [ON_X]: "center",
    },
    "::after": {
      content: '""',
      display: "block",
      flexShrink: 0,
      borderRadius: { base: radius.full, [lyra]: "0", [sera]: "0" },
      backgroundColor: theme.muted,
      height: {
        [ON_Y]: {
          base: space[1],
          [vega]: spacing(1.5),
          [maia]: spacing(1.5),
          [luma]: spacing(1.5),
          [rhea]: spacing(1.5),
          [sera]: spacing(1.5),
        },
        [ON_X]: {
          base: space[24],
          [vega]: "100px",
          [lyra]: space[12],
          [maia]: "100px",
          [mira]: space[12],
          [luma]: "100px",
          [rhea]: "100px",
          [sera]: "100px",
        },
      },
      width: {
        [ON_Y]: {
          base: space[24],
          [vega]: "100px",
          [lyra]: space[12],
          [maia]: "100px",
          [mira]: space[12],
          [luma]: "100px",
          [rhea]: "100px",
          [sera]: "100px",
        },
        [ON_X]: {
          base: space[1],
          [vega]: spacing(1.5),
          [maia]: spacing(1.5),
          [luma]: spacing(1.5),
          [rhea]: spacing(1.5),
          [sera]: spacing(1.5),
        },
      },
    },
  }),

  // cn-drawer-content-base, which has no rules: the component's own classes.
  // The content inside the popup: it scrolls, and fades while a nested drawer is open.
  content: css({
    display: "flex",
    minHeight: 0,
    flex: "1 1 0%",
    flexDirection: "column",
    overflow: "hidden",
    overscrollBehavior: "contain",
    borderRadius: "inherit",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.45, 1.005, 0, 1.005)",
    userSelect: { base: "text", [drawerScope.within(Popup.swiping)]: "none" },
    opacity: {
      [drawerScope.within(Popup.nestedDrawerOpen)]: {
        base: 0,
        [drawerScope.within(Popup.nestedDrawerSwiping)]: 1,
      },
    },
  }),

  // cn-drawer-header-base and the component's own classes: centred in a drawer swiped up or down,
  // at the start from `md`.
  header: css({
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    gap: {
      base: space["0.5"],
      [mira]: space[1],
      [sera]: space[1],
      [breakpoint.md]: {
        base: space["0.5"],
        [vega]: spacing(1.5),
        [maia]: spacing(1.5),
        [mira]: space[1],
        [luma]: spacing(1.5),
        [rhea]: spacing(1.5),
        [sera]: space[2],
      },
    },
    paddingInline: space[4],
    paddingTop: space[4],
    textAlign: { [IN_Y]: "center", [breakpoint.md]: "left" },
  }),

  // cn-drawer-footer-base and the component's own classes.
  footer: css({
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    gap: space[2],
    marginTop: "auto",
    paddingInline: space[4],
    paddingBottom: space[4],
  }),

  // cn-drawer-title and cn-font-heading.
  title: css({
    fontFamily: font.heading,
    color: theme.foreground,
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    // Vega's has no size of its own: the popup's `text-sm`.
    fontSize: {
      base: fontSize.base,
      [vega]: fontSize.sm,
      [lyra]: fontSize.sm,
      [mira]: fontSize.sm,
      [sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight.base,
      [vega]: lineHeight.sm,
      [lyra]: lineHeight.sm,
      [mira]: lineHeight.sm,
      [sera]: lineHeight.lg,
    },
    letterSpacing: { [sera]: letterSpacing.wider },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-drawer-description
  description: css({
    color: theme.mutedForeground,
    textWrap: "balance",
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
      [sera]: leading.relaxed,
    },
    marginTop: { [sera]: space["0.5"] },
  }),
}
