---
title: Marquee
description: A row or column of items scrolling in a loop, moved by CSS alone.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [
    marquee,
    ticker,
    scroll,
    loop,
    logos,
    testimonials,
    carousel,
    component,
    kirana,
  ]
---

# Marquee

<!-- ::preview item="marquee-demo" height="240" combinations="react/kirana" -->

Marquee is plain markup moved by a CSS animation, with no script. It draws its items twice, side by side, so the loop has no gap: the second copy is hidden from a screen reader, which reads the items once, and from the keyboard, which reaches them once.

It stops while anything inside it holds focus. When the reader has asked for less motion (`prefers-reduced-motion: reduce`), it does not move at all: the items are shown once, and can be scrolled when they do not fit.

## Installation

<!-- ::installation name="marquee" combinations="react/kirana" -->

## Usage

<!-- ::start:only react/kirana,solid/kirana -->

```tsx
import { Marquee, MarqueeItem } from "@/components/ui/marquee"
```

```tsx
<Marquee>
  <MarqueeItem>Northwind</MarqueeItem>
  <MarqueeItem>Fieldstone</MarqueeItem>
  <MarqueeItem>Kestrel</MarqueeItem>
</Marquee>
```

<!-- ::end:only -->

<!-- ::start:only vue/kirana -->

```vue
<script setup lang="ts">
import { Marquee, MarqueeItem } from "@/components/ui/marquee"
</script>

<template>
  <Marquee>
    <MarqueeItem>Northwind</MarqueeItem>
    <MarqueeItem>Fieldstone</MarqueeItem>
    <MarqueeItem>Kestrel</MarqueeItem>
  </Marquee>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/kirana -->

```svelte
<script lang="ts">
  import { Marquee, MarqueeItem } from "@/components/ui/marquee"
</script>

<Marquee>
  <MarqueeItem>Northwind</MarqueeItem>
  <MarqueeItem>Fieldstone</MarqueeItem>
  <MarqueeItem>Kestrel</MarqueeItem>
</Marquee>
```

<!-- ::end:only -->

<!-- ::start:only angular/kirana -->

Angular projects content once, so the items are given as an `<ng-template>` inside the marquee, which it draws in both copies.

```ts
import { Component } from "@angular/core"
import { Marquee, MarqueeItem } from "@/components/ui/marquee"

@Component({
  selector: "app-example",
  imports: [Marquee, MarqueeItem],
  template: `
    <div kuiMarquee>
      <ng-template>
        <div kuiMarqueeItem>Northwind</div>
        <div kuiMarqueeItem>Fieldstone</div>
        <div kuiMarqueeItem>Kestrel</div>
      </ng-template>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

## Examples

### Vertical

Use `direction="up"` or `direction="down"` to scroll a column. Give the marquee a height: the items scroll within it.

<!-- ::preview item="marquee-vertical" height="480" combinations="react/kirana" -->

### Pause on hover

Use `pauseOnHover` to stop the items while the pointer is over them, so a card can be read.

<!-- ::preview item="marquee-pause" height="360" combinations="react/kirana" -->

### Fade

Use `fade` to fade the two edges the items enter and leave by. The fade is a mask, so it works over any background.

<!-- ::preview item="marquee-fade" height="240" combinations="react/kirana" -->

### Reverse

Use `reverse` to run the other way. Two rows, one reversed, run opposite ways.

<!-- ::preview item="marquee-reverse" height="300" combinations="react/kirana" -->

### Right to left

The directions are physical: `left` moves the items to the left on a right-to-left page as well, so choose `right` there for items that follow the reading direction. The text inside each item still reads right to left.

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are a `div`'s.

### Marquee

The root. It draws its children twice, each copy a `MarqueeContent`, and moves both by one copy's length and the gap after it, once every `speed`.

| Prop           | Type                                  | Default  | Description                                                                              |
| -------------- | ------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `direction`    | `"left" \| "right" \| "up" \| "down"` | `"left"` | Where the items move to. `left` and `right` are physical, whatever the page's direction. |
| `speed`        | `string`                              | `"40s"`  | How long one loop takes, as a CSS time.                                                  |
| `gap`          | `string`                              | `"1rem"` | The space between the items, as a CSS length.                                            |
| `pauseOnHover` | `boolean`                             | `false`  | Whether the items stop while the pointer is over them.                                   |
| `reverse`      | `boolean`                             | `false`  | Whether the items move the opposite way to `direction`.                                  |
| `fade`         | `boolean`                             | `false`  | Whether the two edges fade out.                                                          |
| `children`     | `ReactNode`                           | -        | The items, each usually a `MarqueeItem`.                                                 |
| `sx`           | `Sx`                                  | -        | Styles merged with the root's own.                                                       |

The fade's depth is scroll-fade's `scrollFadeCtx.size` token, set on the marquee; it is a quarter of the marquee, at most `6rem`, by default.

### MarqueeContent

One copy of the items, which `Marquee` draws twice: there is no need to write it. The second copy carries `aria-hidden` and `inert`.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the copy's own. |

### MarqueeItem

One item. It keeps its own size and never shrinks.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the item's own. |
