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
  selector: "segmented-control-disabled",
  imports: [SegmentedControl, SegmentedControlItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div kuiSegmentedControl aria-label="Plan" defaultValue="monthly">
          <button kuiSegmentedControlItem value="monthly">Monthly</button>
          <button kuiSegmentedControlItem value="yearly">Yearly</button>
          <button kuiSegmentedControlItem value="lifetime" [disabled]="true">
            Lifetime
          </button>
        </div>
        <div
          kuiSegmentedControl
          aria-label="Status"
          defaultValue="open"
          [disabled]="true"
        >
          <button kuiSegmentedControlItem value="open">Open</button>
          <button kuiSegmentedControlItem value="closed">Closed</button>
          <button kuiSegmentedControlItem value="all">All</button>
        </div>
      </div>
    </div>
  `,
})
export default class SegmentedControlDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
