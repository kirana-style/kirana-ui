import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"

const styles = {
  hFit: css({ height: "fit-content" }),
}

@Component({
  selector: "button-group-orientation",
  imports: [Button, ButtonGroup, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        [sx]="styles.hFit"
      >
        <button kuiButton variant="outline" size="icon">
          <svg
            iconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          ></svg>
        </button>
        <button kuiButton variant="outline" size="icon">
          <svg
            iconPlaceholder
            lucide="MinusIcon"
            tabler="IconMinus"
            hugeicons="MinusSignIcon"
            phosphor="MinusIcon"
            remixicon="RiSubtractLine"
          ></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonGroupOrientation {
  protected readonly styles = styles
  protected readonly page = page
}
