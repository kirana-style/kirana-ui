<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ProgressLabelProps } from "@ark-ui/svelte"

  import { ProgressLabel } from "@ark-ui/svelte"

  import { progress } from "../../../../styles/progress.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ProgressLabelProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ProgressLabel {asChild} data-slot="progress-label" {...rest} sx={[progress.label, className as Sx]}>
  {@render children?.()}
</ProgressLabel>
