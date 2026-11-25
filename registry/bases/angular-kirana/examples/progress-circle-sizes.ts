import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[6] }),
}

@Component({
  selector: "progress-circle-sizes",
  imports: [ProgressCircle, ProgressCircleLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.row">
        <div
          kuiProgressCircle
          size="sm"
          [value]="25"
          aria-label="Small progress"
        >
          <span kuiProgressCircleLabel></span>
        </div>
        <div kuiProgressCircle [value]="50" aria-label="Default progress">
          <span kuiProgressCircleLabel></span>
        </div>
        <div
          kuiProgressCircle
          size="lg"
          [value]="75"
          aria-label="Large progress"
        >
          <span kuiProgressCircleLabel></span>
        </div>
      </div>
    </div>
  `,
})
export default class ProgressCircleSizes {
  protected readonly styles = styles
  protected readonly page = page
}
