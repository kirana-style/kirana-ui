import { For } from "solid-js"
import { css } from "@kirana-style/core"
import type { JSX } from "@solidjs/web"

import { IconPlaceholder } from "../ui/icon-placeholder"
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "../ui/timeline"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  timeline: css({ maxWidth: containerSize.sm }),
}

/** Each event's icon is drawn by a function, inside the page, so it reads the page's icon library. */
const EVENTS: {
  title: string
  description: string
  time: string
  label: string
  icon: () => JSX.Element
}[] = [
  {
    title: "Branch created",
    description: "release/1.2 from main.",
    time: "2026-11-10",
    label: "10 Nov",
    icon: () => (
      <IconPlaceholder
        lucide="GitBranchIcon"
        tabler="IconGitBranch"
        hugeicons="GitBranchIcon"
        phosphor="GitBranchIcon"
        remixicon="RiGitBranchLine"
      />
    ),
  },
  {
    title: "Changes pushed",
    description: "Twelve commits, with the new search.",
    time: "2026-11-12",
    label: "12 Nov",
    icon: () => (
      <IconPlaceholder
        lucide="GitCommitHorizontalIcon"
        tabler="IconGitCommit"
        hugeicons="GitCommitIcon"
        phosphor="GitCommitIcon"
        remixicon="RiGitCommitLine"
      />
    ),
  },
  {
    title: "Pull request merged",
    description: "Reviewed and approved by two people.",
    time: "2026-11-14",
    label: "14 Nov",
    icon: () => (
      <IconPlaceholder
        lucide="GitForkIcon"
        tabler="IconGitFork"
        hugeicons="GitForkIcon"
        phosphor="GitForkIcon"
        remixicon="RiGitForkLine"
      />
    ),
  },
  {
    title: "Tagged v1.2.0",
    description: "The release notes were published.",
    time: "2026-11-15",
    label: "15 Nov",
    icon: () => (
      <IconPlaceholder
        lucide="TagIcon"
        tabler="IconTag"
        hugeicons="Tag01Icon"
        phosphor="TagIcon"
        remixicon="RiPriceTag3Line"
      />
    ),
  },
  {
    title: "Deployed",
    description: "Live on every server.",
    time: "2026-11-16",
    label: "16 Nov",
    icon: () => (
      <IconPlaceholder
        lucide="ServerIcon"
        tabler="IconServer"
        hugeicons="ServerStackIcon"
        phosphor="HardDrivesIcon"
        remixicon="RiHardDriveLine"
      />
    ),
  },
]

export default function TimelineIcons() {
  return (
    <div sx={page.example}>
      <Timeline aria-label="Release" sx={styles.timeline}>
        <For each={EVENTS}>
          {(event) => (
            <TimelineItem>
              <TimelineMarker>{event.icon()}</TimelineMarker>
              <TimelineContent>
                <TimelineTitle>{event.title}</TimelineTitle>
                <TimelineDescription>{event.description}</TimelineDescription>
                <TimelineTime datetime={event.time}>{event.label}</TimelineTime>
              </TimelineContent>
            </TimelineItem>
          )}
        </For>
      </Timeline>
    </div>
  )
}
