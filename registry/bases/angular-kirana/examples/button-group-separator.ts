import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"

@Component({
  selector: "button-group-separator",
  imports: [Button, ButtonGroup, ButtonGroupSeparator, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <button kuiButton variant="secondary" size="sm">Copy</button>
        <div kuiButtonGroupSeparator></div>
        <button kuiButton variant="secondary" size="sm">Paste</button>
      </div>
    </div>
  `,
})
export default class ButtonGroupSeparatorExample {
  protected readonly page = page
}
