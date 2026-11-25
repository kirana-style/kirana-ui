import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { CopyButton } from "../ui/copy-button"

const styles = {
  rows: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

const VALUE = "pk_live_4eC39HqLyjWDarjtT1zdp7dc"

@Component({
  selector: "copy-button-variants",
  imports: [CopyButton, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.rows">
        <div [sx]="styles.row">
          <button kuiCopyButton [value]="value" variant="outline"></button>
          <button kuiCopyButton [value]="value" variant="secondary"></button>
          <button kuiCopyButton [value]="value" variant="ghost"></button>
        </div>
        <div [sx]="styles.row">
          <button
            kuiCopyButton
            [value]="value"
            variant="outline"
            size="icon-xs"
          ></button>
          <button
            kuiCopyButton
            [value]="value"
            variant="outline"
            size="icon-sm"
          ></button>
          <button
            kuiCopyButton
            [value]="value"
            variant="outline"
            size="icon"
          ></button>
          <button
            kuiCopyButton
            [value]="value"
            variant="outline"
            size="icon-lg"
          ></button>
        </div>
      </div>
    </div>
  `,
})
export default class CopyButtonVariants {
  protected readonly value = VALUE
  protected readonly styles = styles
  protected readonly page = page
}
