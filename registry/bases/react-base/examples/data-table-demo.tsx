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

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
  dropdownMenuContent: css({
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
  dataTableDemoDropdownMenuContent: css({
    width: { "*": null, base: space[44] },
  }),
  dropdownMenuCheckboxItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  dataTableDemoDiv3: css({
    overflow: "hidden",
    borderRadius: radius.md,
    borderWidth: "1px",
  }),
  tableCell: css({
    height: { "*": null, base: space[24] },
    textAlign: { "*": null, base: "center" },
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
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-xs" />}
          >
            <span sx={styles.span}>Open menu</span>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
            />
          </DropdownMenuTrigger>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" sx={styles.button} />}
            >
              Columns{" "}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sx={styles.dataTableDemoDropdownMenuContent}
            >
              <DropdownMenuGroup>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        sx={styles.dropdownMenuCheckboxItem}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div sx={styles.dataTableDemoDiv3}>
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
                  <TableCell colSpan={columns.length} sx={styles.tableCell}>
                    No results.
                  </TableCell>
                </TableRow>
              )}
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
      </div>
    </div>
  )
}
