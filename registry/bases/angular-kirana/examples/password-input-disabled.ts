import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"

@Component({
  selector: "password-input-disabled",
  imports: [Field, FieldLabel, PasswordInput, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow" data-disabled="true">
        <label kuiFieldLabel for="password-input-disabled">Password</label>
        <div
          kuiPasswordInput
          id="password-input-disabled"
          defaultValue="correct-horse"
          [disabled]="true"
        ></div>
      </div>
    </div>
  `,
})
export default class PasswordInputDisabled {
  protected readonly page = page
}
