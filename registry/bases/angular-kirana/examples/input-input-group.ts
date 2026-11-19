import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"

@Component({
  selector: "input-input-group",
  imports: [
    Field,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-group-url">Website URL</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="input-group-url"
            placeholder="example.com"
          />
          <div kuiInputGroupAddon>
            <span kuiInputGroupText>https://</span>
          </div>
          <div kuiInputGroupAddon align="inline-end">
            <svg
              iconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="AlertCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
            ></svg>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputInputGroup {
  protected readonly page = page
}
