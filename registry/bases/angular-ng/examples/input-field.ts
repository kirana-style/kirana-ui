import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-field",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-field-username">Username</label>
        <input
          kuiInput
          id="input-field-username"
          type="text"
          placeholder="Enter your username"
        />
        <p kuiFieldDescription>Choose a unique username for your account.</p>
      </div>
    </div>
  `,
})
export default class InputField {
  protected readonly page = page
}
