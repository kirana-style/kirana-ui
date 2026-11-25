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
    <SegmentedControl aria-label="Plan" defaultValue="monthly">
      <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
      <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
      <SegmentedControlItem value="lifetime" disabled>Lifetime</SegmentedControlItem>
    </SegmentedControl>
    <SegmentedControl aria-label="Status" defaultValue="open" disabled>
      <SegmentedControlItem value="open">Open</SegmentedControlItem>
      <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
      <SegmentedControlItem value="all">All</SegmentedControlItem>
    </SegmentedControl>
  </div>
</div>
