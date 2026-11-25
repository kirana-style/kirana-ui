import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"

@Component({
  selector: "editable-demo",
  imports: [
    Editable,
    EditableInput,
    EditablePreview,
    Field,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="editable-demo-name">Project name</label>
        <div
          kuiEditable
          [defaultValue]="'Marketing site'"
          [placeholder]="'Untitled project'"
        >
          <span kuiEditablePreview></span>
          <input kuiEditableInput id="editable-demo-name" />
        </div>
      </div>
    </div>
  `,
})
export default class EditableDemo {
  protected readonly page = page
}
