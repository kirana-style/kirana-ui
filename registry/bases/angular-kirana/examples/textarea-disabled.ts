import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "textarea-disabled",
  imports: [Field, FieldLabel, Textarea, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow" data-disabled="true">
        <label kuiFieldLabel for="textarea-disabled">Message</label>
        <textarea
          kuiTextarea
          id="textarea-disabled"
          placeholder="Type your message here."
          disabled
        ></textarea>
      </div>
    </div>
  `,
})
export default class TextareaDisabled {
  protected readonly page = page
}
