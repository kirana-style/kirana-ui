<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { HoverCardTriggerProps } from "@ark-ui/svelte"

  import { HoverCardTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: HoverCardTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<HoverCardTrigger {asChild} data-slot="hover-card-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</HoverCardTrigger>
