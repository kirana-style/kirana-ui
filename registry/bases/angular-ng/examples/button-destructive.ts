import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "button-destructive",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="destructive">Destructive</button>
    </div>
  `,
})
export default class ButtonDestructive {
  protected readonly page = page
}
