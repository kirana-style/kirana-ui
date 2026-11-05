import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { breakpoint } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd } from "../ui/kbd"

const styles = {
  smW34: css({ width: { [breakpoint.sm]: "75%" } }),
}

@Component({
  selector: "empty-input-group",
  imports: [
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiEmpty>
        <div kuiEmptyHeader>
          <div kuiEmptyTitle>404 - Not Found</div>
          <div kuiEmptyDescription>
            The page you're looking for doesn't exist. Try searching for what
            you need below.
          </div>
        </div>
        <div kuiEmptyContent>
          <div kuiInputGroup [sx]="styles.smW34">
            <input
              kuiInputGroupInput
              placeholder="Try searching for pages..."
            />
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
              <kbd kuiKbd>/</kbd>
            </div>
          </div>
          <div kuiEmptyDescription>
            Need help?
            <a href="#">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class EmptyInputGroup {
  protected readonly styles = styles
  protected readonly page = page
}
