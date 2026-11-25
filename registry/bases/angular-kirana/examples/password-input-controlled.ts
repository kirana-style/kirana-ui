import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { PasswordInput } from "../ui/password-input"

@Component({
  selector: "password-input-controlled",
  imports: [
    Checkbox,
    Field,
    FieldGroup,
    FieldLabel,
    PasswordInput,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="page.narrow">
        <div kuiField>
          <label kuiFieldLabel for="password-input-controlled">
            Wi-Fi password
          </label>
          <div
            kuiPasswordInput
            id="password-input-controlled"
            defaultValue="sunflower-42"
            [visible]="visible()"
            (visibleChange)="visible.set($event === true)"
          ></div>
        </div>
        <div kuiField orientation="horizontal">
          <span
            kuiCheckbox
            id="password-input-controlled-show"
            [checked]="visible()"
            (checkedChange)="visible.set($event)"
          ></span>
          <label kuiFieldLabel for="password-input-controlled-show">
            Show password
          </label>
        </div>
      </div>
    </div>
  `,
})
export default class PasswordInputControlled {
  protected readonly visible = signal(false)
  protected readonly page = page
}
