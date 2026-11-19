import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}

@Component({
  selector: "progress-label",
  imports: [Progress, ProgressLabel, ProgressValue, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiProgress [value]="56" [sx]="styles.narrowSm">
        <span kuiProgressLabel>Upload progress</span>
        <span kuiProgressValue></span>
      </div>
    </div>
  `,
})
export default class ProgressLabelExample {
  protected readonly styles = styles
  protected readonly page = page
}
