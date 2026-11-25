import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Editable,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
} from "../ui/editable"
import { Field, FieldDescription, FieldLabel } from "../ui/field"

@Component({
  selector: "editable-double-click",
  imports: [
    Editable,
    EditableEditTrigger,
    EditableInput,
    EditablePreview,
    Field,
    FieldDescription,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="editable-double-click-title">
          Board title
        </label>
        <div
          kuiEditable
          [activation]="'dblclick'"
          [defaultValue]="'Spring launch'"
          [placeholder]="'Untitled board'"
        >
          <span kuiEditablePreview></span>
          <input kuiEditableInput id="editable-double-click-title" />
          <button kuiEditableEditTrigger></button>
        </div>
        <p kuiFieldDescription>
          Double-click the title, or press the pencil, to rename the board.
        </p>
      </div>
    </div>
  `,
})
export default class EditableDoubleClick {
  protected readonly page = page
}
