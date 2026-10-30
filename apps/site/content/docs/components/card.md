---
title: Card
description: Displays a card with a header, content and footer.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords: [card, component, base, aria]
---

# Card

<!-- ::preview item="card-demo" height="560" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="card" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

<!-- ::start:tabs -->

### Base UI, React Aria, Solid

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
```

### Vue

```vue
<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
      <CardAction>Card Action</CardAction>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
</script>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

### Angular

```ts
import { Component } from "@angular/core"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

@Component({
  selector: "app-example",
  imports: [
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  ],
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Card Title</div>
        <div kuiCardDescription>Card Description</div>
        <div kuiCardAction>Card Action</div>
      </div>
      <div kuiCardContent>
        <p>Card Content</p>
      </div>
      <div kuiCardFooter>
        <p>Card Footer</p>
      </div>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:tabs -->

## Composition

Use the following composition to build a `Card`:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

## Size

Use the `size="sm"` prop to set the size of the card to small. The small size variant uses smaller spacing.

<!-- ::preview item="card-small" height="400" combinations="react/base,react/aria" -->

## Spacing

In addition to the `size` prop, the card's spacing context sets the spacing between sections and the inset of its parts: `[cardCtx.spacing]: spacing(6)` on the card (`@/lib/kirana/context`).

<!-- ::preview item="card-spacing" height="400" combinations="react/base,react/aria" -->

Use negative margins of `calc(${cardCtx.spacing} * -1)` to make content go edge to edge while keeping it aligned with the card inset. When the edge-to-edge content sits above a footer, give `CardContent` the same negative bottom margin to remove the section gap.

<!-- ::preview item="card-edge-to-edge" height="400" combinations="react/base,react/aria" -->

## Image

Add an image before the card header to create a card with an image.

<!-- ::preview item="card-image" height="400" combinations="react/base,react/aria" -->

## API Reference

### Card

The `Card` component is the root container for card content.

| Prop   | Type                | Default     |
| ------ | ------------------- | ----------- |
| `size` | `"default" \| "sm"` | `"default"` |
| `sx`   | `Sx`                | -           |

### CardHeader

The `CardHeader` component is used for a title, description, and optional action.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### CardTitle

The `CardTitle` component is used for the card title.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### CardDescription

The `CardDescription` component is used for helper text under the title.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### CardAction

The `CardAction` component places content in the top-right of the header (for example, a button or a badge).

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### CardContent

The `CardContent` component is used for the main card body.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### CardFooter

The `CardFooter` component is used for actions and secondary content at the bottom of the card.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |
