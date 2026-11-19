import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "field-radio",
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <fieldset kuiFieldSet [sx]="styles.narrow">
        <legend kuiFieldLegend variant="label">Subscription Plan</legend>
        <p kuiFieldDescription>
          Yearly and lifetime plans offer significant savings.
        </p>
        <div kuiRadioGroup defaultValue="monthly">
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="monthly" id="plan-monthly"></span>
            <label kuiFieldLabel for="plan-monthly" [sx]="styles.normal"
              >Monthly ($9.99/month)</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="yearly" id="plan-yearly"></span>
            <label kuiFieldLabel for="plan-yearly" [sx]="styles.normal"
              >Yearly ($99.99/year)</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="lifetime" id="plan-lifetime"></span>
            <label kuiFieldLabel for="plan-lifetime" [sx]="styles.normal"
              >Lifetime ($299.99)</label
            >
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class FieldRadio {
  protected readonly styles = styles
  protected readonly page = page
}
