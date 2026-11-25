import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"

@Component({
  selector: "password-input-demo",
  imports: [Field, FieldLabel, PasswordInput, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="password-input-demo">Password</label>
        <div
          kuiPasswordInput
          id="password-input-demo"
          autocomplete="current-password"
          placeholder="Enter your password"
        ></div>
      </div>
    </div>
  `,
})
export default class PasswordInputDemo {
  protected readonly page = page
}
