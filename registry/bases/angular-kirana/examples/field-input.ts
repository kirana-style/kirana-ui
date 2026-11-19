import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

@Component({
  selector: "field-input",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    Input,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <fieldset kuiFieldSet [sx]="styles.narrow">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="username">Username</label>
            <input
              kuiInput
              id="username"
              type="text"
              placeholder="Max Leiter"
            />
            <p kuiFieldDescription>
              Choose a unique username for your account.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="password">Password</label>
            <p kuiFieldDescription>Must be at least 8 characters long.</p>
            <input
              kuiInput
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class FieldInput {
  protected readonly styles = styles
  protected readonly page = page
}
