import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

const row = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: space[2],
})

@Component({
  selector: "button-demo",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="row">
        <button kuiButton>Default</button>
        <button kuiButton variant="secondary">Secondary</button>
        <button kuiButton variant="outline">Outline</button>
        <button kuiButton variant="ghost">Ghost</button>
        <button kuiButton variant="destructive">Destructive</button>
        <button kuiButton variant="link">Link</button>
        <button kuiButton size="sm" variant="outline">Small</button>
        <button kuiButton size="lg">Large</button>
        <button kuiButton disabled>Disabled</button>
      </div>
    </div>
  `,
})
export default class ButtonDemo {
  protected readonly page = page
  protected readonly row = row
}
