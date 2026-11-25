import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"

@Component({
  selector: "progress-circle-demo",
  imports: [ProgressCircle, ProgressCircleLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiProgressCircle [value]="64" aria-label="Storage used">
        <span kuiProgressCircleLabel></span>
      </div>
    </div>
  `,
})
export default class ProgressCircleDemo {
  protected readonly page = page
}
