---
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
section: components
variants:
  [
    react/base,
    react/aria,
    vue/ark,
    vue/reka,
    svelte/ark,
    svelte/bits,
    solid/ark,
    angular/ng,
  ]
keywords:
  [scroll area, scrollbar, overflow, component, base, aria, ark, vue, svelte]
---

# Scroll Area

<!-- ::preview item="scroll-area-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="scroll-area" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<script setup lang="ts">
import { css } from "@kirana-style/core"

import { ScrollArea } from "@/components/ui/scroll-area"

const styles = {
  area: css({
    width: "350px",
    height: "200px",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "0.375rem",
  }),
}
</script>

<template>
  <ScrollArea :sx="styles.area">Your scrollable content here.</ScrollArea>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
<script lang="ts">
  import { css } from "@kirana-style/core"

  import { ScrollArea } from "@/components/ui/scroll-area"

  const styles = {
    area: css({
      width: "350px",
      height: "200px",
      padding: "1rem",
      border: "1px solid",
      borderRadius: "0.375rem",
    }),
  }
</script>

<ScrollArea sx={styles.area}>Your scrollable content here.</ScrollArea>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import { css } from "@kirana-style/core"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Example() {
  const styles = {
    area: css({
      width: "350px",
      height: "200px",
      padding: "1rem",
      border: "1px solid",
      borderRadius: "0.375rem",
    }),
  }

  return <ScrollArea sx={styles.area}>Your scrollable content here.</ScrollArea>
}
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ScrollArea } from "@/components/ui/scroll-area"

const styles = {
  area: css({
    width: "350px",
    height: "200px",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "0.375rem",
  }),
}

@Component({
  selector: "app-example",
  imports: [ScrollArea, SxDirective],
  template: `
    <div kuiScrollArea [sx]="styles.area">Your scrollable content here.</div>
  `,
})
// `styles`: the handles declared above.
export class Example {
  protected readonly styles = styles
}
```

<!-- ::end:only -->

<!-- ::start:only react/base,react/aria -->

```tsx
const styles = {
  area: css({
    width: "350px",
    height: "200px",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "0.375rem",
  }),
}

;<ScrollArea sx={styles.area}>Your scrollable content here.</ScrollArea>
```

<!-- ::end:only -->

## Composition

<!-- ::start:only react/base -->

Use the following composition to build a `ScrollArea`:

```text
ScrollArea
└── ScrollBar
```

<!-- ::end:only -->

## Horizontal

<!-- ::start:only react/base -->

Use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.

<!-- ::end:only -->

<!-- ::preview item="scroll-area-horizontal-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="scroll-area-rtl" height="380" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Scroll Area](https://ark-ui.com/vue/docs/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Scroll Area](https://reka-ui.com/docs/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Scroll Area](https://ark-ui.com/svelte/docs/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Scroll Area](https://bits-ui.com/docs/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Scroll Area](https://ark-ui.com/solid/docs/components/scroll-area#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's is the registry's own, drawing Base UI's markup: the area scrolls natively with its own thin scrollbars, a vertical one built in and a horizontal one where `<div kuiScrollBar orientation="horizontal">` is written inside it.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
