/**
 * Spinner: shadcn/ui's `bases/base/ui/spinner.tsx` (MIT), the same in every style: a loader icon,
 * `size-4 animate-spin`. A badge's spinner is the badge's icon size, which upstream's badge forces
 * on every `svg` child and Kirana writes below the spinner's own size.
 */
import { css, keyframes } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space, spacing } from "../core/scales"

/** A badge's own child (its `[&>svg]:size-3!`, `size-2.5` in Mira). */
const IN_BADGE = ':is([data-slot="badge"] > *)'

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

export const spinner = css({
  width: {
    base: space[4],
    [IN_BADGE]: { base: space[3], [axes.style.mira]: spacing(2.5) },
  },
  height: {
    base: space[4],
    [IN_BADGE]: { base: space[3], [axes.style.mira]: spacing(2.5) },
  },
  animationName: spin,
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
})
