import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "switch-description",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    Switch,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField orientation="horizontal" [sx]="styles.narrow">
        <div kuiFieldContent>
          <label kuiFieldLabel for="switch-focus-mode"
            >Share across devices</label
          >
          <p kuiFieldDescription>
            Focus is shared across devices, and turns off when you leave the
            app.
          </p>
        </div>
        <span kuiSwitch id="switch-focus-mode"></span>
      </div>
    </div>
  `,
})
export default class SwitchDescription {
  protected readonly styles = styles
  protected readonly page = page
}
