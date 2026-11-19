import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"

const styles = {
  flexWFullMaxWXsFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
}

@Component({
  selector: "kbd-input-group",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWXsFlexColGa">
        <div kuiInputGroup>
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
          <div kuiInputGroupAddon align="inline-end">
            <kbd kuiKbd>⌘</kbd>
            <kbd kuiKbd>K</kbd>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class KbdInputGroup {
  protected readonly styles = styles
  protected readonly page = page
}
