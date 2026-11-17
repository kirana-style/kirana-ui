<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PopoverTitle } from "@ui-sdk/svelte/popover"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { popover } from "../../../../styles/popover.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={PopoverTitle} slotName="popover-title" tag="h2" {...rest} sx={[popover.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
