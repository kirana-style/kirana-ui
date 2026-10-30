/**
 * Upstream's message animation presets (`@/lib/message-animations`), each the entrance a sent
 * message plays: Motion's variants there, CSS keyframes here. Its springs are written out as
 * `linear()` curves (Pop: stiffness 500, damping 34, mass 0.7; Spring Bounce: 520, 30, 0.7), sampled
 * until they settle. Without motion, none plays (`prefers-reduced-motion`, Motion's
 * `useReducedMotion`).
 */
import { css, keyframes } from "@kirana-style/core"
import type { Sx } from "../../../lib/sx"

const REDUCED = "@media (prefers-reduced-motion: reduce)"
/** Motion's `easeOut`. */
const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)"
const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"
const POP_SPRING =
  "linear(0, 0.029, 0.1, 0.193, 0.294, 0.395, 0.491, 0.578, 0.655, 0.722, 0.778, 0.825, 0.864, 0.895, 0.921, 0.941, 0.956, 0.968, 0.978, 0.984, 0.99, 0.993, 0.996, 0.998, 1)"
const BOUNCE_SPRING =
  "linear(0, 0.049, 0.162, 0.304, 0.449, 0.583, 0.698, 0.793, 0.867, 0.922, 0.961, 0.987, 1.004, 1.013, 1.017, 1.018, 1.017, 1.015, 1.012, 1.01, 1.007, 1.005, 1.004, 1.002, 1)"

// Each preset's starting look, which the element animates from to its own.
const fadeFrom = keyframes({ from: { opacity: 0 } })
const slideUpFrom = keyframes({ from: { opacity: 0, translate: "0 10px" } })
const slideSideFrom = keyframes({ from: { opacity: 0, translate: "18px 0" } })
const popFrom = keyframes({
  from: { opacity: 0, scale: "0.94", translate: "0 6px" },
})
const springBounceFrom = keyframes({
  from: { opacity: 0, scale: "0.96", translate: "0 12px" },
})
const blurFadeFrom = keyframes({
  from: { opacity: 0, filter: "blur(4px)", translate: "0 6px" },
})
const scaleFadeFrom = keyframes({ from: { opacity: 0, scale: "0.98" } })

const ANIMATIONS = [
  {
    id: "fade",
    name: "Fade",
    sx: css({
      animationName: { base: fadeFrom, [REDUCED]: "none" },
      animationDuration: "220ms",
      animationTimingFunction: EASE_OUT,
    }),
  },
  {
    id: "slide-up",
    name: "Slide Up",
    sx: css({
      animationName: { base: slideUpFrom, [REDUCED]: "none" },
      animationDuration: "260ms",
      animationTimingFunction: EXPO_OUT,
    }),
  },
  {
    id: "slide-side",
    name: "Slide Side",
    sx: css({
      animationName: { base: slideSideFrom, [REDUCED]: "none" },
      animationDuration: "280ms",
      animationTimingFunction: EXPO_OUT,
    }),
  },
  {
    id: "pop",
    name: "Pop",
    sx: css({
      animationName: { base: popFrom, [REDUCED]: "none" },
      animationDuration: "235ms",
      animationTimingFunction: POP_SPRING,
      transformOrigin: "100% 100%",
    }),
  },
  {
    id: "spring-bounce",
    name: "Spring Bounce",
    sx: css({
      animationName: { base: springBounceFrom, [REDUCED]: "none" },
      animationDuration: "301ms",
      animationTimingFunction: BOUNCE_SPRING,
    }),
  },
  {
    id: "blur-fade",
    name: "Blur Fade",
    sx: css({
      animationName: { base: blurFadeFrom, [REDUCED]: "none" },
      animationDuration: "280ms",
      animationTimingFunction: EASE_OUT,
    }),
  },
  {
    id: "scale-fade",
    name: "Scale Fade",
    sx: css({
      animationName: { base: scaleFadeFrom, [REDUCED]: "none" },
      animationDuration: "240ms",
      animationTimingFunction: EASE_OUT,
    }),
  },
] as const satisfies { id: string; name: string; sx: Sx }[]

type MessageAnimationPreset = (typeof ANIMATIONS)[number]
type MessageAnimationId = MessageAnimationPreset["id"]

const MESSAGE_ANIMATIONS = Object.fromEntries(
  ANIMATIONS.map((preset) => [preset.id, preset])
) as Record<MessageAnimationId, MessageAnimationPreset>

export {
  MESSAGE_ANIMATIONS,
  type MessageAnimationId,
  type MessageAnimationPreset,
}
