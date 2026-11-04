import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Spinner } from "../ui/spinner"

const styles = {
  flexItemsCenterGap6: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[6] },
  }),
  size3: css({
    width: { "*": null, base: space[3] },
    height: { "*": null, base: space[3] },
  }),
  size4: css({
    width: { "*": null, base: space[4] },
    height: { "*": null, base: space[4] },
  }),
  size6: css({
    width: { "*": null, base: space[6] },
    height: { "*": null, base: space[6] },
  }),
  more: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
}

@Component({
  selector: "spinner-size",
  imports: [Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexItemsCenterGap6">
        <svg kuiSpinner [sx]="styles.size3"></svg>
        <svg kuiSpinner [sx]="styles.size4"></svg>
        <svg kuiSpinner [sx]="styles.size6"></svg>
        <svg kuiSpinner [sx]="styles.more"></svg>
      </div>
    </div>
  `,
})
export default class SpinnerSize {
  protected readonly styles = styles
  protected readonly page = page
}
