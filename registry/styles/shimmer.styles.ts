/**
 * shadcn/ui's `shimmer` utility (`shadcn/tailwind.css`, MIT): a highlight sweeping across text, as
 * a style object to spread (an attachment's title while it uploads, the Marker example's text).
 * Without motion it is plain text (`prefers-reduced-motion: reduce`).
 */
import { keyframes } from "@kirana-style/core"

import { DARK_SCHEME, axes } from "../core/axes"

const sweep = keyframes({
  from: { backgroundPosition: "100% 0" },
  to: { backgroundPosition: "0 0" },
})
const REDUCED = "@media (prefers-reduced-motion: reduce)"
const GRADIENT =
  "linear-gradient(90deg, currentColor calc(50% - var(--spread)), color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% - var(--spread) * 0.5), var(--highlight) 50%, color-mix(in oklch, var(--highlight), currentColor 50%) calc(50% + var(--spread) * 0.5), currentColor calc(50% + var(--spread)))"
export const shimmer = {
  "--spread": "calc(3ch + 40px)",
  "--highlight": {
    base: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    [DARK_SCHEME]: {
      base: "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
      [axes.mode.light]: "oklch(from currentColor l c h / calc(alpha * 0.2))",
    },
    [axes.mode.dark]:
      "oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4))",
  },
  backgroundRepeat: "no-repeat",
  backgroundSize: "calc(200% + var(--spread) * 2) 100%",
  backgroundPosition: "0 0",
  backgroundClip: "text",
  animation: { base: `${sweep} 2s linear infinite`, [REDUCED]: "none" },
  // Without motion, plain text (`prefers-reduced-motion: reduce`).
  backgroundImage: { base: GRADIENT, [REDUCED]: "none" },
  WebkitTextFillColor: { base: "transparent", [REDUCED]: "currentColor" },
} as const
