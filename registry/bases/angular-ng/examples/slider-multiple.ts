import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Slider } from "../ui/slider"

const styles = {
  mxAutoWFullMaxWXs: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
  }),
}

@Component({
  selector: "slider-multiple",
  imports: [Slider, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiSlider
        [defaultValue]="[10, 20, 70]"
        [max]="100"
        [step]="10"
        [sx]="styles.mxAutoWFullMaxWXs"
      ></div>
    </div>
  `,
})
export default class SliderMultiple {
  protected readonly styles = styles
  protected readonly page = page
}
