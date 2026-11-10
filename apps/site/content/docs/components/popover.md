---
title: Popover
description: Displays rich content in a portal, triggered by a button.
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
  [popover, popup, floating, overlay, component, base, aria, ark, vue, svelte]
---

# Popover

<!-- ::preview item="popover-demo" height="580" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="popover" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```tsx
<PopoverTrigger>
  <Button variant="outline">Open Popover</Button>
  <Popover>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </Popover>
</PopoverTrigger>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description text here.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
<script lang="ts">
  import { Button } from "@/components/ui/button"
  import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
  } from "@/components/ui/popover"
</script>

<Popover>
  <PopoverTrigger>
    {#snippet asChild(props)}
      <Button {...props()} variant="outline">Open Popover</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

;<Popover>
  <PopoverTrigger
    asChild={(props) => (
      <Button {...props()} variant="outline">
        Open Popover
      </Button>
    )}
  />
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

@Component({
  selector: "app-example",
  imports: [
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
  ],
  template: `
    <ng-container kuiPopover>
      <button kuiButton kuiPopoverTrigger variant="outline">
        Open Popover
      </button>
      <div kuiPopoverContent>
        <div kuiPopoverHeader>
          <h2 kuiPopoverTitle>Title</h2>
          <p kuiPopoverDescription>Description text here.</p>
        </div>
      </div>
    </ng-container>
  `,
})
export class Example {
  protected readonly Popover = Popover
}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Popover`:

<!-- ::start:only react/base -->

```text
Popover
├── PopoverTrigger
└── PopoverContent
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
PopoverTrigger
├── Button
└── Popover
```

<!-- ::end:only -->

## Basic

A simple popover with a header, title, and description.

<!-- ::preview item="popover-basic" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Align

<!-- ::start:only react/base -->

Use the `align` prop on `PopoverContent` to control the horizontal alignment.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `placement` prop on `Popover` to control the horizontal alignment.

<!-- ::end:only -->

<!-- ::preview item="popover-alignments" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## With Form

A popover with form fields inside.

<!-- ::preview item="popover-form" height="424" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="popover-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Popover](https://base-ui.com/react/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Popover](https://react-aria.adobe.com/Popover#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Popover](https://ark-ui.com/vue/docs/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Popover](https://reka-ui.com/docs/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Popover](https://ark-ui.com/svelte/docs/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Popover](https://bits-ui.com/docs/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Popover](https://ark-ui.com/solid/docs/components/popover#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's popups are the registry's own layer on Floating UI (`lib/angular/popup.ts`), in Base UI's markup: it takes Base UI's props (`side`, `align`, `sideOffset`, `alignOffset`, `[(open)]`, `defaultOpen`).

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
