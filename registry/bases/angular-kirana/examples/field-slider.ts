import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldTitle } from "../ui/field"
import { Slider } from "../ui/slider"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  fontMediumTabularNums: css({
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  mt2WFull: css({ marginTop: space[2], width: { "*": null, base: "100%" } }),
}

@Component({
  selector: "field-slider",
  imports: [Field, FieldDescription, FieldTitle, Slider, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <div kuiFieldTitle>Price Range</div>
        <p kuiFieldDescription>
          Set your budget range ($
          <span [sx]="styles.fontMediumTabularNums">{{ value()[0] }}</span>
          -
          <span [sx]="styles.fontMediumTabularNums">{{ value()[1] }}</span>
          ).
        </p>
        <div
          kuiSlider
          [(value)]="value"
          [max]="1000"
          [min]="0"
          [step]="10"
          [sx]="styles.mt2WFull"
          aria-label="Price Range"
        ></div>
      </div>
    </div>
  `,
})
export default class FieldSlider {
  protected readonly value = signal([200, 800])
  protected readonly styles = styles
  protected readonly page = page
}
