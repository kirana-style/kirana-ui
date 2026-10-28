---
title: Table
description: A responsive table component.
section: components
variants: [react/base, react/aria]
keywords: [table, data, rows, component, base, aria]
---

# Table

<!-- ::preview item="table-demo" height="480" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="table" combinations="react/base,react/aria" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const styles = {
  invoice: css({ width: "100px" }),
  medium: css({ fontWeight: 500 }),
  end: css({ textAlign: "right" }),
}
```

<!-- ::start:only react/base -->

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead sx={styles.invoice}>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead sx={styles.end}>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell sx={styles.medium}>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell sx={styles.end}>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Table>
  <TableHeader>
    <TableHead isRowHeader sx={styles.invoice}>Invoice</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Method</TableHead>
    <TableHead sx={styles.end}>Amount</TableHead>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell sx={styles.medium}>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell sx={styles.end}>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
<TableCaption>A list of your recent invoices.</TableCaption>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Table`:

```text
Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       ├── TableHead
│       ├── TableHead
│       ├── TableHead
│       └── TableHead
├── TableBody
│   ├── TableRow
│   │   ├── TableCell
│   │   ├── TableCell
│   │   ├── TableCell
│   │   └── TableCell
│   └── TableRow
│       ├── TableCell
│       ├── TableCell
│       ├── TableCell
│       └── TableCell
└── TableFooter
```

## Footer

Use the `<TableFooter />` component to add a footer to the table.

<!-- ::preview item="table-footer" height="360" combinations="react/base,react/aria" -->

## Actions

A table showing actions for each row using a `<DropdownMenu />` component.

<!-- ::preview item="table-actions" height="360" combinations="react/base,react/aria" -->

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/react-table](https://tanstack.com/table/latest) to create tables with sorting, filtering and pagination.

## API Reference

<!-- ::start:only react/aria -->

See the [React Aria Table](https://react-aria.adobe.com/Table#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
