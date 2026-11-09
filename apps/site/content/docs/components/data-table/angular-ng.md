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
    angular,
  ]
---

# Data Table

<!-- ::preview item="data-table-demo" height="460" combinations="angular/ng" -->

## Introduction

Every data table or datagrid is unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/overview#what-is-headless-ui) provides.

So instead of a data-table component, this is a guide to building your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

> **Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

## Table of Contents

This guide uses [TanStack Table](https://tanstack.com/table) and its Angular adapter with the `Table` component. Every block below is from the demo above, which is its last section whole:

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

<!-- ::installation name="table" combinations="angular/ng" -->

2. Add the `@tanstack/angular-table` dependency. This guide uses **TanStack Table v9**:

<!-- ::install packages="@tanstack/angular-table" -->

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
type Payment = {
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

The columns hold the data and what each one can do. The template draws the cells that are more than their value (the boxes, the sorting button, the amount and the menu) with `@switch` on the column id; `*flexRenderHeader` and `*flexRenderCell` draw the rest.

```ts showLineNumbers
const columnHelper = createColumnHelper<typeof features, Payment>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("amount", { header: "Amount" }),
  columnHelper.display({ id: "actions", enableHiding: false }),
])
```

### The table

Angular's adapter, `injectTable`, gives the table's state as signals: the template reads it directly. It keeps its own sorting, filters, visibility, selection and pages, where React's guide holds each in a state of its own.

```ts showLineNumbers
protected readonly table = injectTable(() => ({ features, data, columns }))
```

### Render the table

```ts showLineNumbers
<div kuiTable>
  <thead kuiTableHeader>
    @for (
      headerGroup of table.getHeaderGroups();
      track headerGroup.id
    ) {
      <tr kuiTableRow>
        @for (header of headerGroup.headers; track header.id) {
          <th kuiTableHead>
            @if (!header.isPlaceholder) {
              @switch (header.column.id) {
                @case ("select") {
                  <span
                    kuiCheckbox
                    [checked]="table.getIsAllPageRowsSelected()"
                    [indeterminate]="
                      table.getIsSomePageRowsSelected() &&
                      !table.getIsAllPageRowsSelected()
                    "
                    aria-label="Select all"
                    (checkedChange)="
                      table.toggleAllPageRowsSelected($event)
                    "
                  ></span>
                }
                @case ("email") {
                  <button
                    kuiButton
                    variant="ghost"
                    (click)="
                      header.column.toggleSorting(
                        header.column.getIsSorted() === 'asc'
                      )
                    "
                  >
                    Email
                    <svg
                      iconPlaceholder
                      lucide="ArrowUpDownIcon"
                      tabler="IconArrowsSort"
                      hugeicons="ArrowUpDownIcon"
                      phosphor="ArrowsDownUpIcon"
                      remixicon="RiArrowUpDownLine"
                    ></svg>
                  </button>
                }
                @case ("amount") {
                  <div [sx]="styles.div3">Amount</div>
                }
                @default {
                  <ng-container
                    *flexRenderHeader="header; let content"
                    >{{ content }}</ng-container
                  >
                }
              }
            }
          </th>
        }
      </tr>
    }
  </thead>
  <tbody kuiTableBody>
    @for (row of table.getRowModel().rows; track row.id) {
      <tr
        kuiTableRow
        [attr.data-state]="row.getIsSelected() ? 'selected' : null"
      >
        @for (cell of row.getVisibleCells(); track cell.id) {
          <td kuiTableCell>
            @switch (cell.column.id) {
              @case ("select") {
                <span
                  kuiCheckbox
                  [checked]="row.getIsSelected()"
                  aria-label="Select row"
                  (checkedChange)="row.toggleSelected($event)"
                ></span>
              }
              @case ("status") {
                <div [sx]="styles.div">{{ row.original.status }}</div>
              }
              @case ("email") {
                <div [sx]="styles.div2">{{ row.original.email }}</div>
              }
              @case ("amount") {
                <div [sx]="styles.div4">
                  {{ formatted(row.original.amount) }}
                </div>
              }
              @case ("actions") {
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-xs"
                  >
                    <span [sx]="styles.span">Open menu</span>
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    ></svg>
                  </button>
                  <div
                    kuiDropdownMenuContent
                    align="end"
                    [sx]="styles.dropdownMenuContent"
                  >
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuLabel>Actions</div>
                      <div
                        kuiDropdownMenuItem
                        (click)="copy(row.original.id)"
                      >
                        Copy payment ID
                      </div>
                    </div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>View customer</div>
                      <div kuiDropdownMenuItem>
                        View payment details
                      </div>
                    </div>
                  </div>
                </ng-container>
              }
              @default {
                <ng-container *flexRenderCell="cell; let content">{{
                  content
                }}</ng-container>
              }
            }
          </td>
        }
      </tr>
    } @empty {
      <tr kuiTableRow>
        <td
          kuiTableCell
          [attr.colspan]="columns.length"
          [sx]="styles.tableCell"
        >
          No results.
        </td>
      </tr>
    }
  </tbody>
</div>
```

<!-- ::end:steps -->

## Cell Formatting

The amount is formatted as dollars:

```ts showLineNumbers
@case ("amount") {
  <div [sx]="styles.div4">
    {{ formatted(row.original.amount) }}
  </div>
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
```

## Row Actions

Each row has a menu of actions on its payment:

```ts showLineNumbers
@case ("actions") {
  <ng-container kuiDropdownMenu>
    <button
      kuiButton
      kuiDropdownMenuTrigger
      variant="ghost"
      size="icon-xs"
    >
      <span [sx]="styles.span">Open menu</span>
      <svg
        iconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeOutlineIcon"
        remixicon="RiMoreLine"
      ></svg>
    </button>
    <div
      kuiDropdownMenuContent
      align="end"
      [sx]="styles.dropdownMenuContent"
    >
      <div kuiDropdownMenuGroup>
        <div kuiDropdownMenuLabel>Actions</div>
        <div
          kuiDropdownMenuItem
          (click)="copy(row.original.id)"
        >
          Copy payment ID
        </div>
      </div>
      <div kuiDropdownMenuSeparator></div>
      <div kuiDropdownMenuGroup>
        <div kuiDropdownMenuItem>View customer</div>
        <div kuiDropdownMenuItem>
          View payment details
        </div>
      </div>
    </div>
  </ng-container>
}
```

## Pagination

The registered `rowPaginationFeature` pages the rows, ten to a page by default. The controls call the table:

```ts showLineNumbers
<div [sx]="styles.div6">
  <button
    kuiButton
    variant="outline"
    size="sm"
    [disabled]="!table.getCanPreviousPage()"
    (click)="table.previousPage()"
  >
    Previous
  </button>
  <button
    kuiButton
    variant="outline"
    size="sm"
    [disabled]="!table.getCanNextPage()"
    (click)="table.nextPage()"
  >
    Next
  </button>
</div>
```

## Sorting

The Email column sorts when its header is pressed:

```ts showLineNumbers
@case ("email") {
  <button
    kuiButton
    variant="ghost"
    (click)="
      header.column.toggleSorting(
        header.column.getIsSorted() === 'asc'
      )
    "
  >
    Email
    <svg
      iconPlaceholder
      lucide="ArrowUpDownIcon"
      tabler="IconArrowsSort"
      hugeicons="ArrowUpDownIcon"
      phosphor="ArrowsDownUpIcon"
      remixicon="RiArrowUpDownLine"
    ></svg>
  </button>
}
```

## Filtering

The input filters the Email column as it is typed:

```ts showLineNumbers
<input
  kuiInput
  placeholder="Filter emails..."
  [value]="emailFilter()"
  (input)="filterEmails($event)"
  [sx]="styles.input"
/>

protected filterEmails(event: Event) {
  this.table
    .getColumn("email")
    ?.setFilterValue((event.target as HTMLInputElement).value)
}
```

## Visibility

A menu lists every column that can be hidden, each with its state:

```ts showLineNumbers
<ng-container kuiDropdownMenu>
  <button
    kuiButton
    kuiDropdownMenuTrigger
    variant="outline"
    [sx]="styles.button"
  >
    Columns
    <svg
      iconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
    ></svg>
  </button>
  <div
    kuiDropdownMenuContent
    align="end"
    [sx]="styles.dataTableDemoDropdownMenuContent"
  >
    <div kuiDropdownMenuGroup>
      @for (column of hideable(); track column.id) {
        <div
          kuiDropdownMenuCheckboxItem
          [sx]="styles.dropdownMenuCheckboxItem"
          [checked]="column.getIsVisible()"
          (checkedChange)="column.toggleVisibility($event)"
        >
          {{ column.id }}
        </div>
      }
    </div>
  </div>
</ng-container>

protected readonly hideable = computed(() =>
  this.table.getAllColumns().filter((column) => column.getCanHide())
)
```

## Row Selection

The select column's boxes select the page's rows and each row:

```ts showLineNumbers
@case ("select") {
  <span
    kuiCheckbox
    [checked]="table.getIsAllPageRowsSelected()"
    [indeterminate]="
      table.getIsSomePageRowsSelected() &&
      !table.getIsAllPageRowsSelected()
    "
    aria-label="Select all"
    (checkedChange)="
      table.toggleAllPageRowsSelected($event)
    "
  ></span>
}

@case ("select") {
  <span
    kuiCheckbox
    [checked]="row.getIsSelected()"
    aria-label="Select row"
    (checkedChange)="row.toggleSelected($event)"
  ></span>
}
```

And the selection's count:

```ts showLineNumbers
<div [sx]="styles.div5">
  {{ table.getFilteredSelectedRowModel().rows.length }} of
  {{ table.getFilteredRowModel().rows.length }} row(s) selected.
</div>
```

## The whole example

<!-- ::demo-source item="data-table-demo" title="data-table-demo.ts" combinations="angular/ng" -->

## RTL

To enable RTL support in kirana/ui, see the [RTL configuration guide](/docs/design-system/rtl).

<!-- ::preview item="data-table-rtl" height="460" combinations="angular/ng" direction="rtl" -->
