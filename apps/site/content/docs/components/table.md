---
title: Table
description: A responsive table component.
section: components
variants:
  [
    react/base,
    react/aria,
    vue/ark,
    vue/reka,
    svelte/ark,
    svelte/bits,
    solid/ark,
    angular/ng,
  ]
keywords:
  [table, data, rows, component, base, aria, ark, vue, svelte, solid, angular]
---

# Table

<!-- ::preview item="table-demo" height="480" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="table" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

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

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead :sx="styles.invoice">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead :sx="styles.end">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell :sx="styles.medium">INV001</TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell :sx="styles.end">$250.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
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

<!-- ::start:only solid/ark -->

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

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

@Component({
  selector: "app-example",
  imports: [
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    SxDirective,
  ],
  template: `
    <div kuiTable>
      <caption kuiTableCaption>
        A list of your recent invoices.
      </caption>
      <thead kuiTableHeader>
        <tr kuiTableRow>
          <th kuiTableHead [sx]="styles.invoice">Invoice</th>
          <th kuiTableHead>Status</th>
          <th kuiTableHead>Method</th>
          <th kuiTableHead [sx]="styles.end">Amount</th>
        </tr>
      </thead>
      <tbody kuiTableBody>
        <tr kuiTableRow>
          <td kuiTableCell [sx]="styles.medium">INV001</td>
          <td kuiTableCell>Paid</td>
          <td kuiTableCell>Credit Card</td>
          <td kuiTableCell [sx]="styles.end">$250.00</td>
        </tr>
      </tbody>
    </div>
  `,
})
// `styles`: the handles declared above.
export class Example {
  protected readonly styles = styles
}
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

<!-- ::preview item="table-footer" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Actions

A table showing actions for each row using a `<DropdownMenu />` component.

<!-- ::preview item="table-actions" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Data Table

You can use the `<Table />` component to build more complex data tables. Combine it with [@tanstack/react-table](https://tanstack.com/table/latest) to create tables with sorting, filtering and pagination.

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="table-rtl" height="480" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/aria -->

See the [React Aria Table](https://react-aria.adobe.com/Table#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
