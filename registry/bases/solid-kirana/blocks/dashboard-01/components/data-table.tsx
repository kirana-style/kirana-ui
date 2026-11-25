import { DragDropContext, DraggableRow } from "./draggable-row"
import { For, Show, createSignal, onCleanup, untrack } from "solid-js"
import { DragDropManager } from "@dnd-kit/dom"
import { isSortable } from "@dnd-kit/dom/sortable"
import { FlexRender, createTable } from "../../../../../lib/solid2/table"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
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
import { features, styles } from "./table"
import type { Item } from "./table"

export function DataTable(props: { data: Item[] }) {
  const [data, setData] = createSignal(untrack(() => props.data))
  // The table keeps its own selection, visibility, filters, sorting and pages (TanStack Table 9's
  // atoms), where React's holds each in a state of its own.
  const table = createTable({
    features,
    get data() {
      return data()
    },
    columns,
    getRowId: (row: Item) => row.id.toString(),
    enableRowSelection: true,
  })

  // The page's state, React's `pagination`.
  const pagination = () => table.atoms.pagination.get()

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

  // LF-032: `@dnd-kit/solid` has no Solid 2 version, so the table drives `@dnd-kit/dom`'s manager
  // itself, as its `DragDropProvider` does: the rows register on it (`DraggableRow`), the dragged
  // row's id is a signal, and the row dnd-kit moved in the document goes back to its place before
  // the rows' order changes, so Solid moves it.
  const manager = new DragDropManager()
  const [dragging, setDragging] = createSignal<string | number>()
  let saved: { element: Element; previous: Element | null } | undefined
  const offs = [
    manager.monitor.addEventListener("beforedragstart", (event) => {
      const element = event.operation.source?.element
      if (element) saved = { element, previous: element.previousElementSibling }
    }),
    manager.monitor.addEventListener("dragstart", (event) => {
      setDragging(event.operation.source?.id)
    }),
    manager.monitor.addEventListener("dragend", (event) => {
      setDragging(undefined)
      if (saved) {
        const { element, previous } = saved
        if (element.previousElementSibling !== previous) {
          if (previous) previous.after(element)
          else element.parentElement?.prepend(element)
        }
        saved = undefined
      }
      handleDragEnd(event)
    }),
  ]
  onCleanup(() => {
    offs.forEach((off) => off())
    manager.destroy()
  })

  // dnd-kit has moved the row it dropped; the rows' order follows it.
  function handleDragEnd(event: {
    canceled: boolean
    operation: { source: unknown }
  }) {
    const { source } = event.operation
    if (event.canceled || !isSortable(source as never)) return
    const { initialIndex, index } = source as {
      initialIndex: number
      index: number
    }
    if (initialIndex === index) return
    const rows = [...data()]
    const [moved] = rows.splice(initialIndex, 1)
    rows.splice(index, 0, moved!)
    setData(rows)
  }

  return (
    <Tabs defaultValue="outline" sx={styles.dataTableTabs}>
      <div sx={styles.dataTableDiv}>
        <Label for="view-selector" sx={styles.dataTableLabel}>
          View
        </Label>
        <Select defaultValue="outline" items={views}>
          <SelectTrigger
            sx={styles.dataTableSelectTrigger}
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="past-performance">Past Performance</SelectItem>
              <SelectItem value="key-personnel">Key Personnel</SelectItem>
              <SelectItem value="focus-documents">Focus Documents</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList sx={styles.tabsList}>
          <TabsTrigger value="outline">Outline</TabsTrigger>
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
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div sx={styles.dataTableDiv2}>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild={(childProps) => (
                <Button {...childProps()} variant="outline" size="sm">
                  <IconPlaceholder
                    lucide="Columns3Icon"
                    tabler="IconLayoutColumns"
                    hugeicons="LeftToRightListBulletIcon"
                    phosphor="ColumnsIcon"
                    remixicon="RiLayoutColumnLine"
                    data-icon="inline-start"
                  />{" "}
                  Columns{" "}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    data-icon="inline-end"
                  />
                </Button>
              )}
            />
            <DropdownMenuContent
              align="end"
              sx={styles.dataTableDropdownMenuContent}
            >
              <For
                each={table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )}
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
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
            <span sx={styles.dataTableSpan}>Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent value="outline" sx={styles.tabsContent}>
        <div sx={styles.dataTableDiv3}>
          <DragDropContext value={{ manager, dragging }}>
            <Table>
              <TableHeader sx={styles.tableHeader}>
                <For each={table.getHeaderGroups()}>
                  {(headerGroup) => (
                    <TableRow>
                      <For each={headerGroup.headers}>
                        {(header) => (
                          <TableHead colspan={header.colSpan}>
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
              <TableBody sx={styles.tableBody}>
                {table.getRowModel().rows?.length ? (
                  <For each={table.getRowModel().rows}>
                    {(row, index) => <DraggableRow row={row} index={index()} />}
                  </For>
                ) : (
                  <TableRow>
                    <TableCell colspan={columns.length} sx={styles.tableCell}>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DragDropContext>
        </div>
        <div sx={styles.dataTableDiv4}>
          <div sx={styles.dataTableDiv5}>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div sx={styles.div6}>
            <div sx={styles.div7}>
              <Label for="rows-per-page" sx={styles.dataTableLabel2}>
                Rows per page
              </Label>
              <Select
                value={`${pagination().pageSize}`}
                items={pageSizes}
                onValueChange={(details: { value: string }) =>
                  table.setPageSize(Number(details.value))
                }
              >
                <SelectTrigger
                  size="sm"
                  sx={styles.selectTrigger2}
                  id="rows-per-page"
                >
                  <SelectValue placeholder={`${pagination().pageSize}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    <For each={[10, 20, 30, 40, 50]}>
                      {(pageSize) => (
                        <SelectItem value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      )}
                    </For>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div sx={styles.div8}>
              Page {pagination().pageIndex + 1} of {table.getPageCount()}
            </div>
            <div sx={styles.div9}>
              <Button
                variant="outline"
                sx={styles.dataTableButton}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span sx={styles.span2}>Go to first page</span>
                <IconPlaceholder
                  lucide="ChevronsLeftIcon"
                  tabler="IconChevronsLeft"
                  hugeicons="ArrowLeftDoubleIcon"
                  phosphor="CaretDoubleLeftIcon"
                  remixicon="RiSkipLeftLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button2}
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span sx={styles.span3}>Go to previous page</span>
                <IconPlaceholder
                  lucide="ChevronLeftIcon"
                  tabler="IconChevronLeft"
                  hugeicons="ArrowLeft01Icon"
                  phosphor="CaretLeftIcon"
                  remixicon="RiArrowLeftSLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button3}
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span sx={styles.span4}>Go to next page</span>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button4}
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span sx={styles.span5}>Go to last page</span>
                <IconPlaceholder
                  lucide="ChevronsRightIcon"
                  tabler="IconChevronsRight"
                  hugeicons="ArrowRightDoubleIcon"
                  phosphor="CaretDoubleRightIcon"
                  remixicon="RiSkipRightLine"
                />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" sx={styles.tabsContent2}>
        <div sx={styles.div10} />
      </TabsContent>
      <TabsContent value="key-personnel" sx={styles.tabsContent3}>
        <div sx={styles.div11} />
      </TabsContent>
      <TabsContent value="focus-documents" sx={styles.tabsContent4}>
        <div sx={styles.div12} />
      </TabsContent>
    </Tabs>
  )
}
