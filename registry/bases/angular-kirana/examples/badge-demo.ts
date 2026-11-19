import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"

const styles = {
  flexWFullFlexWrapJustify: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "badge-demo",
  imports: [Badge, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullFlexWrapJustify">
        <span kuiBadge>Badge</span>
        <span kuiBadge variant="secondary">Secondary</span>
        <span kuiBadge variant="destructive">Destructive</span>
        <span kuiBadge variant="outline">Outline</span>
      </div>
    </div>
  `,
})
export default class BadgeDemo {
  protected readonly styles = styles
  protected readonly page = page
}
