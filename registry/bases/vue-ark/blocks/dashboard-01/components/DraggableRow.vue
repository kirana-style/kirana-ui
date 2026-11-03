<script setup lang="ts">
// A row dnd-kit sorts, dragged by the handle in its first cell (`DragHandle`).
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import { useSortable } from "@dnd-kit/vue/sortable"
import { FlexRender } from "@tanstack/vue-table"
import type { Row } from "@tanstack/vue-table"
import { provide, ref } from "vue"

import { TableCell, TableRow } from "../../../ui/table"
import { styles } from "./data-table"
import type { features, Item } from "./data-table"
import { ROW_HANDLE } from "./row-handle"

const props = defineProps<{ row: Row<typeof features, Item>; index: number }>()

const element = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
provide(ROW_HANDLE, handle)

const { isDragging } = useSortable({
  id: () => props.row.original.id,
  index: () => props.index,
  element,
  handle,
  modifiers: [RestrictToVerticalAxis],
})

const setElement = (row: unknown) => {
  element.value =
    row && typeof row === "object" && "$el" in row
      ? ((row as { $el: HTMLElement }).$el ?? null)
      : (row as HTMLElement | null)
}
</script>

<template>
  <TableRow
    :ref="setElement"
    :data-state="row.getIsSelected() ? 'selected' : undefined"
    :data-dragging="isDragging"
    :sx="styles.draggableRowTableRow"
  >
    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
      <FlexRender :cell="cell" />
    </TableCell>
  </TableRow>
</template>
