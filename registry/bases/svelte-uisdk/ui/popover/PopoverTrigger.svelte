<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PopoverTrigger } from "@ui-sdk/svelte/popover"

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

<UisdkPart part={PopoverTrigger} slotName="popover-trigger" tag="button" asChild={asChild} {...rest}>
  {@render children?.()}
</UisdkPart>
