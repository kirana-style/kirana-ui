import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Editable, EditableInput, EditablePreview } from "../ui/editable"
import { Field, FieldLabel } from "../ui/field"

@Component({
  selector: "editable-disabled",
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
      <div kuiField [sx]="page.narrow" data-disabled="true">
        <label kuiFieldLabel for="editable-disabled-name">Workspace</label>
        <div kuiEditable [disabled]="true" [defaultValue]="'Acme Inc.'">
          <span kuiEditablePreview></span>
          <input kuiEditableInput id="editable-disabled-name" />
        </div>
      </div>
    </div>
  `,
})
export default class EditableDisabled {
  protected readonly page = page
}
