import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "button-secondary",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="secondary">Secondary</button>
    </div>
  `,
})
export default class ButtonSecondary {
  protected readonly page = page
}
