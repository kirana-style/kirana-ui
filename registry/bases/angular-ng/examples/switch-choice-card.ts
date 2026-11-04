import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}

@Component({
  selector: "switch-choice-card",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
    Switch,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrowSm">
        <label kuiFieldLabel for="switch-share">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Share across devices</div>
              <p kuiFieldDescription>
                Focus is shared across devices, and turns off when you leave the
                app.
              </p>
            </div>
            <span kuiSwitch id="switch-share"></span>
          </div>
        </label>
        <label kuiFieldLabel for="switch-notifications">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Enable notifications</div>
              <p kuiFieldDescription>
                Receive notifications when focus mode is enabled or disabled.
              </p>
            </div>
            <span kuiSwitch id="switch-notifications" defaultChecked></span>
          </div>
        </label>
      </div>
    </div>
  `,
})
export default class SwitchChoiceCard {
  protected readonly styles = styles
  protected readonly page = page
}
