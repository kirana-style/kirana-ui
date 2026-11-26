/** Progress Circle's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import ProgressCircleDemo from "./progress-circle-demo"
import ProgressCircleAnimated from "./progress-circle-animated"
import ProgressCircleIndeterminate from "./progress-circle-indeterminate"
import ProgressCircleSizes from "./progress-circle-sizes"

@Component({
  selector: "progress-circle-example",
  imports: [
    Example,
    ExampleWrapper,
    ProgressCircleDemo,
    ProgressCircleAnimated,
    ProgressCircleIndeterminate,
    ProgressCircleSizes,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <progress-circle-demo />
      </div>
      <div kuiExample title="Animated" data-showcase>
        <progress-circle-animated />
      </div>
      <div kuiExample title="Indeterminate" data-showcase>
        <progress-circle-indeterminate />
      </div>
      <div kuiExample title="Sizes" data-showcase>
        <progress-circle-sizes />
      </div>
    </div>
  `,
})
export default class ProgressCircleExample {}
