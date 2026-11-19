import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  textDestructive: css({ color: theme.destructive }),
}

@Component({
  selector: "input-required",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-required">
          Required Field
          <span [sx]="styles.textDestructive">*</span>
        </label>
        <input
          kuiInput
          id="input-required"
          placeholder="This field is required"
          required
        />
        <p kuiFieldDescription>This field must be filled out.</p>
      </div>
    </div>
  `,
})
export default class InputRequired {
  protected readonly styles = styles
  protected readonly page = page
}
