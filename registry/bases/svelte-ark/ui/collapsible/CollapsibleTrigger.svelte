<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { CollapsibleTriggerProps } from "@ark-ui/svelte"

  import { CollapsibleTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: CollapsibleTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<CollapsibleTrigger {asChild} data-slot="collapsible-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</CollapsibleTrigger>
