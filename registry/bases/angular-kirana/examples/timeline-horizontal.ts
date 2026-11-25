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

const PHASES = [
  {
    title: "Research",
    description: "Interviews with twenty users.",
    time: "2026-01",
    label: "January",
    variant: "primary",
  },
  {
    title: "Design",
    description: "Sketches, then a prototype.",
    time: "2026-03",
    label: "March",
    variant: "primary",
  },
  {
    title: "Build",
    description: "The first version, in beta.",
    time: "2026-06",
    label: "June",
    variant: "default",
  },
  {
    title: "Launch",
    description: "Open to everyone.",
    time: "2026-09",
    label: "September",
    variant: "muted",
  },
] as const

@Component({
  selector: "timeline-horizontal",
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
        orientation="horizontal"
        aria-label="Project plan"
        [sx]="styles.timeline"
      >
        @for (phase of phases; track phase.title) {
          <li kuiTimelineItem>
            <span kuiTimelineMarker [variant]="phase.variant"></span>
            <div kuiTimelineContent>
              <time kuiTimelineTime [attr.datetime]="phase.time">{{
                phase.label
              }}</time>
              <div kuiTimelineTitle>{{ phase.title }}</div>
              <p kuiTimelineDescription>{{ phase.description }}</p>
            </div>
          </li>
        }
      </ol>
    </div>
  `,
})
export default class TimelineHorizontal {
  protected readonly phases = PHASES
  protected readonly styles = styles
  protected readonly page = page
}
