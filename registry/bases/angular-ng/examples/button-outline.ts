import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "button-outline",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="outline">Outline</button>
    </div>
  `,
})
export default class ButtonOutline {
  protected readonly page = page
}
