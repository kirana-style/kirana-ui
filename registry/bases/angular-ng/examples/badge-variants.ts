import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "badge-variants",
  imports: [Badge, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap2">
        <span kuiBadge>Default</span>
        <span kuiBadge variant="secondary">Secondary</span>
        <span kuiBadge variant="destructive">Destructive</span>
        <span kuiBadge variant="outline">Outline</span>
        <span kuiBadge variant="ghost">Ghost</span>
      </div>
    </div>
  `,
})
export default class BadgeVariants {
  protected readonly styles = styles
  protected readonly page = page
}
