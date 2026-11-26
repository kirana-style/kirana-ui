/** Timeline's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import TimelineDemo from "./timeline-demo"
import TimelineActivity from "./timeline-activity"
import TimelineAlternate from "./timeline-alternate"
import TimelineHorizontal from "./timeline-horizontal"
import TimelineIcons from "./timeline-icons"

export default function TimelineExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <TimelineDemo />
      </Example>
      <Example title="Activity" data-showcase>
        <TimelineActivity />
      </Example>
      <Example title="Alternate" data-showcase>
        <TimelineAlternate />
      </Example>
      <Example title="Horizontal" data-showcase>
        <TimelineHorizontal />
      </Example>
      <Example title="Icons" data-showcase>
        <TimelineIcons />
      </Example>
    </ExampleWrapper>
  )
}
