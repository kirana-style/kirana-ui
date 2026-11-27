/** Timeline's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import { example } from "../../../styles/example.styles"
import TimelineDemo from "./timeline-demo"
import TimelineActivity from "./timeline-activity"
import TimelineAlternate from "./timeline-alternate"
import TimelineHorizontal from "./timeline-horizontal"
import TimelineIcons from "./timeline-icons"

@Component({
  selector: "timeline-example",
  imports: [
    Example,
    ExampleWrapper,
    TimelineDemo,
    TimelineActivity,
    TimelineAlternate,
    TimelineHorizontal,
    TimelineIcons,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <timeline-demo />
      </div>
      <div kuiExample title="Activity" data-showcase>
        <timeline-activity />
      </div>
      <div kuiExample title="Alternate" data-showcase>
        <timeline-alternate />
      </div>
      <div
        kuiExample
        title="Horizontal"
        [containerSx]="example.fullRow"
        data-showcase
      >
        <timeline-horizontal />
      </div>
      <div kuiExample title="Icons" data-showcase>
        <timeline-icons />
      </div>
    </div>
  `,
})
export default class TimelineExample {
  protected readonly example = example
}
