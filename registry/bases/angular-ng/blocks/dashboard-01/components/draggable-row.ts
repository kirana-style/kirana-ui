// A row dnd-kit sorts, dragged by the handle in its first cell (`DragHandle`).
import {
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  effect,
  inject,
  input,
  signal,
  untracked,
} from "@angular/core"
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers"
import type { DragDropManager } from "@dnd-kit/dom"
import { Sortable } from "@dnd-kit/dom/sortable"
import { FlexRender } from "@tanstack/angular-table"
import type { Row } from "@tanstack/angular-table"

import { TableCell } from "../../../ui/table"
import type { features, Item } from "./table"

/** The table's drag and drop: dnd-kit's manager, and the row being dragged. */
export const ROW_DRAG = new InjectionToken<{
  manager: DragDropManager
  dragging: () => string | number | null
}>("ROW_DRAG")

/**
 * On the `tr` beside `kuiTableRow`, so the rows stay the body's children (its last row's border).
 */
@Component({
  selector: "tr[kuiDraggableRow]",
  imports: [FlexRender, TableCell],
  host: {
    "[attr.data-state]": "row().getIsSelected() ? 'selected' : null",
    "[attr.data-dragging]": "drag.dragging() === row().original.id",
  },
  template: `
    @for (cell of row().getVisibleCells(); track cell.id) {
      <td kuiTableCell>
        <ng-container *flexRenderCell="cell; let content">{{
          content
        }}</ng-container>
      </td>
    }
  `,
})
export class DraggableRow {
  readonly row = input.required<Row<typeof features, Item>>({
    alias: "kuiDraggableRow",
  })
  readonly index = input.required<number>()
  /** The handle the row is dragged by, which `DragHandle` sets. */
  readonly handle = signal<HTMLElement | null>(null)
  protected readonly drag = inject(ROW_DRAG)

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    let sortable: Sortable | undefined
    let unregister: (() => void) | undefined
    // Made once the row has its inputs, then kept in step with them.
    effect(() => {
      const id = this.row().original.id
      const index = this.index()
      const handle = this.handle() ?? undefined
      untracked(() => {
        if (!sortable) {
          sortable = new Sortable(
            {
              id,
              index,
              element,
              handle,
              modifiers: [RestrictToVerticalAxis],
              register: false,
            },
            this.drag.manager
          )
          unregister = sortable.register()
          return
        }
        sortable.handle = handle
        sortable.id = id
        sortable.index = index
        if (
          sortable.manager?.dragOperation.status.idle &&
          sortable.transition?.idle
        )
          sortable.refreshShape()
      })
    })
    inject(DestroyRef).onDestroy(() => {
      unregister?.()
      sortable?.destroy()
    })
  }
}
