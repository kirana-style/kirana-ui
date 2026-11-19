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
  selector: "field-switch",
  imports: [Field, FieldLabel, Switch, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField orientation="horizontal" [sx]="styles.fit">
        <label kuiFieldLabel for="2fa">Multi-factor authentication</label>
        <span kuiSwitch id="2fa"></span>
      </div>
    </div>
  `,
})
export default class FieldSwitch {
  protected readonly styles = styles
  protected readonly page = page
}
