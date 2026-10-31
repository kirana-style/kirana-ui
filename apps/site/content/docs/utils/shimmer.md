---
title: Shimmer
description: Styles for adding a shimmer effect to text elements.
section: utils
order: 2
keywords: [shimmer, loading, streaming, status, text, animation, utility]
---

# Shimmer

<!-- ::preview item="shimmer-demo" height="288" -->

## Installation

The shimmer styles are one file, `shimmer.styles.ts`. The components that shimmer, like [Trace](/docs/components/trace) and [Attachment](/docs/components/attachment), install it with them.

<!-- ::install exec="kirana-style ui add shimmer-styles" -->

## Usage

| Style                  | Styles                                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `shimmer`              | `backgroundClip: "text"`, `animationName: sweep`, `animationDuration: "var(--shimmer-duration, 2s)"` |
| `shimmerOnce`          | `animationIterationCount: 1`                                                                         |
| `shimmerReverse`       | `animationDirection: "reverse"`                                                                      |
| `shimmerNone`          | `backgroundImage: "none"`, `WebkitTextFillColor: "currentColor"`                                     |
| `"--shimmer-color"`    | The highlight's colour.                                                                              |
| `"--shimmer-duration"` | One sweep, `2s` by default.                                                                          |
| `"--shimmer-spread"`   | The width of the highlight band, `calc(3ch + 40px)` by default.                                      |
| `"--shimmer-angle"`    | The tilt of the band, `20deg` by default.                                                            |

Add `shimmer` to a text element.

```tsx showLineNumbers
import { shimmer } from "@/components/ui/shimmer.styles"

const styles = {
  status: css({ fontSize: fontSize.sm, color: theme.mutedForeground }),
}

<p sx={[shimmer, styles.status]}>Generating response&hellip;</p>
```

The shimmer is built on `currentColor`, so it adapts to the element:

- The highlight is derived from the text colour, with no configuration needed.
- It works on any colour, from `theme.mutedForeground` to brand colours.
- In dark mode, the highlight automatically brightens to stay visible.

The effect is pure CSS. The text is painted with `background-clip: text`, and the highlight sweeps across it in a seamless loop.

## With Marker

The shimmer composes with any component that renders text. A common pattern is a [Marker](/docs/components/marker) showing a live status while the assistant is working:

<!-- ::preview item="shimmer-marker" height="288" -->

```tsx showLineNumbers
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent sx={shimmer}>Thinking&hellip;</MarkerContent>
</Marker>
```

## Color

Set `--shimmer-color` to choose the highlight's colour. It takes any colour: a token, a palette colour mixed with transparent for its opacity, or a value of your own.

<!-- ::preview item="shimmer-color" height="288" -->

```tsx showLineNumbers
const styles = {
  blue: css({
    "--shimmer-color": `color-mix(in oklch, ${color.blue[500]} 60%, transparent)`,
  }),
  custom: css({ "--shimmer-color": "#378add" }),
}

<p sx={[shimmer, styles.blue]}>Generating response&hellip;</p>
<p sx={[shimmer, styles.custom]}>Generating response&hellip;</p>
```

## Duration

Set `--shimmer-duration` to the length of one sweep. The default is `2s`.

<!-- ::preview item="shimmer-duration" height="288" -->

```tsx showLineNumbers
const styles = {
  fast: css({ "--shimmer-duration": "1s" }),
}

<p sx={[shimmer, styles.fast]}>Generating response&hellip;</p>
```

## Spread

Set `--shimmer-spread` to the width of the highlight band, on the spacing scale or as any length or percentage. The default is `calc(3ch + 40px)`: a fixed base plus a `3ch` term that scales with the font size.

<!-- ::preview item="shimmer-spread" height="288" -->

```tsx showLineNumbers
const styles = {
  wide: css({ "--shimmer-spread": space[24] }),
}

<p sx={[shimmer, styles.wide]}>Generating response&hellip;</p>
```

## Angle

Set `--shimmer-angle` to the tilt of the highlight band. The default is `20deg`.

<!-- ::preview item="shimmer-angle" height="288" -->

```tsx showLineNumbers
const styles = {
  steep: css({ "--shimmer-angle": "45deg" }),
}

<p sx={[shimmer, styles.steep]}>Generating response&hellip;</p>
```

## Reverse

Add `shimmerReverse` after `shimmer` to sweep the highlight the other way. In a right-to-left page the sweep already follows the reading direction. See [RTL](#rtl).

```tsx showLineNumbers
<p sx={[shimmer, shimmerReverse]}>Generating response&hellip;</p>
```

## Play Once

Add `shimmerOnce` to play a single sweep instead of looping, useful as a reveal when streaming completes. Pair it with `--shimmer-duration` to control how long the sweep takes.

<!-- ::preview item="shimmer-once" height="288" -->

```tsx showLineNumbers
const styles = {
  reveal: css({ "--shimmer-duration": "1100ms" }),
}

<p sx={[shimmer, styles.reveal, shimmerOnce]}>Response generated.</p>
```

## Disabling the Shimmer

Add `shimmerNone` after `shimmer` to turn the effect off and render the text normally. Under a condition, a breakpoint or a state, write its two declarations under it:

<!-- ::preview item="shimmer-none" height="288" -->

```tsx showLineNumbers
const styles = {
  plainFromMd: css({
    backgroundImage: { [breakpoint.md]: "none" },
    WebkitTextFillColor: { [breakpoint.md]: "currentColor" },
  }),
}

<p sx={[shimmer, styles.plainFromMd]}>Generating response&hellip;</p>
```

## Shimmering Under a Condition

A component that shimmers only in one state spreads `shimmerProperties`, the same declarations as an object, under its condition. A [Trace](/docs/components/trace) line's title shimmers this way while the line is `running`:

```tsx showLineNumbers
import { shimmerProperties } from "@/components/ui/shimmer.styles"

const RUNNING = '[data-status="running"]'

const styles = {
  title: css({
    backgroundImage: { [RUNNING]: shimmerProperties.backgroundImage },
    backgroundClip: { [RUNNING]: shimmerProperties.backgroundClip },
    // … and each of its other properties.
  }),
}
```

## Fallback

The shimmer is built on modern colour features, [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) and `color-mix()`, which are available in all current browsers. In older browsers without support, the highlight gradient is dropped and the text can render transparent. If you target older browsers, apply the shimmer under a `@supports` condition, through `shimmerProperties`.

## Reduced Motion

When the reader prefers reduced motion, the animation is disabled automatically and the text renders normally. There is nothing to configure.

## RTL

To enable RTL support, see the [RTL guide](/docs/design-system/rtl).

The sweep follows the reading direction, left to right in LTR and right to left in RTL, with no extra styles. Add `shimmerReverse` to flip the direction yourself.

<!-- ::preview item="shimmer-rtl" height="288" -->
