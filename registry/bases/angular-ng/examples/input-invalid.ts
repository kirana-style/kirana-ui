import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-invalid",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField data-invalid="true">
        <label kuiFieldLabel for="input-invalid">Invalid Input</label>
        <input
          kuiInput
          id="input-invalid"
          placeholder="Error"
          aria-invalid="true"
        />
        <p kuiFieldDescription>This field contains validation errors.</p>
      </div>
    </div>
  `,
})
export default class InputInvalid {
  protected readonly page = page
}
