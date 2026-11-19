import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "button-default",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton>Button</button>
    </div>
  `,
})
export default class ButtonDefault {
  protected readonly page = page
}
