import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Input } from "../ui/input"

@Component({
  selector: "button-group-input",
  imports: [Button, ButtonGroup, Input, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <input kuiInput placeholder="Search..." />
        <button kuiButton variant="outline" aria-label="Search">
          <svg
            iconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          ></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonGroupInput {
  protected readonly page = page
}
