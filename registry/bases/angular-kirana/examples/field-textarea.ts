import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field"
import { Textarea } from "../ui/textarea"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

@Component({
  selector: "field-textarea",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    Textarea,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <fieldset kuiFieldSet [sx]="styles.narrow">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="feedback">Feedback</label>
            <textarea
              kuiTextarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              [attr.rows]="4"
            ></textarea>
            <p kuiFieldDescription>Share your thoughts about our service.</p>
          </div>
        </div>
      </fieldset>
    </div>
  `,
})
export default class FieldTextarea {
  protected readonly styles = styles
  protected readonly page = page
}
