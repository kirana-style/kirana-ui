import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "textarea-demo",
  imports: [Textarea, SxDirective],
  template: `
    <div [sx]="page.example">
      <textarea
        kuiTextarea
        [sx]="page.narrow"
        placeholder="Type your message here."
      ></textarea>
    </div>
  `,
})
export default class TextareaDemo {
  protected readonly page = page
}
