<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TooltipTrigger } from "@ui-sdk/svelte/tooltip"

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

<UisdkPart part={TooltipTrigger} slotName="tooltip-trigger" tag="button" asChild={asChild} type="button" {...rest}>
  {@render children?.()}
</UisdkPart>
