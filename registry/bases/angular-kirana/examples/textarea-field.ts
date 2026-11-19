import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "textarea-field",
  imports: [Field, FieldDescription, FieldLabel, Textarea, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="textarea-message">Message</label>
        <p kuiFieldDescription>Enter your message below.</p>
        <textarea
          kuiTextarea
          id="textarea-message"
          placeholder="Type your message here."
        ></textarea>
      </div>
    </div>
  `,
})
export default class TextareaField {
  protected readonly page = page
}
