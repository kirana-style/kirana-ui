/**
 * Sonner's toaster, in every style: shadcn/ui's `bases/base/ui/sonner.tsx` and
 * `bases/aria/ui/sonner.tsx` with the `cn-toast` rule of its style files (MIT). Sonner draws the
 * toasts with its own stylesheet, unlayered, from the variables the toaster sets inline: the
 * popover's colours and the radius.
 *
 * Upstream's `cn-toast` rounds the toast, but Sonner's own `border-radius: var(--border-radius)`
 * outranks a layered rule, so only Rhea's `rounded-2xl!` and Sera's `rounded-none!` reach it. Here
 * the toaster's `--border-radius` reads `--sonner-radius`, which this module sets for each style.
 */
import { css, keyframes } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { radius } from "../core/tokens"

const { rhea, sera } = axes.style

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

export const sonner = {
  // cn-toast, as the radius Sonner reads.
  toaster: css({
    "--sonner-radius": {
      base: radius.lg,
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
  }),
  // The icons' `size-4`.
  icon: css({ width: space[4], height: space[4] }),
  // The loading icon's `size-4 animate-spin`.
  loading: css({
    width: space[4],
    height: space[4],
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
}
