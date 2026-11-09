---
title: Data Table
description: Powerful table and datagrids built using TanStack Table.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [
    data table,
    table,
    tanstack table,
    sorting,
    filtering,
    pagination,
    component,
    solid,
  ]
---

# Data Table

<!-- ::preview item="data-table-demo" height="460" combinations="solid/ark" -->

## Introduction

Every data table or datagrid is unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/overview#what-is-headless-ui) provides.

So instead of a data-table component, this is a guide to building your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

> **Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

## Table of Contents

This guide uses [TanStack Table](https://tanstack.com/table) and its Solid adapter with the `Table` component. Every block below is from the demo above, which is its last section whole:

- [Set up Table Features](#set-up-table-features)
- [Basic Table](#basic-table)
- [Cell Formatting](#cell-formatting)
- [Row Actions](#row-actions)
- [Pagination](#pagination)
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Visibility](#visibility)
- [Row Selection](#row-selection)

## Installation

1. Add the `Table` component to your project:

<!-- ::installation name="table" combinations="solid/ark" -->

2. Add the `@tanstack/solid-table` dependency. This guide uses **TanStack Table v9**:

<!-- ::install packages="@tanstack/solid-table" -->

## Set up Table Features

TanStack Table 9 builds a table from the features it registers; anything a table does not register is left out of the bundle. This one sorts, filters, hides columns, selects rows and pages:

```ts showLineNumbers
const features = tableFeatures({
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
```

## Basic Table

<!-- ::start:steps -->

### The data

```ts showLineNumbers
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]
```

### Column definitions

As React's, each column's `header` and `cell` return JSX, which `FlexRender` draws.

```tsx showLineNumbers
const columnHelper = createColumnHelper<typeof features, Payment>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
          table.toggleAllPageRowsSelected(details.checked === true)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
          row.toggleSelected(details.checked === true)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => <div sx={styles.div}>{row.getValue("status")}</div>,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <IconPlaceholder
            lucide="ArrowUpDownIcon"
            tabler="IconArrowsSort"
            hugeicons="ArrowUpDownIcon"
            phosphor="ArrowsDownUpIcon"
            remixicon="RiArrowUpDownLine"
          />
        </Button>
      )
    },
    cell: ({ row }) => <div sx={styles.div2}>{row.getValue("email")}</div>,
  }),
  columnHelper.accessor("amount", {
    header: () => <div sx={styles.div3}>Amount</div>,
    cell: ({ row }) => {
      const amount = row.original.amount

      // Format the amount as a dollar amount.
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div sx={styles.div4}>{formatted}</div>
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(childProps) => (
              <Button {...childProps()} variant="ghost" size="icon-xs">
                <span sx={styles.span}>Open menu</span>
                <IconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                />
              </Button>
            )}
          />
          <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
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
])
```

### The table

Solid's adapter, `createTable`, makes the table's state reactive: JSX reads it directly. It keeps its own sorting, filters, visibility, selection and pages, where React's guide holds each in a state of its own.

```tsx showLineNumbers
const table = createTable({ features, data, columns })
```

### Render the table

```tsx showLineNumbers
<Table>
  <TableHeader>
    <For each={table.getHeaderGroups()}>
      {(headerGroup) => (
        <TableRow>
          <For each={headerGroup.headers}>
            {(header) => (
              <TableHead>
                <Show when={!header.isPlaceholder}>
                  <FlexRender header={header} />
                </Show>
              </TableHead>
            )}
          </For>
        </TableRow>
      )}
    </For>
  </TableHeader>
  <TableBody>
    <Show
      when={table.getRowModel().rows?.length}
      fallback={
        <TableRow>
          <TableCell colspan={columns.length} sx={styles.tableCell}>
            No results.
          </TableCell>
        </TableRow>
      }
    >
      <For each={table.getRowModel().rows}>
        {(row) => (
          <TableRow data-state={row.getIsSelected() ? "selected" : undefined}>
            <For each={row.getVisibleCells()}>
              {(cell) => (
                <TableCell>
                  <FlexRender cell={cell} />
                </TableCell>
              )}
            </For>
          </TableRow>
        )}
      </For>
    </Show>
  </TableBody>
</Table>
```

<!-- ::end:steps -->

## Cell Formatting

The amount is formatted as dollars:

```tsx showLineNumbers
columnHelper.accessor("amount", {
  header: () => <div sx={styles.div3}>Amount</div>,
  cell: ({ row }) => {
    const amount = row.original.amount

    // Format the amount as a dollar amount.
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)

    return <div sx={styles.div4}>{formatted}</div>
  },
}),
```

## Row Actions

Each row has a menu of actions on its payment:

```tsx showLineNumbers
columnHelper.display({
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const payment = row.original

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild={(childProps) => (
            <Button {...childProps()} variant="ghost" size="icon-xs">
              <span sx={styles.span}>Open menu</span>
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
            </Button>
          )}
        />
        <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
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
```

## Pagination

The registered `rowPaginationFeature` pages the rows, ten to a page by default. The controls call the table:

```tsx showLineNumbers
<div sx={styles.div6}>
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
```

## Sorting

The Email column sorts when its header is pressed:

```tsx showLineNumbers
columnHelper.accessor("email", {
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <IconPlaceholder
          lucide="ArrowUpDownIcon"
          tabler="IconArrowsSort"
          hugeicons="ArrowUpDownIcon"
          phosphor="ArrowsDownUpIcon"
          remixicon="RiArrowUpDownLine"
        />
      </Button>
    )
  },
  cell: ({ row }) => <div sx={styles.div2}>{row.getValue("email")}</div>,
}),
```

## Filtering

The input filters the Email column as it is typed:

```tsx showLineNumbers
<Input
  placeholder="Filter emails..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onInput={(event) =>
    table.getColumn("email")?.setFilterValue(event.currentTarget.value)
  }
  sx={styles.input}
/>
```

## Visibility

A menu lists every column that can be hidden, each with its state:

```tsx showLineNumbers
<DropdownMenu>
  <DropdownMenuTrigger
    asChild={(childProps) => (
      <Button {...childProps()} variant="outline" sx={styles.button}>
        Columns{" "}
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
        />
      </Button>
    )}
  />
  <DropdownMenuContent align="end" sx={styles.dataTableDemoDropdownMenuContent}>
    <DropdownMenuGroup>
      <For each={table.getAllColumns().filter((column) => column.getCanHide())}>
        {(column) => (
          <DropdownMenuCheckboxItem
            sx={styles.dropdownMenuCheckboxItem}
            checked={column.getIsVisible()}
            onCheckedChange={(details) =>
              column.toggleVisibility(details.checked)
            }
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        )}
      </For>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Row Selection

The select column's boxes select the page's rows and each row:

```tsx showLineNumbers
columnHelper.display({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
      }
      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
        table.toggleAllPageRowsSelected(details.checked === true)
      }
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
        row.toggleSelected(details.checked === true)
      }
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
}),
```

And the selection's count:

```tsx showLineNumbers
<div sx={styles.div5}>
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

## The whole example

<!-- ::demo-source item="data-table-demo" title="data-table-demo.tsx" combinations="solid/ark" -->

## RTL

To enable RTL support in kirana/ui, see the [RTL configuration guide](/docs/design-system/rtl).

<!-- ::preview item="data-table-rtl" height="460" combinations="solid/ark" direction="rtl" -->
