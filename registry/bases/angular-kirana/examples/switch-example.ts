import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

const styles = {
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  column: css({ display: "flex", flexDirection: "column", gap: space[12] }),
}

@Component({
  selector: "switch-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    Label,
    Switch,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- SwitchBasic -->
      <div kuiExample title="Basic">
        <div kuiField orientation="horizontal">
          <span kuiSwitch id="switch-basic"></span>
          <label kuiFieldLabel for="switch-basic">Airplane Mode</label>
        </div>
      </div>
      <!-- SwitchWithDescription -->
      <div kuiExample title="With Description">
        <label kuiFieldLabel for="switch-focus-mode">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Share across devices</div>
              <p kuiFieldDescription>
                Focus is shared across devices, and turns off when you leave the
                app.
              </p>
            </div>
            <span kuiSwitch id="switch-focus-mode"></span>
          </div>
        </label>
      </div>
      <!-- SwitchWithLabel -->
      <div kuiExample title="With Label">
        <div [sx]="styles.pair">
          <span kuiSwitch id="switch-bluetooth" defaultChecked></span>
          <label kuiLabel for="switch-bluetooth">Bluetooth</label>
        </div>
      </div>
      <!-- SwitchDisabled -->
      <div kuiExample title="Disabled">
        <div [sx]="styles.column">
          <div [sx]="styles.pair">
            <span kuiSwitch id="switch-disabled-unchecked" disabled></span>
            <label kuiLabel for="switch-disabled-unchecked"
              >Disabled (Unchecked)</label
            >
          </div>
          <div [sx]="styles.pair">
            <span
              kuiSwitch
              id="switch-disabled-checked"
              defaultChecked
              disabled
            ></span>
            <label kuiLabel for="switch-disabled-checked"
              >Disabled (Checked)</label
            >
          </div>
        </div>
      </div>
      <!-- SwitchSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.column">
          <div [sx]="styles.pair">
            <span kuiSwitch id="switch-size-sm" size="sm"></span>
            <label kuiLabel for="switch-size-sm">Small</label>
          </div>
          <div [sx]="styles.pair">
            <span kuiSwitch id="switch-size-default" size="default"></span>
            <label kuiLabel for="switch-size-default">Default</label>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SwitchExample {
  protected readonly styles = styles
}
