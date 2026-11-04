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
  selector: "radio-group-invalid",
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
        <legend kuiFieldLegend variant="label">Notification Preferences</legend>
        <p kuiFieldDescription>Choose how you want to receive notifications.</p>
        <div kuiRadioGroup defaultValue="email">
          <div kuiField orientation="horizontal" data-invalid="true">
            <span
              kuiRadioGroupItem
              value="email"
              id="invalid-email"
              aria-invalid="true"
            ></span>
            <label kuiFieldLabel for="invalid-email" [sx]="styles.normal"
              >Email only</label
            >
          </div>
          <div kuiField orientation="horizontal" data-invalid="true">
            <span
              kuiRadioGroupItem
              value="sms"
              id="invalid-sms"
              aria-invalid="true"
            ></span>
            <label kuiFieldLabel for="invalid-sms" [sx]="styles.normal"
              >SMS only</label
            >
          </div>
          <div kuiField orientation="horizontal" data-invalid="true">
            <span
              kuiRadioGroupItem
              value="both"
              id="invalid-both"
              aria-invalid="true"
            ></span>
            <label kuiFieldLabel for="invalid-both" [sx]="styles.normal"
              >Both Email & SMS</label
            >
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class RadioGroupInvalid {
  protected readonly styles = styles
  protected readonly page = page
}
