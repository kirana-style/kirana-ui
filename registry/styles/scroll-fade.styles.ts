/**
 * shadcn/ui's `scroll-fade` utilities (`shadcn/tailwind.css`, MIT), for the element that scrolls:
 * it fades out at an edge that has more to scroll, revealed as it scrolls where the browser drives
 * an animation by scroll (`animation-timeline`), and always faded where it cannot. A region that
 * does not overflow does not fade. The fade is a mask, so it dissolves the content over any
 * background.
 *
 * - `scrollFade` (`scrollFadeY`): the top and bottom. `scrollFadeX`: the start and end, the
 *   gradient turned in a right-to-left page.
 * - `scrollFadeT`, `scrollFadeB`, `scrollFadeL`, `scrollFadeR`: one edge. `scrollFadeS`,
 *   `scrollFadeE`: the inline start or end, which mirror in a right-to-left page.
 * - `scrollFadeNone`: no fade, after any of them.
 *
 * Each replaces the mask of one before it, so `[scrollFadeX, scrollFade]` fades the top and bottom.
 *
 * Its knobs are tokens set on the region, upstream's variables (`scrollFadeCtx`): `size`, the depth
 * (`min(12%, 2.5rem)`); `topSize`, `bottomSize`, `startSize` and `endSize` for one edge; and
 * `reveal`, the distance scrolled while a fade eases in (6rem). Each edge's depth is a registered
 * token too, so it eases instead of jumping.
 */
import { css, fallback, keyframes } from "@kirana-style/core"

import { scrollFadeCtx } from "../core/context"
import { space } from "../core/scales"

const { top, bottom, start, end } = scrollFadeCtx

/**
 * An edge's depth: its own size, else every edge's, else `min(12%, calc(var(--spacing) * 10))`.
 */
const DEPTH = {
  t: fallback(
    scrollFadeCtx.topSize,
    scrollFadeCtx.size,
    `min(12%, ${space[10]})`
  ),
  b: fallback(
    scrollFadeCtx.bottomSize,
    scrollFadeCtx.size,
    `min(12%, ${space[10]})`
  ),
  s: fallback(
    scrollFadeCtx.startSize,
    scrollFadeCtx.size,
    `min(12%, ${space[10]})`
  ),
  e: fallback(
    scrollFadeCtx.endSize,
    scrollFadeCtx.size,
    `min(12%, ${space[10]})`
  ),
}
const depth = (edge: keyof typeof DEPTH) => DEPTH[edge]
/** How far the region scrolls while a fade eases in or out. */
const REVEAL = fallback(scrollFadeCtx.reveal, space[24])

const revealTop = keyframes({
  from: { [top]: "0px" },
  to: { [top]: depth("t") },
})
const revealBottom = keyframes({
  from: { [bottom]: depth("b") },
  to: { [bottom]: "0px" },
})
const revealStart = keyframes({
  from: { [start]: "0px" },
  to: { [start]: depth("s") },
})
const revealEnd = keyframes({
  from: { [end]: depth("e") },
  to: { [end]: "0px" },
})

const SCROLLING = "@supports (animation-timeline: scroll())"
const NOT_SCROLLING = "@supports not (animation-timeline: scroll())"

/** A start edge eases in over the first stretch scrolled, an end edge out over the last. */
const AT_START = `0 ${REVEAL}`
const AT_END = `calc(100% - ${REVEAL}) 100%`

/** The reveal of an edge or two (`names`), driven by the region's scrolling along `axis`. */
const reveal = (names: string, axis: string, range: string) => ({
  maskComposite: "intersect",
  maskRepeat: "no-repeat",
  animationName: { [SCROLLING]: names },
  animationDuration: { [SCROLLING]: "1ms" },
  animationTimingFunction: { [SCROLLING]: "ease-in-out" },
  animationTimeline: { [SCROLLING]: `scroll(self ${axis})` },
  animationRange: { [SCROLLING]: range },
  animationFillMode: { [SCROLLING]: "both" },
})

const both = (to: string, from: string, until: string) =>
  `linear-gradient(${to}, transparent 0, #000 ${from}, #000 calc(100% - ${until}), transparent 100%)`
const leading = (to: string, edge: string) =>
  `linear-gradient(${to}, transparent 0, #000 ${edge}, #000 100%)`
const trailing = (to: string, edge: string) =>
  `linear-gradient(${to}, #000 0, #000 calc(100% - ${edge}), transparent 100%)`

/** `scroll-fade`, `scroll-fade-y`: the top and bottom. */
export const scrollFade = css(
  reveal(`${revealTop}, ${revealBottom}`, "y", `${AT_START}, ${AT_END}`),
  {
    maskImage: { "*": null, base: both("to bottom", top, bottom) },
    [top]: { [NOT_SCROLLING]: depth("t") },
    [bottom]: { [NOT_SCROLLING]: depth("b") },
  }
)
export const scrollFadeY = scrollFade

/** `scroll-fade-x`: the start and end of a region that scrolls inline. */
export const scrollFadeX = css(
  reveal(`${revealStart}, ${revealEnd}`, "inline", `${AT_START}, ${AT_END}`),
  {
    maskImage: {
      "*": null,
      base: both("to right", start, end),
      ":dir(rtl)": both("to left", start, end),
    },
    [start]: { [NOT_SCROLLING]: depth("s") },
    [end]: { [NOT_SCROLLING]: depth("e") },
  }
)

/** `scroll-fade-t`: the top only, once the region has scrolled from it. */
export const scrollFadeT = css(reveal(revealTop, "y", AT_START), {
  maskImage: { "*": null, base: leading("to bottom", top) },
  [top]: { [NOT_SCROLLING]: depth("t") },
})

/** `scroll-fade-b`: the bottom only, until the region reaches it (a message list). */
export const scrollFadeB = css(reveal(revealBottom, "y", AT_END), {
  maskImage: { "*": null, base: trailing("to bottom", bottom) },
  [bottom]: { [NOT_SCROLLING]: depth("b") },
})

/** `scroll-fade-l`: the left edge, whatever the direction. */
export const scrollFadeL = css(reveal(revealStart, "x", AT_START), {
  maskImage: { "*": null, base: leading("to right", start) },
  [start]: { [NOT_SCROLLING]: depth("s") },
})

/** `scroll-fade-r`: the right edge, whatever the direction. */
export const scrollFadeR = css(reveal(revealEnd, "x", AT_END), {
  maskImage: { "*": null, base: trailing("to right", end) },
  [end]: { [NOT_SCROLLING]: depth("e") },
})

/** `scroll-fade-s`: the inline start, the right edge in a right-to-left page. */
export const scrollFadeS = css(reveal(revealStart, "inline", AT_START), {
  maskImage: {
    "*": null,
    base: leading("to right", start),
    ":dir(rtl)": leading("to left", start),
  },
  [start]: { [NOT_SCROLLING]: depth("s") },
})

/** `scroll-fade-e`: the inline end, the left edge in a right-to-left page. */
export const scrollFadeE = css(reveal(revealEnd, "inline", AT_END), {
  maskImage: {
    "*": null,
    base: trailing("to right", end),
    ":dir(rtl)": trailing("to left", end),
  },
  [end]: { [NOT_SCROLLING]: depth("e") },
})

/** `scroll-fade-none`: no fade, whichever of the others came before it. */
export const scrollFadeNone = css({ maskImage: { "*": null, base: "none" } })
