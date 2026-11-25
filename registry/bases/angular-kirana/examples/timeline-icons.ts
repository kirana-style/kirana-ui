import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import type { IconNames } from "../../../icons/angular"
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

const EVENTS: {
  title: string
  description: string
  time: string
  label: string
  icon: IconNames
}[] = [
  {
    title: "Branch created",
    description: "release/1.2 from main.",
    time: "2026-11-10",
    label: "10 Nov",
    icon: {
      lucide: "GitBranchIcon",
      tabler: "IconGitBranch",
      hugeicons: "GitBranchIcon",
      phosphor: "GitBranchIcon",
      remixicon: "RiGitBranchLine",
    },
  },
  {
    title: "Changes pushed",
    description: "Twelve commits, with the new search.",
    time: "2026-11-12",
    label: "12 Nov",
    icon: {
      lucide: "GitCommitHorizontalIcon",
      tabler: "IconGitCommit",
      hugeicons: "GitCommitIcon",
      phosphor: "GitCommitIcon",
      remixicon: "RiGitCommitLine",
    },
  },
  {
    title: "Pull request merged",
    description: "Reviewed and approved by two people.",
    time: "2026-11-14",
    label: "14 Nov",
    icon: {
      lucide: "GitForkIcon",
      tabler: "IconGitFork",
      hugeicons: "GitForkIcon",
      phosphor: "GitForkIcon",
      remixicon: "RiGitForkLine",
    },
  },
  {
    title: "Tagged v1.2.0",
    description: "The release notes were published.",
    time: "2026-11-15",
    label: "15 Nov",
    icon: {
      lucide: "TagIcon",
      tabler: "IconTag",
      hugeicons: "Tag01Icon",
      phosphor: "TagIcon",
      remixicon: "RiPriceTag3Line",
    },
  },
  {
    title: "Deployed",
    description: "Live on every server.",
    time: "2026-11-16",
    label: "16 Nov",
    icon: {
      lucide: "ServerIcon",
      tabler: "IconServer",
      hugeicons: "ServerStackIcon",
      phosphor: "HardDrivesIcon",
      remixicon: "RiHardDriveLine",
    },
  },
]

@Component({
  selector: "timeline-icons",
  imports: [
    IconPlaceholder,
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
      <ol kuiTimeline aria-label="Release" [sx]="styles.timeline">
        @for (event of events; track event.title) {
          <li kuiTimelineItem>
            <span kuiTimelineMarker
              ><svg
                iconPlaceholder
                [lucide]="event.icon.lucide"
                [tabler]="event.icon.tabler"
                [hugeicons]="event.icon.hugeicons"
                [phosphor]="event.icon.phosphor"
                [remixicon]="event.icon.remixicon"
              ></svg
            ></span>
            <div kuiTimelineContent>
              <div kuiTimelineTitle>{{ event.title }}</div>
              <p kuiTimelineDescription>{{ event.description }}</p>
              <time kuiTimelineTime [attr.datetime]="event.time">{{
                event.label
              }}</time>
            </div>
          </li>
        }
      </ol>
    </div>
  `,
})
export default class TimelineIcons {
  protected readonly events = EVENTS
  protected readonly styles = styles
  protected readonly page = page
}
