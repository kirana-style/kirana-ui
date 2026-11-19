import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Progress } from "../ui/progress"
import { Slider } from "../ui/slider"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
}

@Component({
  selector: "progress-controlled",
  imports: [Progress, Slider, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiProgress [value]="value()[0]" [sx]="styles.full"></div>
        <div kuiSlider [(value)]="value" [min]="0" [max]="100" [step]="1"></div>
      </div>
    </div>
  `,
})
export default class ProgressControlled {
  // A list, as the slider gives its values.
  protected readonly value = signal([50])
  protected readonly styles = styles
  protected readonly page = page
}
