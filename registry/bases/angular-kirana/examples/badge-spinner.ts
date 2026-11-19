import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "badge-spinner",
  imports: [Badge, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap2">
        <span kuiBadge variant="destructive">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Deleting
        </span>
        <span kuiBadge variant="secondary">
          Generating
          <svg kuiSpinner data-icon="inline-end"></svg>
        </span>
      </div>
    </div>
  `,
})
export default class BadgeSpinner {
  protected readonly styles = styles
  protected readonly page = page
}
