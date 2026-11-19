import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const styles = {
  flexGap2: css({ display: "flex", gap: { "*": null, base: space[2] } }),
}

@Component({
  selector: "label-demo",
  imports: [Checkbox, Label, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexGap2">
        <span kuiCheckbox id="terms"></span>
        <label kuiLabel for="terms">Accept terms and conditions</label>
      </div>
    </div>
  `,
})
export default class LabelDemo {
  protected readonly styles = styles
  protected readonly page = page
}
