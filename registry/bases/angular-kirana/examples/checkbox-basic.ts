import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"

const styles = {
  w56: css({ marginInline: "auto", width: { "*": null, base: space[56] } }),
}

@Component({
  selector: "checkbox-basic",
  imports: [Checkbox, Field, FieldGroup, FieldLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.w56">
        <div kuiField orientation="horizontal">
          <span
            kuiCheckbox
            id="terms-checkbox-basic"
            name="terms-checkbox-basic"
          ></span>
          <label kuiFieldLabel for="terms-checkbox-basic"
            >Accept terms and conditions</label
          >
        </div>
      </div>
    </div>
  `,
})
export default class CheckboxBasic {
  protected readonly styles = styles
  protected readonly page = page
}
