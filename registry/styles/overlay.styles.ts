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
 * A popup anchored to a trigger: it fades, scales, and slides in from the trigger's side, on each
 * base's first frame with that base's side attribute.
 */
export const popupMotion = css({
  ...fadeAndZoom,
  transformOrigin: TRANSFORM_ORIGIN,
  transitionProperty: "opacity, scale, translate",
  // Written once for every base: a base's first frame never meets another base's side attribute,
  // so Kirana leaves those pairs out of the stylesheet, quietly (`exclusiveAcross`).
  translate: {
    base: "0",
    ...when(overlay.starting, {
      base: "0",
      ...when(side.top, `0 ${SLIDE}`),
      ...when(side.bottom, `0 ${BACK}`),
      ...when(side.left, `${SLIDE} 0`),
      ...when(side.right, `${BACK} 0`),
      // A logical side slides from the other way when the text runs right to left
      // (cn-dropdown-menu-content-logical, cn-select-content-logical).
      ...when(side.inlineStart, {
        base: `${SLIDE} 0`,
        ":dir(rtl)": `${BACK} 0`,
      }),
      ...when(side.inlineEnd, { base: `${BACK} 0`, ":dir(rtl)": `${SLIDE} 0` }),
    }),
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
