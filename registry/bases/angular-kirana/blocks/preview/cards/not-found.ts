import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../../../ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import { Kbd } from "../../../ui/kbd"

const styles = {
  empty: css({
    height: { "*": null, base: space[72] },
  }),
  inputGroup: css({
    width: { "*": null, base: "calc(3/4 * 100%)" },
  }),
}

@Component({
  selector: "kui-not-found",
  imports: [
    Button,
    Card,
    CardContent,
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
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiEmpty [sx]="styles.empty">
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>404 - Not Found</div>
            <div kuiEmptyDescription>
              The page you're looking for doesn't exist. Try searching for what
              you need below.
            </div>
          </div>
          <div kuiEmptyContent>
            <div kuiInputGroup [sx]="styles.inputGroup">
              <input
                kuiInputGroupInput
                placeholder="Try searching for pages..."
              />
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="Search01Icon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                ></svg>
              </div>
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbd>/</kbd>
              </div>
            </div>
            <button kuiButton variant="link">Go to homepage</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NotFound {
  protected readonly styles = styles
}
