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
  timeline: css({ maxWidth: containerSize.xl }),
}

const EVENTS = [
  {
    year: "2021",
    title: "The idea",
    description: "A weekend project to share recipes between friends.",
  },
  {
    year: "2022",
    title: "First release",
    description: "Opened to everyone, with a thousand recipes.",
  },
  {
    year: "2024",
    title: "The app",
    description: "Recipes on the phone, with a shopping list.",
  },
  {
    year: "2026",
    title: "One million cooks",
    description: "In twelve languages, from forty countries.",
  },
]

@Component({
  selector: "timeline-alternate",
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
      <ol
        kuiTimeline
        align="alternate"
        aria-label="Our story"
        [sx]="styles.timeline"
      >
        @for (event of events; track event.year) {
          <li kuiTimelineItem>
            <span kuiTimelineMarker variant="primary"></span>
            <div kuiTimelineContent>
              <time kuiTimelineTime [attr.datetime]="event.year">{{
                event.year
              }}</time>
              <div kuiTimelineTitle>{{ event.title }}</div>
              <p kuiTimelineDescription>{{ event.description }}</p>
            </div>
          </li>
        }
      </ol>
    </div>
  `,
})
export default class TimelineAlternate {
  protected readonly events = EVENTS
  protected readonly styles = styles
  protected readonly page = page
}
