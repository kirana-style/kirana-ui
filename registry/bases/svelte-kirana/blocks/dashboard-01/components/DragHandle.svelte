<script lang="ts">
  // The row's handle: dnd-kit drags the row's sortable by this element.
  import { getContext } from "svelte"

  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { Button } from "../../../ui/button"
  import { styles } from "./data-table"
  import { ROW_HANDLE } from "./row-handle"
  import type { RowHandleContext } from "./row-handle"

  const handle = getContext<RowHandleContext | undefined>(ROW_HANDLE)
  const attach = (node: HTMLElement) => handle?.attach(node)
</script>

<Button {@attach attach} variant="ghost" size="icon" sx={styles.dragHandleButton}>
  <IconPlaceholder lucide="GripVerticalIcon" tabler="IconGripVertical" hugeicons="DragDropVerticalIcon" phosphor="DotsSixVerticalIcon" remixicon="RiDraggable" sx={styles.dragHandleIconPlaceholder} />
  <span sx={styles.dragHandleSpan}>Drag to reorder</span>
</Button>
