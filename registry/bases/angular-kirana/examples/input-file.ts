import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-file",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="picture">Picture</label>
        <input kuiInput id="picture" type="file" />
        <p kuiFieldDescription>Select a picture to upload.</p>
      </div>
    </div>
  `,
})
export default class InputFile {
  protected readonly page = page
}
