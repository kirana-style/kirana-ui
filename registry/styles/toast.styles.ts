/**
 * Toast, Base UI's own, in every style: shadcn/ui's `bases/base/ui/toast.tsx` with the `cn-toast`
 * rule of its style files (MIT). Every style draws it alike but for its corners. React Aria has no
 * toast (its pages use Sonner).
 *
 * Ark UI's toasts (Vue, Svelte, Solid) are Zag's, which places each itself: it writes `--x`, `--y`,
 * `--scale`, `--z-index`, `--height` and `--opacity` on the toast and its group's position inline,
 * for the stylesheet to apply (`rootArk`); a toast behind the front one, while the stack is
 * collapsed, is `data-sibling` and `data-overlap`.
 *
 * The toasts stack by transforming each against its index, so the transform stays one composite
 * string: `translate` and `scale` as separate properties cannot interleave the way the formula
 * needs. The stack's variables are assigned on the toast, never as token defaults (`toastCtx`).
 */
import { css, keyframes, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx, toastCtx } from "../core/context"
import { toast as toastState, when } from "../core/states"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  space,
  zIndex,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"

const { lyra, mira, sera } = axes.style

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })
/** Changes nothing: Reka UI's toast stays in the page while it runs (`rootReka`). */
const hold = keyframes({ from: { opacity: 1 }, to: { opacity: 1 } })

const SWIPE_X = "var(--toast-swipe-movement-x)"
const SWIPE_Y = "var(--toast-swipe-movement-y)"
const INDEX = "var(--toast-index)"
/** `--scale`: each toast further back shrinks by a tenth. */
const SCALE = `calc(max(0, 1 - (${INDEX} * 0.1)))`
/** Upstream's curve for the stack's motion. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

/** At rest in the stack: peeking out behind the one in front, scaled down. */
const STACKED = `translateX(${SWIPE_X}) translateY(calc(${SWIPE_Y} - (${INDEX} * ${toastCtx.peek}) - (${toastCtx.shrink} * ${toastCtx.height}))) scale(${toastCtx.scale})`
/** In the expanded stack, each at its own offset. */
const EXPANDED = `translateX(${SWIPE_X}) translateY(${toastCtx.offsetY})`
/** Entering from below, and leaving downwards when it was not swiped. */
const BELOW = "translateY(150%)"

/** Inside an Ark UI toast behind the front one, the stack collapsed. */
const ARK_BEHIND = ':is([data-scope="toast"][data-sibling][data-overlap] > *)'
/** An Ark UI toast behind the front one, the stack collapsed. */
const ARK_COLLAPSED = "[data-sibling][data-overlap]"
/** Base UI's `--scale` over Zag's `--index`. */
const ARK_SCALE = "calc(max(0, 1 - (var(--index) * 0.1)))"

/** Leaving the way it was swiped (`data-ending-style:data-[swipe-direction=*]:`). */
const swiped = {
  ...when(toastState.swipeDown, `translateY(calc(${SWIPE_Y} + 150%))`),
  ...when(toastState.swipeUp, `translateY(calc(${SWIPE_Y} - 150%))`),
  ...when(
    toastState.swipeLeft,
    `translateX(calc(${SWIPE_X} - 150%)) translateY(${toastCtx.offsetY})`
  ),
  ...when(
    toastState.swipeRight,
    `translateX(calc(${SWIPE_X} + 150%)) translateY(${toastCtx.offsetY})`
  ),
}

/** Leaving: swiped, or downwards unless it is only hidden behind the limit. */
const leaving = {
  ":not([data-limited]):not([data-swipe-direction])": BELOW,
  ...swiped,
}

