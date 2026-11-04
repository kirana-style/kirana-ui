import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "switch-invalid",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    Switch,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div
        kuiField
        orientation="horizontal"
        [sx]="styles.narrow"
        data-invalid="true"
      >
        <div kuiFieldContent>
          <label kuiFieldLabel for="switch-terms"
            >Accept terms and conditions</label
          >
          <p kuiFieldDescription>
            You must accept the terms and conditions to continue.
          </p>
        </div>
        <span kuiSwitch id="switch-terms" aria-invalid="true"></span>
      </div>
    </div>
  `,
})
export default class SwitchInvalid {
  protected readonly styles = styles
  protected readonly page = page
}
