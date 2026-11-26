/** Steps's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import StepsDemo from "./steps-demo"
import StepsIcons from "./steps-icons"
import StepsLinear from "./steps-linear"
import StepsVertical from "./steps-vertical"

@Component({
  selector: "steps-example",
  imports: [
    Example,
    ExampleWrapper,
    StepsDemo,
    StepsIcons,
    StepsLinear,
    StepsVertical,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <steps-demo />
      </div>
      <div kuiExample title="Icons" data-showcase>
        <steps-icons />
      </div>
      <div kuiExample title="Linear" data-showcase>
        <steps-linear />
      </div>
      <div kuiExample title="Vertical" data-showcase>
        <steps-vertical />
      </div>
    </div>
  `,
})
export default class StepsExample {}
