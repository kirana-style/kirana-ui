import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "../ui/timeline"

const styles = {
  timeline: css({ maxWidth: containerSize.sm }),
}

const EVENTS = [
  {
    title: "Order placed",
    description: "Your order #4821 was confirmed.",
    time: "2026-11-18T09:12",
    label: "18 Nov, 09:12",
    done: true,
  },
  {
    title: "Packed",
    description: "Two items were packed at the warehouse.",
    time: "2026-11-18T16:40",
    label: "18 Nov, 16:40",
    done: true,
  },
  {
    title: "Shipped",
    description: "Handed to the courier. The tracking number is in your email.",
    time: "2026-11-19T08:05",
    label: "19 Nov, 08:05",
    done: true,
  },
  {
    title: "Delivered",
    description: "Expected on Thursday.",
    time: "2026-11-21",
    label: "21 Nov",
    done: false,
  },
]

@Component({
  selector: "timeline-demo",
  imports: [
    Timeline,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineMarker,
    TimelineTime,
    TimelineTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ol kuiTimeline aria-label="Order history" [sx]="styles.timeline">
        @for (event of events; track event.title) {
          <li kuiTimelineItem>
            <span
              kuiTimelineMarker
              [variant]="event.done ? 'primary' : 'muted'"
            ></span>
            <div kuiTimelineContent>
              <div kuiTimelineTitle>{{ event.title }}</div>
              <time kuiTimelineTime [attr.datetime]="event.time">{{
                event.label
              }}</time>
              <p kuiTimelineDescription>{{ event.description }}</p>
            </div>
          </li>
        }
      </ol>
    </div>
  `,
})
export default class TimelineDemo {
  protected readonly events = EVENTS
  protected readonly styles = styles
  protected readonly page = page
}
