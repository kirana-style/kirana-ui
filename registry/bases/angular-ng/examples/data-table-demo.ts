import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import {
  FlexRender,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  injectTable,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/angular-table"

import { IconPlaceholder } from "../../../icons/angular"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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

// Format the amount as a dollar amount.
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

@Component({
  selector: "data-table-demo",
  imports: [
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    FlexRender,
    IconPlaceholder,
    Input,
    SxDirective,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.dataTableDemoDiv">
        <div [sx]="styles.dataTableDemoDiv2">
          <input
            kuiInput
            placeholder="Filter emails..."
            [value]="emailFilter()"
            (input)="filterEmails($event)"
            [sx]="styles.input"
          />
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
        </div>
        <div [sx]="styles.dataTableDemoDiv3">
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
        </div>
        <div [sx]="styles.dataTableDemoDiv4">
          <div [sx]="styles.div5">
            {{ table.getFilteredSelectedRowModel().rows.length }} of
            {{ table.getFilteredRowModel().rows.length }} row(s) selected.
          </div>
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
        </div>
      </div>
    </div>
  `,
})
export default class DataTableDemo {
  // The table keeps its own sorting, filters, visibility, selection and pages (TanStack Table 9's
  // atoms, which Angular's adapter makes signals), where React's holds each in a state of its own.
  protected readonly table = injectTable(() => ({ features, data, columns }))
  /** The columns the menu can hide. */
  protected readonly hideable = computed(() =>
    this.table.getAllColumns().filter((column) => column.getCanHide())
  )
  protected readonly emailFilter = computed(
    () => (this.table.getColumn("email")?.getFilterValue() as string) ?? ""
  )
  protected readonly styles = styles
  protected readonly columns = columns
  protected readonly page = page

  protected filterEmails(event: Event) {
    this.table
      .getColumn("email")
      ?.setFilterValue((event.target as HTMLInputElement).value)
  }

  protected formatted(amount: number) {
    return currency.format(amount)
  }

  protected copy(text: string) {
    void navigator.clipboard.writeText(text)
  }
}
