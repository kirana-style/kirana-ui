<script setup lang="ts">
import { isSortable } from "@dnd-kit/vue/sortable"
import { DragDropProvider } from "@dnd-kit/vue"
import { FlexRender, useTable } from "@tanstack/vue-table"
import { computed, ref } from "vue"

import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
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
import DraggableRow from "./DraggableRow.vue"

const props = defineProps<{ data: Item[] }>()

const data = ref(props.data)
// The table keeps its own selection, visibility, filters, sorting and pages (TanStack Table 9's
// atoms), where React's holds each in a state of its own.
const table = useTable({
  features,
  data,
  columns,
  getRowId: (row: Item) => row.id.toString(),
  enableRowSelection: true,
})

// The page's state, React's `pagination`: Vue's adapter makes the atoms reactive.
const pagination = computed(() => table.atoms.pagination.get())

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
  const rows = [...data.value]
  const [moved] = rows.splice(initialIndex, 1)
  rows.splice(index, 0, moved)
  data.value = rows
}
</script>

<template>
  <Tabs default-value="outline" :sx="styles.dataTableTabs">
    <div :sx="styles.dataTableDiv">
      <Label for="view-selector" :sx="styles.dataTableLabel"> View </Label>
      <Select default-value="outline" :items="views">
        <SelectTrigger
          :sx="styles.dataTableSelectTrigger"
          size="sm"
          id="view-selector"
        >
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="outline"> Outline </SelectItem>
            <SelectItem value="past-performance"> Past Performance </SelectItem>
            <SelectItem value="key-personnel"> Key Personnel </SelectItem>
            <SelectItem value="focus-documents"> Focus Documents </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <TabsList :sx="styles.tabsList">
        <TabsTrigger value="outline"> Outline </TabsTrigger>
        <TabsTrigger value="past-performance">
          Past Performance{{ " " }}
          <Badge variant="secondary" :sx="styles.tabBadge"> 3 </Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel">
          Key Personnel{{ " " }}
          <Badge variant="secondary" :sx="styles.tabBadge"> 2 </Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents"> Focus Documents </TabsTrigger>
      </TabsList>
      <div :sx="styles.dataTableDiv2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <IconPlaceholder
                lucide="Columns3Icon"
                tabler="IconLayoutColumns"
                hugeicons="LeftToRightListBulletIcon"
                phosphor="ColumnsIcon"
                remixicon="RiLayoutColumnLine"
                data-icon="inline-start"
              />Columns<IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            :sx="styles.dataTableDropdownMenuContent"
          >
            <DropdownMenuCheckboxItem
              v-for="column in table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )"
              :key="column.id"
              :sx="styles.dropdownMenuCheckboxItem"
              :checked="column.getIsVisible()"
              @update:checked="
                (value: boolean | null) => column.toggleVisibility(!!value)
              "
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
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
          <span :sx="styles.dataTableSpan"> Add Section </span>
        </Button>
      </div>
    </div>
    <TabsContent value="outline" :sx="styles.tabsContent">
      <div :sx="styles.dataTableDiv3">
        <DragDropProvider @drag-end="handleDragEnd">
          <Table>
            <TableHeader :sx="styles.tableHeader">
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :colspan="header.colSpan"
                >
                  <FlexRender v-if="!header.isPlaceholder" :header="header" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody :sx="styles.tableBody">
              <template v-if="table.getRowModel().rows?.length">
                <DraggableRow
                  v-for="(row, index) in table.getRowModel().rows"
                  :key="row.id"
                  :row="row"
                  :index="index"
                />
              </template>
              <TableRow v-else>
                <TableCell :colspan="columns.length" :sx="styles.tableCell">
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DragDropProvider>
      </div>
      <div :sx="styles.dataTableDiv4">
        <div :sx="styles.dataTableDiv5">
          {{ table.getFilteredSelectedRowModel().rows.length }} of{{ " "
          }}{{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div :sx="styles.div6">
          <div :sx="styles.div7">
            <Label for="rows-per-page" :sx="styles.dataTableLabel2">
              Rows per page
            </Label>
            <Select
              :model-value="`${pagination.pageSize}`"
              :items="pageSizes"
              @update:model-value="(value) => table.setPageSize(Number(value))"
            >
              <SelectTrigger
                size="sm"
                :sx="styles.selectTrigger2"
                id="rows-per-page"
              >
                <SelectValue :placeholder="`${pagination.pageSize}`" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  <SelectItem
                    v-for="pageSize in [10, 20, 30, 40, 50]"
                    :key="pageSize"
                    :value="`${pageSize}`"
                  >
                    {{ pageSize }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div :sx="styles.div8">
            Page {{ pagination.pageIndex + 1 }} of{{ " "
            }}{{ table.getPageCount() }}
          </div>
          <div :sx="styles.div9">
            <Button
              variant="outline"
              :sx="styles.dataTableButton"
              @click="() => table.setPageIndex(0)"
              :disabled="!table.getCanPreviousPage()"
            >
              <span :sx="styles.span2"> Go to first page </span>
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
              :sx="styles.button2"
              size="icon"
              @click="() => table.previousPage()"
              :disabled="!table.getCanPreviousPage()"
            >
              <span :sx="styles.span3"> Go to previous page </span>
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
              :sx="styles.button3"
              size="icon"
              @click="() => table.nextPage()"
              :disabled="!table.getCanNextPage()"
            >
              <span :sx="styles.span4"> Go to next page </span>
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
              :sx="styles.button4"
              size="icon"
              @click="() => table.setPageIndex(table.getPageCount() - 1)"
              :disabled="!table.getCanNextPage()"
            >
              <span :sx="styles.span5"> Go to last page </span>
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
    <TabsContent value="past-performance" :sx="styles.tabsContent2">
      <div :sx="styles.div10"></div>
    </TabsContent>
    <TabsContent value="key-personnel" :sx="styles.tabsContent3">
      <div :sx="styles.div11"></div>
    </TabsContent>
    <TabsContent value="focus-documents" :sx="styles.tabsContent4">
      <div :sx="styles.div12"></div>
    </TabsContent>
  </Tabs>
</template>
