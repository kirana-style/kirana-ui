---
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
section: components
variants: [react/base, react/aria]
keywords: [breadcrumb, component, base, aria]
---

# Breadcrumb

<!-- ::preview item="breadcrumb-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="breadcrumb" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### React Aria

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

<!-- ::end:tabs -->

<!-- ::start:only react/aria -->

## Notes per base

On React Aria, the separators are drawn between the items by the list itself: there is no `BreadcrumbSeparator` to place.

<!-- ::end:only -->

## Composition

Use the following composition to build a `Breadcrumb`:

<!-- ::start:only react/base -->

```text
Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    └── BreadcrumbItem
        └── BreadcrumbPage
```

<!-- ::end:only -->

## Basic

A basic breadcrumb with a home link and a components link.

<!-- ::preview item="breadcrumb-basic" height="400" combinations="react/base,react/aria" -->

## Custom separator

Use a custom component as `children` for `<BreadcrumbSeparator />` to create a custom separator.

<!-- ::preview item="breadcrumb-separator" height="400" combinations="react/base,react/aria" -->

## Dropdown

You can compose `<BreadcrumbItem />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

<!-- ::preview item="breadcrumb-dropdown" height="400" combinations="react/base,react/aria" -->

## Collapsed

We provide a `<BreadcrumbEllipsis />` component to show a collapsed state when the breadcrumb is too long.

<!-- ::preview item="breadcrumb-ellipsis" height="400" combinations="react/base,react/aria" -->

## Link component

To use a custom link component from your routing library, you can use the `render` prop on `<BreadcrumbLink />`.

<!-- ::preview item="breadcrumb-link" height="400" combinations="react/base,react/aria" -->

## API Reference

### Breadcrumb

The `Breadcrumb` component is the root navigation element that wraps all breadcrumb components.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### BreadcrumbList

The `BreadcrumbList` component displays the ordered list of breadcrumb items.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### BreadcrumbItem

The `BreadcrumbItem` component wraps individual breadcrumb items.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### BreadcrumbLink

The `BreadcrumbLink` component displays a clickable link in the breadcrumb.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

### BreadcrumbPage

The `BreadcrumbPage` component displays the current page in the breadcrumb (non-clickable).

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

<!-- ::start:only react/base -->

### BreadcrumbSeparator

<!-- ::end:only -->

<!-- ::start:only react/base -->

The `BreadcrumbSeparator` component displays a separator between breadcrumb items. You can pass custom children to override the default separator icon.

<!-- ::end:only -->

<!-- ::start:only react/base -->

| Prop       | Type              | Default |
| ---------- | ----------------- | ------- |
| `children` | `React.ReactNode` | -       |
| `sx`       | `Sx`              | -       |

<!-- ::end:only -->

### BreadcrumbEllipsis

The `BreadcrumbEllipsis` component displays an ellipsis indicator for collapsed breadcrumb items.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `sx` | `Sx` | -       |

<!-- ::start:only react/aria -->

For more information, see the [React Aria documentation](https://react-aria.adobe.com/Breadcrumbs#api).

<!-- ::end:only -->
