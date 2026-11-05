import { Component } from "@angular/core"
import { Example, ExampleWrapper } from "../components/example"
import { Checkbox } from "../ui/checkbox"
import { Field } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "label-example",
  imports: [Checkbox, Example, ExampleWrapper, Field, Input, Label, Textarea],
  template: `
    <div kuiExampleWrapper>
      <!-- LabelWithCheckbox -->
      <div kuiExample title="With Checkbox">
        <div kuiField orientation="horizontal">
          <span kuiCheckbox id="label-demo-terms"></span>
          <label kuiLabel for="label-demo-terms"
            >Accept terms and conditions</label
          >
        </div>
      </div>
      <!-- LabelWithInput -->
      <div kuiExample title="With Input">
        <div kuiField>
          <label kuiLabel for="label-demo-username">Username</label>
          <input kuiInput id="label-demo-username" placeholder="Username" />
        </div>
      </div>
      <!-- LabelDisabled -->
      <div kuiExample title="Disabled">
        <div kuiField [attr.data-disabled]="true">
          <label kuiLabel for="label-demo-disabled">Disabled</label>
          <input
            kuiInput
            id="label-demo-disabled"
            placeholder="Disabled"
            disabled
          />
        </div>
      </div>
      <!-- LabelWithTextarea -->
      <div kuiExample title="With Textarea">
        <div kuiField>
          <label kuiLabel for="label-demo-message">Message</label>
          <textarea
            kuiTextarea
            id="label-demo-message"
            placeholder="Message"
          ></textarea>
        </div>
      </div>
    </div>
  `,
})
export default class LabelExample {}
