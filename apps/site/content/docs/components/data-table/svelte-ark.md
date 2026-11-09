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
    svelte,
  ]
---

# Data Table

<!-- ::preview item="data-table-demo" height="460" combinations="svelte/ark" -->

## Introduction

Every data table or datagrid is unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/overview#what-is-headless-ui) provides.

So instead of a data-table component, this is a guide to building your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

> **Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

## Table of Contents

This guide uses [TanStack Table](https://tanstack.com/table) and its Svelte adapter with the `Table` component. Every block below is from the demo above, which is its last section whole:

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

<!-- ::installation name="table" combinations="svelte/ark" -->

2. Add the `@tanstack/svelte-table` dependency. This guide uses **TanStack Table v9**:

<!-- ::install packages="@tanstack/svelte-table" -->

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

```svelte showLineNumbers
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

The columns hold the data and what each one can do. The markup draws the cells that are more than their value (the boxes, the sorting button, the amount and the menu) by column id; `FlexRender` draws the rest.

```svelte showLineNumbers
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

Svelte's adapter, `createTable`, makes the table's state reactive: the markup reads it directly. It keeps its own sorting, filters, visibility, selection and pages, where React's guide holds each in a state of its own.

```svelte showLineNumbers
const table = createTable({ features, data, columns })
```

### Render the table

```svelte showLineNumbers
<Table>
  <TableHeader>
    {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
      <TableRow>
        {#each headerGroup.headers as header (header.id)}
          <TableHead>
            {#if !header.isPlaceholder}
            {#if header.column.id === "select"}
              <Checkbox
                checked={table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                    ? "indeterminate"
                    : false}
                aria-label="Select all"
                onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
                  table.toggleAllPageRowsSelected(details.checked === true)}
              />
            {:else if header.column.id === "email"}
              <Button variant="ghost" onclick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
                Email
                <IconPlaceholder lucide="ArrowUpDownIcon" tabler="IconArrowsSort" hugeicons="ArrowUpDownIcon" phosphor="ArrowsDownUpIcon" remixicon="RiArrowUpDownLine" />
              </Button>
            {:else if header.column.id === "amount"}
              <div sx={styles.div3}>Amount</div>
            {:else}
              <FlexRender {header} />
            {/if}
            {/if}
          </TableHead>
        {/each}
      </TableRow>
    {/each}
  </TableHeader>
  <TableBody>
    {#if table.getRowModel().rows?.length}
      {#each table.getRowModel().rows as row (row.id)}
        <TableRow data-state={row.getIsSelected() ? "selected" : undefined}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <TableCell>
              {#if cell.column.id === "select"}
                <Checkbox
                  checked={row.getIsSelected()}
                  aria-label="Select row"
                  onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
                    row.toggleSelected(details.checked === true)}
                />
              {:else if cell.column.id === "status"}
                <div sx={styles.div}>{row.getValue("status")}</div>
              {:else if cell.column.id === "email"}
                <div sx={styles.div2}>{row.getValue("email")}</div>
              {:else if cell.column.id === "amount"}
                <div sx={styles.div4}>{formatted(row.original.amount)}</div>
              {:else if cell.column.id === "actions"}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {#snippet asChild(props)}
                      <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-xs">
                        <span sx={styles.span}>Open menu</span>
                        <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
                      </Button>
                    {/snippet}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onclick={() => copy(row.original.id)}>
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
              {:else}
                <FlexRender {cell} />
              {/if}
            </TableCell>
          {/each}
        </TableRow>
      {/each}
    {:else}
      <TableRow>
        <TableCell colspan={columns.length} sx={styles.tableCell}>
          No results.
        </TableCell>
      </TableRow>
    {/if}
  </TableBody>
</Table>
```

<!-- ::end:steps -->

## Cell Formatting

The amount is formatted as dollars:

```svelte showLineNumbers
{:else if cell.column.id === "amount"}
  <div sx={styles.div4}>{formatted(row.original.amount)}</div>

const formatted = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
```

## Row Actions

Each row has a menu of actions on its payment:

```svelte showLineNumbers
{:else if cell.column.id === "actions"}
  <DropdownMenu>
    <DropdownMenuTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-xs">
          <span sx={styles.span}>Open menu</span>
          <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
        </Button>
      {/snippet}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onclick={() => copy(row.original.id)}>
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
```

## Pagination

The registered `rowPaginationFeature` pages the rows, ten to a page by default. The controls call the table:

```svelte showLineNumbers
<div sx={styles.div6}>
  <Button variant="outline" size="sm" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
    Previous
  </Button>
  <Button variant="outline" size="sm" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
    Next
  </Button>
</div>
```

## Sorting

The Email column sorts when its header is pressed:

```svelte showLineNumbers
{:else if header.column.id === "email"}
  <Button variant="ghost" onclick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
    Email
    <IconPlaceholder lucide="ArrowUpDownIcon" tabler="IconArrowsSort" hugeicons="ArrowUpDownIcon" phosphor="ArrowsDownUpIcon" remixicon="RiArrowUpDownLine" />
  </Button>
```

## Filtering

The input filters the Email column as it is typed:

```svelte showLineNumbers
<Input
  placeholder="Filter emails..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  oninput={(event: Event) =>
    table
      .getColumn("email")
      ?.setFilterValue((event.currentTarget as HTMLInputElement).value)}
  sx={styles.input}
/>
```

## Visibility

A menu lists every column that can be hidden, each with its state:

```svelte showLineNumbers
<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.button}>
        Columns{" "}
        <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" sx={styles.dataTableDemoDropdownMenuContent}>
    <DropdownMenuGroup>
      {#each table.getAllColumns().filter((column) => column.getCanHide()) as column (column.id)}
        <DropdownMenuCheckboxItem sx={styles.dropdownMenuCheckboxItem} bind:checked={() => column.getIsVisible(), (value) => column.toggleVisibility(!!value)}>
          {column.id}
        </DropdownMenuCheckboxItem>
      {/each}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Row Selection

The select column's boxes select the page's rows and each row:

```svelte showLineNumbers
{#if header.column.id === "select"}
  <Checkbox
    checked={table.getIsAllPageRowsSelected()
      ? true
      : table.getIsSomePageRowsSelected()
        ? "indeterminate"
        : false}
    aria-label="Select all"
    onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
      table.toggleAllPageRowsSelected(details.checked === true)}
  />

{#if cell.column.id === "select"}
  <Checkbox
    checked={row.getIsSelected()}
    aria-label="Select row"
    onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
      row.toggleSelected(details.checked === true)}
  />
```

And the selection's count:

```svelte showLineNumbers
<div sx={styles.div5}>
  {table.getFilteredSelectedRowModel().rows.length} of{" "}{table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

## The whole example

<!-- ::demo-source item="data-table-demo" title="data-table-demo.svelte" combinations="svelte/ark" -->

## RTL

To enable RTL support in kirana/ui, see the [RTL configuration guide](/docs/design-system/rtl).

<!-- ::preview item="data-table-rtl" height="460" combinations="svelte/ark" direction="rtl" -->
