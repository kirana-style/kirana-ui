<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PopoverTitle } from "@ui-sdk/svelte/popover"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { popover } from "../../../../styles/popover.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"h2">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={PopoverTitle} slotName="popover-title" tag="h2" {asChild} {...rest} sx={[popover.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
