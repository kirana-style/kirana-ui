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
    vue,
  ]
---

# Data Table

<!-- ::preview item="data-table-demo" height="460" combinations="vue/ark" -->

## Introduction

Every data table or datagrid is unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.

It doesn't make sense to combine all of these variations into a single component. If we do that, we'll lose the flexibility that [headless UI](https://tanstack.com/table/latest/docs/overview#what-is-headless-ui) provides.

So instead of a data-table component, this is a guide to building your own.

We'll start with the basic `<Table />` component and build a complex data table from scratch.

> **Tip:** If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.

## Table of Contents

This guide uses [TanStack Table](https://tanstack.com/table) and its Vue adapter with the `Table` component. Every block below is from the demo above, which is its last section whole:

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

<!-- ::installation name="table" combinations="vue/ark" -->

2. Add the `@tanstack/vue-table` dependency. This guide uses **TanStack Table v9**:

<!-- ::install packages="@tanstack/vue-table" -->

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

```vue showLineNumbers
type Payment = { id: string amount: number status: "pending" | "processing" |
"success" | "failed" email: string } const data: Payment[] = [ { id: "m5gr84i9",
amount: 316, status: "success", email: "ken99@example.com", }, { id: "3u1reuv4",
amount: 242, status: "success", email: "Abe45@example.com", }, { id: "derv1ws0",
amount: 837, status: "processing", email: "Monserrat44@example.com", }, { id:
"5kma53ae", amount: 874, status: "success", email: "Silas22@example.com", }, {
id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com", },
]
```

### Column definitions

The columns hold the data and what each one can do. The template draws the cells that are more than their value (the boxes, the sorting button, the amount and the menu) by column id; `FlexRender` draws the rest.

```vue showLineNumbers
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

Vue's adapter, `useTable`, makes the table's state reactive: the template reads it directly. It keeps its own sorting, filters, visibility, selection and pages, where React's guide holds each in a state of its own.

```vue showLineNumbers
const table = useTable({ features, data, columns })
```

### Render the table

```vue showLineNumbers
<Table>
  <TableHeader>
    <TableRow
      v-for="headerGroup in table.getHeaderGroups()"
      :key="headerGroup.id"
    >
      <TableHead v-for="header in headerGroup.headers" :key="header.id">
        <template v-if="header.isPlaceholder" />
        <Checkbox
          v-else-if="header.column.id === 'select'"
          :checked="
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : false
          "
          aria-label="Select all"
          @checked-change="
            (details: { checked: boolean | 'indeterminate' }) =>
              table.toggleAllPageRowsSelected(details.checked === true)
          "
        />
        <Button
          v-else-if="header.column.id === 'email'"
          variant="ghost"
          @click="
            header.column.toggleSorting(
              header.column.getIsSorted() === 'asc'
            )
          "
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
        <div
          v-else-if="header.column.id === 'amount'"
          :sx="styles.div3"
        >
          Amount
        </div>
        <FlexRender v-else :header="header" />
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <template v-if="table.getRowModel().rows?.length">
      <TableRow
        v-for="row in table.getRowModel().rows"
        :key="row.id"
        :data-state="row.getIsSelected() ? 'selected' : undefined"
      >
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          <Checkbox
            v-if="cell.column.id === 'select'"
            :checked="row.getIsSelected()"
            aria-label="Select row"
            @checked-change="
              (details: { checked: boolean | 'indeterminate' }) =>
                row.toggleSelected(details.checked === true)
            "
          />
          <div v-else-if="cell.column.id === 'status'" :sx="styles.div">
            {{ row.getValue("status") }}
          </div>
          <div v-else-if="cell.column.id === 'email'" :sx="styles.div2">
            {{ row.getValue("email") }}
          </div>
          <div
            v-else-if="cell.column.id === 'amount'"
            :sx="styles.div4"
          >
            {{ formatted(row.original.amount) }}
          </div>
          <DropdownMenu v-else-if="cell.column.id === 'actions'">
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon-xs">
                <span :sx="styles.span">Open menu</span>
                <IconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              :sx="styles.dropdownMenuContent"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem @click="copy(row.original.id)">
                  Copy payment ID
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem
                  >View payment details</DropdownMenuItem
                >
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <FlexRender v-else :cell="cell" />
        </TableCell>
      </TableRow>
    </template>
    <TableRow v-else>
      <TableCell :colspan="columns.length" :sx="styles.tableCell">
        No results.
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

<!-- ::end:steps -->

## Cell Formatting

The amount is formatted as dollars:

```vue showLineNumbers
<div v-else-if="cell.column.id === 'amount'" :sx="styles.div4">
  {{ formatted(row.original.amount) }}
</div>

const formatted = (amount: number) => new Intl.NumberFormat("en-US", { style:
"currency", currency: "USD", }).format(amount)
```

## Row Actions

Each row has a menu of actions on its payment:

```vue showLineNumbers
<DropdownMenu v-else-if="cell.column.id === 'actions'">
  <DropdownMenuTrigger as-child>
    <Button variant="ghost" size="icon-xs">
      <span :sx="styles.span">Open menu</span>
      <IconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeOutlineIcon"
        remixicon="RiMoreLine"
      />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="end"
    :sx="styles.dropdownMenuContent"
  >
    <DropdownMenuGroup>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(row.original.id)">
        Copy payment ID
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem
        >View payment details</DropdownMenuItem
      >
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Pagination

The registered `rowPaginationFeature` pages the rows, ten to a page by default. The controls call the table:

```vue showLineNumbers
<div :sx="styles.div6">
  <Button
    variant="outline"
    size="sm"
    :disabled="!table.getCanPreviousPage()"
    @click="table.previousPage()"
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    :disabled="!table.getCanNextPage()"
    @click="table.nextPage()"
  >
    Next
  </Button>
</div>
```

## Sorting

The Email column sorts when its header is pressed:

```vue showLineNumbers
<Button
  v-else-if="header.column.id === 'email'"
  variant="ghost"
  @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
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
```

## Filtering

The input filters the Email column as it is typed:

```vue showLineNumbers
<Input
  placeholder="Filter emails..."
  :model-value="
    (table.getColumn('email')?.getFilterValue() as string) ?? ''
  "
  @update:model-value="
    (value: string | undefined) =>
      table.getColumn('email')?.setFilterValue(value)
  "
  :sx="styles.input"
/>
```

## Visibility

A menu lists every column that can be hidden, each with its state:

```vue showLineNumbers
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline" :sx="styles.button">
      Columns{{ " " }}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
      />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="end"
    :sx="styles.dataTableDemoDropdownMenuContent"
  >
    <DropdownMenuGroup>
      <DropdownMenuCheckboxItem
        v-for="column in table
          .getAllColumns()
          .filter((column) => column.getCanHide())"
        :key="column.id"
        :sx="styles.dropdownMenuCheckboxItem"
        :checked="column.getIsVisible()"
        @update:checked="
          (value: boolean | null) => column.toggleVisibility(!!value)
        "
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Row Selection

The select column's boxes select the page's rows and each row:

```vue showLineNumbers
<Checkbox
  v-else-if="header.column.id === 'select'"
  :checked="
    table.getIsAllPageRowsSelected()
      ? true
      : table.getIsSomePageRowsSelected()
        ? 'indeterminate'
        : false
  "
  aria-label="Select all"
  @checked-change="
    (details: { checked: boolean | 'indeterminate' }) =>
      table.toggleAllPageRowsSelected(details.checked === true)
  "
/>

<Checkbox
  v-if="cell.column.id === 'select'"
  :checked="row.getIsSelected()"
  aria-label="Select row"
  @checked-change="
    (details: { checked: boolean | 'indeterminate' }) =>
      row.toggleSelected(details.checked === true)
  "
/>
```

And the selection's count:

```vue showLineNumbers
<div :sx="styles.div5">
  {{ table.getFilteredSelectedRowModel().rows.length }} of{{ " "
  }}{{ table.getFilteredRowModel().rows.length }} row(s) selected.
</div>
```

## The whole example

<!-- ::demo-source item="data-table-demo" title="data-table-demo.vue" combinations="vue/ark" -->

## RTL

To enable RTL support in kirana/ui, see the [RTL configuration guide](/docs/design-system/rtl).

<!-- ::preview item="data-table-rtl" height="460" combinations="vue/ark" direction="rtl" -->
