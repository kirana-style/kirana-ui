import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { TimeField } from "../ui/time-field"

@Component({
  selector: "time-field-demo",
  imports: [Field, FieldLabel, SxDirective, TimeField],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="time-field-demo-label"
          >Meeting starts at</label
        >
        <div
          kuiTimeField
          aria-labelledby="time-field-demo-label"
          [locale]="'en-US'"
          [value]="start()"
          (valueChange)="start.set($event ?? null)"
        ></div>
      </div>
    </div>
  `,
})
export default class TimeFieldDemo {
  protected readonly start = signal<string | null>("09:30")
  protected readonly page = page
}
