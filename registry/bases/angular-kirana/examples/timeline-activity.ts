import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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
  timeline: css({ maxWidth: containerSize.md }),
}

const ACTIVITY = [
  {
    name: "shadcn",
    avatar: "https://github.com/shadcn.png",
    initials: "CN",
    title: "shadcn opened the issue",
    description:
      "The date picker closes when a month is chosen from the dropdown, before a day can be picked. It happens on every browser we tried.",
    time: "2026-11-24T09:30",
    label: "Yesterday at 09:30",
  },
  {
    name: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    initials: "ML",
    title: "maxleiter commented",
    description:
      "I can see it too. The popover takes the dropdown's press for a press outside it. I will look at it this afternoon.",
    time: "2026-11-24T11:02",
    label: "Yesterday at 11:02",
  },
  {
    name: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    initials: "ER",
    title: "evilrabbit closed the issue",
    description:
      "Fixed in the latest release: the dropdown now opens inside the popover, which stays open until a day is picked.",
    time: "2026-11-25T08:15",
    label: "Today at 08:15",
  },
]

@Component({
  selector: "timeline-activity",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
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
      <ol kuiTimeline aria-label="Activity" [sx]="styles.timeline">
        @for (event of activity; track event.time) {
          <li kuiTimelineItem>
            <span kuiTimelineMarker>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [src]="event.avatar"
                  [alt]="'@' + event.name"
                />
                <span kuiAvatarFallback>{{ event.initials }}</span>
              </span>
            </span>
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
export default class TimelineActivity {
  protected readonly activity = ACTIVITY
  protected readonly styles = styles
  protected readonly page = page
}
