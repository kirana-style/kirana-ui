<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { HoverCardTrigger } from "@ui-sdk/svelte/hover-card"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
   asChild?: AsChild 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={HoverCardTrigger} slotName="hover-card-trigger" tag="a" asChild={asChild} {...rest}>
  {@render children?.()}
</UisdkPart>
