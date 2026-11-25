import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"

@Component({
  selector: "segmented-control-demo",
  imports: [
    Field,
    FieldLabel,
    SegmentedControl,
    SegmentedControlItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="segmented-control-demo-label">View</label>
        <div
          kuiSegmentedControl
          aria-labelledby="segmented-control-demo-label"
          [(value)]="view"
        >
          <button kuiSegmentedControlItem value="list">List</button>
          <button kuiSegmentedControlItem value="board">Board</button>
          <button kuiSegmentedControlItem value="calendar">Calendar</button>
        </div>
      </div>
    </div>
  `,
})
export default class SegmentedControlDemo {
  protected readonly view = signal<string | undefined>("list")
  protected readonly page = page
}
