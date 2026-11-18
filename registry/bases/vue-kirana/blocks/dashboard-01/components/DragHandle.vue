<script setup lang="ts">
// The row's handle: dnd-kit drags the row's sortable by this element.
import { inject, ref } from "vue"

import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { Button } from "../../../ui/button"
import { styles } from "./data-table"
import { ROW_HANDLE } from "./row-handle"

const handle = inject(ROW_HANDLE, ref(null))
const setHandle = (element: unknown) => {
  handle.value =
    element && typeof element === "object" && "$el" in element
      ? ((element as { $el: HTMLElement }).$el ?? null)
      : (element as HTMLElement | null)
}
</script>

<template>
  <Button
    :ref="setHandle"
    variant="ghost"
    size="icon"
    :sx="styles.dragHandleButton"
  >
    <IconPlaceholder
      lucide="GripVerticalIcon"
      tabler="IconGripVertical"
      hugeicons="DragDropVerticalIcon"
      phosphor="DotsSixVerticalIcon"
      remixicon="RiDraggable"
      :sx="styles.dragHandleIconPlaceholder"
    />
    <span :sx="styles.dragHandleSpan">Drag to reorder</span>
  </Button>
</template>
