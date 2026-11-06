// The selection column: the header's box selects the page's rows, a row's box selects its row.
import { Component, input, output } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"

import { Checkbox } from "../../../ui/checkbox"
import { styles } from "./table"

@Component({
  selector: "kui-select-cell",
  imports: [Checkbox, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div [sx]="header() ? styles.div : styles.div2">
      <span
        kuiCheckbox
        [checked]="checked() === true"
        [indeterminate]="checked() === 'indeterminate'"
        [attr.aria-label]="label()"
        (checkedChange)="toggle.emit($event)"
      ></span>
    </div>
  `,
})
export class SelectCell {
  readonly checked = input.required<boolean | "indeterminate">()
  readonly label = input.required<string>()
  readonly header = input<boolean>()
  readonly toggle = output<boolean>()
  protected readonly styles = styles
}
