<script lang="ts">
  import { isSortable } from "@dnd-kit/svelte/sortable"
  import { DragDropProvider } from "@dnd-kit/svelte"
  import { FlexRender, createTable } from "@tanstack/svelte-table"
  import { untrack } from "svelte"

  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { Badge } from "../../../ui/badge"
  import { Button } from "../../../ui/button"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu"
  import { Label } from "../../../ui/label"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../../ui/select"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../ui/table"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
  import { columns } from "./columns"
  import { features, styles } from "./data-table"
  import type { Item } from "./data-table"
  import DraggableRow from "./DraggableRow.svelte"

  let { data: initial }: { data: Item[] } = $props()

  let data = $state(untrack(() => initial))
  // The table keeps its own selection, visibility, filters, sorting and pages (TanStack Table 9's
  // atoms), where React's holds each in a state of its own.
  const table = createTable({
    features,
    get data() {
      return data
    },
    columns,
    getRowId: (row: Item) => row.id.toString(),
    enableRowSelection: true,
  })

  // The page's state, React's `pagination`.
  const pagination = $derived(table.atoms.pagination.get())

  const views = [
    { label: "Outline", value: "outline" },
    { label: "Past Performance", value: "past-performance" },
    { label: "Key Personnel", value: "key-personnel" },
    { label: "Focus Documents", value: "focus-documents" },
  ]
  const pageSizes = [10, 20, 30, 40, 50].map((size) => ({
    label: `${size}`,
    value: `${size}`,
  }))

  // dnd-kit's Svelte sortable does not move the rows itself (its optimistic sorting would fight
  // Svelte's `{#each}`): the rows' order follows the row dragged over, and a cancelled drag puts
  // it back.
  let before: Item[] | undefined
  const sortableId = (item: unknown) =>
    isSortable(item as never) ? (item as { id: unknown }).id : undefined
  function handleDragStart() {
    before = data
  }
  function handleDragOver(event: { operation: { source: unknown; target: unknown } }) {
    const from = data.findIndex((row) => row.id === sortableId(event.operation.source))
    const to = data.findIndex((row) => row.id === sortableId(event.operation.target))
    if (from < 0 || to < 0 || from === to) return
    const rows = [...data]
    const [moved] = rows.splice(from, 1)
    rows.splice(to, 0, moved!)
    data = rows
  }
  function handleDragEnd(event: { canceled: boolean }) {
    if (event.canceled && before) data = before
    before = undefined
  }
</script>

