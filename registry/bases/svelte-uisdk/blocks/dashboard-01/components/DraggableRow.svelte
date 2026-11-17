<script lang="ts">
  // A row dnd-kit sorts, dragged by the handle in its first cell (`DragHandle`).
  import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
  import { createSortable } from "@dnd-kit/svelte/sortable"
  import { FlexRender } from "@tanstack/svelte-table"
  import type { Row } from "@tanstack/svelte-table"
  import { setContext } from "svelte"

  import { TableCell, TableRow } from "../../../ui/table"
  import { styles } from "./data-table"
  import type { features, Item } from "./data-table"
  import { ROW_HANDLE } from "./row-handle"
  import type { RowHandleContext } from "./row-handle"

  let { row, index }: { row: Row<typeof features, Item>; index: number } = $props()

  const sortable = createSortable({
    get id() {
      return row.original.id
    },
    get index() {
      return index
    },
    modifiers: [RestrictToVerticalAxis],
  })
  setContext<RowHandleContext>(ROW_HANDLE, { attach: sortable.attachHandle })
</script>

<TableRow
  {@attach sortable.attach}
  data-state={row.getIsSelected() ? "selected" : undefined}
  data-dragging={sortable.isDragging}
  sx={styles.draggableRowTableRow}
>
  {#each row.getVisibleCells() as cell (cell.id)}
    <TableCell><FlexRender {cell} /></TableCell>
  {/each}
</TableRow>
