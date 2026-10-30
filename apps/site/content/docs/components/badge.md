---
title: Badge
description: Displays a badge or a component that looks like a badge.
section: components
variants: [react/base, react/aria]
keywords: [badge, label, tag, status, component, base, aria]
---

# Badge

<!-- ::preview item="badge-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="badge" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Badge } from "@/components/ui/badge"
```

```tsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

## Variants

Use the `variant` prop to change the variant of the badge.

<!-- ::preview item="badge-variants" height="360" combinations="react/base,react/aria" -->

## With Icon

You can render an icon inside the badge. Use `data-icon="inline-start"` to render the icon on the left and `data-icon="inline-end"` to render the icon on the right.

<!-- ::preview item="badge-icon" height="360" combinations="react/base,react/aria" -->

## With Spinner

You can render a spinner inside the badge. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` prop to the spinner.

<!-- ::preview item="badge-spinner" height="360" combinations="react/base,react/aria" -->

## Link

Use the `render` prop to render a link as a badge.

<!-- ::preview item="badge-link" height="360" combinations="react/base,react/aria" -->

## Custom Colors

You can customize the colors of a badge by adding custom classes such as `bg-green-50 dark:bg-green-800` to the `Badge` component.

<!-- ::preview item="badge-colors" height="360" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="badge-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

### Badge

The `Badge` component displays a badge or a component that looks like a badge.

| Prop        | Type                                                                          | Default     |
| ----------- | ----------------------------------------------------------------------------- | ----------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `className` | `string`                                                                      | -           |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
