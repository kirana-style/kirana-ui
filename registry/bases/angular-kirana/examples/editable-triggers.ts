import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Editable,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
} from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"

@Component({
  selector: "editable-triggers",
  imports: [
    Editable,
    EditableCancelTrigger,
    EditableEditTrigger,
    EditableInput,
    EditablePreview,
    EditableSubmitTrigger,
    Field,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="editable-triggers-name">Display name</label>
        <div
          kuiEditable
          [defaultValue]="'Ada Lovelace'"
          [placeholder]="'Your name'"
        >
          <span kuiEditablePreview></span>
          <input kuiEditableInput id="editable-triggers-name" />
          <button kuiEditableEditTrigger></button>
          <button kuiEditableSubmitTrigger></button>
          <button kuiEditableCancelTrigger></button>
        </div>
      </div>
    </div>
  `,
})
export default class EditableTriggers {
  protected readonly page = page
}
