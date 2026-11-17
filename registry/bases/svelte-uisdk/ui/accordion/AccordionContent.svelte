<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AccordionPanel } from "@ui-sdk/svelte/accordion"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { accordion } from "../../../../styles/accordion.styles"

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

<UisdkPart part={AccordionPanel} slotName="accordion-content" tag="div" {...rest} sx={[accordion.content, accordion.contentBase]}>
  <div sx={[accordion.contentInner, accordion.contentInnerBase, className as Sx]}>
    {@render children?.()}
  </div>
</UisdkPart>
