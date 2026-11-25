import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ProgressCircle } from "../ui/progress-circle"

@Component({
  selector: "progress-circle-indeterminate",
  imports: [ProgressCircle, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiProgressCircle [value]="null" aria-label="Loading"></div>
    </div>
  `,
})
export default class ProgressCircleIndeterminate {
  protected readonly page = page
}
