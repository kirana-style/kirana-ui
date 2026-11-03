<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ProgressTrackProps } from "@ark-ui/svelte"

  import { ProgressTrack } from "@ark-ui/svelte"

  import { progress } from "../../../../styles/progress.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ProgressTrackProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ProgressTrack {asChild} data-slot="progress-track" {...rest} sx={[progress.track, className as Sx]}>
  {@render children?.()}
</ProgressTrack>
