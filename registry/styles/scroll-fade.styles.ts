/**
 * shadcn/ui's `scroll-fade` utility (`shadcn/tailwind.css`, MIT), which its examples put on a
 * scrolling region: the region fades out at an edge that has more to scroll, revealed as it scrolls
 * where the browser drives an animation by scroll (`animation-timeline`), and always faded where it
 * cannot. `scrollFade` fades the top and bottom (the examples' regions); `scrollFadeX` the start and
 * end, which an AttachmentGroup scrolls; `scrollFadeB` the bottom, which a MessageScroller fades.
 */
import { css, keyframes } from "@kirana-style/core"

import { space } from "../core/scales"

/** `min(12%, calc(var(--spacing) * 10))`, unless the region sets its own. */
const SIZE = `var(--scroll-fade-size, min(12%, ${space[10]}))`

const revealTop = keyframes({
  from: { "--scroll-fade-t": "0px" },
  to: { "--scroll-fade-t": SIZE },
})
const revealBottom = keyframes({
  from: { "--scroll-fade-b": SIZE },
  to: { "--scroll-fade-b": "0px" },
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
  animationDuration: { [SCROLLING]: "1ms, 1ms" },
  animationDelay: { [SCROLLING]: "0s, 0s" },
  animationIterationCount: { [SCROLLING]: "1, 1" },
  animationDirection: { [SCROLLING]: "normal, normal" },
  animationTimingFunction: { [SCROLLING]: "ease-in-out, ease-in-out" },
  animationTimeline: { [SCROLLING]: "scroll(self y), scroll(self y)" },
  animationRange: {
    [SCROLLING]: `0 var(--scroll-fade-reveal, ${space[24]}), calc(100% - var(--scroll-fade-reveal, ${space[24]})) 100%`,
  },
  animationFillMode: { [SCROLLING]: "both" },
  "--scroll-fade-t": { [NOT_SCROLLING]: SIZE },
  "--scroll-fade-b": { [NOT_SCROLLING]: SIZE },
})

const revealStart = keyframes({
  from: { "--scroll-fade-s": "0px" },
  to: { "--scroll-fade-s": SIZE },
})
const revealEnd = keyframes({
  from: { "--scroll-fade-e": SIZE },
  to: { "--scroll-fade-e": "0px" },
})

/** `scroll-fade-x`: the start and end, the gradient turned in a right-to-left page. */
export const scrollFadeX = css({
  "--scroll-fade-inline": {
    base: "linear-gradient(to right, transparent 0, #000 var(--scroll-fade-s, 0px), #000 calc(100% - var(--scroll-fade-e, 0px)), transparent 100%)",
    ":dir(rtl)":
      "linear-gradient(to left, transparent 0, #000 var(--scroll-fade-s, 0px), #000 calc(100% - var(--scroll-fade-e, 0px)), transparent 100%)",
  },
  maskImage: "var(--scroll-fade-mask, var(--scroll-fade-inline))",
  maskComposite: "intersect",
  maskRepeat: "no-repeat",
  animationName: { [SCROLLING]: `${revealStart}, ${revealEnd}` },
  animationDuration: { [SCROLLING]: "1ms, 1ms" },
  animationDelay: { [SCROLLING]: "0s, 0s" },
  animationIterationCount: { [SCROLLING]: "1, 1" },
  animationDirection: { [SCROLLING]: "normal, normal" },
  animationTimingFunction: { [SCROLLING]: "ease-in-out, ease-in-out" },
  animationTimeline: {
    [SCROLLING]: "scroll(self inline), scroll(self inline)",
  },
  animationRange: {
    [SCROLLING]: `0 var(--scroll-fade-reveal, ${space[24]}), calc(100% - var(--scroll-fade-reveal, ${space[24]})) 100%`,
  },
  animationFillMode: { [SCROLLING]: "both" },
  "--scroll-fade-s": { [NOT_SCROLLING]: SIZE },
  "--scroll-fade-e": { [NOT_SCROLLING]: SIZE },
})

/** `scroll-fade-b`: the bottom only, revealed as the region nears its end (a message list). */
export const scrollFadeB = css({
  "--scroll-fade-mask":
    "linear-gradient(to bottom, #000 0, #000 calc(100% - var(--scroll-fade-b, 0px)), transparent 100%)",
  maskImage: "var(--scroll-fade-mask)",
  maskComposite: "intersect",
  maskRepeat: "no-repeat",
  animationName: { [SCROLLING]: revealBottom },
  animationDuration: { [SCROLLING]: "1ms" },
  animationTimingFunction: { [SCROLLING]: "ease-in-out" },
  animationTimeline: { [SCROLLING]: "scroll(self y)" },
  animationRange: {
    [SCROLLING]: `calc(100% - var(--scroll-fade-reveal, ${space[24]})) 100%`,
  },
  animationFillMode: { [SCROLLING]: "both" },
  "--scroll-fade-b": { [NOT_SCROLLING]: SIZE },
})
