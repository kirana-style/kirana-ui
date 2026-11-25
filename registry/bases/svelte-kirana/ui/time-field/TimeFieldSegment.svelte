<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { TimeFieldSegment } from "@kirana-ui/svelte"
  import { TimeField } from "@kirana-ui/svelte/time-field"

  import { timeField } from "../../../../styles/time-field.styles"

  let {
    segment,
    class: className,
    ...rest
  }: {
    segment: TimeFieldSegment
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<TimeField.Segment data-slot="time-field-segment" {segment} {...rest} sx={[timeField.segment, className as Sx]} />
