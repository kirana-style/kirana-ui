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
  selector: "checkbox-invalid",
  imports: [Checkbox, Field, FieldGroup, FieldLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.w56">
        <div kuiField orientation="horizontal" data-invalid="true">
          <span
            kuiCheckbox
            id="terms-checkbox-invalid"
            name="terms-checkbox-invalid"
            aria-invalid="true"
          ></span>
          <label kuiFieldLabel for="terms-checkbox-invalid"
            >Accept terms and conditions</label
          >
        </div>
      </div>
    </div>
  `,
})
export default class CheckboxInvalid {
  protected readonly styles = styles
  protected readonly page = page
}
