import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  fit: css({ width: "fit-content" }),
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
}

@Component({
  selector: "radio-group-demo",
  imports: [Label, RadioGroup, RadioGroupItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiRadioGroup defaultValue="comfortable" [sx]="styles.fit">
        <div [sx]="styles.row">
          <span kuiRadioGroupItem value="default" id="r1"></span>
          <label kuiLabel for="r1">Default</label>
        </div>
        <div [sx]="styles.row">
          <span kuiRadioGroupItem value="comfortable" id="r2"></span>
          <label kuiLabel for="r2">Comfortable</label>
        </div>
        <div [sx]="styles.row">
          <span kuiRadioGroupItem value="compact" id="r3"></span>
          <label kuiLabel for="r3">Compact</label>
        </div>
      </div>
    </div>
  `,
})
export default class RadioGroupDemo {
  protected readonly styles = styles
  protected readonly page = page
}
