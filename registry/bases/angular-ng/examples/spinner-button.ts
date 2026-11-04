import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

const styles = {
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "spinner-button",
  imports: [Button, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexColItemsCenterGa">
        <button kuiButton disabled size="sm">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Loading...
        </button>
        <button kuiButton variant="outline" disabled size="sm">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Please wait
        </button>
        <button kuiButton variant="secondary" disabled size="sm">
          <svg kuiSpinner data-icon="inline-start"></svg>
          Processing
        </button>
      </div>
    </div>
  `,
})
export default class SpinnerButton {
  protected readonly styles = styles
  protected readonly page = page
}
