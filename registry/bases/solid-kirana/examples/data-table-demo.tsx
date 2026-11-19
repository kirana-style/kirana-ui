import { For, Show } from "solid-js"

import { IconPlaceholder } from "../ui/icon-placeholder"
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
  createTable,
  FlexRender,
} from "@tanstack/solid-table"

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
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
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

export default function DataTableDemo() {
  // The table keeps its own sorting, filters, visibility, selection and pages (TanStack Table 9's
  // atoms, which Solid's adapter makes reactive), where React's holds each in a state of its own.
  const table = createTable({ features, data, columns })

  return (
    <div sx={page.example}>
      <div sx={styles.dataTableDemoDiv}>
        <div sx={styles.dataTableDemoDiv2}>
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onInput={(event) =>
              table
                .getColumn("email")
                ?.setFilterValue(event.currentTarget.value)
            }
            sx={styles.input}
          />
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
            <DropdownMenuContent
              align="end"
              sx={styles.dataTableDemoDropdownMenuContent}
            >
              <DropdownMenuGroup>
                <For
                  each={table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())}
                >
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
        </div>
        <div sx={styles.dataTableDemoDiv3}>
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
                    <TableRow
                      data-state={row.getIsSelected() ? "selected" : undefined}
                    >
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
