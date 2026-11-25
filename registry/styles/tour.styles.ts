/**
 * Tour, in every style: the registry's own, on Kirana UI Primitives' tour, in shadcn/ui's design
 * language. Its popup is the registry's Popover surface (`popover.styles.ts`), coming and going as
 * every popup does (`popupMotion`, `overlay.styles.ts`); its title and description are the
 * popover's; its buttons are the registry's Button, the close one placed as Dialog's
 * (`dialog.styles.ts`).
 *
 * The spotlight is a layer over the page that fades as a backdrop does (`backdropMotion`). Its hole
 * is a box placed by the variables the primitive writes on it (`--spotlight-*`), with the popover's
 * corners in each style, whose shadow dims everything around it in the colour of Dialog's backdrop.
 * The page is not blurred: a blur would reach the target too.
 *
 * The arrow is a square turned on its corner, half of it past the popup's edge, filled as the popup
 * and edged on the two sides that face the target in the popup's ring colour. The primitive places
 * it along that edge (`left` or `top`, inline).
 *
 * Written once for every style: the arrow's size, the hole's motion from one target to the next, the
 * room the header leaves for the close button.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
  zIndex,
} from "../core/scales"
import { tourState, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const SIDE = tourState.arrow.side

/** The popover's corners, in each style. */
const POPOVER_RADIUS = {
  base: radius.lg,
  [vega]: radius.md,
  [lyra]: "0",
  [maia]: radius["2xl"],
  [luma]: radius["3xl"],
  [rhea]: radius["3xl"],
  [sera]: "0",
}

/**
 * Dialog's backdrop colour in each style, as a shadow wide enough to cover any page around the
 * hole.
 */
const DIM = {
  base: "0 0 0 100vmax rgb(0 0 0 / 0.1)",
  [maia]: "0 0 0 100vmax rgb(0 0 0 / 0.8)",
  [mira]: "0 0 0 100vmax rgb(0 0 0 / 0.8)",
  [luma]: "0 0 0 100vmax rgb(0 0 0 / 0.3)",
  [rhea]: "0 0 0 100vmax rgb(0 0 0 / 0.3)",
  [sera]: "0 0 0 100vmax rgb(0 0 0 / 0.2)",
}

/** The popover's ring colour, in each style: the arrow's edges. */
const RING = {
  base: alpha.foreground10,
  [maia]: alpha.foreground5,
  [luma]: surface.ringSoft,
  [rhea]: surface.ringSoft,
}

const ARROW = space["2.5"]
/** Half the arrow past the popup's edge. */
const OUT = `calc(${ARROW} / -2)`

export const tour = {
  // The layer over the page, the hole its `::before`.
  spotlight: css({
    position: "fixed",
    inset: 0,
    zIndex: zIndex.overlay,
    isolation: "isolate",
    overflow: "hidden",
    "::before": {
      content: '""',
      position: "absolute",
      top: "var(--spotlight-top)",
      left: "var(--spotlight-left)",
      width: "var(--spotlight-width)",
      height: "var(--spotlight-height)",
      borderRadius: POPOVER_RADIUS,
      boxShadow: DIM,
      // From one target to the next, the hole moves.
      transitionProperty: "top, left, width, height",
      transitionDuration: duration[200],
      transitionTimingFunction: easing.inOut,
    },
  }),

  // Over the popover's surface: it holds the arrow and the close button.
  content: css({ position: "relative" }),

  arrow: css({
    position: "absolute",
    width: ARROW,
    height: ARROW,
    rotate: "45deg",
    backgroundColor: theme.popover,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: { base: "2px", [lyra]: "0", [sera]: "0" },
    borderTopColor: {
      base: "transparent",
      ...when(SIDE.bottom, RING),
      ...when(SIDE.left, RING),
      ...when(SIDE["inline-start"], RING),
    },
    borderRightColor: {
      base: "transparent",
      ...when(SIDE.top, RING),
      ...when(SIDE.left, RING),
      ...when(SIDE["inline-start"], RING),
    },
    borderBottomColor: {
      base: "transparent",
      ...when(SIDE.top, RING),
      ...when(SIDE.right, RING),
      ...when(SIDE["inline-end"], RING),
    },
    borderLeftColor: {
      base: "transparent",
      ...when(SIDE.bottom, RING),
      ...when(SIDE.right, RING),
      ...when(SIDE["inline-end"], RING),
    },
    top: { ...when(SIDE.bottom, OUT) },
    bottom: { ...when(SIDE.top, OUT) },
    right: { ...when(SIDE.left, OUT), ...when(SIDE["inline-start"], OUT) },
    left: { ...when(SIDE.right, OUT), ...when(SIDE["inline-end"], OUT) },
  }),

  // Over the popover's header: room at its end for the close button in the corner.
  header: css({ paddingInlineEnd: space[8] }),

  // The step's buttons, at the end, after its place in the tour.
  footer: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: space[2],
  }),

  // "1 of 3", pushing the buttons to the end.
  progress: css({
    marginInlineEnd: "auto",
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontVariantNumeric: "tabular-nums",
  }),

  // Over the outline Button: on the first step there is nowhere to go back to.
  previous: css({
    opacity: { ...when(tourState.previous.disabled, 0.5) },
    pointerEvents: { ...when(tourState.previous.disabled, "none") },
  }),
}
