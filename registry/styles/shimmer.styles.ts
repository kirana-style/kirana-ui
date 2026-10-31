/**
 * shadcn/ui's `shimmer` utilities (`shadcn/tailwind.css`, MIT): a highlight sweeping across text,
 * painted with `background-clip: text` from `currentColor`, so it suits any colour and brightens in
 * the dark. It sweeps with the reading direction and, without motion
 * (`prefers-reduced-motion: reduce`), is plain text.
 *
 * - `shimmer`, and `shimmerOnce` (one sweep), `shimmerReverse` and `shimmerNone` after it.
 * - `shimmerProperties`: the same declarations as an object, for a component that shimmers under a
 *   condition of its own (a running trace line, an uploading attachment's title).
 *
 * Its knobs are upstream's variables, set on the text: `--shimmer-color` (the highlight),
 * `--shimmer-duration` (one sweep, 2s), `--shimmer-spread` (the band, `calc(3ch + 40px)`) and
 * `--shimmer-angle` (its tilt, 20deg).
 */
import { css, keyframes } from "@kirana-style/core"

import { DARK_SCHEME, axes } from "../core/axes"

const sweep = keyframes({
  from: { backgroundPosition: "100% 0" },
  to: { backgroundPosition: "0 0" },
})
const REDUCED = "@media (prefers-reduced-motion: reduce)"

const LIGHT =
  "var(--shimmer-color, oklch(from currentColor l c h / calc(alpha * 0.2)))"
const DARK =
  "var(--shimmer-color, oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4)))"
const HIGHLIGHT = "var(--_shimmer-highlight)"
const SPREAD = "var(--shimmer-spread, calc(3ch + 40px))"
const MIXED = `color-mix(in oklch, ${HIGHLIGHT}, currentColor 50%)`
const GRADIENT = `linear-gradient(calc(90deg + var(--shimmer-angle, 20deg)), currentColor calc(50% - ${SPREAD}), ${MIXED} calc(50% - ${SPREAD} * 0.5), ${HIGHLIGHT} 50%, ${MIXED} calc(50% + ${SPREAD} * 0.5), currentColor calc(50% + ${SPREAD}))`

export const shimmerProperties = {
  "--_shimmer-highlight": {
    base: LIGHT,
    [DARK_SCHEME]: { base: DARK, [axes.mode.light]: LIGHT },
    [axes.mode.dark]: DARK,
  },
  // Without motion, plain text.
  backgroundImage: { base: GRADIENT, [REDUCED]: "none" },
  backgroundRepeat: "no-repeat",
  backgroundSize: `calc(200% + ${SPREAD} * 2) 100%`,
  backgroundPosition: "0 0",
  backgroundClip: "text",
  WebkitTextFillColor: { base: "transparent", [REDUCED]: "currentColor" },
  animationName: { base: sweep, [REDUCED]: "none" },
  animationDuration: "var(--shimmer-duration, 2s)",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDirection: { base: "normal", ":dir(rtl)": "reverse" },
} as const

/** `shimmer`. */
export const shimmer = css(shimmerProperties)

/** `shimmer-once`: one sweep, a reveal when the work is done. */
export const shimmerOnce = css({ animationIterationCount: 1 })

/** `shimmer-reverse`: the other way. */
export const shimmerReverse = css({
  animationDirection: { "*": null, base: "reverse" },
})

/** `shimmer-none`: plain text again. */
export const shimmerNone = css({
  backgroundImage: "none",
  WebkitTextFillColor: "currentColor",
})
