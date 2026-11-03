<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ProgressRangeProps } from "@ark-ui/svelte"

  import { ProgressRange } from "@ark-ui/svelte"

  import { progress } from "../../../../styles/progress.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ProgressRangeProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ProgressRange {asChild} data-slot="progress-indicator" {...rest} sx={[progress.indicator, className as Sx]}>
  {@render children?.()}
</ProgressRange>
