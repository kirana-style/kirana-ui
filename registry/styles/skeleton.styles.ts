/**
 * Skeleton, in every style: shadcn/ui's `bases/base/ui/skeleton.tsx` (the same in `bases/aria`) with
 * the `cn-skeleton` rules of its style files (MIT), at commit `481d523`. Nova is the base look; the
 * other styles override its corners. Sera's has none.
 */
import { css, keyframes } from "@kirana-style/core"

import { axes } from "../core/axes"
import { radius, theme } from "../core/tokens"

const { lyra, maia, luma, rhea, sera } = axes.style

/** Tailwind's `animate-pulse`. */
const pulse = keyframes({ "50%": { opacity: 0.5 } })

export const skeleton = css({
  backgroundColor: theme.muted,
  animationName: pulse,
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
  borderRadius: {
    base: radius.md,
    [lyra]: "0",
    [maia]: radius.xl,
    [luma]: radius["2xl"],
    [rhea]: radius["2xl"],
    [sera]: "0",
  },
})
