// The row's handle: dnd-kit drags the row's sortable by this element.
import { props as styleProps } from "@kirana-style/core"
import { useContext } from "solid-js"

import { Button } from "../../../ui/button"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { RowHandleContext } from "./draggable-row"
import { styles } from "./table"

export function DragHandle() {
  const handle = useContext(RowHandleContext)
  return (
    <Button
      ref={(element: HTMLElement) => handle?.(element)}
      variant="ghost"
      size="icon"
      sx={styles.dragHandleButton}
    >
      <IconPlaceholder
        lucide="GripVerticalIcon"
        tabler="IconGripVertical"
        hugeicons="DragDropVerticalIcon"
        phosphor="DotsSixVerticalIcon"
        remixicon="RiDraggable"
        {...styleProps(styles.dragHandleIconPlaceholder)}
      />
      <span sx={styles.dragHandleSpan}>Drag to reorder</span>
    </Button>
  )
}
