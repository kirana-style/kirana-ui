/** Time Field's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import TimeFieldDemo from "./time-field-demo"
import TimeField24Hour from "./time-field-24-hour"
import TimeFieldDisabled from "./time-field-disabled"
import TimeFieldForm from "./time-field-form"
import TimeFieldSeconds from "./time-field-seconds"

@Component({
  selector: "time-field-example",
  imports: [
    Example,
    ExampleWrapper,
    TimeFieldDemo,
    TimeField24Hour,
    TimeFieldDisabled,
    TimeFieldForm,
    TimeFieldSeconds,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <time-field-demo />
      </div>
      <div kuiExample title="24 Hour" data-showcase>
        <time-field-24-hour />
      </div>
      <div kuiExample title="Disabled" data-showcase>
        <time-field-disabled />
      </div>
      <div kuiExample title="Form" data-showcase>
        <time-field-form />
      </div>
      <div kuiExample title="Seconds" data-showcase>
        <time-field-seconds />
      </div>
    </div>
  `,
})
export default class TimeFieldExample {}
