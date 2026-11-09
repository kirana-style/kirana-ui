<script setup lang="ts">
import {
  FlexRender,
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
} from "@tanstack/vue-table"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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

const columnHelper = createColumnHelper<typeof features, Payment>()

// The columns hold the data and what each one can do; the template draws the cells that are
// more than their value (the boxes, the sorting button, the amount, the menu), by column id.
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

// The table keeps its own sorting, filters, visibility, selection and pages (TanStack Table 9's
// atoms, which Vue's adapter makes reactive), where React's holds each in a state of its own.
const table = useTable({ features, data, columns })

// Format the amount as a dollar amount.
const formatted = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

const copy = (text: string) => navigator.clipboard.writeText(text)
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.dataTableDemoDiv">
      <div :sx="styles.dataTableDemoDiv2">
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
      </div>
      <div :sx="styles.dataTableDemoDiv3">
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
      </div>
      <div :sx="styles.dataTableDemoDiv4">
        <div :sx="styles.div5">
          {{ table.getFilteredSelectedRowModel().rows.length }} of{{ " "
          }}{{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
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
      </div>
    </div>
  </div>
</template>
