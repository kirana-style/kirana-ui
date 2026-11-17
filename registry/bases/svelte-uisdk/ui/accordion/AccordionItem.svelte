<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AccordionItem } from "@ui-sdk/svelte/accordion"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { accordion } from "../../../../styles/accordion.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value: string 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={AccordionItem} slotName="accordion-item" tag="div" value={value} {...rest} sx={[accordion.item, className as Sx]}>
  {@render children?.()}
</UisdkPart>
