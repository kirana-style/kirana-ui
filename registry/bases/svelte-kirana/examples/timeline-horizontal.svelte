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
    timeline: css({ maxWidth: containerSize["3xl"] }),
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
</script>

<div sx={page.example}>
  <Timeline orientation="horizontal" aria-label="Project plan" sx={styles.timeline}>
    {#each PHASES as phase (phase.title)}
      <TimelineItem>
        <TimelineMarker variant={phase.variant} />
        <TimelineContent>
          <TimelineTime datetime={phase.time}>{phase.label}</TimelineTime>
          <TimelineTitle>{phase.title}</TimelineTitle>
          <TimelineDescription>{phase.description}</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    {/each}
  </Timeline>
</div>
