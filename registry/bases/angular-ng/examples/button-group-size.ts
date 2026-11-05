import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"

const styles = {
  flexFlexColItemsStartGap: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { "*": null, base: space[8] },
  }),
}

@Component({
  selector: "button-group-size",
  imports: [Button, ButtonGroup, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexColItemsStartGap">
        <div kuiButtonGroup>
          <button kuiButton variant="outline" size="sm">Small</button>
          <button kuiButton variant="outline" size="sm">Button</button>
          <button kuiButton variant="outline" size="sm">Group</button>
          <button kuiButton variant="outline" size="icon-sm">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </button>
        </div>
        <div kuiButtonGroup>
          <button kuiButton variant="outline">Default</button>
          <button kuiButton variant="outline">Button</button>
          <button kuiButton variant="outline">Group</button>
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
        </div>
        <div kuiButtonGroup>
          <button kuiButton variant="outline" size="lg">Large</button>
          <button kuiButton variant="outline" size="lg">Button</button>
          <button kuiButton variant="outline" size="lg">Group</button>
          <button kuiButton variant="outline" size="icon-lg">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupSize {
  protected readonly styles = styles
  protected readonly page = page
}
