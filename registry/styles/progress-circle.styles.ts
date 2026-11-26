/**
 * Progress Circle, in every style: a second look for progress, a ring, on Kirana UI Primitives'
 * Progress, the registry's own component in shadcn/ui's language. The root is the primitive's root
 * (its role, value and states); inside it an SVG draws a track ring in the progress track's colour
 * (`theme.muted`) and over it an arc in the primary colour, and whatever the root is given sits in
 * the middle (a label, the written value in tabular figures).
 *
 * The arc's length is the value's share of the range, which the primitive's root writes as
 * `--progress-value` (0 to 1, absent while the value is not known) and every part inherits. Each
 * ring is measured as 100 (`pathLength`), so the arc is a dash of 100 pushed back by what is left
 * of the range. The dashes are written in `px`, the SVG's own units, which `pathLength` scales:
 * Firefox drops a dash offset written as a bare `calc()` number. The arc starts at the top and runs clockwise, and the other way in a right-to-left page,
 * where the linear progress fills from the right. While the value is not known (the primitive's
 * `data-indeterminate` on the root) a quarter of the ring spins, and stands still without motion
 * (`prefers-reduced-motion: reduce`).
 *
 * The ring's diameter and thickness are written here once per size, the same in every style; a
 * style whose bar has square ends (Lyra, Sera) gives the arc square ends too.
 */
import { css, keyframes, recipe, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { progressState } from "../core/states"
import { theme } from "../core/tokens"

const { lyra, sera } = axes.style

/** The root, read by the arc for whether the value is known. */
export const progressCircleScope = relation("progress-circle")

/**
 * The root while the value is not known (`progressState.root.indeterminate`).
 */
const INDETERMINATE = progressCircleScope.within(
  progressState.root.indeterminate.kirana
)

const REDUCED = "@media (prefers-reduced-motion: reduce)"

/** The ring's thickness, set on the root by its size. */
const THICKNESS = "var(--progress-circle-thickness)"
/** The value's share of the range, 0 to 1, written on the root by the primitive. */
const VALUE = "var(--progress-value, 0)"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

/** A ring centred in the SVG, its stroke inside the SVG's box. */
const ring = {
  cx: "50%",
  cy: "50%",
  r: `calc(50% - ${THICKNESS} / 2)`,
  fill: "none",
  strokeWidth: THICKNESS,
}

/** The root and its size: the ring's diameter and thickness, and the middle's text. */
export const progressCircle = recipe({
  base: {
    position: "relative",
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    color: theme.foreground,
  },
  variants: {
    size: {
      sm: {
        width: space[10],
        height: space[10],
        "--progress-circle-thickness": spacing(0.75),
        fontSize: fontSize.xs,
        lineHeight: lineHeight.xs,
      },
      default: {
        width: space[14],
        height: space[14],
        "--progress-circle-thickness": space[1],
        fontSize: fontSize.sm,
        lineHeight: lineHeight.sm,
      },
      lg: {
        width: space[20],
        height: space[20],
        "--progress-circle-thickness": spacing(1.5),
        fontSize: fontSize.base,
        lineHeight: lineHeight.base,
      },
    },
  },
  defaultVariants: { size: "default" },
})

export const progressCircleParts = {
  // The root's relation, beside its size.
  scope: css(progressCircleScope.anchor),

  // The SVG filling the root, turned so the rings start at the top; mirrored in a right-to-left
  // page, so the arc runs the other way.
  svg: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
    transform: {
      base: "rotate(-90deg)",
      ":dir(rtl)": "rotate(-90deg) scaleY(-1)",
    },
  }),

  // The whole range, in the progress track's colour.
  track: css({ ...ring, stroke: theme.muted }),

  // The filled part: a dash as long as the value's share of the ring. Hidden at 0, where a round
  // end would still draw a dot. While the value is not known, a quarter of the ring that spins.
  indicator: css({
    ...ring,
    stroke: theme.primary,
    strokeLinecap: { base: "round", [lyra]: "butt", [sera]: "butt" },
    strokeDasharray: { base: "100px", [INDETERMINATE]: "25px 75px" },
    strokeDashoffset: {
      base: `calc(100px - 100px * ${VALUE})`,
      [INDETERMINATE]: "0px",
    },
    opacity: {
      base: `clamp(0, ${VALUE} * 1000, 1)`,
      [INDETERMINATE]: "1",
    },
    transitionProperty: "stroke-dashoffset, opacity",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    transformBox: "fill-box",
    transformOrigin: "center",
    animationName: {
      [INDETERMINATE]: { base: spin, [REDUCED]: "none" },
    },
    animationDuration: { [INDETERMINATE]: "1s" },
    animationTimingFunction: { [INDETERMINATE]: "linear" },
    animationIterationCount: { [INDETERMINATE]: "infinite" },
  }),

  // What sits in the middle: the written value, in figures of one width so it does not shift as
  // it grows. Its size is the root's.
  label: css({
    position: "relative",
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}
