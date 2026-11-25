<svelte:options namespace="svg" />

<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { progressCircleParts } from "../../../../styles/progress-circle.styles"

  /** The whole range: a ring in the progress track's colour. */
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<circle data-slot="progress-circle-track" pathLength="100" {...rest} sx={[progressCircleParts.track, className as Sx]} />
