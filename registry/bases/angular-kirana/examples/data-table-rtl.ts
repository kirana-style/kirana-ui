import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
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
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
    textAlign: "start",
  }),
  div4: css({
    textAlign: "start",
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
    width: { "*": null, base: space[40] },
  }),
  div5: css({
    width: "100%",
  }),
  div6: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingBlock: space[4],
  }),
  input: css({
    maxWidth: containerSize.sm,
  }),
  button: css({
    marginInlineStart: { "*": null, base: "auto" },
  }),
  dropdownMenuCheckboxItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  div7: css({
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
  div8: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: space[2],
    paddingBlock: space[4],
  }),
  div9: css({
    flex: "1 1 0%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div10: css({
    display: "flex",
    gap: space[2],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      filterEmails: "Filter emails...",
      columns: "Columns",
      status: "Status",
      email: "Email",
      amount: "Amount",
      actions: "Actions",
      copyPaymentId: "Copy payment ID",
      viewCustomer: "View customer",
      viewPaymentDetails: "View payment details",
      selectAll: "Select all",
      selectRow: "Select row",
      openMenu: "Open menu",
      noResults: "No results.",
      rowsSelected: "of",
      rowsSelectedSuffix: "row(s) selected.",
      previous: "Previous",
      next: "Next",
      success: "Success",
      processing: "Processing",
      failed: "Failed",
      pending: "Pending",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      filterEmails: "تصفية البريد الإلكتروني...",
      columns: "الأعمدة",
      status: "الحالة",
      email: "البريد الإلكتروني",
      amount: "المبلغ",
      actions: "الإجراءات",
      copyPaymentId: "نسخ معرف الدفع",
      viewCustomer: "عرض العميل",
      viewPaymentDetails: "عرض تفاصيل الدفع",
      selectAll: "تحديد الكل",
      selectRow: "تحديد الصف",
      openMenu: "فتح القائمة",
      noResults: "لا توجد نتائج.",
      rowsSelected: "من",
      rowsSelectedSuffix: "صف(وف) محدد.",
      previous: "السابق",
      next: "التالي",
      success: "ناجح",
      processing: "قيد المعالجة",
      failed: "فشل",
      pending: "قيد الانتظار",
    },
  },
  he: {
    dir: "rtl",
    values: {
      filterEmails: "סנן אימיילים...",
      columns: "עמודות",
      status: "סטטוס",
      email: "אימייל",
      amount: "סכום",
      actions: "פעולות",
      copyPaymentId: "העתק מזהה תשלום",
      viewCustomer: "צפה בלקוח",
      viewPaymentDetails: "צפה בפרטי תשלום",
      selectAll: "בחר הכל",
      selectRow: "בחר שורה",
      openMenu: "פתח תפריט",
      noResults: "אין תוצאות.",
      rowsSelected: "מתוך",
      rowsSelectedSuffix: "שורות נבחרו.",
      previous: "הקודם",
      next: "הבא",
      success: "הצליח",
      processing: "מעבד",
      failed: "נכשל",
      pending: "ממתין",
    },
  },
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
  columnHelper.accessor("status", {}),
  columnHelper.accessor("email", {}),
  columnHelper.accessor("amount", {}),
  columnHelper.display({ id: "actions", enableHiding: false }),
])

@Component({
  selector: "data-table-rtl",
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
      <div [sx]="styles.div5">
        <div [sx]="styles.div6">
          <input
            kuiInput
            [placeholder]="t().filterEmails"
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
              {{ t().columns }}
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
              [align]="align()"
              [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
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
        <div [sx]="styles.div7">
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
                              [attr.aria-label]="t().selectAll"
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
                              {{ t().email }}
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
                            <div [sx]="styles.div3">{{ t().amount }}</div>
                          }
                          @case ("status") {
                            {{ t().status }}
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
                            [attr.aria-label]="t().selectRow"
                            (checkedChange)="row.toggleSelected($event)"
                          ></span>
                        }
                        @case ("status") {
                          <div [sx]="styles.div">
                            {{ statuses()[row.original.status] }}
                          </div>
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
                              <span [sx]="styles.span">{{ t().openMenu }}</span>
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
                              [align]="align()"
                              [attr.data-lang]="
                                dir() === 'rtl' ? language() : undefined
                              "
                              [sx]="styles.dropdownMenuContent"
                            >
                              <div kuiDropdownMenuGroup>
                                <div kuiDropdownMenuLabel>
                                  {{ t().actions }}
                                </div>
                                <div
                                  kuiDropdownMenuItem
                                  (click)="copy(row.original.id)"
                                >
                                  {{ t().copyPaymentId }}
                                </div>
                              </div>
                              <div kuiDropdownMenuSeparator></div>
                              <div kuiDropdownMenuGroup>
                                <div kuiDropdownMenuItem>
                                  {{ t().viewCustomer }}
                                </div>
                                <div kuiDropdownMenuItem>
                                  {{ t().viewPaymentDetails }}
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
                    {{ t().noResults }}
                  </td>
                </tr>
              }
            </tbody>
          </div>
        </div>
        <div [sx]="styles.div8">
          <div [sx]="styles.div9">
            {{ table.getFilteredSelectedRowModel().rows.length }}
            {{ t().rowsSelected }}
            {{ table.getFilteredRowModel().rows.length }}
            {{ t().rowsSelectedSuffix }}
          </div>
          <div [sx]="styles.div10">
            <button
              kuiButton
              variant="outline"
              size="sm"
              [disabled]="!table.getCanPreviousPage()"
              (click)="table.previousPage()"
            >
              {{ t().previous }}
            </button>
            <button
              kuiButton
              variant="outline"
              size="sm"
              [disabled]="!table.getCanNextPage()"
              (click)="table.nextPage()"
            >
              {{ t().next }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class DataTableRtl {
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
  // The direction is the page's (the preview's), as React's and upstream's demo.
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly language = this.i18n.language
  protected readonly t = this.i18n.t
  /** The menus open on the reading direction's end. */
  protected readonly align = computed(() =>
    this.dir() === "rtl" ? "start" : "end"
  )
  protected readonly statuses = computed<Record<string, string>>(() => ({
    success: this.t().success,
    processing: this.t().processing,
    failed: this.t().failed,
    pending: this.t().pending,
  }))
  protected readonly styles = styles
  protected readonly columns = columns
  protected readonly page = page

  protected filterEmails(event: Event) {
    this.table
      .getColumn("email")
      ?.setFilterValue((event.target as HTMLInputElement).value)
  }

  // The amount as dollars, written as the language writes them.
  protected formatted(amount: number) {
    return new Intl.NumberFormat(this.dir() === "rtl" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  protected copy(text: string) {
    void navigator.clipboard.writeText(text)
  }
}
