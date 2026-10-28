/**
 * Spinner: shadcn/ui's `bases/base/ui/spinner.tsx` (MIT), the same in every style: a loader icon,
 * `size-4 animate-spin`.
 */
import { css, keyframes } from "@kirana-style/core"

import { space } from "../core/scales"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

export const spinner = css({
  width: space[4],
  height: space[4],
  animationName: spin,
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
})
