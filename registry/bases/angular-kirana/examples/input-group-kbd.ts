import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

@Component({
  selector: "input-group-kbd",
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
      <div kuiInputGroup [sx]="styles.narrow">
        <input kuiInputGroupInput placeholder="Search..." />
        <div kuiInputGroupAddon>
          <svg
            iconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
            [sx]="styles.textMutedForeground"
          ></svg>
        </div>
        <div kuiInputGroupAddon align="inline-end">
          <kbd kuiKbd>⌘K</kbd>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupKbd {
  protected readonly styles = styles
  protected readonly page = page
}
