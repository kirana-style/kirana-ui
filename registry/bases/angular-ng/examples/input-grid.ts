import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  gridMaxWSmGridCols2: css({
    display: "grid",
    maxWidth: containerSize.sm,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  }),
}

@Component({
  selector: "input-grid",
  imports: [Field, FieldGroup, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.gridMaxWSmGridCols2">
        <div kuiField>
          <label kuiFieldLabel for="first-name">First Name</label>
          <input kuiInput id="first-name" placeholder="Jordan" />
        </div>
        <div kuiField>
          <label kuiFieldLabel for="last-name">Last Name</label>
          <input kuiInput id="last-name" placeholder="Lee" />
        </div>
      </div>
    </div>
  `,
})
export default class InputGrid {
  protected readonly styles = styles
  protected readonly page = page
}
