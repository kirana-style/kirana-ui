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
