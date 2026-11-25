import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"

@Component({
  selector: "time-field-seconds",
  imports: [Field, FieldDescription, FieldLabel, SxDirective, TimeField],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="time-field-seconds-label">Lap time</label>
        <div
          kuiTimeField
          aria-labelledby="time-field-seconds-label"
          aria-describedby="time-field-seconds-description"
          [locale]="'en-US'"
          [hourCycle]="24"
          [granularity]="'second'"
          [defaultValue]="'00:04:37'"
        ></div>
        <p kuiFieldDescription id="time-field-seconds-description">
          Hours, minutes and seconds.
        </p>
      </div>
    </div>
  `,
})
export default class TimeFieldSeconds {
  protected readonly page = page
}
