import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

@Component({
  selector: "input-group-inline-start",
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel for="inline-start-input">Input</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="inline-start-input"
            placeholder="Search..."
          />
          <div kuiInputGroupAddon align="inline-start">
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
        </div>
        <p kuiFieldDescription>Icon positioned at the start.</p>
      </div>
    </div>
  `,
})
export default class InputGroupInlineStart {
  protected readonly styles = styles
  protected readonly page = page
}
