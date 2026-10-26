/**
 * How a popup, a modal and a backdrop come and go, the same in every style: shadcn/ui's
 * `animate-in fade-in-0 zoom-in-95 data-[side=*]:slide-in-from-*-2 duration-100` and their
 * `animate-out` counterparts, from its `cn-*-content` and `cn-*-overlay` rules.
 *
 * Written as transitions from each base's first frame and exit (`overlay.starting`, `.ending`) rather
 * than as keyframes: a transition reverses mid-flight, so a popup closed while it opens leaves from
 * where it is. Timing is `tw-animate-css`'s: 100ms on the CSS `ease` curve. Ark UI keeps a closing
 * popup mounted only while an animation runs, so on Ark the same fade and zoom are keyframes on its
 * `data-state` (`presence`), without the slide.
 */
import { css, keyframes } from "@kirana-style/core"

import { duration, easing, space } from "../core/scales"
import { overlay, presence, side, when } from "../core/states"

/**
 * What a base's positioner tells its popup, under each base's own name: Base UI's, then React
 * Aria's, then Ark UI's. Only the base in use sets its variable, so one value serves them all.
 */
export const ANCHOR_WIDTH =
  "var(--anchor-width, var(--trigger-width, var(--reference-width)))"
export const TRANSFORM_ORIGIN =
  "var(--transform-origin, var(--trigger-anchor-point))"

/** `slide-in-from-*-2`: how far a popup travels in from its trigger's side. */
const SLIDE = space[2]
const BACK = `calc(${SLIDE} * -1)`

/** Ark UI's enter and exit: `animate-in fade-in-0 zoom-in-95` and its `animate-out`. */
const zoomIn = keyframes({
  from: { opacity: 0, scale: 0.95 },
  to: { opacity: 1, scale: 1 },
})
const zoomOut = keyframes({
  from: { opacity: 1, scale: 1 },
  to: { opacity: 0, scale: 0.95 },
})
const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const fadeOut = keyframes({ from: { opacity: 1 }, to: { opacity: 0 } })

const arkTiming = {
  animationDuration: duration[100],
  animationTimingFunction: easing.ease,
}

const fadeAndZoom = {
  transitionDuration: duration[100],
  transitionTimingFunction: easing.ease,
  ...arkTiming,
  animationName: {
    ...when(presence.open, zoomIn),
    ...when(presence.closed, zoomOut),
  },
  opacity: {
    base: 1,
    ...when(overlay.starting, 0),
    ...when(overlay.ending, 0),
  },
  scale: {
    base: 1,
    ...when(overlay.starting, 0.95),
    ...when(overlay.ending, 0.95),
  },
}

/**
 * A popup anchored to a trigger: it fades, scales, and slides in from the trigger's side. The slide
 * is written per base, each base's first frame with its own side attribute, so no base's state is
 * read with another's.
 */
export const popupMotion = css({
  ...fadeAndZoom,
  transformOrigin: TRANSFORM_ORIGIN,
  transitionProperty: "opacity, scale, translate",
  translate: {
    base: "0",
    [overlay.starting.base]: {
      base: "0",
      [side.top.base]: `0 ${SLIDE}`,
      [side.bottom.base]: `0 ${BACK}`,
      [side.left.base]: `${SLIDE} 0`,
      [side.right.base]: `${BACK} 0`,
      // A logical side slides from the other way when the text runs right to left
      // (cn-dropdown-menu-content-logical, cn-select-content-logical).
      [side.inlineStart.base]: { base: `${SLIDE} 0`, ":dir(rtl)": `${BACK} 0` },
      [side.inlineEnd.base]: { base: `${BACK} 0`, ":dir(rtl)": `${SLIDE} 0` },
    },
    [overlay.starting.aria]: {
      base: "0",
      [side.top.aria]: `0 ${SLIDE}`,
      [side.bottom.aria]: `0 ${BACK}`,
      [side.left.aria]: `${SLIDE} 0`,
      [side.right.aria]: `${BACK} 0`,
    },
  },
})

/** A centred modal: it fades and scales in place. */
export const modalMotion = css({
  ...fadeAndZoom,
  transitionProperty: "opacity, scale",
})

/** The backdrop behind a modal: it fades. */
export const backdropMotion = css({
  transitionProperty: "opacity",
  transitionDuration: duration[100],
  transitionTimingFunction: easing.ease,
  ...arkTiming,
  animationName: {
    ...when(presence.open, fadeIn),
    ...when(presence.closed, fadeOut),
  },
  opacity: {
    base: 1,
    ...when(overlay.starting, 0),
    ...when(overlay.ending, 0),
  },
})
