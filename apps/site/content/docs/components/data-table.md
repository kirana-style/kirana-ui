---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
section: components
variants: [react/base, react/aria]
keywords:
  [
    data table,
    table,
    tanstack table,
    sorting,
    filtering,
    pagination,
    component,
    base,
    aria,
  ]
---

# Data Table

<!-- ::preview item="data-table-demo" height="460" combinations="react/base,react/aria" -->

## Introduction

Every data table or datagrid is unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/overview#what-is-headless-ui) provides.

So instead of a data-table component, this is a guide to building your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

> **Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

## Table of Contents

This guide will show you how to use [TanStack Table](https://tanstack.com/table) and the `<Table />` component to build your own custom data table. We'll cover the following topics:

- [Styles](#styles)
- [Set up Table Features](#set-up-table-features)
- [Basic Table](#basic-table)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)

## Installation

1. Add the `<Table />` component to your project:

<!-- ::installation name="table" combinations="react/base,react/aria" -->

2. Add the `@tanstack/react-table` dependency. This guide uses **TanStack Table v9**:

<!-- ::install packages="@tanstack/react-table" -->

## Prerequisites

We are going to build a table to show recent payments. Here's what our data looks like:

<!-- ::start:only react/base -->

```tsx showLineNumbers
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "user@example.com",
  },
  // ...
]
```

<!-- ::end:only -->

## Project Structure

Start by creating the following file structure:

```txt
payments
├── columns.tsx
├── data-table-features.ts
├── data-table.styles.ts
├── data-table.tsx
└── page.tsx
```

- `columns.tsx` will contain our column definitions.
- `data-table-features.ts` will contain the shared `features` object that tells TanStack Table which behavior to enable.
- `data-table.tsx` will contain our `<DataTable />` component.
- `data-table.styles.ts` will contain the table's styles, as Kirana `css()` handles.
- `page.tsx` is where we'll get the data and render our table.

## Styles

The table's styles are Kirana handles, in one module the other files import. A
style on one of the registry's components is written `{ "*": null, base: … }`:
it replaces the component's own value in every style, as a class replaces it in
upstream's guide.

```tsx showLineNumbers title="payments/data-table.styles.ts"
import { css } from "@kirana-style/core"

import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@/lib/kirana/scales"
import { radius, theme } from "@/lib/kirana/tokens"

export const styles = {
  page: css({ marginInline: "auto", paddingBlock: space[10] }),
  // The table, in a rounded border.
  frame: css({
    overflow: "hidden",
    borderRadius: radius.md,
    borderWidth: "1px",
  }),
  // The row shown when nothing matches.
  empty: css({
    height: { "*": null, base: space[24] },
    textAlign: { "*": null, base: "center" },
  }),
  alignEnd: css({ textAlign: "end" }),
  amount: css({ textAlign: "end", fontWeight: fontWeight.medium }),
  // A row's actions: a square trigger, its label for screen readers only.
  actions: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    padding: { "*": null, base: space["0"] },
  }),
  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }),
  menu: css({ width: { "*": null, base: space[44] } }),
  // Over the table: the email filter and the columns menu.
  toolbar: css({
    display: "flex",
    alignItems: "center",
    paddingBlock: space[4],
  }),
  filter: css({ maxWidth: containerSize.sm }),
  columns: css({ marginInlineStart: { "*": null, base: "auto" } }),
  capitalize: css({ textTransform: { "*": null, base: "capitalize" } }),
  // Under the table: the selection count and the page buttons.
  pagination: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: space[2],
    paddingBlock: space[4],
  }),
  selection: css({
    flex: "1 1 0%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}
```

## Set up Table Features

TanStack Table v9 is feature-based: you opt into the behavior you want — sorting, filtering, pagination, and so on — by declaring it with `tableFeatures()`. Anything you don't list is tree-shaken out of your bundle. That includes the built-in filter and sort functions: register the ones your columns rely on under `filterFns` and `sortFns` (our email filter uses `includesString`, and string columns sort with `text` / `alphanumeric`).

```tsx showLineNumbers title="payments/data-table-features.ts"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features
```

> **Note:** The core row model is always included, so you never register it yourself. Row models for optional features are created with `create*RowModel()` and registered on the features object — there are no more `get*RowModel` table options.

## Basic Table

Let's start by building a basic table.

<!-- ::start:steps -->

### Column Definitions

First, we'll define our columns.

```tsx showLineNumbers title="payments/columns.tsx" {1,3,14-15,17-27}
import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
])
```

> **Note:** Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

### `<DataTable />` component

Next, we'll create a `<DataTable />` component to render our table.

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/data-table.tsx"
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"

import { styles } from "./data-table.styles"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div sx={styles.frame}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} sx={styles.empty}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/data-table.tsx"
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"

import { styles } from "./data-table.styles"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div sx={styles.frame}>
      <Table>
        <TableHeader>
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              id={header.id}
              isRowHeader={header.index === 0}
            >
              {header.isPlaceholder ? null : (
                <table.FlexRender header={header} />
              )}
            </TableHead>
          ))}
        </TableHeader>
        <TableBody renderEmptyState={() => "No results."}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} id={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

<!-- ::end:only -->

> **Tip**: If you find yourself using `<DataTable />` in multiple places, this is the component you could make reusable by extracting it to `components/ui/data-table.tsx`. `<DataTable columns={columns} data={data} />`

> **`<table.FlexRender />` vs `flexRender`:** This guide uses v9's `<table.FlexRender header={header} />` and `<table.FlexRender cell={cell} />` component, available right on the table instance — no extra import needed. The classic `flexRender(component, context)` helper from v8 still works too, if you prefer the function form (or need to render outside the component that owns `table`, where you can also import the standalone `<FlexRender />`).

### Render the table

Finally, we'll render our table in our page component.

```tsx showLineNumbers title="payments/page.tsx" {20}
import type { Payment } from "./columns"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { styles } from "./data-table.styles"

// Your payments, from your API or your route's loader.
const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  // ...
]

export function PaymentsPage() {
  return (
    <div sx={styles.page}>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
```

<!-- ::end:steps -->

## Cell Formatting

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

<!-- ::start:steps -->

### Update columns definition

Update the `header` and `cell` definitions for amount as follows:

```tsx showLineNumbers title="payments/columns.tsx" {3-13}
export const columns = columnHelper.columns([
  columnHelper.accessor("amount", {
    header: () => <div sx={styles.alignEnd}>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div sx={styles.amount}>{formatted}</div>
    },
  }),
])
```

You can use the same approach to format other cells and headers.

<!-- ::end:steps -->

## Row Actions

<!-- ::start:only react/base -->

Let's add row actions to our table. We'll use a `<DropdownMenu />` component for this.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Let's add row actions to our table. We'll use a `<Dropdown />` component for this.

<!-- ::end:only -->

<!-- ::start:steps -->

### Update columns definition

<!-- ::start:only react/base -->

Update our columns definition to add a new `actions` column. The `actions` cell returns a `<DropdownMenu />` component.

<!-- ::end:only -->

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/columns.tsx" {2,4-13,19-50}
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { styles } from "./data-table.styles"

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" sx={styles.actions} />}
          >
            <span sx={styles.srOnly}>Open menu</span>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
  // ...
])
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Update our columns definition to add a new `actions` column. The `actions` cell returns a `<Dropdown />` component.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/columns.tsx" {2,4-11,17-46}
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { styles } from "./data-table.styles"

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon-xs">
            <span sx={styles.srOnly}>Open menu</span>
            <MoreHorizontal />
          </Button>
          <DropdownMenu placement="bottom end" sx={styles.menu}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      )
    },
  }),
  // ...
])
```

<!-- ::end:only -->

You can access the row data using `row.original` in the `cell` function. Use this to handle actions for your row eg. use the `id` to make a DELETE call to your API.

<!-- ::end:steps -->

## Pagination

Next, we'll add pagination to our table.

<!-- ::start:steps -->

### Pagination is already enabled

Because our features object includes `rowPaginationFeature` and `createPaginatedRowModel()`, the table automatically paginates rows into pages of 10 — there's nothing to add to `useTable`. See the [pagination docs](https://tanstack.com/table/latest/docs/framework/react/guide/pagination) for more information on customizing page size and implementing manual pagination.

### Add pagination controls

We can add pagination controls to our table using the `<Button />` component and the `table.previousPage()`, `table.nextPage()` API methods.

```tsx showLineNumbers title="payments/data-table.tsx" {1,22-39}
import { Button } from "@/components/ui/button"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div>
      <div sx={styles.frame}>
        <Table>
          { // .... }
        </Table>
      </div>
      <div sx={styles.pagination}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

See [Reusable Components](#reusable-components) section for a more advanced pagination component.

<!-- ::end:steps -->

## Sorting

Let's make the email column sortable.

The `rowSortingFeature` and sorted row model are already registered in our features object, so all that's left is wiring up the sorting state.

<!-- ::start:steps -->

### Update `<DataTable>`

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/data-table.tsx" {1,6,15,21-24}
import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div sx={styles.frame}>
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/data-table.tsx" showLineNumbers {1,6,15,21-24,31-46}
import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div>
      <div sx={styles.frame}>
        <Table
          sortDescriptor={
            sorting.length
              ? {
                  column: sorting[0].id,
                  direction: sorting[0].desc ? "descending" : "ascending",
                }
              : undefined
          }
          onSortChange={(sortDescriptor) => {
            table.setSorting([
              {
                id: "" + sortDescriptor.column,
                desc: sortDescriptor.direction === "descending",
              },
            ]);
          }}>
          { ... }
        </Table>
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

### Make header cell sortable

We can now update the `email` header cell to add sorting controls.

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/columns.tsx" {2,6-16}
import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
  }),
])
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/columns.tsx" {2,8-15}
import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <div sx={buttonVariants({ variant: "ghost" })}>
          Email
          <ArrowUpDown />
        </div>
      )
    },
  }),
])
```

<!-- ::end:only -->

This will automatically sort the table (asc and desc) when the user toggles on the header cell.

<!-- ::end:steps -->

## Filtering

Let's add a search input to filter emails in our table.

The `columnFilteringFeature` and filtered row model are already part of our features object, so we only need to wire up the filter state and render an input.

<!-- ::start:steps -->

### Update `<DataTable>`

```tsx showLineNumbers title="payments/data-table.tsx" {5,11,20-22,29,32,38-46}
import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div sx={styles.toolbar}>
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          sx={styles.filter}
        />
      </div>
      <div sx={styles.frame}>
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

