import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Badge } from "../ui/badge"
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  mlAuto: css({ marginLeft: "auto" }),
}

@Component({
  selector: "input-badge",
  imports: [Badge, Field, FieldLabel, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField>
        <label kuiFieldLabel for="input-badge">
          Webhook URL
          <span kuiBadge variant="secondary" [sx]="styles.mlAuto">Beta</span>
        </label>
        <input
          kuiInput
          id="input-badge"
          type="url"
          placeholder="https://api.example.com/webhook"
        />
      </div>
    </div>
  `,
})
export default class InputBadge {
  protected readonly styles = styles
  protected readonly page = page
}
