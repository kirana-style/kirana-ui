import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const styles = {
  maxWXs: css({ maxWidth: containerSize.xs }),
}

@Component({
  selector: "input-group-demo",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiInputGroup [sx]="styles.maxWXs">
        <input kuiInputGroupInput placeholder="Search..." />
        <div kuiInputGroupAddon>
          <svg
            iconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          ></svg>
        </div>
        <div kuiInputGroupAddon align="inline-end">12 results</div>
      </div>
    </div>
  `,
})
export default class InputGroupDemo {
  protected readonly styles = styles
  protected readonly page = page
}
