import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  fit: css({ width: "fit-content" }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "radio-group-disabled",
  imports: [Field, FieldLabel, RadioGroup, RadioGroupItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiRadioGroup defaultValue="option2" [sx]="styles.fit">
        <div kuiField orientation="horizontal" data-disabled="true">
          <span
            kuiRadioGroupItem
            value="option1"
            id="disabled-1"
            disabled
          ></span>
          <label kuiFieldLabel for="disabled-1" [sx]="styles.normal"
            >Disabled</label
          >
        </div>
        <div kuiField orientation="horizontal">
          <span kuiRadioGroupItem value="option2" id="disabled-2"></span>
          <label kuiFieldLabel for="disabled-2" [sx]="styles.normal"
            >Option 2</label
          >
        </div>
        <div kuiField orientation="horizontal">
          <span kuiRadioGroupItem value="option3" id="disabled-3"></span>
          <label kuiFieldLabel for="disabled-3" [sx]="styles.normal"
            >Option 3</label
          >
        </div>
      </div>
    </div>
  `,
})
export default class RadioGroupDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
