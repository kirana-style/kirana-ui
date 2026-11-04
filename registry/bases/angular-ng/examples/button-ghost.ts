import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "button-ghost",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="ghost">Ghost</button>
    </div>
  `,
})
export default class ButtonGhost {
  protected readonly page = page
}
