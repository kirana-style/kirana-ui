import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { inputGroup } from "../../../styles/input-group.styles"
import { page } from "../../../styles/page.styles"
import { CopyButton } from "../ui/copy-button"
import { Field, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const INVITE = "https://ui.kirana.style/invite/8f3k2q"

@Component({
  selector: "copy-button-input",
  imports: [
    CopyButton,
    Field,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel for="copy-button-input">Invite link</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="copy-button-input"
            [value]="invite"
            readonly
          />
          <div kuiInputGroupAddon align="inline-end">
            <button
              kuiCopyButton
              [value]="invite"
              size="icon-xs"
              copyLabel="Copy invite link"
              [sx]="button"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CopyButtonInput {
  protected readonly invite = INVITE
  protected readonly button = inputGroup.button({ size: "icon-xs" })
  protected readonly page = page
}
