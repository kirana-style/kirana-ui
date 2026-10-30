---
title: Button
description: Displays a button or a component that looks like a button.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords: [button, component, base, aria, ark, vue, svelte, solid, angular]
---

# Button

<!-- ::preview item="button-demo" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

<!-- ::start:only react/base -->

A button drawn on a link keeps the link's role: on Base UI, `render={<a href="/" />}` with `nativeButton={false}`.

<!-- ::end:only -->

## Installation

<!-- ::installation name="button" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### Vue

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button variant="outline">Button</Button>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import { Button } from "@/components/ui/button"
</script>

<Button variant="outline">Button</Button>
```

### Solid

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Button</Button>
}
```

### Angular

```ts
import { Component } from "@angular/core"

import { Button } from "@/components/ui/button"

@Component({
  selector: "app-example",
  imports: [Button],
  template: `<button kuiButton variant="outline">Button</button>`,
})
export class Example {}
```

<!-- ::end:tabs -->

## Cursor

Buttons keep the default cursor, as upstream's have since Tailwind v4. For `cursor: pointer` on
every enabled button, put `data-pointer` on `<html>`: the registry's reset (`reset.css`, installed
with the design system) gives them the pointer then. `/create` previews it when Get Code's **Use
pointer on buttons** is on.

## Size

Use the `size` prop to change the size of the button.

<!-- ::preview item="button-size" height="400" combinations="react/base,react/aria" -->

## Default

<!-- ::preview item="button-default" height="400" combinations="react/base,react/aria" -->

## Outline

<!-- ::preview item="button-outline" height="400" combinations="react/base,react/aria" -->

## Secondary

<!-- ::preview item="button-secondary" height="400" combinations="react/base,react/aria" -->

## Ghost

<!-- ::preview item="button-ghost" height="400" combinations="react/base,react/aria" -->

## Destructive

<!-- ::preview item="button-destructive" height="400" combinations="react/base,react/aria" -->

## Link

<!-- ::preview item="button-link" height="400" combinations="react/base,react/aria" -->

## Icon

<!-- ::preview item="button-icon" height="400" combinations="react/base,react/aria" -->

## With Icon

Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the icon for the correct spacing.

<!-- ::preview item="button-with-icon" height="400" combinations="react/base,react/aria" -->

## Rounded

Use the `rounded-full` class to make the button rounded.

<!-- ::preview item="button-rounded" height="400" combinations="react/base,react/aria" -->

## Spinner

Render a `<Spinner />` component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.

<!-- ::preview item="button-spinner" height="400" combinations="react/base,react/aria" -->

## Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) documentation for more details.

<!-- ::preview item="button-group-demo" height="400" combinations="react/base,react/aria" -->

## As Link

You can use the `buttonVariants` helper to make a link look like a button.

<!-- ::start:only react/base -->

**Do not use `<Button render={<a />} nativeButton={false} />` for links.** The Base UI `Button` component always applies `role="button"`, which overrides the semantic link role on `<a>` elements. Use `buttonVariants` with a plain `<a>` tag instead.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

**Do not use `<Button>` for links.** The React Aria `Button` component always applies `role="button"`, which overrides the semantic link role on `<a>` elements. Use `buttonVariants` with a plain `<a>` tag instead.

<!-- ::end:only -->

<!-- ::preview item="button-render" height="400" combinations="react/base,react/aria" -->

## API Reference

### Button

The `Button` component is a wrapper around the `button` element that adds a variety of styles and functionality.

| Prop      | Type                                                                                 | Default     |
| --------- | ------------------------------------------------------------------------------------ | ----------- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"`        | `"default"` |
| `size`    | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Button#api) documentation for more information.

<!-- ::end:only -->
