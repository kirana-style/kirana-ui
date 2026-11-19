import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

const styles = {
  buttonLoadingDiv: css({
    display: "flex",
    gap: space[2],
  }),
}

@Component({
  selector: "button-spinner",
  imports: [Button, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.buttonLoadingDiv">
        <button kuiButton variant="outline" disabled>
          <svg kuiSpinner data-icon="inline-start"></svg>
          Generating
        </button>
        <button kuiButton variant="secondary" disabled>
          Downloading
          <svg kuiSpinner data-icon="inline-start"></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonSpinner {
  protected readonly styles = styles
  protected readonly page = page
}
