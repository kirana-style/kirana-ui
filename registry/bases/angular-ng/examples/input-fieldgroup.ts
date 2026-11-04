import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-fieldgroup",
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup>
        <div kuiField>
          <label kuiFieldLabel for="fieldgroup-name">Name</label>
          <input kuiInput id="fieldgroup-name" placeholder="Jordan Lee" />
        </div>
        <div kuiField>
          <label kuiFieldLabel for="fieldgroup-email">Email</label>
          <input
            kuiInput
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
          />
          <p kuiFieldDescription>We'll send updates to this address.</p>
        </div>
        <div kuiField orientation="horizontal">
          <button kuiButton type="reset" variant="outline">Reset</button>
          <button kuiButton type="submit">Submit</button>
        </div>
      </div>
    </div>
  `,
})
export default class InputFieldgroup {
  protected readonly page = page
}
