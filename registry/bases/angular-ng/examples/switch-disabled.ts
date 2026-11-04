import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "switch-disabled",
  imports: [Field, FieldLabel, Switch, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiField
        orientation="horizontal"
        data-disabled="true"
        [sx]="styles.fit"
      >
        <span kuiSwitch id="switch-disabled-unchecked" disabled></span>
        <label kuiFieldLabel for="switch-disabled-unchecked">Disabled</label>
      </div>
    </div>
  `,
})
export default class SwitchDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
