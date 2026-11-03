<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PopoverTriggerProps } from "@ark-ui/svelte"

  import { PopoverTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: PopoverTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<PopoverTrigger {asChild} data-slot="popover-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</PopoverTrigger>
