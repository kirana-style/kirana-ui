<script lang="ts">
  import { Field, FieldLabel } from "../ui/field"
  import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
  import { page } from "../../../styles/page.styles"

  let view = $state("list")
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel id="segmented-control-demo-label">View</FieldLabel>
    <SegmentedControl aria-labelledby="segmented-control-demo-label" bind:value={view}>
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="board">Board</SegmentedControlItem>
      <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
    </SegmentedControl>
  </Field>
</div>
