import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Label } from "../ui/label"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "checkbox-demo",
  imports: [
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
    Label,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <div kuiField orientation="horizontal">
          <span kuiCheckbox id="terms-checkbox" name="terms-checkbox"></span>
          <label kuiLabel for="terms-checkbox"
            >Accept terms and conditions</label
          >
        </div>
        <div kuiField orientation="horizontal">
          <span
            kuiCheckbox
            id="terms-checkbox-2"
            name="terms-checkbox-2"
            defaultChecked
          ></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="terms-checkbox-2"
              >Accept terms and conditions</label
            >
            <p kuiFieldDescription>
              By clicking this checkbox, you agree to the terms.
            </p>
          </div>
        </div>
        <div kuiField orientation="horizontal" data-disabled="true">
          <span
            kuiCheckbox
            id="toggle-checkbox"
            name="toggle-checkbox"
            disabled
          ></span>
          <label kuiFieldLabel for="toggle-checkbox"
            >Enable notifications</label
          >
        </div>
        <label kuiFieldLabel>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="toggle-checkbox-2"
              name="toggle-checkbox-2"
            ></span>
            <div kuiFieldContent>
              <div kuiFieldTitle>Enable notifications</div>
              <p kuiFieldDescription>
                You can enable or disable notifications at any time.
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  `,
})
export default class CheckboxDemo {
  protected readonly styles = styles
  protected readonly page = page
}