export const toast = {
  viewport: css({
    pointerEvents: "none",
    position: "fixed",
    // `inset-x-4 sm:right-4 sm:left-auto`
    left: { base: space[4], [breakpoint.sm]: "auto" },
    right: space[4],
    bottom: space[4],
    zIndex: zIndex.overlay,
    marginInline: { base: "auto", [breakpoint.sm]: "0" },
    width: { base: "auto", [breakpoint.sm]: "100%" },
    maxWidth: containerSize.sm,
    outlineStyle: "none",
  }),
  // cn-toast and the toast's own classes.
  root: css({
    pointerEvents: "auto",
    position: "absolute",
    right: "0",
    bottom: "0",
    // Later toasts sit behind earlier ones.
    zIndex: `calc(1000 - ${INDEX})`,
    width: "100%",
    transformOrigin: "bottom",
    borderWidth: "1px",
    borderColor: { base: theme.border, ":focus-visible": theme.ring },
    borderRadius: {
      base: radius["2xl"],
      [lyra]: "0",
      [mira]: radius.md,
      [sera]: "0",
    },
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    boxShadow: {
      base: shadow.lg,
      ":focus-visible": `0 0 0 3px ${alpha.ring50}, ${shadow.lg}`,
    },
    willChange: "transform",
    outlineStyle: "none",
    userSelect: "none",
    [toastCtx.offsetY]: `calc(var(--toast-offset-y) * -1 + calc(${INDEX} * ${toastCtx.gap} * -1) + ${SWIPE_Y})`,
    [toastCtx.height]: "var(--toast-frontmost-height, var(--toast-height))",
    [toastCtx.scale]: SCALE,
    [toastCtx.shrink]: `calc(1 - ${toastCtx.scale})`,
    height: {
      base: toastCtx.height,
      ...when(toastState.expanded, "var(--toast-height)"),
    },
    opacity: when(toastState.limited, 0),
    // Entering and leaving win over the expanded stack: a toast dismissed while the stack is open
    // still slides out.
    transform: {
      base: STACKED,
      ...when(toastState.expanded, {
        base: EXPANDED,
        ...when(toastState.starting, BELOW),
        ...when(toastState.ending, leaving),
      }),
      ...when(toastState.starting, BELOW),
      ...when(toastState.ending, leaving),
    },
    transitionProperty: "transform, opacity, height",
    transitionDuration: "500ms, 500ms, 150ms",
    transitionTimingFunction: `${EASE}, ease, ease`,
    // Bridges the gap between stacked toasts, so a pointer crossing it stays on the stack.
    "::after": {
      content: "''",
      position: "absolute",
      top: "100%",
      left: "0",
      height: `calc(${toastCtx.gap} + 1px)`,
      width: "100%",
    },
  }),
  // Ark UI's toast: Zag's placement, as Ark's own styling applies it, over the same motion.
  rootArk: css({
    // Behind the front toast of a collapsed stack, Base UI's peek and scale over Zag's `--index`
    // and front height, where Zag's own peek by the gap and shrink by a twentieth.
    translate: {
      base: "var(--x) var(--y)",
      [ARK_COLLAPSED]: `var(--x) calc(-1 * var(--index) * ${toastCtx.peek} - (1 - ${ARK_SCALE}) * var(--height))`,
      // Entering and leaving from below, as Base UI's (`translateY(150%)`), where Zag's go 100%.
      ":not([data-mounted])": "var(--x) 150%",
      '[data-state="closed"]': "var(--x) 150%",
    },
    scale: { base: "var(--scale)", [ARK_COLLAPSED]: ARK_SCALE },
    // Base UI's formula over Zag's `--index` (0 at the front), where Zag's own `--z-index` counts from 1.
    zIndex: "calc(1000 - var(--index))",
    height: "var(--height)",
    // Base UI's slides in and out at full opacity; Zag's fades as it goes.
    opacity: {
      base: "var(--opacity)",
      ":not([data-mounted])": 1,
      '[data-state="closed"]': 1,
    },
    transitionProperty: "translate, scale, opacity, height, box-shadow",
    transitionDuration: "500ms, 500ms, 500ms, 150ms, 150ms",
    transitionTimingFunction: `${EASE}, ${EASE}, ease, ease, ease`,
  }),
  // Reka UI's toast (Vue): Base UI's stack, which Reka measures and the part hands on under Base
  // UI's names. It leaves on Reka's `data-state="closed"`, sliding down, or right when swiped, and is
  // held in the page for Base UI's 500ms by an animation: Reka removes a toast once its animation
  // ends, and at once when it has none.
  rootReka: css({
    translate: {
      '[data-state="closed"]': {
        base: "0 150%",
        '[data-swipe="end"]': "150% 0",
      },
    },
    animationName: { '[data-state="closed"]': hold },
    animationDuration: "500ms",
    transitionProperty: "transform, opacity, height, translate",
    transitionDuration: "500ms, 500ms, 150ms, 500ms",
    transitionTimingFunction: `${EASE}, ease, ease, ${EASE}`,
  }),
  content: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    gap: space[3],
    overflow: "hidden",
    padding: space[4],
    transitionProperty: "opacity",
    transitionDuration: "250ms",
    transitionTimingFunction: EASE,
    // Behind the front toast its content hides, unless the stack is expanded.
    opacity: {
      ...when(toastState.behind, {
        base: 0,
        ...when(toastState.contentExpanded, 1),
      }),
      // Ark UI's: behind the front toast of a collapsed stack.
      [ARK_BEHIND]: 0,
    },
  }),
  // `flex min-w-0 flex-1 flex-col gap-1`, around the title and the description.
  body: css({
    display: "flex",
    minWidth: "0",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[1],
  }),
  title: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  description: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  action: css({ flexShrink: 0 }),
  close: css({
    position: "relative",
    flexShrink: 0,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${space[2]} * -1)`,
    },
  }),
  // `shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`
  icon: css({
    flexShrink: 0,
    [ctx.iconSize]: "1rem",
    [select.descendant("svg")]: {
      pointerEvents: "none",
      width: ctx.iconSize,
      height: ctx.iconSize,
    },
  }),
  iconError: css({ color: theme.destructive }),
  // Not upstream's, whose other icons keep the text colour: a success icon is green, an info icon
  // sky and a warning icon orange, beside the error's red (Tailwind's 600 in light, 400 in dark).
  iconSuccess: css({
    color: "light-dark(oklch(0.627 0.194 149.214), oklch(0.792 0.209 151.711))",
  }),
  iconInfo: css({
    color: "light-dark(oklch(0.588 0.158 241.966), oklch(0.746 0.16 232.661))",
  }),
  iconWarning: css({
    color: "light-dark(oklch(0.646 0.222 41.116), oklch(0.75 0.183 55.934))",
  }),
  // `animate-spin`
  iconLoading: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
}
