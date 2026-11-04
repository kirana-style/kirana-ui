import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "radio-group-choice-card",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiRadioGroup defaultValue="plus" [sx]="styles.narrow">
        <label kuiFieldLabel for="plus-plan">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Plus</div>
              <p kuiFieldDescription>For individuals and small teams.</p>
            </div>
            <span kuiRadioGroupItem value="plus" id="plus-plan"></span>
          </div>
        </label>
        <label kuiFieldLabel for="pro-plan">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Pro</div>
              <p kuiFieldDescription>For growing businesses.</p>
            </div>
            <span kuiRadioGroupItem value="pro" id="pro-plan"></span>
          </div>
        </label>
        <label kuiFieldLabel for="enterprise-plan">
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <div kuiFieldTitle>Enterprise</div>
              <p kuiFieldDescription>For large teams and enterprises.</p>
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
  `,
})
export default class RadioGroupChoiceCard {
  protected readonly styles = styles
  protected readonly page = page
}
