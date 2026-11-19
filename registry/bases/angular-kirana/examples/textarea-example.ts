import { Component } from "@angular/core"
import { Example, ExampleWrapper } from "../components/example"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

@Component({
  selector: "textarea-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldLabel,
    Textarea,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- TextareaBasic -->
      <div kuiExample title="Basic">
        <textarea kuiTextarea placeholder="Type your message here."></textarea>
      </div>
      <!-- TextareaInvalid -->
      <div kuiExample title="Invalid">
        <textarea
          kuiTextarea
          placeholder="Type your message here."
          aria-invalid="true"
        ></textarea>
      </div>
      <!-- TextareaWithLabel -->
      <div kuiExample title="With Label">
        <div kuiField>
          <label kuiFieldLabel for="textarea-demo-message">Message</label>
          <textarea
            kuiTextarea
            id="textarea-demo-message"
            placeholder="Type your message here."
            [attr.rows]="6"
          ></textarea>
        </div>
      </div>
      <!-- TextareaWithDescription -->
      <div kuiExample title="With Description">
        <div kuiField>
          <label kuiFieldLabel for="textarea-demo-message-2">Message</label>
          <textarea
            kuiTextarea
            id="textarea-demo-message-2"
            placeholder="Type your message here."
            [attr.rows]="6"
          ></textarea>
          <p kuiFieldDescription>Type your message and press enter to send.</p>
        </div>
      </div>
      <!-- TextareaDisabled -->
      <div kuiExample title="Disabled">
        <div kuiField>
          <label kuiFieldLabel for="textarea-demo-disabled">Message</label>
          <textarea
            kuiTextarea
            id="textarea-demo-disabled"
            placeholder="Type your message here."
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  `,
})
export default class TextareaExample {}
