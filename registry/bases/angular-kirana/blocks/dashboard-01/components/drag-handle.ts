// The row's handle: dnd-kit drags the row's sortable by this element.
import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import { DraggableRow } from "./draggable-row"
import { styles } from "./table"

@Component({
  selector: "kui-drag-handle",
  imports: [Button, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <button
      kuiButton
      variant="ghost"
      size="icon"
      [sx]="styles.dragHandleButton"
    >
      <svg
        iconPlaceholder
        lucide="GripVerticalIcon"
        tabler="IconGripVertical"
        hugeicons="DragDropVerticalIcon"
        phosphor="DotsSixVerticalIcon"
        remixicon="RiDraggable"
        [sx]="styles.dragHandleIconPlaceholder"
      ></svg>
      <span [sx]="styles.dragHandleSpan">Drag to reorder</span>
    </button>
  `,
})
export class DragHandle {
  protected readonly styles = styles

  constructor() {
    const row = inject(DraggableRow)
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    // The button, once drawn: the host draws no box of its own.
    afterNextRender(() =>
      row.handle.set(host.querySelector("button") as HTMLElement | null)
    )
    inject(DestroyRef).onDestroy(() => row.handle.set(null))
  }
}
