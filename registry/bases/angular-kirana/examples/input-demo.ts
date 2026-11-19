import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-demo",
  imports: [Field, FieldDescription, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-demo-api-key">API Key</label>
        <input
          kuiInput
          id="input-demo-api-key"
          type="password"
          placeholder="sk-..."
        />
        <p kuiFieldDescription>
          Your API key is encrypted and stored securely.
        </p>
      </div>
    </div>
  `,
})
export default class InputDemo {
  protected readonly page = page
}
