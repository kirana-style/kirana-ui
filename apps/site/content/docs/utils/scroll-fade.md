---
title: Scroll Fade
description: Styles for adding a fade effect to the edges of a scroll container.
section: utils
order: 1
keywords: [scroll fade, scroll, mask, fade, overflow, utility]
---

# Scroll Fade

<!-- ::preview item="scroll-fade-demo" height="370" -->

## Installation

The scroll fade styles are one file, `scroll-fade.styles.ts`. The components that fade as they scroll, like [Code Block](/docs/components/code-block) and [Message Scroller](/docs/components/message-scroller), install it with them.

<!-- ::install exec="kirana-style ui add scroll-fade-styles" -->

## Usage

| Style                                               | Styles                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `scrollFade`                                        | A fade mask on the top and bottom edges., `animationTimeline: "scroll(self y)"`             |
| `scrollFadeY`                                       | The same as `scrollFade`.                                                                   |
| `scrollFadeX`                                       | A fade mask on the start and end edges., `animationTimeline: "scroll(self inline)"`         |
| `scrollFadeT`                                       | A fade mask on the top edge., `animationTimeline: "scroll(self y)"`                         |
| `scrollFadeB`                                       | A fade mask on the bottom edge., `animationTimeline: "scroll(self y)"`                      |
| `scrollFadeL`                                       | A fade mask on the left edge., `animationTimeline: "scroll(self x)"`                        |
| `scrollFadeR`                                       | A fade mask on the right edge., `animationTimeline: "scroll(self x)"`                       |
| `scrollFadeS`                                       | A fade mask on the start edge, mirrored in RTL., `animationTimeline: "scroll(self inline)"` |
| `scrollFadeE`                                       | A fade mask on the end edge, mirrored in RTL., `animationTimeline: "scroll(self inline)"`   |
| `scrollFadeNone`                                    | `maskImage: "none"`                                                                         |
| `"--scroll-fade-size"`                              | The fade's depth on every edge.                                                             |
| `"--scroll-fade-t-size"` … `"--scroll-fade-e-size"` | The fade's depth on one edge: `t`, `b`, `s` or `e`.                                         |
| `"--scroll-fade-reveal"`                            | How far the container scrolls while a fade eases in, `6rem` by default.                     |

Add `scrollFade` or `scrollFadeY` to the scroll container, the element that has `overflowY: "auto"`.

```tsx showLineNumbers
import { scrollFade } from "@/components/ui/scroll-fade.styles"

const styles = {
  list: css({ height: space[72], overflowY: "auto" }),
}

<div sx={[scrollFade, styles.list]}>{/* ... */}</div>
```

The fade is scroll-aware and tracks the scroll position:

- At rest, the top edge is crisp and the bottom edge fades to hint at more content.
- As you scroll, a fade appears at the top and both edges stay faded mid-scroll.
- At the end, the bottom edge sharpens to show you have reached the last item.

The fade is applied with `mask-image`, so it dissolves the content itself rather than overlaying a colour. The mask is a linear fade from transparent to black, so it adapts to any background without configuration. If your scroll area sits inside a card, put the background and border on a wrapper and `scrollFade` on the inner scroller, so the fade dissolves the content and not the card.

The fade eases in because each edge's depth is a registered custom property (`scrollFadeCtx`, in `core/context.ts`) that the scroll drives. In a browser without scroll-driven animations, both edges stay faded.

The [Code Block](/docs/components/code-block) and [Message Scroller](/docs/components/message-scroller) components use the scroll fade on their scrolling content.

## No Overflow, No Fade

If the content does not overflow, no fade is shown. You can apply `scrollFade` to any list without checking whether it scrolls.

<!-- ::preview item="scroll-fade-overflow" height="226" -->

## Horizontal Scrolling

Use `scrollFadeX` on containers that scroll horizontally, the element that has `overflowX: "auto"`.

<!-- ::preview item="scroll-fade-horizontal" height="256" -->

```tsx showLineNumbers
const styles = {
  row: css({ display: "flex", overflowX: "auto" }),
}

<div sx={[scrollFadeX, styles.row]}>{/* ... */}</div>
```

The horizontal fade is direction-aware. In RTL layouts, the crisp edge and the fade follow the reading direction with no extra styles needed. `--scroll-fade-size` and `scrollFadeNone` work the same for both axes.

## Edge Fades

Use the edge styles when only one edge should track the scroll position.

<!-- ::preview item="scroll-fade-edge" height="664" -->

```tsx showLineNumbers
<div sx={[scrollFadeB, styles.list]}>{/* ... */}</div>
```

The edge styles are scroll-aware. Start edges fade in after you scroll away from the start, and end edges fade out when you reach the end. Use `scrollFadeT`, `scrollFadeB`, `scrollFadeL` and `scrollFadeR` for physical edges. Use `scrollFadeS` and `scrollFadeE` for logical inline edges that mirror in RTL.

## Fade Size

The fade depth defaults to `12%` of the container, capped at `2.5rem` so tall scrollers stay subtle. Set `--scroll-fade-size` to a fixed size on the spacing scale instead.

<!-- ::preview item="scroll-fade-size" height="548" -->

```tsx showLineNumbers
const styles = {
  deep: css({ "--scroll-fade-size": space[24] }),
}

<div sx={[scrollFade, styles.list, styles.deep]}>{/* ... */}</div>
```

It takes any length or percentage:

```tsx showLineNumbers
const styles = {
  deep: css({ "--scroll-fade-size": "15%" }),
}
```

To fade opposite edges by different amounts, set the per-edge variables `--scroll-fade-t-size`, `--scroll-fade-b-size`, `--scroll-fade-s-size` and `--scroll-fade-e-size`. Each overrides `--scroll-fade-size` on the edge it names.

```tsx showLineNumbers
const styles = {
  uneven: css({
    "--scroll-fade-b-size": space[8],
    "--scroll-fade-t-size": space[2],
  }),
}
```

Use the logical `s` and `e` sizes for horizontal scrollers so the sizes mirror in RTL.

The fade eases in and out over a fixed scroll distance rather than appearing at once. That distance is the `--scroll-fade-reveal` variable, `6rem` by default and independent of the fade depth. Lower it for a snappier reveal or raise it for a more gradual one:

```tsx showLineNumbers
const styles = {
  snappy: css({ "--scroll-fade-reveal": space[16] }),
}
```

## Disabling the Fade

Add `scrollFadeNone` after the other styles to remove the fade. Under a condition, a breakpoint or a state, set `maskImage` to `none` under it:

<!-- ::preview item="scroll-fade-none" height="548" -->

```tsx showLineNumbers
const styles = {
  plainFromMd: css({ maskImage: { [breakpoint.md]: "none" } }),
}

<div sx={[scrollFade, styles.list, styles.plainFromMd]}>{/* ... */}</div>
```

## RTL

To enable RTL support, see the [RTL guide](/docs/design-system/rtl).

`scrollFadeX`, `scrollFadeS` and `scrollFadeE` follow the reading direction. In RTL, the start edge is on the right.

<!-- ::preview item="scroll-fade-rtl" height="288" direction="rtl" -->
