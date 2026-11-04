---
title: Pagination
description: Pagination with page navigation, next and previous links.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark]
keywords:
  [
    pagination,
    pages,
    navigation,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    solid,
  ]
---

# Pagination

<!-- ::preview item="pagination-demo" height="300" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Installation

<!-- ::installation name="pagination" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Usage

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" is-active>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Pagination`:

```text
Pagination
└── PaginationContent
    ├── PaginationItem
    │   └── PaginationPrevious
    ├── PaginationItem
    │   └── PaginationLink
    ├── PaginationItem
    │   └── PaginationEllipsis
    └── PaginationItem
        └── PaginationNext
```

## Simple

A simple pagination with only page numbers.

<!-- ::preview item="pagination-simple" height="300" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Icons Only

Use just the previous and next buttons without page numbers. This is useful for data tables with a rows per page selector.

<!-- ::preview item="pagination-icons-only" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="pagination-rtl" height="300" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" direction="rtl" -->

## API Reference

`PaginationLink` is a `Button` drawn on a link: it takes the link's props, `isActive` for the
current page (drawn `outline`, the others `ghost`) and Button's `size` (`icon` by default).
`PaginationPrevious` and `PaginationNext` take `text` for their label, shown from `sm` up.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
