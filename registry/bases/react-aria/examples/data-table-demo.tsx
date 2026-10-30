import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
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
  useTable,
} from "@tanstack/react-table"
import type {
  ColumnFiltersState,
  ColumnVisibilityState,
  SortingState,
} from "@tanstack/react-table"

import { Button, buttonVariants } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { css, select } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    textTransform: "capitalize",
  }),
  div2: css({
    textTransform: "lowercase",
  }),
  div3: css({
    textAlign: "right",
  }),
  div4: css({
    textAlign: "right",
    fontWeight: fontWeight.medium,
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  dropdownMenu: css({
    width: { "*": null, base: space[44] },
  }),
  dataTableDemoDiv: css({
    width: "100%",
  }),
  dataTableDemoDiv2: css({
    display: "flex",
    alignItems: "center",
    paddingBlock: space[4],
  }),
  input: css({
    maxWidth: containerSize.sm,
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  dataTableDemoDropdownMenu: css({
    width: { "*": null, base: space[44] },
  }),
  dropdownMenuItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  dataTableDemoDiv3: css({
    overflow: "hidden",
    borderRadius: radius.md,
    borderWidth: "1px",
  }),
  dataTableDemoDiv4: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBlock: space[4],
    [select.child(":not(:last-child)")]: {
      marginInlineStart: "0px",
      marginInlineEnd: space[2],
    },
  }),
  div5: css({
    flex: "1 1 0%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div6: css({
    [select.child(":not(:last-child)")]: {
      marginInlineStart: "0px",
      marginInlineEnd: space[2],
    },
  }),
}

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
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

const columnHelper = createColumnHelper<typeof features, Payment>()

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

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: () => <Checkbox slot="selection" />,
    cell: () => <Checkbox slot="selection" />,
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => <div sx={styles.div}>{row.getValue("status")}</div>,
  }),
  columnHelper.accessor("email", {
    header: () => {
      return (
        <div sx={buttonVariants({ variant: "ghost" })}>
          Email
          <IconPlaceholder
            lucide="ArrowUpDownIcon"
            tabler="IconArrowsSort"
            hugeicons="ArrowUpDownIcon"
            phosphor="ArrowsDownUpIcon"
            remixicon="RiArrowUpDownLine"
          />
        </div>
      )
    },
    cell: ({ row }) => <div sx={styles.div2}>{row.getValue("email")}</div>,
  }),
  columnHelper.accessor("amount", {
    header: () => <div sx={styles.div3}>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

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
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon-xs">
            <span sx={styles.span}>Open menu</span>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
            />
          </Button>
          <DropdownMenu placement="bottom end" sx={styles.dropdownMenu}>
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
])

export default function DataTableDemo() {
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
    <div sx={page.example}>
      <div sx={styles.dataTableDemoDiv}>
        <div sx={styles.dataTableDemoDiv2}>
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            sx={styles.input}
          />
          <DropdownMenuTrigger>
            <Button variant="outline" sx={styles.button}>
              Columns{" "}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </Button>
            <DropdownMenu
              placement="bottom end"
              sx={styles.dataTableDemoDropdownMenu}
            >
              <DropdownMenuGroup
                selectionMode="multiple"
                selectedKeys={table
                  .getVisibleFlatColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => column.id)}
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
                        sx={styles.dropdownMenuItem}
                      >
                        {column.id}
                      </DropdownMenuItem>
                    )
                  })}
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </div>
        <div sx={styles.dataTableDemoDiv3}>
          <Table
            aria-label="Tasks"
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
              ])
            }}
          >
            <TableHeader>
              {table.getFlatHeaders().map((header) => (
                <TableHead
                  key={header.id}
                  id={header.id}
                  isRowHeader={header.index === 1}
                  allowsSorting={header.column.getCanSort()}
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
        <div sx={styles.dataTableDemoDiv4}>
          <div sx={styles.div5}>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div sx={styles.div6}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
