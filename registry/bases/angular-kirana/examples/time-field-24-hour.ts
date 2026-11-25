import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"

@Component({
  selector: "time-field-24-hour",
  imports: [Field, FieldLabel, SxDirective, TimeField],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="time-field-24-hour-label">Departure</label>
        <div
          kuiTimeField
          aria-labelledby="time-field-24-hour-label"
          [locale]="'en-US'"
          [hourCycle]="24"
          [defaultValue]="'17:45'"
        ></div>
      </div>
    </div>
  `,
})
export default class TimeField24Hour {
  protected readonly page = page
}
