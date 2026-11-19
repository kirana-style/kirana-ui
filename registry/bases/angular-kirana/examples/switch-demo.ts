import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

const styles = {
  // `flex items-center space-x-2`: the space as a gap, which reads the same.
  spaced: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

@Component({
  selector: "switch-demo",
  imports: [Label, Switch, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.spaced">
        <span kuiSwitch id="airplane-mode"></span>
        <label kuiLabel for="airplane-mode">Airplane Mode</label>
      </div>
    </div>
  `,
})
export default class SwitchDemo {
  protected readonly styles = styles
  protected readonly page = page
}
