<script lang="ts">
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
</script>

<div sx={page.example}>
  <Timeline align="alternate" aria-label="Our story" sx={styles.timeline}>
    {#each EVENTS as event (event.year)}
      <TimelineItem>
        <TimelineMarker variant="primary" />
        <TimelineContent>
          <TimelineTime datetime={event.year}>{event.year}</TimelineTime>
          <TimelineTitle>{event.title}</TimelineTitle>
          <TimelineDescription>{event.description}</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    {/each}
  </Timeline>
</div>
