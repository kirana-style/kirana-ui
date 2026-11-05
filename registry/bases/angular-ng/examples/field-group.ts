import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "../ui/field"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
}

@Component({
  selector: "field-group",
  imports: [
    Checkbox,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <fieldset kuiFieldSet>
          <label kuiFieldLabel>Responses</label>
          <p kuiFieldDescription>
            Get notified when ChatGPT responds to requests that take time, like
            research or image generation.
          </p>
          <div kuiFieldGroup data-slot="checkbox-group">
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="push" defaultChecked disabled></span>
              <label kuiFieldLabel for="push" [sx]="styles.normal"
                >Push notifications</label
              >
            </div>
          </div>
        </fieldset>
        <div kuiFieldSeparator></div>
        <fieldset kuiFieldSet>
          <label kuiFieldLabel>Tasks</label>
          <p kuiFieldDescription>
            Get notified when tasks you've created have updates.
            <a href="#">Manage tasks</a>
          </p>
          <div kuiFieldGroup data-slot="checkbox-group">
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="push-tasks"></span>
              <label kuiFieldLabel for="push-tasks" [sx]="styles.normal"
                >Push notifications</label
              >
            </div>
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="email-tasks"></span>
              <label kuiFieldLabel for="email-tasks" [sx]="styles.normal"
                >Email notifications</label
              >
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  `,
})
export default class FieldGroupExample {
  protected readonly styles = styles
  protected readonly page = page
}
