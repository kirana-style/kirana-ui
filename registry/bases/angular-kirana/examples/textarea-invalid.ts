import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "textarea-invalid",
  imports: [Field, FieldDescription, FieldLabel, Textarea, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow" data-invalid="true">
        <label kuiFieldLabel for="textarea-invalid">Message</label>
        <textarea
          kuiTextarea
          id="textarea-invalid"
          placeholder="Type your message here."
          aria-invalid="true"
        ></textarea>
        <p kuiFieldDescription>Please enter a valid message.</p>
      </div>
    </div>
  `,
})
export default class TextareaInvalid {
  protected readonly page = page
}
