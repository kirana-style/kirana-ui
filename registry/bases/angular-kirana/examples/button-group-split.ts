import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"

@Component({
  selector: "button-group-split",
  imports: [
    Button,
    ButtonGroup,
    ButtonGroupSeparator,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <button kuiButton variant="secondary">Button</button>
        <div kuiButtonGroupSeparator></div>
        <button kuiButton size="icon" variant="secondary">
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
  `,
})
export default class ButtonGroupSplit {
  protected readonly page = page
}