Filtering is now enabled for the `email` column. You can add filters to other columns as well. See the [filtering docs](https://tanstack.com/table/latest/docs/framework/react/guide/column-filtering) for more information on customizing filters.

<!-- ::end:steps -->

## Visibility

Adding column visibility is fairly simple using `@tanstack/react-table` visibility API.

<!-- ::start:steps -->

### Update `<DataTable>`

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/data-table.tsx" {6,12-17,29-30,38,42,57-84}
import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div>
      <div sx={styles.toolbar}>
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          sx={styles.filter}
        />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" sx={styles.columns} />}>
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    sx={styles.capitalize}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div sx={styles.frame}>
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/data-table.tsx" {6,12-17,29-30,38,42,57-99}
import * as React from "react"
import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { styles } from "./data-table.styles"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div>
      <div sx={styles.toolbar}>
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          sx={styles.filter}
        />
        <DropdownMenuTrigger>
          <Button variant="outline" sx={styles.columns}>
            Columns
          </Button>
          <DropdownMenu placement="bottom end">
            <DropdownMenuGroup
              selectionMode="multiple"
              selectedKeys={
                table
                  .getVisibleFlatColumns()
                  .filter((column) => column.getCanHide())
                  .map(column => column.id)
              }
              onSelectionChange={(keys) => {
                table.setColumnVisibility(
                  Object.fromEntries(
                    table
                      .getAllFlatColumns()
                      .map((c) => [
                        c.id,
                        !c.getCanHide() || keys === "all" || keys.has(c.id),
                      ])
                  )
                )
              }}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      id={column.id}
                      sx={styles.capitalize}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  )
                })}
            </DropdownMenuGroup>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </div>
      <div sx={styles.frame}>
        <Table>{ ... }</Table>
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

