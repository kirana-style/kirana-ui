import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
  medium: css({ fontWeight: fontWeight.medium }),
  grid: css({
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "radio-group-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- RadioGroupBasic -->
      <div kuiExample title="Basic">
        <div kuiRadioGroup defaultValue="comfortable">
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="default" id="r1"></span>
            <label kuiFieldLabel for="r1" [sx]="styles.normal">Default</label>
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="comfortable" id="r2"></span>
            <label kuiFieldLabel for="r2" [sx]="styles.normal"
              >Comfortable</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="compact" id="r3"></span>
            <label kuiFieldLabel for="r3" [sx]="styles.normal">Compact</label>
          </div>
        </div>
      </div>
      <!-- RadioGroupWithDescriptions -->
      <div kuiExample title="With Descriptions">
        <div kuiRadioGroup defaultValue="plus">
          <label kuiFieldLabel for="plus-plan">
            <div kuiField orientation="horizontal">
              <div kuiFieldContent>
                <div [sx]="styles.medium">Plus</div>
                <p kuiFieldDescription>For individuals and small teams</p>
              </div>
              <span kuiRadioGroupItem value="plus" id="plus-plan"></span>
            </div>
          </label>
          <label kuiFieldLabel for="pro-plan">
            <div kuiField orientation="horizontal">
              <div kuiFieldContent>
                <div [sx]="styles.medium">Pro</div>
                <p kuiFieldDescription>For growing businesses</p>
              </div>
              <span kuiRadioGroupItem value="pro" id="pro-plan"></span>
            </div>
          </label>
          <label kuiFieldLabel for="enterprise-plan">
            <div kuiField orientation="horizontal">
              <div kuiFieldContent>
                <div [sx]="styles.medium">Enterprise</div>
                <p kuiFieldDescription>For large teams and enterprises</p>
              </div>
              <span
                kuiRadioGroupItem
                value="enterprise"
                id="enterprise-plan"
              ></span>
            </div>
          </label>
        </div>
      </div>
      <!-- RadioGroupWithFieldSet -->
      <div kuiExample title="With FieldSet">
        <fieldset kuiFieldSet>
          <legend kuiFieldLegend>Battery Level</legend>
          <p kuiFieldDescription>Choose your preferred battery level.</p>
          <div kuiRadioGroup defaultValue="medium">
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="high" id="battery-high"></span>
              <label kuiFieldLabel for="battery-high" [sx]="styles.normal"
                >High</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="medium" id="battery-medium"></span>
              <label kuiFieldLabel for="battery-medium" [sx]="styles.normal"
                >Medium</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="low" id="battery-low"></span>
              <label kuiFieldLabel for="battery-low" [sx]="styles.normal"
                >Low</label
              >
            </div>
          </div>
        </fieldset>
      </div>
      <!-- RadioGroupGrid -->
      <div kuiExample title="Grid Layout">
        <div kuiRadioGroup defaultValue="medium" [sx]="styles.grid">
          <label kuiFieldLabel for="size-small">
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="small" id="size-small"></span>
              <div [sx]="styles.medium">Small</div>
            </div>
          </label>
          <label kuiFieldLabel for="size-medium">
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="medium" id="size-medium"></span>
              <div [sx]="styles.medium">Medium</div>
            </div>
          </label>
          <label kuiFieldLabel for="size-large">
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="large" id="size-large"></span>
              <div [sx]="styles.medium">Large</div>
            </div>
          </label>
          <label kuiFieldLabel for="size-xlarge">
            <div kuiField orientation="horizontal">
              <span kuiRadioGroupItem value="xlarge" id="size-xlarge"></span>
              <div [sx]="styles.medium">X-Large</div>
            </div>
          </label>
        </div>
      </div>
      <!-- RadioGroupDisabled -->
      <div kuiExample title="Disabled">
        <div kuiRadioGroup defaultValue="option2" disabled>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="option1" id="disabled-1"></span>
            <label kuiFieldLabel for="disabled-1" [sx]="styles.normal"
              >Option 1</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="option2" id="disabled-2"></span>
            <label kuiFieldLabel for="disabled-2" [sx]="styles.normal"
              >Option 2</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiRadioGroupItem value="option3" id="disabled-3"></span>
            <label kuiFieldLabel for="disabled-3" [sx]="styles.normal"
              >Option 3</label
            >
          </div>
        </div>
      </div>
      <!-- RadioGroupInvalid -->
      <div kuiExample title="Invalid">
        <fieldset kuiFieldSet>
          <legend kuiFieldLegend>Notification Preferences</legend>
          <p kuiFieldDescription>
            Choose how you want to receive notifications.
          </p>
          <div kuiRadioGroup defaultValue="email">
            <div kuiField orientation="horizontal" data-invalid="true">
              <span
                kuiRadioGroupItem
                value="email"
                id="invalid-email"
                aria-invalid="true"
              ></span>
              <label kuiFieldLabel for="invalid-email" [sx]="styles.normal"
                >Email only</label
              >
            </div>
            <div kuiField orientation="horizontal" data-invalid="true">
              <span
                kuiRadioGroupItem
                value="sms"
                id="invalid-sms"
                aria-invalid="true"
              ></span>
              <label kuiFieldLabel for="invalid-sms" [sx]="styles.normal"
                >SMS only</label
              >
            </div>
            <div kuiField orientation="horizontal" data-invalid="true">
              <span
                kuiRadioGroupItem
                value="both"
                id="invalid-both"
                aria-invalid="true"
              ></span>
              <label kuiFieldLabel for="invalid-both" [sx]="styles.normal"
                >Both Email & SMS</label
              >
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  `,
})
export default class RadioGroupExample {
  protected readonly styles = styles
}
