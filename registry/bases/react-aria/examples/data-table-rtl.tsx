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

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
  dropdownMenu: css({
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
  dropdownMenuItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  div7: css({
    overflow: "hidden",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
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

export default function DataTableRtl() {
  const { t, dir, language } = useTranslation(translations, "ar")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: "select",
          header: () => <Checkbox slot="selection" />,
          cell: () => <Checkbox slot="selection" />,
          enableSorting: false,
          enableHiding: false,
        }),
        columnHelper.accessor("status", {
          header: t.status,
          cell: ({ row }) => {
            const status = row.getValue("status") as string
            const statusMap: Record<string, string> = {
              success: t.success,
              processing: t.processing,
              failed: t.failed,
              pending: t.pending,
            }
            return <div sx={styles.div}>{statusMap[status]}</div>
          },
        }),
        columnHelper.accessor("email", {
          header: () => {
            return (
              <div sx={buttonVariants({ variant: "ghost" })}>
                {t.email}
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
          cell: ({ row }) => (
            <div sx={styles.div2}>{row.getValue("email")}</div>
          ),
        }),
        columnHelper.accessor("amount", {
          header: () => <div sx={styles.div3}>{t.amount}</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat(
              dir === "rtl" ? "ar-SA" : "en-US",
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
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon-xs">
                  <span sx={styles.span}>{t.openMenu}</span>
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  />
                </Button>
                <DropdownMenu
                  placement={dir === "rtl" ? "bottom start" : "bottom end"}
                  data-lang={dir === "rtl" ? language : undefined}
                  sx={styles.dropdownMenu}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                      {t.copyPaymentId}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>{t.viewCustomer}</DropdownMenuItem>
                    <DropdownMenuItem>{t.viewPaymentDetails}</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenu>
              </DropdownMenuTrigger>
            )
          },
        }),
      ]),
    [t, dir, language]
  )

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
      <div sx={styles.div5}>
        <div sx={styles.div6}>
          <Input
            placeholder={t.filterEmails}
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            sx={styles.input}
          />
          <DropdownMenuTrigger>
            <Button variant="outline" sx={styles.button}>
              {t.columns}{" "}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </Button>
            <DropdownMenu
              placement={dir === "rtl" ? "bottom start" : "bottom end"}
              data-lang={dir === "rtl" ? language : undefined}
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
        <div sx={styles.div7}>
          <Table
            aria-label="Tasks"
            selectionMode="multiple"
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
            <TableBody renderEmptyState={() => t.noResults}>
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
        <div sx={styles.div8}>
          <div sx={styles.div9}>
            {table.getFilteredSelectedRowModel().rows.length} {t.rowsSelected}{" "}
            {table.getFilteredRowModel().rows.length} {t.rowsSelectedSuffix}
          </div>
          <div sx={styles.div10}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
            >
              {t.previous}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
            >
              {t.next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
