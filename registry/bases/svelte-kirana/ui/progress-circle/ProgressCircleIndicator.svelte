<svelte:options namespace="svg" />

<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { progressCircleParts } from "../../../../styles/progress-circle.styles"

  /** The filled part: an arc as long as the value's share of the range. */
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<circle data-slot="progress-circle-indicator" pathLength="100" {...rest} sx={[progressCircleParts.indicator, className as Sx]} />
