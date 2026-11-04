import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"

const styles = {
  flexItemsCenterGap4Radiu: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
    [radiusBase.value]: "1.2rem",
  }),
}

@Component({
  selector: "spinner-badge",
  imports: [Badge, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexItemsCenterGap4Radiu">
        <span kuiBadge>
          <svg kuiSpinner data-icon="inline-start"></svg>
          Syncing
        </span>
        <span kuiBadge variant="secondary">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Updating
        </span>
        <span kuiBadge variant="outline">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Processing
        </span>
      </div>
    </div>
  `,
})
export default class SpinnerBadge {
  protected readonly styles = styles
  protected readonly page = page
}
