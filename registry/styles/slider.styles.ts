/**
 * Slider, in every style: shadcn/ui's `bases/base/ui/slider.tsx` and `bases/aria/ui/slider.tsx` with
 * the `cn-slider*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs.
 *
 * Base UI's root holds a control, which holds the track and the thumbs; React Aria's root is the
 * control itself, so it takes both handles. Each part reads the root's orientation
 * (`sliderScope`). The thumb's rings are box shadows over the shadow some styles give it, so each
 * state restates the shadow. Upstream's `disabled:` on the thumb never matches its `div`, and is
 * left out.
 */
import { css, relation } from "@kirana-style/core"

import { axes, DARK_SCHEME } from "../core/axes"
import { duration, easing, shadow, space, spacing } from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The slider's root, read by its parts for its orientation. */
export const sliderScope = relation("slider")

const HORIZONTAL = '[data-orientation="horizontal"]'
const VERTICAL = '[data-orientation="vertical"]'
const IN_HORIZONTAL = sliderScope.within(HORIZONTAL)
const IN_VERTICAL = sliderScope.within(VERTICAL)

/** A track's thickness: `h-*` across a row, `w-*` down a column. */
const THICKNESS = {
  base: space[1],
  [vega]: spacing(1.5),
  [maia]: space[3],
  [luma]: space[2],
  [sera]: spacing(0.5),
}

/** A ring of `width` in `color`, over the thumb's own shadow (`under`). */
const ring = (width: string, color: string, under?: string) =>
  under ? `0 0 0 ${width} ${color}, ${under}` : `0 0 0 ${width} ${color}`

/**
 * The thumb's shadow in each state it rings in: hover, focus and, where upstream has it, press. A
 * style without a pressed ring restates its rest (`rest`) there, over the base's.
 */
const ringed = (value: string, active: boolean, rest = "none") => ({
  ":hover": value,
  ":focus-visible": value,
  ":active": active ? value : rest,
})

export const slider = {
  // The root: Base UI's (`data-horizontal:w-full data-vertical:h-full`), or React Aria's whole slider.
  root: css(sliderScope.anchor, {
    width: { [HORIZONTAL]: "100%" },
    height: { [VERTICAL]: "100%" },
  }),

  // cn-slider and the control's own classes.
  control: css({
    position: "relative",
    display: "flex",
    width: { base: "100%", [VERTICAL]: "auto" },
    height: { [VERTICAL]: "100%" },
    minHeight: { [VERTICAL]: space[40] },
    flexDirection: { [VERTICAL]: "column" },
    alignItems: "center",
    touchAction: "none",
    userSelect: "none",
    opacity: { "[data-disabled]": 0.5 },
  }),

  // cn-slider-track
  track: css({
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
    userSelect: "none",
    backgroundColor: {
      base: theme.muted,
      [luma]: alpha.input90,
      [rhea]: alpha.input90,
      [sera]: alpha.input50,
    },
    borderRadius: {
      [nova]: radius.full,
      [vega]: radius.full,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius.full,
      [rhea]: radius["2xl"],
    },
    height: { [HORIZONTAL]: THICKNESS, [VERTICAL]: "100%" },
    width: { [HORIZONTAL]: "100%", [VERTICAL]: THICKNESS },
  }),

  // cn-slider-range: React Aria's fill is placed (`absolute`); Base UI places its indicator itself.
  range: css({
    userSelect: "none",
    backgroundColor: theme.primary,
    height: { [HORIZONTAL]: "100%" },
    width: { [VERTICAL]: "100%" },
  }),
  rangeAria: css({ position: "absolute" }),

  // cn-slider-thumb
  thumb: css({
    display: "block",
    flexShrink: 0,
    userSelect: "none",
    outlineStyle: { ":focus-visible": "none" },
    position: {
      [nova]: "relative",
      [lyra]: "relative",
      [mira]: "relative",
    },
    width: {
      base: space[3],
      [vega]: space[4],
      [maia]: space[4],
      // `data-vertical:` on the thumb itself: Base UI's has it, React Aria's thumb does not.
      [luma]: { base: space[6], [VERTICAL]: space[4] },
      [rhea]: space[4],
    },
    height: {
      base: space[3],
      [vega]: space[4],
      [maia]: space[4],
      [luma]: { base: space[4], [VERTICAL]: space[6] },
      [rhea]: space[4],
    },
    borderRadius: {
      [nova]: radius.full,
      [vega]: radius.full,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius.full,
      [rhea]: radius["2xl"],
    },
    borderWidth: {
      [nova]: "1px",
      [vega]: "1px",
      [lyra]: "1px",
      [maia]: "1px",
      [mira]: "1px",
    },
    borderStyle: {
      [nova]: "solid",
      [vega]: "solid",
      [lyra]: "solid",
      [maia]: "solid",
      [mira]: "solid",
      [sera]: "none",
    },
    borderColor: {
      [nova]: theme.ring,
      [vega]: theme.primary,
      [lyra]: theme.ring,
      [maia]: theme.primary,
      [mira]: theme.ring,
    },
    backgroundColor: { base: "white", [sera]: theme.primary },
    // `not-dark:bg-clip-padding` in Luma and Rhea.
    backgroundClip: {
      [luma]: {
        base: "padding-box",
        [DARK_SCHEME]: { base: "border-box", [axes.mode.light]: "padding-box" },
        [axes.mode.dark]: "border-box",
      },
      [rhea]: {
        base: "padding-box",
        [DARK_SCHEME]: { base: "border-box", [axes.mode.light]: "padding-box" },
        [axes.mode.dark]: "border-box",
      },
    },
    boxShadow: {
      ...ringed(ring("3px", alpha.ring50), true),
      [vega]: {
        base: shadow.sm,
        ...ringed(ring("4px", alpha.ring50, shadow.sm), false, shadow.sm),
      },
      [lyra]: ringed(ring("1px", alpha.ring50), true),
      [maia]: {
        base: shadow.sm,
        ...ringed(ring("4px", alpha.ring50, shadow.sm), false, shadow.sm),
      },
      [mira]: ringed(ring("2px", alpha.ring30), true),
      // Luma and Rhea ring their thumb in `black/10` at rest.
      [luma]: {
        base: ring("1px", "rgb(0 0 0 / 0.1)", shadow.md),
        ...ringed(
          ring("4px", alpha.ring30, shadow.md),
          false,
          ring("1px", "rgb(0 0 0 / 0.1)", shadow.md)
        ),
      },
      [rhea]: {
        base: ring("1px", "rgb(0 0 0 / 0.1)", shadow.md),
        ...ringed(
          ring("4px", alpha.ring30, shadow.md),
          false,
          ring("1px", "rgb(0 0 0 / 0.1)", shadow.md)
        ),
      },
      [sera]: ringed(ring("2px", alpha.ring30), false),
    },
    transitionProperty: {
      base: "color, box-shadow",
      [maia]: "color, background-color, border-color",
      [luma]: "color, box-shadow, background-color",
      [sera]: "color, background-color, border-color",
    },
    transitionDuration: { base: duration[150], [rhea]: duration[200] },
    transitionTimingFunction: easing.inOut,
    // A larger target than the thumb: `after:absolute after:-inset-2`.
    "::after": {
      content: { [nova]: '""', [lyra]: '""', [mira]: '""' },
      position: "absolute",
      inset: `calc(${space[2]} * -1)`,
    },
  }),

  // React Aria's thumb, centred across the track (`group-data-horizontal:top-[50%]` …).
  thumbAria: css({
    top: { [IN_HORIZONTAL]: "50%" },
    left: { [IN_VERTICAL]: "50%" },
  }),
}
