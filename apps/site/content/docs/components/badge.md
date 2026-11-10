---
title: Badge
description: Displays a badge or a component that looks like a badge.
section: components
variants:
  [react/base, react/aria, vue/ark, vue/reka, svelte/ark, solid/ark, angular/ng]
keywords:
  [badge, label, tag, status, component, base, aria, ark, vue, svelte, solid]
---

# Badge

<!-- ::preview item="badge-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="badge" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import { Badge } from "@/components/ui/badge"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <Badge variant="default | outline | secondary | destructive">Badge</Badge>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { Badge } from "@/components/ui/badge"

@Component({
  selector: "app-example",
  imports: [Badge],
  template: `
    <span kuiBadge variant="default | outline | secondary | destructive"
      >Badge</span
    >
  `,
})
export class Example {}
```

<!-- ::end:only -->

## Variants

Use the `variant` prop to change the variant of the badge.

<!-- ::preview item="badge-variants" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## With Icon

You can render an icon inside the badge. Use `data-icon="inline-start"` to render the icon on the left and `data-icon="inline-end"` to render the icon on the right.

<!-- ::preview item="badge-icon" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## With Spinner

You can render a spinner inside the badge. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` prop to the spinner.

<!-- ::preview item="badge-spinner" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Link

Use the `render` prop to render a link as a badge.

<!-- ::preview item="badge-link" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Custom Colors

You can customize the colors of a badge by adding custom classes such as `bg-green-50 dark:bg-green-800` to the `Badge` component.

<!-- ::preview item="badge-colors" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="badge-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

### Badge

The `Badge` component displays a badge or a component that looks like a badge.

| Prop        | Type                                                                          | Default     |
| ----------- | ----------------------------------------------------------------------------- | ----------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `className` | `string`                                                                      | -           |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
