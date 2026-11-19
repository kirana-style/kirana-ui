import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  tiny: css({ width: "100%", maxWidth: "10rem" }),
}

@Component({
  selector: "switch-sizes",
  imports: [Field, FieldGroup, FieldLabel, Switch, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.tiny">
        <div kuiField orientation="horizontal">
          <span kuiSwitch id="switch-size-sm" size="sm"></span>
          <label kuiFieldLabel for="switch-size-sm">Small</label>
        </div>
        <div kuiField orientation="horizontal">
          <span kuiSwitch id="switch-size-default" size="default"></span>
          <label kuiFieldLabel for="switch-size-default">Default</label>
        </div>
      </div>
    </div>
  `,
})
export default class SwitchSizes {
  protected readonly styles = styles
  protected readonly page = page
}
