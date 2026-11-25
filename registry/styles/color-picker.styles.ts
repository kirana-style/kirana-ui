/**
 * Color Picker, in every style: the registry's own, on Kirana UI Primitives' color picker, in
 * shadcn/ui's design language. Its popup is the registry's Popover (`popover.styles.ts`), its
 * trigger an outline Button, its inputs the registry's Input and its slider track and thumb the
 * registry's Slider (`slider.styles.ts`), so each follows the style chosen.
 *
 * The colours it draws come from the variables the primitive writes on each part: `--hue-color` on
 * the area and a track, `--color` on a thumb, a swatch and a preset. The hue track's rainbow, the
 * area's two gradients and the checkerboard under a colour with alpha are written here, the one
 * place a raw colour is right. The thumbs' places are written inline by the primitive (`position`,
 * `left`, `top`, `translate`), so nothing here positions them.
 *
 * Written once for every style: the area's height and thumb, the swatches' sizes and the
 * checkerboard's square, the inline picker's width and gap.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import { radius, theme, alpha } from "../core/tokens"
import { shadow, space } from "../core/scales"
import { colorPickerState, when } from "../core/states"
import { focusRing } from "./control"

const { lyra, maia, luma, rhea, sera } = axes.style

const SLIDER = colorPickerState.channelSlider
const TRACK = colorPickerState.channelSliderTrack

/** Every hue, from red round to red. */
const HUES = "#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00"

/** A grey checkerboard, seen through a colour with alpha: one square of it is `space[1]`. */
const CHECKER = `conic-gradient(${theme.muted} 0 25%, ${theme.background} 0 50%, ${theme.muted} 0 75%, ${theme.background} 0)`
const CHECKER_SIZE = `${space[2]} ${space[2]}`

/** A colour painted over the checkerboard. */
const OVER_CHECKER = (color: string) =>
  `linear-gradient(${color}, ${color}), ${CHECKER}`

/** The corners of a small square (a swatch, a preset): none in Lyra and Sera. */
const SMALL_RADIUS = {
  base: radius.sm,
  [lyra]: "0",
  [maia]: radius.md,
  [luma]: radius.md,
  [rhea]: radius.md,
  [sera]: "0",
}

/** A hairline inside a square, so a colour close to the surface still shows its edge. */
const HAIRLINE = `inset 0 0 0 1px ${alpha.foreground10}`

export const colorPicker = {
  // The root: a column when the picker's parts are inside it, without a popover; the width of its
  // trigger otherwise.
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
    width: {
      base: "fit-content",
      ':has(> [data-slot="color-picker-area"])': space[64],
    },
  }),

  // The trigger's swatch, the size of the button's icons; `data-icon` draws the button's padding in.
  triggerSwatch: css({
    width: ctx.iconSize,
    height: ctx.iconSize,
  }),

  // The trigger's text: trimmed to its capitals as a button's label is, its figures one width.
  valueText: css({ fontVariantNumeric: "tabular-nums" }),

  // The two-dimensional field: saturation across (the way the text runs), brightness up, over the
  // hue the primitive writes.
  area: css({
    position: "relative",
    width: "100%",
    height: space[36],
    flexShrink: 0,
    touchAction: "none",
    userSelect: "none",
    cursor: "crosshair",
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [maia]: radius.xl,
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
    backgroundImage: {
      base: "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, var(--hue-color))",
      ":dir(rtl)":
        "linear-gradient(to top, #000, transparent), linear-gradient(to left, #fff, var(--hue-color))",
    },
    boxShadow: HAIRLINE,
    opacity: { ...when(colorPickerState.area.disabled, 0.5) },
  }),

  // What is dragged in the area: a ring of white around the colour under it.
  areaThumb: css({
    width: space[4],
    height: space[4],
    borderRadius: radius.full,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "var(--color)",
    outlineStyle: "none",
    boxShadow: {
      base: `0 0 0 1px rgb(0 0 0 / 0.1), ${shadow.sm}`,
      ":focus-visible": focusRing(alpha.ring50),
    },
  }),

  // A channel's slider: as tall as its thumb across a row, so it is easy to hit, and as wide down a
  // column.
  slider: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    touchAction: "none",
    userSelect: "none",
    width: { ...when(SLIDER.orientation.horizontal, "100%") },
    minHeight: {
      ...when(SLIDER.orientation.horizontal, space[4]),
      ...when(SLIDER.orientation.vertical, space[40]),
    },
    height: { ...when(SLIDER.orientation.vertical, "100%") },
    minWidth: { ...when(SLIDER.orientation.vertical, space[4]) },
    flexDirection: { ...when(SLIDER.orientation.vertical, "column") },
    opacity: { ...when(SLIDER.disabled, 0.5) },
  }),

  // Over the Slider's track: the thumb is inside it here, so it does not clip; the hues, or the
  // colour from clear to whole over the checkerboard, run the way the value does.
  track: css({
    overflow: "visible",
    backgroundImage: {
      ...when(TRACK.channel.hue, {
        base: `linear-gradient(to right, ${HUES})`,
        ":dir(rtl)": `linear-gradient(to left, ${HUES})`,
        ...when(TRACK.orientation.vertical, `linear-gradient(to top, ${HUES})`),
      }),
      ...when(TRACK.channel.alpha, {
        base: `linear-gradient(to right, transparent, var(--color)), ${CHECKER}`,
        ":dir(rtl)": `linear-gradient(to left, transparent, var(--color)), ${CHECKER}`,
        ...when(
          TRACK.orientation.vertical,
          `linear-gradient(to top, transparent, var(--color)), ${CHECKER}`
        ),
      }),
    },
    backgroundSize: {
      ...when(TRACK.channel.alpha, `100% 100%, ${CHECKER_SIZE}`),
    },
  }),

  // Over the Slider's thumb: placed by the primitive, and filled with the colour under it.
  thumb: css({
    position: null,
    backgroundColor: { "*": null, base: "var(--color)" },
  }),

  // The colour now, over the checkerboard.
  swatch: css({
    display: "block",
    flexShrink: 0,
    width: space[8],
    height: space[8],
    borderRadius: SMALL_RADIUS,
    backgroundImage: OVER_CHECKER("var(--color)"),
    backgroundSize: `100% 100%, ${CHECKER_SIZE}`,
    boxShadow: HAIRLINE,
  }),

  // A channel's input: the Input's chrome, its figures one width.
  input: css({ fontVariantNumeric: "tabular-nums" }),

  // The presets, in rows.
  swatches: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),

  // A preset: its colour over the checkerboard, ringed while it is the colour chosen.
  swatchTrigger: css({
    flexShrink: 0,
    width: space[6],
    height: space[6],
    padding: 0,
    borderWidth: 0,
    borderRadius: SMALL_RADIUS,
    backgroundImage: OVER_CHECKER("var(--color)"),
    backgroundSize: `100% 100%, ${CHECKER_SIZE}`,
    cursor: { ...when(colorPickerState.swatchTrigger.disabled, "not-allowed") },
    opacity: { ...when(colorPickerState.swatchTrigger.disabled, 0.5) },
    outlineStyle: {
      base: "none",
      ...when(colorPickerState.swatchTrigger.selected, "solid"),
    },
    outlineWidth: "2px",
    outlineColor: theme.primary,
    outlineOffset: "2px",
    boxShadow: {
      base: HAIRLINE,
      ":focus-visible": `${HAIRLINE}, 0 0 0 3px ${alpha.ring50}`,
    },
  }),

  // A row of the picker's controls: a swatch, an input, the eye dropper.
  controls: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
}
