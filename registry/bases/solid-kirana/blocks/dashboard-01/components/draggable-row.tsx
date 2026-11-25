// A row dnd-kit sorts, dragged by the handle in its first cell (`DragHandle`).
// LF-032: `@dnd-kit/solid` has no Solid 2 version, so the row is a `Sortable` of `@dnd-kit/dom`,
// the framework-free core, on the table's manager (`DragDropContext`), as `useSortable` builds it.
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import type { DragDropManager } from "@dnd-kit/dom"
import { Sortable } from "@dnd-kit/dom/sortable"
import { FlexRender } from "../../../../../lib/solid2/table"
import type { Row } from "../../../../../lib/solid2/table"
import {
  For,
  createContext,
  createEffect,
  onCleanup,
  onSettled,
  useContext,
} from "solid-js"
import type { Accessor } from "solid-js"

import { TableCell, TableRow } from "../../../ui/table"
import { styles } from "./table"
import type { Item, features } from "./table"

/** The table's drag manager and the id of the row being dragged (LF-032). */
export const DragDropContext = createContext<{
  manager: DragDropManager
  dragging: Accessor<string | number | undefined>
}>()

/** The row's drag handle: the element its sortable is dragged by. */
export const RowHandleContext =
  createContext<(element: Element | undefined) => void>()

export function DraggableRow(props: {
  row: Row<typeof features, Item>
  index: number
}) {
  const dnd = useContext(DragDropContext)
  const sortable = new Sortable(
    {
      id: props.row.original.id,
      index: props.index,
      modifiers: [RestrictToVerticalAxis],
      register: false,
    },
    dnd.manager
  )
  // Registered once the row and its handle are in the document, as `useSortable` does.
  onSettled(() => sortable.register())
  onCleanup(() => sortable.destroy())

  // The row's place follows the table's order; its shape is measured again while nothing moves.
  createEffect(
    () => props.index,
    (index) => {
      sortable.index = index
      if (dnd.manager.dragOperation.status.idle && sortable.transition?.idle)
        sortable.refreshShape()
    }
  )

  return (
    <RowHandleContext
      value={(element) => {
        if (element) sortable.handle = element
      }}
    >
      <TableRow
        ref={(element: HTMLElement) => {
          sortable.element = element
        }}
        data-state={props.row.getIsSelected() ? "selected" : undefined}
        data-dragging={
          dnd.dragging() === props.row.original.id ? "true" : "false"
        }
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
    </RowHandleContext>
  )
}
