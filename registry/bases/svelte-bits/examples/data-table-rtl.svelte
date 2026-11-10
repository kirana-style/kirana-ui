<script lang="ts">
  import {
    FlexRender,
    createTable,
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
    } from "@tanstack/svelte-table"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { useTranslation } from "../components/language-selector"
  import type { Translations } from "../components/language-selector"
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

  // The table keeps its own sorting, filters, visibility, selection and pages (TanStack Table 9's
  // atoms, which Svelte's adapter makes reactive), where React's holds each in a state of its own.
  const table = createTable({ features, data, columns })

  // The direction is the page's (the preview's `LocaleProvider`), as React's and upstream's demo.
  const translation = useTranslation(translations, "ar")
  const t = $derived(translation.t)

  // The menus open on the reading direction's end.
  const align = $derived(translation.dir === "rtl" ? "start" : "end")

  const statuses = $derived<Record<string, string>>({
    success: t.success,
    processing: t.processing,
    failed: t.failed,
    pending: t.pending,
  })

  // The amount as dollars, written as the language writes them.
  const formatted = (amount: number) =>
    new Intl.NumberFormat(translation.dir === "rtl" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)

  const copy = (text: string) => navigator.clipboard.writeText(text)
</script>

<div sx={page.example}>
  <div sx={styles.div5}>
    <div sx={styles.div6}>
      <Input
        placeholder={t.filterEmails}
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        oninput={(event: Event) =>
          table
            .getColumn("email")
            ?.setFilterValue((event.currentTarget as HTMLInputElement).value)}
        sx={styles.input}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.button}>
              {t.columns}{" "}
              <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
            </Button>
          {/snippet}
        </DropdownMenuTrigger>
        <DropdownMenuContent {align} data-lang={translation.dir === "rtl" ? translation.language : undefined}>
          <DropdownMenuGroup>
            {#each table.getAllColumns().filter((column) => column.getCanHide()) as column (column.id)}
              <DropdownMenuCheckboxItem sx={styles.dropdownMenuCheckboxItem} bind:checked={() => column.getIsVisible(), (value) => column.toggleVisibility(!!value)}>
                {column.id}
              </DropdownMenuCheckboxItem>
            {/each}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div sx={styles.div7}>
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
                      aria-label={t.selectAll}
                      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
                        table.toggleAllPageRowsSelected(details.checked === true)}
                    />
                  {:else if header.column.id === "email"}
                    <Button variant="ghost" onclick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
                      {t.email}
                      <IconPlaceholder lucide="ArrowUpDownIcon" tabler="IconArrowsSort" hugeicons="ArrowUpDownIcon" phosphor="ArrowsDownUpIcon" remixicon="RiArrowUpDownLine" />
                    </Button>
                  {:else if header.column.id === "amount"}
                    <div sx={styles.div3}>{t.amount}</div>
                  {:else if header.column.id === "status"}
                    {t.status}
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
                        aria-label={t.selectRow}
                        onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
                          row.toggleSelected(details.checked === true)}
                      />
                    {:else if cell.column.id === "status"}
                      <div sx={styles.div}>{statuses[row.original.status]}</div>
                    {:else if cell.column.id === "email"}
                      <div sx={styles.div2}>{row.getValue("email")}</div>
                    {:else if cell.column.id === "amount"}
                      <div sx={styles.div4}>{formatted(row.original.amount)}</div>
                    {:else if cell.column.id === "actions"}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          {#snippet asChild(props)}
                            <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-xs">
                              <span sx={styles.span}>{t.openMenu}</span>
                              <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
                            </Button>
                          {/snippet}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent {align} data-lang={translation.dir === "rtl" ? translation.language : undefined} sx={styles.dropdownMenuContent}>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>{t.actions}</DropdownMenuLabel>
                            <DropdownMenuItem onclick={() => copy(row.original.id)}>
                              {t.copyPaymentId}
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>{t.viewCustomer}</DropdownMenuItem>
                            <DropdownMenuItem>{t.viewPaymentDetails}</DropdownMenuItem>
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
                {t.noResults}
              </TableCell>
            </TableRow>
          {/if}
        </TableBody>
      </Table>
    </div>
    <div sx={styles.div8}>
      <div sx={styles.div9}>
        {table.getFilteredSelectedRowModel().rows.length} {t.rowsSelected}{" "}{table.getFilteredRowModel().rows.length} {t.rowsSelectedSuffix}
      </div>
      <div sx={styles.div10}>
        <Button variant="outline" size="sm" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {t.previous}
        </Button>
        <Button variant="outline" size="sm" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {t.next}
        </Button>
      </div>
    </div>
  </div>
</div>
