<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TooltipTriggerProps } from "@ark-ui/svelte"

  import { TooltipTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: TooltipTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<TooltipTrigger {asChild} data-slot="tooltip-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</TooltipTrigger>
