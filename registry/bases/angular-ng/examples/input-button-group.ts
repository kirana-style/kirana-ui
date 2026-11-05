import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-button-group",
  imports: [Button, ButtonGroup, Field, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-button-group">Search</label>
        <div kuiButtonGroup>
          <input
            kuiInput
            id="input-button-group"
            placeholder="Type to search..."
          />
          <button kuiButton variant="outline">Search</button>
        </div>
      </div>
    </div>
  `,
})
export default class InputButtonGroup {
  protected readonly page = page
}
