"use client"

import { css } from "@kirana-style/core"

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

export default function TimelineDemo() {
  return (
    <div sx={page.example}>
      <Timeline aria-label="Order history" sx={styles.timeline}>
        {EVENTS.map((event) => (
          <TimelineItem key={event.title}>
            <TimelineMarker variant={event.done ? "primary" : "muted"} />
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
