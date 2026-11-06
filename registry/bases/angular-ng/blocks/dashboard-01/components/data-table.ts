import {
  Component,
  DestroyRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from "@angular/core"
import { DragDropManager } from "@dnd-kit/dom"
import { isSortable } from "@dnd-kit/dom/sortable"
import { SxDirective } from "@kirana-style/angular"
import { FlexRender, injectTable } from "@tanstack/angular-table"

import { IconPlaceholder } from "../../../../../icons/angular"
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
import { DraggableRow, ROW_DRAG } from "./draggable-row"
import { features, styles } from "./table"
import type { Item } from "./table"

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

@Component({
  selector: "kui-data-table",
  imports: [
    Badge,
    Button,
    DraggableRow,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    FlexRender,
    IconPlaceholder,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SxDirective,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  ],
  providers: [{ provide: ROW_DRAG, useFactory: () => inject(DataTable).drag }],
  host: { style: "display: contents" },
  template: `
    <div kuiTabs defaultValue="outline" [sx]="styles.dataTableTabs">
      <div [sx]="styles.dataTableDiv">
        <label kuiLabel for="view-selector" [sx]="styles.dataTableLabel"
          >View</label
        >
        <ng-container kuiSelect defaultValue="outline" [items]="views">
          <button
            kuiSelectTrigger
            [sx]="styles.dataTableSelectTrigger"
            size="sm"
            id="view-selector"
          >
            <span kuiSelectValue placeholder="Select a view"></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              <div kuiSelectItem value="outline">Outline</div>
              <div kuiSelectItem value="past-performance">Past Performance</div>
              <div kuiSelectItem value="key-personnel">Key Personnel</div>
              <div kuiSelectItem value="focus-documents">Focus Documents</div>
            </div>
          </div>
        </ng-container>
        <div kuiTabsList [sx]="styles.tabsList">
          <button kuiTabsTrigger value="outline">Outline</button>
          <button kuiTabsTrigger value="past-performance">
            Past Performance{{ " " }}
            <span kuiBadge variant="secondary" [sx]="styles.tabBadge">3</span>
          </button>
          <button kuiTabsTrigger value="key-personnel">
            Key Personnel{{ " " }}
            <span kuiBadge variant="secondary" [sx]="styles.tabBadge">2</span>
          </button>
          <button kuiTabsTrigger value="focus-documents">
            Focus Documents
          </button>
        </div>
        <div [sx]="styles.dataTableDiv2">
          <ng-container kuiDropdownMenu>
            <button
              kuiButton
              kuiDropdownMenuTrigger
              variant="outline"
              size="sm"
            >
              <svg
                iconPlaceholder
                lucide="Columns3Icon"
                tabler="IconLayoutColumns"
                hugeicons="LeftToRightListBulletIcon"
                phosphor="ColumnsIcon"
                remixicon="RiLayoutColumnLine"
                data-icon="inline-start"
              ></svg>
              Columns
              <svg
                iconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
              ></svg>
            </button>
            <div
              kuiDropdownMenuContent
              align="end"
              [sx]="styles.dataTableDropdownMenuContent"
            >
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
          </ng-container>
          <button kuiButton variant="outline" size="sm">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
            <span [sx]="styles.dataTableSpan">Add Section</span>
          </button>
        </div>
      </div>
      <div kuiTabsContent value="outline" [sx]="styles.tabsContent">
        <div [sx]="styles.dataTableDiv3">
          <div kuiTable>
            <thead kuiTableHeader [sx]="styles.tableHeader">
              @for (
                headerGroup of table.getHeaderGroups();
                track headerGroup.id
              ) {
                <tr kuiTableRow>
                  @for (header of headerGroup.headers; track header.id) {
                    <th kuiTableHead [attr.colspan]="header.colSpan">
                      @if (!header.isPlaceholder) {
                        <ng-container *flexRenderHeader="header; let content">{{
                          content
                        }}</ng-container>
                      }
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody kuiTableBody [sx]="styles.tableBody">
              @for (
                row of table.getRowModel().rows;
                track row.id;
                let index = $index
              ) {
                <tr
                  kuiTableRow
                  [kuiDraggableRow]="row"
                  [index]="index"
                  [sx]="styles.draggableRowTableRow"
                ></tr>
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
        <div [sx]="styles.dataTableDiv4">
          <div [sx]="styles.dataTableDiv5">
            {{ table.getFilteredSelectedRowModel().rows.length }} of
            {{ table.getFilteredRowModel().rows.length }} row(s) selected.
          </div>
          <div [sx]="styles.div6">
            <div [sx]="styles.div7">
              <label kuiLabel for="rows-per-page" [sx]="styles.dataTableLabel2"
                >Rows per page</label
              >
              <ng-container
                kuiSelect
                [value]="pageSize()"
                [items]="pageSizes"
                (valueChange)="table.setPageSize(+$any($event))"
              >
                <button
                  kuiSelectTrigger
                  size="sm"
                  [sx]="styles.selectTrigger2"
                  id="rows-per-page"
                >
                  <span kuiSelectValue [placeholder]="pageSize()"></span>
                </button>
                <div kuiSelectContent side="top">
                  <div kuiSelectGroup>
                    @for (size of pageSizes; track size.value) {
                      <div kuiSelectItem [value]="size.value">
                        {{ size.label }}
                      </div>
                    }
                  </div>
                </div>
              </ng-container>
            </div>
            <div [sx]="styles.div8">
              Page {{ pagination().pageIndex + 1 }} of
              {{ table.getPageCount() }}
            </div>
            <div [sx]="styles.div9">
              <button
                kuiButton
                variant="outline"
                [sx]="styles.dataTableButton"
                (click)="table.setPageIndex(0)"
                [disabled]="!table.getCanPreviousPage()"
              >
                <span [sx]="styles.span2">Go to first page</span>
                <svg
                  iconPlaceholder
                  lucide="ChevronsLeftIcon"
                  tabler="IconChevronsLeft"
                  hugeicons="ArrowLeftDoubleIcon"
                  phosphor="CaretDoubleLeftIcon"
                  remixicon="RiSkipLeftLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="outline"
                [sx]="styles.button2"
                size="icon"
                (click)="table.previousPage()"
                [disabled]="!table.getCanPreviousPage()"
              >
                <span [sx]="styles.span3">Go to previous page</span>
                <svg
                  iconPlaceholder
                  lucide="ChevronLeftIcon"
                  tabler="IconChevronLeft"
                  hugeicons="ArrowLeft01Icon"
                  phosphor="CaretLeftIcon"
                  remixicon="RiArrowLeftSLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="outline"
                [sx]="styles.button3"
                size="icon"
                (click)="table.nextPage()"
                [disabled]="!table.getCanNextPage()"
              >
                <span [sx]="styles.span4">Go to next page</span>
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="outline"
                [sx]="styles.button4"
                size="icon"
                (click)="table.setPageIndex(table.getPageCount() - 1)"
                [disabled]="!table.getCanNextPage()"
              >
                <span [sx]="styles.span5">Go to last page</span>
                <svg
                  iconPlaceholder
                  lucide="ChevronsRightIcon"
                  tabler="IconChevronsRight"
                  hugeicons="ArrowRightDoubleIcon"
                  phosphor="CaretDoubleRightIcon"
                  remixicon="RiSkipRightLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div kuiTabsContent value="past-performance" [sx]="styles.tabsContent2">
        <div [sx]="styles.div10"></div>
      </div>
      <div kuiTabsContent value="key-personnel" [sx]="styles.tabsContent3">
        <div [sx]="styles.div11"></div>
      </div>
      <div kuiTabsContent value="focus-documents" [sx]="styles.tabsContent4">
        <div [sx]="styles.div12"></div>
      </div>
    </div>
  `,
})
export class DataTable {
  readonly data = input.required<Item[]>()
  /** The rows in their order, which a drop changes. */
  protected readonly rows = linkedSignal(() => this.data())
  // The table keeps its own selection, visibility, filters, sorting and pages (TanStack Table 9's
  // atoms), where React's holds each in a state of its own.
  protected readonly table = injectTable(() => ({
    features,
    data: this.rows(),
    columns,
    getRowId: (row: Item) => row.id.toString(),
    enableRowSelection: true,
  }))
  /** The page's state, React's `pagination`. */
  protected readonly pagination = computed(() =>
    this.table.atoms.pagination.get()
  )
  protected readonly pageSize = computed(() => `${this.pagination().pageSize}`)
  /** The columns the menu can hide. */
  protected readonly hideable = computed(() =>
    this.table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      )
  )
  protected readonly styles = styles
  protected readonly columns = columns
  protected readonly views = views
  protected readonly pageSizes = pageSizes
  /** dnd-kit's manager for the rows, and the row being dragged. */
  readonly drag = (() => {
    const dragging = signal<string | number | null>(null)
    return {
      manager: new DragDropManager(),
      dragging: dragging.asReadonly(),
      set: dragging.set,
    }
  })()

  constructor() {
    const injector = inject(Injector)
    const { manager } = this.drag
    // dnd-kit waits for the page to draw the rows' new order before it lets go of the row.
    let rendering: Promise<void> = Promise.resolve()
    manager.renderer = {
      get rendering() {
        return rendering
      },
    }
    const cleanups = [
      manager.monitor.addEventListener("dragstart", (event) => {
        this.drag.set(event.operation.source?.id ?? null)
      }),
      manager.monitor.addEventListener("dragend", (event) => {
        this.drag.set(null)
        // dnd-kit has moved the row it dropped; the rows' order follows it.
        const { source } = event.operation
        if (event.canceled || !source || !isSortable(source)) return
        const { initialIndex, index } = source
        if (initialIndex === index) return
        const rows = [...this.rows()]
        const [moved] = rows.splice(initialIndex, 1)
        rows.splice(index, 0, moved!)
        rendering = new Promise((resolve) =>
          afterNextRender(() => resolve(), { injector })
        )
        this.rows.set(rows)
      }),
    ]
    inject(DestroyRef).onDestroy(() => {
      for (const cleanup of cleanups) cleanup()
      manager.destroy()
    })
  }
}
