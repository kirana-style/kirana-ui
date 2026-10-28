---
title: Table
description: A responsive table component.
section: components
variants: [react/base, react/aria]
keywords: [table, data, rows, component, base, aria]
---

# Table

<!-- ::preview item="table-demo" height="520" combinations="react/base,react/aria" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add table" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/table" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Example() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
```

### React Aria

React Aria's `Table` is a collection: its header holds the columns directly,
one of them is the row header, and the table needs a label. Its caption is a
`figcaption`, so the table and caption go in a `figure`.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Example() {
  return (
    <figure>
      <Table aria-label="Invoices">
        <TableHeader>
          <TableHead isRowHeader>Invoice</TableHead>
          <TableHead>Status</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
    </figure>
  )
}
```

<!-- ::end:tabs -->

## Footer

Use `TableFooter` to add a footer to the table.

<!-- ::preview item="table-footer" height="400" combinations="react/base,react/aria" -->

## Actions

A table with actions for each row, in a `DropdownMenu`.

<!-- ::preview item="table-actions" height="360" combinations="react/base,react/aria" -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="table" combinations="react/base,react/aria" -->
