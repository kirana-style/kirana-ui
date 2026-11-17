<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import {
    ScrollArea,
    ScrollAreaCorner,
    ScrollAreaViewport,
  } from "@ui-sdk/svelte/scroll-area"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { scrollArea } from "../../../../styles/scroll-area.styles"
  import ScrollBar from "./ScrollBar.svelte"

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

<UisdkPart part={ScrollArea} slotName="scroll-area" tag="div" {...rest} sx={[scrollArea.root, className as Sx]}>
  <UisdkPart part={ScrollAreaViewport} slotName="scroll-area-viewport" tag="div" sx={scrollArea.viewport}>
    {@render children?.()}
  </UisdkPart>
  <ScrollBar  />
  <ScrollAreaCorner  />
</UisdkPart>
