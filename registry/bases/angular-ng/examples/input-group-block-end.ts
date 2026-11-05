import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  hAuto: css({ height: { "*": null, base: "auto" } }),
  mlAuto: css({ marginLeft: "auto" }),
}

@Component({
  selector: "input-group-block-end",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <div kuiField>
          <label kuiFieldLabel for="block-end-input">Input</label>
          <div kuiInputGroup [sx]="styles.hAuto">
            <input
              kuiInputGroupInput
              id="block-end-input"
              placeholder="Enter amount"
            />
            <div kuiInputGroupAddon align="block-end">
              <span kuiInputGroupText>USD</span>
            </div>
          </div>
          <p kuiFieldDescription>Footer positioned below the input.</p>
        </div>
        <div kuiField>
          <label kuiFieldLabel for="block-end-textarea">Textarea</label>
          <div kuiInputGroup>
            <textarea
              kuiInputGroupTextarea
              id="block-end-textarea"
              placeholder="Write a comment..."
            ></textarea>
            <div kuiInputGroupAddon align="block-end">
              <span kuiInputGroupText>0/280</span>
              <button
                kuiInputGroupButton
                variant="default"
                size="sm"
                [sx]="styles.mlAuto"
              >
                Post
              </button>
            </div>
          </div>
          <p kuiFieldDescription>Footer positioned below the textarea.</p>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupBlockEnd {
  protected readonly styles = styles
  protected readonly page = page
}
