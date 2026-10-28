/**
 * Native Select, in every style: shadcn/ui's `bases/base/ui/native-select.tsx` (the same on React
 * Aria) with the `cn-native-select*` rules of its style files (MIT). Nova is the base look; the
 * other styles override what differs.
 *
 * The browser's own `<select>`, drawn as Input's field (its rings, fills and Sera's underline) with
 * the chevron laid over its end.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  fontSize,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlShadow, controlTransition, laterRings } from "./control"
import { fillInField } from "./field-scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The wrapper, read by the chevron for its size (`group/native-select`). */
export const nativeSelectScope = relation("native-select")

const SM = '[data-size="sm"]'

/** A style's value at both sizes. */
const both = (value: string) => ({ base: value, [SM]: value })

export const nativeSelect = {
  // cn-native-select-wrapper
  // `w-fit`, filling a vertical Field as its child (the field's `*:w-full`).
  wrapper: css(nativeSelectScope.anchor, {
    position: "relative",
    width: fillInField,
    opacity: { ":has(select:disabled)": 0.5 },
  }),

  // cn-native-select
  select: css({
    width: "100%",
    minWidth: 0,
    appearance: "none",
    outlineStyle: "none",
    userSelect: "none",
    pointerEvents: { ":disabled": "none" },
    cursor: { ":disabled": "not-allowed" },
    ...controlTransition,
    transitionProperty: {
      base: "color, background-color, border-color",
      [vega]: "color, box-shadow",
      [luma]: "color, box-shadow, background-color",
      [rhea]: "color, box-shadow",
      [sera]: "color, border-color",
    },
    transitionDuration: { base: duration[150], [rhea]: duration[200] },
    height: {
      base: space[8],
      [SM]: space[7],
      [vega]: { base: space[9], [SM]: space[8] },
      [maia]: { base: space[9], [SM]: space[8] },
      [mira]: { base: space[7], [SM]: space[6] },
      [luma]: { base: space[9], [SM]: space[8] },
      [sera]: { base: space[10], [SM]: space[9] },
    },
    paddingBlock: {
      base: space[1],
      [SM]: space["0.5"],
      [vega]: { [SM]: space[1] },
      [maia]: { [SM]: space[1] },
      [mira]: { base: space["0.5"], [SM]: space["0.5"] },
      [luma]: { [SM]: space[1] },
      [rhea]: { [SM]: space[1] },
      [sera]: { base: space[2], [SM]: space[2] },
    },
    paddingRight: { base: space[8], [mira]: space[6] },
    paddingLeft: {
      base: space["2.5"],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [sera]: "0",
    },
    // Only Nova caps the small one's corners; the size is an attribute, which outranks a style, so
    // each style restates its own.
    borderRadius: {
      base: radius.lg,
      [SM]: `min(${radius.md}, 10px)`,
      [vega]: both(radius.md),
      [lyra]: both("0"),
      [maia]: both(radius["4xl"]),
      [mira]: both(radius.md),
      [luma]: both(radius["3xl"]),
      [rhea]: both(radius["2xl"]),
      [sera]: both("0"),
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      base: theme.input,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
      [luma]: {
        base: "transparent",
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
      [rhea]: {
        base: "transparent",
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
      [sera]: {
        base: "transparent",
        ":focus-visible": "transparent",
        '[aria-invalid="true"]': "transparent",
      },
    },
    borderBottomColor: {
      [sera]: {
        base: theme.input,
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
    },
    boxShadow: controlShadow(
      alpha.ring50,
      surface.ringInvalid,
      laterRings(alpha.ring30, { sera: "none" }),
      laterRings(surface.ringInvalid, { sera: "none" })
    ),
    // `bg-transparent dark:bg-input/30 dark:hover:bg-input/50`; Maia fills with `input/30`, Mira
    // with `input/20` (`/30` in dark), Luma and Rhea with `/50` and no hover, Sera with nothing.
    backgroundColor: {
      base: surface.control,
      ":hover": surface.controlHover,
      [maia]: {
        base: alpha.input30,
        ":hover": `light-dark(${alpha.input30}, ${alpha.input50})`,
      },
      [mira]: {
        base: surface.controlSoft,
        ":hover": `light-dark(${alpha.input20}, ${alpha.input50})`,
      },
      [luma]: { base: alpha.input50, ":hover": alpha.input50 },
      [rhea]: { base: alpha.input50, ":hover": alpha.input50 },
      [sera]: { base: "transparent", ":hover": "transparent" },
    },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: { base: fontSize.xs, [SM]: "0.625rem" },
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    "::placeholder": { color: theme.mutedForeground },
    "::selection": {
      backgroundColor: theme.primary,
      color: theme.primaryForeground,
    },
  }),

  // cn-native-select-icon, centred on the select's end.
  icon: css({
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    right: {
      base: space["2.5"],
      [maia]: spacing(3.5),
      [mira]: space["1.5"],
      [sera]: "0",
    },
    userSelect: "none",
    width: {
      base: space[4],
      [mira]: { base: spacing(3.5), [nativeSelectScope.parent(SM)]: space[3] },
      [sera]: spacing(3.5),
    },
    height: {
      base: space[4],
      [mira]: { base: spacing(3.5), [nativeSelectScope.parent(SM)]: space[3] },
      [sera]: spacing(3.5),
    },
    translate: {
      base: "0 -50%",
      [mira]: {
        [nativeSelectScope.parent(SM)]: `0 calc(${spacing(1.25)} * -1)`,
      },
    },
    color: theme.mutedForeground,
  }),

  // An option and a group of them, in the system's colours (`bg-[Canvas] text-[CanvasText]`).
  option: css({ backgroundColor: "Canvas", color: "CanvasText" }),
}
