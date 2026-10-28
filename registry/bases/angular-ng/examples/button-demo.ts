import { Component } from "@angular/core"
import { css, props } from "@kirana-style/core"

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
  imports: [Button],
  template: `
    <div [class]="example">
      <div [class]="row">
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
  // Plain elements take their classes as strings: Kirana's `SxDirective` would also match the
  // parts' `[sx]`.
  protected readonly example = props(page.example).className
  protected readonly row = props(row).className
}
