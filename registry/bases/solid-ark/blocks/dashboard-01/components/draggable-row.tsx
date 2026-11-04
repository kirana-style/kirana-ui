// A row dnd-kit sorts, dragged by the handle in its first cell (`DragHandle`).
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import { useSortable } from "@dnd-kit/solid/sortable"
import { FlexRender } from "@tanstack/solid-table"
import type { Row } from "@tanstack/solid-table"
import { For, createContext } from "solid-js"
import type { Setter } from "solid-js"

import { TableCell, TableRow } from "../../../ui/table"
import { styles } from "./table"
import type { Item, features } from "./table"

/** The row's drag handle: the element its sortable is dragged by. */
export const RowHandleContext = createContext<Setter<Element | undefined>>()

export function DraggableRow(props: {
  row: Row<typeof features, Item>
  index: number
}) {
  const sortable = useSortable({
    get id() {
      return props.row.original.id
    },
    get index() {
      return props.index
    },
    modifiers: [RestrictToVerticalAxis],
  })
  return (
    <RowHandleContext.Provider value={sortable.handleRef}>
      <TableRow
        ref={sortable.ref}
        data-state={props.row.getIsSelected() ? "selected" : undefined}
        data-dragging={sortable.isDragging()}
        sx={styles.draggableRowTableRow}
      >
        <For each={props.row.getVisibleCells()}>
          {(cell) => (
            <TableCell>
              <FlexRender cell={cell} />
            </TableCell>
          )}
        </For>
      </TableRow>
    </RowHandleContext.Provider>
  )
}
