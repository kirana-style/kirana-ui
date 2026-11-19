import { For, Show } from "solid-js"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
import { css } from "@kirana-style/core"
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

export default function DataTableRtl() {
  // The direction is the page's (the preview's `LocaleProvider`), as React's and upstream's demo.
  const translation = useTranslation(translations, "ar")
  const t = () => translation.t

  // The menus open on the reading direction's end.
  const align = () => (translation.dir === "rtl" ? "start" : "end")

  const statuses = (): Record<string, string> => ({
    success: t().success,
    processing: t().processing,
    failed: t().failed,
    pending: t().pending,
  })

  // The columns read the language as they draw, so a change of language redraws them.
  const columns = columnHelper.columns([
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
          aria-label={t().selectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
            row.toggleSelected(details.checked === true)
          }
          aria-label={t().selectRow}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: () => t().status,
      cell: ({ row }) => (
        <div sx={styles.div}>{statuses()[row.original.status]}</div>
      ),
    }),
    columnHelper.accessor("email", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t().email}
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
      header: () => <div sx={styles.div3}>{t().amount}</div>,
      cell: ({ row }) => {
        const amount = row.original.amount

        // The amount as dollars, written as the language writes them.
        const formatted = new Intl.NumberFormat(
          translation.dir === "rtl" ? "ar-SA" : "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ).format(amount)

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
                  <span sx={styles.span}>{t().openMenu}</span>
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
            <DropdownMenuContent
              align={align()}
              data-lang={
                translation.dir === "rtl" ? translation.language : undefined
              }
              sx={styles.dropdownMenuContent}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t().actions}</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  {t().copyPaymentId}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>{t().viewCustomer}</DropdownMenuItem>
                <DropdownMenuItem>{t().viewPaymentDetails}</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }),
  ])

  // The table keeps its own sorting, filters, visibility, selection and pages (TanStack Table 9's
  // atoms, which Solid's adapter makes reactive), where React's holds each in a state of its own.
  const table = createTable({ features, data, columns })

  return (
    <div sx={page.example}>
      <div sx={styles.div5}>
        <div sx={styles.div6}>
          <Input
            placeholder={t().filterEmails}
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
                  {t().columns}{" "}
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
              align={align()}
              data-lang={
                translation.dir === "rtl" ? translation.language : undefined
              }
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
        <div sx={styles.div7}>
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
                      {t().noResults}
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
        <div sx={styles.div8}>
          <div sx={styles.div9}>
            {table.getFilteredSelectedRowModel().rows.length} {t().rowsSelected}{" "}
            {table.getFilteredRowModel().rows.length} {t().rowsSelectedSuffix}
          </div>
          <div sx={styles.div10}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {t().previous}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {t().next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
