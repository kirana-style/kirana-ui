import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}

@Component({
  selector: "segmented-control-sizes",
  imports: [SegmentedControl, SegmentedControlItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div
          kuiSegmentedControl
          size="sm"
          aria-label="Small"
          defaultValue="week"
        >
          <button kuiSegmentedControlItem value="day">Day</button>
          <button kuiSegmentedControlItem value="week">Week</button>
          <button kuiSegmentedControlItem value="month">Month</button>
        </div>
        <div kuiSegmentedControl aria-label="Default" defaultValue="week">
          <button kuiSegmentedControlItem value="day">Day</button>
          <button kuiSegmentedControlItem value="week">Week</button>
          <button kuiSegmentedControlItem value="month">Month</button>
        </div>
        <div
          kuiSegmentedControl
          size="lg"
          aria-label="Large"
          defaultValue="week"
        >
          <button kuiSegmentedControlItem value="day">Day</button>
          <button kuiSegmentedControlItem value="week">Week</button>
          <button kuiSegmentedControlItem value="month">Month</button>
        </div>
      </div>
    </div>
  `,
})
export default class SegmentedControlSizes {
  protected readonly styles = styles
  protected readonly page = page
}
