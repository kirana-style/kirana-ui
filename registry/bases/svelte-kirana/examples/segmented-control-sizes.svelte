<script lang="ts">
  import { css } from "@kirana-style/core"

  import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    column: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: space[4],
    }),
  }
</script>

<div sx={page.example}>
  <div sx={styles.column}>
    <SegmentedControl size="sm" aria-label="Small" defaultValue="week">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
    <SegmentedControl aria-label="Default" defaultValue="week">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
    <SegmentedControl size="lg" aria-label="Large" defaultValue="week">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  </div>
</div>
