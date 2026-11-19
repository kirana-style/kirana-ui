import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field"

const styles = {
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
}

@Component({
  selector: "checkbox-description",
  imports: [
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.w72">
        <div kuiField orientation="horizontal">
          <span
            kuiCheckbox
            id="terms-checkbox-desc"
            name="terms-checkbox-desc"
            defaultChecked
          ></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="terms-checkbox-desc"
              >Accept terms and conditions</label
            >
            <p kuiFieldDescription>
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CheckboxDescription {
  protected readonly styles = styles
  protected readonly page = page
}
