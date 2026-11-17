<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuTrigger } from "@ui-sdk/svelte/menu"

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

<UisdkPart part={MenuTrigger} slotName="dropdown-menu-trigger" tag="button" asChild={asChild} {...rest}>
  {@render children?.()}
</UisdkPart>
