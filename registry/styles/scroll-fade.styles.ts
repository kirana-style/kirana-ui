/**
 * shadcn/ui's `scroll-fade` utility (`shadcn/tailwind.css`, MIT), which its examples put on a
 * scrolling region: the region fades out at an edge that has more to scroll, revealed as it scrolls
 * where the browser drives an animation by scroll (`animation-timeline`), and always faded where it
 * cannot. The site's, for the examples: no component uses it.
 */
import { css, keyframes } from "@kirana-style/core"

import { space } from "../core/scales"

/** `min(12%, calc(var(--spacing) * 10))`, unless the region sets its own. */
const SIZE = `var(--scroll-fade-size, min(12%, ${space[10]}))`

/** A frame that moves a custom property, which `keyframes()`'s type does not take (KF-055). */
type Frame = Parameters<typeof keyframes>[0][string]

const revealTop = keyframes({
  from: { "--scroll-fade-t": "0px" } as Frame,
  to: { "--scroll-fade-t": SIZE } as Frame,
})
const revealBottom = keyframes({
  from: { "--scroll-fade-b": SIZE } as Frame,
  to: { "--scroll-fade-b": "0px" } as Frame,
})

const SCROLLING = "@supports (animation-timeline: scroll())"
const NOT_SCROLLING = "@supports not (animation-timeline: scroll())"

export const scrollFade = css({
  "--scroll-fade-block":
    "linear-gradient(to bottom, transparent 0, #000 var(--scroll-fade-t, 0px), #000 calc(100% - var(--scroll-fade-b, 0px)), transparent 100%)",
  maskImage: "var(--scroll-fade-mask, var(--scroll-fade-block))",
  maskComposite: "intersect",
  maskRepeat: "no-repeat",
  animationName: { [SCROLLING]: `${revealTop}, ${revealBottom}` },
  animationDuration: { [SCROLLING]: "1ms" },
  animationTimingFunction: { [SCROLLING]: "ease-in-out" },
  animationTimeline: { [SCROLLING]: "scroll(self y), scroll(self y)" },
  animationRange: {
    [SCROLLING]: `0 var(--scroll-fade-reveal, ${space[24]}), calc(100% - var(--scroll-fade-reveal, ${space[24]})) 100%`,
  },
  animationFillMode: { [SCROLLING]: "both" },
  "--scroll-fade-t": { [NOT_SCROLLING]: SIZE },
  "--scroll-fade-b": { [NOT_SCROLLING]: SIZE },
})
