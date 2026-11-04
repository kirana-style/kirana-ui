import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { buttonVariants } from "../ui/button"
import { page } from "../../../styles/page.styles"

@Component({
  selector: "button-render",
  imports: [SxDirective],
  template: `
    <div [sx]="page.example">
      <a href="#" [sx]="buttonVariants({ variant: 'secondary', size: 'sm' })"
        >Login</a
      >
    </div>
  `,
})
export default class ButtonRender {
  protected readonly buttonVariants = buttonVariants
  protected readonly page = page
}
