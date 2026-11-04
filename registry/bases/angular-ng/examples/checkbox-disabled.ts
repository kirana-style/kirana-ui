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
  selector: "checkbox-disabled",
  imports: [Checkbox, Field, FieldGroup, FieldLabel, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.w56">
        <div kuiField orientation="horizontal" data-disabled="true">
          <span
            kuiCheckbox
            id="toggle-checkbox-disabled"
            name="toggle-checkbox-disabled"
            disabled
          ></span>
          <label kuiFieldLabel for="toggle-checkbox-disabled"
            >Enable notifications</label
          >
        </div>
      </div>
    </div>
  `,
})
export default class CheckboxDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