This adds a dropdown menu that you can use to toggle column visibility.

<!-- ::end:steps -->

## Row Selection

Next, we're going to add row selection to our table.

<!-- ::start:steps -->

### Update column definitions

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/columns.tsx" {4,7-28}
import { createColumnHelper } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
])
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/columns.tsx" {4,7-13}
import { createColumnHelper } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: () => <Checkbox slot="selection" />,
    cell: () => <Checkbox slot="selection" />,
    enableSorting: false,
    enableHiding: false,
  }),
])
```

<!-- ::end:only -->

### Update `<DataTable>`

<!-- ::start:only react/base -->

```tsx showLineNumbers title="payments/data-table.tsx" {11,20,25}
export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div sx={styles.frame}>
        <Table />
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="payments/data-table.tsx" {11,20,25,33-43}
export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div sx={styles.frame}>
        <Table
          selectionMode="multiple"
          selectedKeys={table.getSelectedRowModel().rows.map((row) => row.id)}
          onSelectionChange={(selection) => {
            if (selection === "all") {
              table.toggleAllRowsSelected()
            } else {
              table.setRowSelection(
                Object.fromEntries([...selection].map((key) => [key, true]))
              )
            }
          }}
        />
      </div>
    </div>
  )
}
```

<!-- ::end:only -->

This adds a checkbox to each row and a checkbox in the header to select all rows.

### Show selected rows

You can show the number of selected rows using the `table.getFilteredSelectedRowModel()` API.

```tsx
<div sx={styles.selection}>
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

<!-- ::end:steps -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="data-table-rtl" height="460" combinations="react/base,react/aria" direction="rtl" -->
