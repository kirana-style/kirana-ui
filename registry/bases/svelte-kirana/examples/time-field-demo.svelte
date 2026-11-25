<script lang="ts">
  import { Field, FieldLabel } from "../ui/field"
  import { TimeField } from "../ui/time-field"
  import { page } from "../../../styles/page.styles"

  let start = $state<string | null>("09:30")
</script>

<div sx={page.example}>
  <Field sx={page.narrow}>
    <FieldLabel id="time-field-demo-label">Meeting starts at</FieldLabel>
    <TimeField aria-labelledby="time-field-demo-label" locale="en-US" bind:value={start} />
  </Field>
</div>
