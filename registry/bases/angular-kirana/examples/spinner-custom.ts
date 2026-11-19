import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { spinner } from "../../../styles/spinner.styles"
import { IconPlaceholder } from "../../../icons/angular"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[4] }),
}

@Component({
  selector: "spinner-custom",
  imports: [IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.row">
        <!-- Spinner -->
        <svg
          iconPlaceholder
          lucide="LoaderIcon"
          tabler="IconLoader"
          hugeicons="Loading03Icon"
          phosphor="SpinnerIcon"
          remixicon="RiLoader4Line"
          role="status"
          aria-label="Loading"
          [sx]="spinner"
        ></svg>
      </div>
    </div>
  `,
})
export default class SpinnerCustom {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly spinner = spinner
}
