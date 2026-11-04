import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  gridGridCols2Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "field-fieldset",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <fieldset kuiFieldSet [sx]="styles.narrowSm">
        <legend kuiFieldLegend>Address Information</legend>
        <p kuiFieldDescription>We need your address to deliver your order.</p>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="street">Street Address</label>
            <input kuiInput id="street" type="text" placeholder="123 Main St" />
          </div>
          <div [sx]="styles.gridGridCols2Gap4">
            <div kuiField>
              <label kuiFieldLabel for="city">City</label>
              <input kuiInput id="city" type="text" placeholder="New York" />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="zip">Postal Code</label>
              <input kuiInput id="zip" type="text" placeholder="90502" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class FieldFieldset {
  protected readonly styles = styles
  protected readonly page = page
}
