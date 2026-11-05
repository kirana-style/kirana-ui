import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "input-group-inline-end",
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
        <label kuiFieldLabel for="inline-end-input">Input</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="inline-end-input"
            type="password"
            placeholder="Enter password"
          />
          <div kuiInputGroupAddon align="inline-end">
            <svg
              iconPlaceholder
              lucide="EyeOffIcon"
              tabler="IconEyeClosed"
              hugeicons="ViewOffIcon"
              phosphor="EyeSlashIcon"
              remixicon="RiEyeOffLine"
            ></svg>
          </div>
        </div>
        <p kuiFieldDescription>Icon positioned at the end.</p>
      </div>
    </div>
  `,
})
export default class InputGroupInlineEnd {
  protected readonly styles = styles
  protected readonly page = page
}
