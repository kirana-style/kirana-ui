import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-disabled",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField data-disabled="true">
        <label kuiFieldLabel for="input-demo-disabled">Email</label>
        <input
          kuiInput
          id="input-demo-disabled"
          type="email"
          placeholder="Email"
          disabled
        />
        <p kuiFieldDescription>This field is currently disabled.</p>
      </div>
    </div>
  `,
})
export default class InputDisabled {
  protected readonly page = page
}
