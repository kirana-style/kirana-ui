/**
 * Toast, Base UI's own, in every style: shadcn/ui's `bases/base/ui/toast.tsx` with the `cn-toast`
 * rule of its style files (MIT). Every style draws it alike but for its corners. React Aria has no
 * toast (its pages use Sonner).
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
    opacity: when(toastState.behind, {
      base: 0,
      ...when(toastState.contentExpanded, 1),
    }),
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
  // `animate-spin`
  iconLoading: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
}
