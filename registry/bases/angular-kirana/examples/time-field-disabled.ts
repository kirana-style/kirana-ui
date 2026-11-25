import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"

@Component({
  selector: "time-field-disabled",
  imports: [Field, FieldLabel, SxDirective, TimeField],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow" data-disabled="true">
        <label kuiFieldLabel id="time-field-disabled-label"
          >Check-in from</label
        >
        <div
          kuiTimeField
          aria-labelledby="time-field-disabled-label"
          [locale]="'en-US'"
          [defaultValue]="'15:00'"
          [disabled]="true"
        ></div>
      </div>
    </div>
  `,
})
export default class TimeFieldDisabled {
  protected readonly page = page
}
