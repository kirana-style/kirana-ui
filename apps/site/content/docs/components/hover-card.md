---
title: Hover Card
description: For sighted users to preview content available behind a link.
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
  [hover card, preview, tooltip, link, component, base, aria, ark, vue, svelte]
---

# Hover Card

<!-- ::preview item="hover-card-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="hover-card" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
```

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
```

```tsx
<HoverCardTrigger>
  <Button variant="link">Hover</Button>
  <HoverCard>
    The React Framework – created and maintained by @vercel.
  </HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The React Framework – created and maintained by @vercel.
    </HoverCardContent>
  </HoverCard>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
<script lang="ts">
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
</script>

<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

;<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

@Component({
  selector: "app-example",
  imports: [HoverCard, HoverCardContent, HoverCardTrigger],
  template: `
    <ng-container kuiHoverCard>
      <a kuiHoverCardTrigger href="#">Hover</a>
      <div kuiHoverCardContent>
        The React Framework – created and maintained by {{ "@" }}vercel.
      </div>
    </ng-container>
  `,
})
export class Example {}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `HoverCard`:

<!-- ::start:only react/base -->

```text
HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
HoverCardTrigger
├── Button
└── HoverCard
```

<!-- ::end:only -->

## Trigger Delays

<!-- ::start:only react/base -->

Use `delay` and `closeDelay` on the trigger to control when the card opens and
closes.

```tsx
<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `delay` and `closeDelay` on the `HoverCardTrigger` to control when the card
opens and closes.

```tsx
<HoverCardTrigger delay={100} closeDelay={200}>
  <Button variant="link">Hover</Button>
  <HoverCard>Content</HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## Positioning

<!-- ::start:only react/base -->

Use the `side` and `align` props on `HoverCardContent` to control placement.

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `placement` prop on `HoverCard` to control placement.

```tsx
<HoverCardTrigger>
  <Button variant="link">Hover</Button>
  <HoverCard placement="top">Content</HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## Basic

<!-- ::preview item="hover-card-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Sides

<!-- ::preview item="hover-card-sides" height="352" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="hover-card-rtl" height="320" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/hover-card#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/PreviewTrigger#api) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Hover Card](https://ark-ui.com/vue/docs/components/hover-card#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/reka -->

See the [Reka UI Hover Card](https://reka-ui.com/docs/components/hover-card#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Hover Card](https://ark-ui.com/svelte/docs/components/hover-card#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Link Preview](https://bits-ui.com/docs/components/link-preview#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Hover Card](https://ark-ui.com/solid/docs/components/hover-card#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's popups are the registry's own layer on Floating UI (`lib/angular/popup.ts`), in Base UI's markup: it takes Base UI's props (`side`, `align`, `sideOffset`, `alignOffset`, `[(open)]`, `defaultOpen`).

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