<Tabs defaultValue="outline" sx={styles.dataTableTabs}>
  <div sx={styles.dataTableDiv}>
    <Label for="view-selector" sx={styles.dataTableLabel}>
      View
    </Label>
    <Select defaultValue="outline" items={views}>
      <SelectTrigger sx={styles.dataTableSelectTrigger} size="sm" id="view-selector">
        <SelectValue placeholder="Select a view" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="outline">
            Outline
          </SelectItem>
          <SelectItem value="past-performance">
            Past Performance
          </SelectItem>
          <SelectItem value="key-personnel">
            Key Personnel
          </SelectItem>
          <SelectItem value="focus-documents">
            Focus Documents
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <TabsList sx={styles.tabsList}>
      <TabsTrigger value="outline">
        Outline
      </TabsTrigger>
      <TabsTrigger value="past-performance">
        Past Performance{" "}
        <Badge variant="secondary" sx={styles.tabBadge}>
          3
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="key-personnel">
        Key Personnel{" "}
        <Badge variant="secondary" sx={styles.tabBadge}>
          2
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="focus-documents">
        Focus Documents
      </TabsTrigger>
    </TabsList>
    <div sx={styles.dataTableDiv2}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline" size="sm">
              <IconPlaceholder lucide="Columns3Icon" tabler="IconLayoutColumns" hugeicons="LeftToRightListBulletIcon" phosphor="ColumnsIcon" remixicon="RiLayoutColumnLine" data-icon="inline-start" />
              Columns
              <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" data-icon="inline-end" />
            </Button>
          {/snippet}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sx={styles.dataTableDropdownMenuContent}>
          {#each table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                ) as column (column.id)}
            <DropdownMenuCheckboxItem sx={styles.dropdownMenuCheckboxItem} bind:checked={() => column.getIsVisible(), (value) => column.toggleVisibility(!!value)}>
              {column.id}
            </DropdownMenuCheckboxItem>
          {/each}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" size="sm">
        <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="Add01Icon" phosphor="PlusIcon" remixicon="RiAddLine" />
        <span sx={styles.dataTableSpan}>
          Add Section
        </span>
      </Button>
    </div>
  </div>
  <TabsContent value="outline" sx={styles.tabsContent}>
    <div sx={styles.dataTableDiv3}>
      <DragDropProvider onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <Table>
          <TableHeader sx={styles.tableHeader}>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <TableRow>
                {#each headerGroup.headers as header (header.id)}
                  <TableHead colspan={header.colSpan}>
                    {#if !header.isPlaceholder}
                      <FlexRender header={header} />
                    {/if}
                  </TableHead>
                {/each}
              </TableRow>
            {/each}
          </TableHeader>
          <TableBody sx={styles.tableBody}>
            {#if table.getRowModel().rows?.length}
              {#each table.getRowModel().rows as row, index (row.id)}
                <DraggableRow row={row} index={index} />
              {/each}
            {:else}
              <TableRow>
                <TableCell colspan={columns.length} sx={styles.tableCell}>
                  No results.
                </TableCell>
              </TableRow>
            {/if}
          </TableBody>
        </Table>
      </DragDropProvider>
    </div>
    <div sx={styles.dataTableDiv4}>
      <div sx={styles.dataTableDiv5}>
        {table.getFilteredSelectedRowModel().rows.length} of{" "}{table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div sx={styles.div6}>
        <div sx={styles.div7}>
          <Label for="rows-per-page" sx={styles.dataTableLabel2}>
            Rows per page
          </Label>
          <Select value={`${pagination.pageSize}`} items={pageSizes} onValueChange={(details: { value: string }) => table.setPageSize(Number(details.value))}>
            <SelectTrigger size="sm" sx={styles.selectTrigger2} id="rows-per-page">
              <SelectValue placeholder={`${pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {#each [10, 20, 30, 40, 50] as pageSize (pageSize)}
                  <SelectItem value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                {/each}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div sx={styles.div8}>
          Page {pagination.pageIndex + 1} of{" "}{table.getPageCount()}
        </div>
        <div sx={styles.div9}>
          <Button variant="outline" sx={styles.dataTableButton} onclick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <span sx={styles.span2}>
              Go to first page
            </span>
            <IconPlaceholder lucide="ChevronsLeftIcon" tabler="IconChevronsLeft" hugeicons="ArrowLeftDoubleIcon" phosphor="CaretDoubleLeftIcon" remixicon="RiSkipLeftLine" />
          </Button>
          <Button variant="outline" sx={styles.button2} size="icon" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <span sx={styles.span3}>
              Go to previous page
            </span>
            <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeft01Icon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" />
          </Button>
          <Button variant="outline" sx={styles.button3} size="icon" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <span sx={styles.span4}>
              Go to next page
            </span>
            <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
          </Button>
          <Button variant="outline" sx={styles.button4} size="icon" onclick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <span sx={styles.span5}>
              Go to last page
            </span>
            <IconPlaceholder lucide="ChevronsRightIcon" tabler="IconChevronsRight" hugeicons="ArrowRightDoubleIcon" phosphor="CaretDoubleRightIcon" remixicon="RiSkipRightLine" />
          </Button>
        </div>
      </div>
    </div>
  </TabsContent>
  <TabsContent value="past-performance" sx={styles.tabsContent2}>
    <div sx={styles.div10}></div>
  </TabsContent>
  <TabsContent value="key-personnel" sx={styles.tabsContent3}>
    <div sx={styles.div11}></div>
  </TabsContent>
  <TabsContent value="focus-documents" sx={styles.tabsContent4}>
    <div sx={styles.div12}></div>
  </TabsContent>
</Tabs>
