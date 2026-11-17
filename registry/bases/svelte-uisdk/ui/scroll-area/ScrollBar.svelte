<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ScrollAreaScrollbar, ScrollAreaThumb } from "@ui-sdk/svelte/scroll-area"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { scrollArea } from "../../../../styles/scroll-area.styles"

  let {
    orientation = "vertical",
    class: className,
    children,
    ...rest
  }: {
    orientation?: "vertical" | "horizontal"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={ScrollAreaScrollbar} slotName="scroll-area-scrollbar" tag="div" orientation={orientation} data-orientation={orientation} {...rest} sx={[scrollArea.scrollbar, className as Sx]}>
  <UisdkPart part={ScrollAreaThumb} slotName="scroll-area-thumb" tag="div" sx={scrollArea.thumb} />
</UisdkPart>
