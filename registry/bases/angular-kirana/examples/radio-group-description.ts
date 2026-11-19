import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "radio-group-description",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiRadioGroup defaultValue="comfortable" [sx]="styles.fit">
        <div kuiField orientation="horizontal">
          <span kuiRadioGroupItem value="default" id="desc-r1"></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="desc-r1">Default</label>
            <p kuiFieldDescription>Standard spacing for most use cases.</p>
          </div>
        </div>
        <div kuiField orientation="horizontal">
          <span kuiRadioGroupItem value="comfortable" id="desc-r2"></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="desc-r2">Comfortable</label>
            <p kuiFieldDescription>More space between elements.</p>
          </div>
        </div>
        <div kuiField orientation="horizontal">
          <span kuiRadioGroupItem value="compact" id="desc-r3"></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="desc-r3">Compact</label>
            <p kuiFieldDescription>Minimal spacing for dense layouts.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class RadioGroupDescription {
  protected readonly styles = styles
  protected readonly page = page
}
