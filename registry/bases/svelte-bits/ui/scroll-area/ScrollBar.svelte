<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ScrollArea } from "bits-ui"

  import { scrollArea } from "../../../../styles/scroll-area.styles"

  let {
    orientation = "vertical",
    class: className,
    ...rest
  }: {
    orientation?: "vertical" | "horizontal"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ScrollArea.Scrollbar data-slot="scroll-area-scrollbar" {orientation} {...rest} sx={[scrollArea.scrollbar, className as Sx]}>
  <ScrollArea.Thumb data-slot="scroll-area-thumb" sx={scrollArea.thumb} />
</ScrollArea.Scrollbar>
