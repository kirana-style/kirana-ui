/**
 * Input OTP, in every style: shadcn/ui's `bases/base/ui/input-otp.tsx` (the same on React Aria), on
 * the `input-otp` package, with the `cn-input-otp*` rules of its style files (MIT). Nova is the
 * base look; the other styles override what differs.
 *
 * Its slots join into one field per group, as an Input's border and fill: rounded only at the
 * group's ends, the focused slot ringed. Sera's slots are lines under the text, a gap apart.
 */
import { css, keyframes, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  leading,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const ACTIVE = '[data-active="true"]'
const INVALID = '[aria-invalid="true"]'

/** Each style's corner at a group's ends. */
const END = {
  base: radius.lg,
  [vega]: radius.md,
  [lyra]: "0",
  [maia]: radius["4xl"],
  [mira]: radius.md,
  [luma]: radius["3xl"],
  [rhea]: radius["2xl"],
  [sera]: "0",
}

/** `animate-caret-blink`: shadcn/ui's keyframes. */
const caretBlink = keyframes({
  "0%, 70%, 100%": { opacity: 1 },
  "20%, 50%": { opacity: 0 },
})

/** The active slot's ring of `width` in `color`, the invalid one over it; Vega's `shadow-xs` under. */
const activeRing = (width: string, color: string) => ({
  base: `0 0 0 ${width} ${color}`,
  [INVALID]: `0 0 0 ${width} ${surface.ringInvalid}`,
})

export const inputOtp = {
  // cn-input-otp: the container around the hidden input and the slots.
  container: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    opacity: { ":has(:disabled)": 0.5 },
  }),

  // cn-input-otp-input
  input: css({ cursor: { ":disabled": "not-allowed" } }),

  // cn-input-otp-group
  group: css({
    display: "flex",
    alignItems: "center",
    gap: { [sera]: space[1] },
    borderRadius: END,
    borderColor: {
      ":has([aria-invalid])": theme.destructive,
      [sera]: { ":has([aria-invalid])": "transparent" },
    },
    borderBottomColor: {
      [sera]: { ":has([aria-invalid])": surface.borderInvalid },
    },
    boxShadow: {
      ":has([aria-invalid])": {
        base: `0 0 0 3px ${surface.ringInvalid}`,
        [lyra]: `0 0 0 1px ${surface.ringInvalid}`,
        [mira]: `0 0 0 2px ${surface.ringInvalid}`,
        [sera]: "none",
      },
    },
  }),

  // cn-input-otp-slot
  slot: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: { [ACTIVE]: 10 },
    outlineStyle: "none",
    width: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[7],
      [luma]: space[9],
      [sera]: space[10],
    },
    height: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[7],
      [luma]: space[9],
      [sera]: space[10],
    },
    // `border-y border-r`, the first slot's left too; Sera's is a whole border, drawn at the bottom.
    borderStyle: "solid",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderRightWidth: "1px",
    borderLeftWidth: { base: "0", ":first-child": "1px", [sera]: "1px" },
    // Rounded only at the group's ends: the first slot's left corners, the last's right ones.
    borderTopLeftRadius: { base: "0", ":first-child": END },
    borderBottomLeftRadius: { base: "0", ":first-child": END },
    borderTopRightRadius: { base: "0", ":last-child": END },
    borderBottomRightRadius: { base: "0", ":last-child": END },
    borderColor: {
      base: theme.input,
      [ACTIVE]: { base: theme.ring, [INVALID]: theme.destructive },
      [INVALID]: theme.destructive,
      [sera]: {
        base: "transparent",
        [ACTIVE]: { base: "transparent", [INVALID]: "transparent" },
        [INVALID]: "transparent",
      },
    },
    borderBottomColor: {
      [sera]: {
        base: theme.input,
        [ACTIVE]: { base: theme.ring, [INVALID]: surface.borderInvalid },
        [INVALID]: surface.borderInvalid,
      },
    },
    boxShadow: {
      [vega]: shadow.xs,
      [ACTIVE]: {
        ...activeRing("3px", alpha.ring50),
        [vega]: {
          base: `0 0 0 3px ${alpha.ring50}, ${shadow.xs}`,
          [INVALID]: `0 0 0 3px ${surface.ringInvalid}, ${shadow.xs}`,
        },
        [lyra]: activeRing("1px", alpha.ring50),
        [mira]: activeRing("2px", alpha.ring30),
        [luma]: activeRing("3px", alpha.ring30),
        [rhea]: activeRing("3px", alpha.ring30),
        [sera]: { base: "none", [INVALID]: "none" },
      },
    },
    backgroundColor: {
      base: surface.control,
      [maia]: alpha.input30,
      [mira]: surface.controlSoft,
      [luma]: alpha.input50,
      [rhea]: alpha.input50,
      [sera]: "transparent",
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    // `transition-all`, as the properties that move.
    transitionProperty: {
      base: "color, background-color, border-color, box-shadow",
      [rhea]: "color, box-shadow",
      [sera]: "color, border-color",
    },
    transitionDuration: { base: duration[150], [rhea]: duration[200] },
    transitionTimingFunction: easing.inOut,
  }),

  // cn-input-otp-caret: the fake caret over the active, empty slot.
  caret: css({
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  // cn-input-otp-caret-line
  caretLine: css({
    width: "1px",
    height: space[4],
    backgroundColor: theme.foreground,
    animationName: caretBlink,
    animationDuration: "1.25s",
    animationTimingFunction: "ease-out",
    animationIterationCount: "infinite",
  }),

  // cn-input-otp-separator
  separator: css({
    display: "flex",
    alignItems: "center",
    [select.descendant("svg")]: {
      width: { base: space[4], [sera]: spacing(3.5) },
      height: { base: space[4], [sera]: spacing(3.5) },
    },
  }),
}
