"use client"

import { css } from "@kirana-style/core"

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
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function TimelineActivity() {
  return (
    <div sx={page.example}>
      <Timeline aria-label="Activity" sx={styles.timeline}>
        {ACTIVITY.map((event) => (
          <TimelineItem key={event.time}>
            <TimelineMarker>
              <Avatar>
                <AvatarImage src={event.avatar} alt={`@${event.name}`} />
                <AvatarFallback>{event.initials}</AvatarFallback>
              </Avatar>
            </TimelineMarker>
            <TimelineContent>
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime dateTime={event.time}>{event.label}</TimelineTime>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
