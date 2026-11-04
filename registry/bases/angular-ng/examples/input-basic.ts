import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Input } from "../ui/input"

@Component({
  selector: "input-basic",
  imports: [Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <input kuiInput placeholder="Enter text" />
    </div>
  `,
})
export default class InputBasic {
  protected readonly page = page
}
