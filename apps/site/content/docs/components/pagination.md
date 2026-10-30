---
title: Pagination
description: Pagination with page navigation, next and previous links.
section: components
variants: [react/base, react/aria]
keywords: [pagination, pages, navigation, component, base, aria]
---

# Pagination

<!-- ::preview item="pagination-demo" height="300" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="pagination" combinations="react/base,react/aria" -->

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

<!-- ::preview item="pagination-simple" height="300" combinations="react/base,react/aria" -->

## Icons Only

Use just the previous and next buttons without page numbers. This is useful for data tables with a rows per page selector.

<!-- ::preview item="pagination-icons-only" height="300" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="pagination-rtl" height="300" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

`PaginationLink` is a `Button` drawn on a link: it takes the link's props, `isActive` for the
current page (drawn `outline`, the others `ghost`) and Button's `size` (`icon` by default).
`PaginationPrevious` and `PaginationNext` take `text` for their label, shown from `sm` up.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
