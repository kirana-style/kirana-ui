<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ScrollArea } from "bits-ui"

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

<!-- `type="auto"`: a scrollbar while there is something to scroll that way, as Base UI's. -->
<ScrollArea.Root type="auto" data-slot="scroll-area" {...rest} sx={[scrollArea.root, className as Sx]}>
  <!-- Bits UI's global, unlayered `:where([data-scroll-area-viewport])` lays the viewport out as a
       flex column, which beats any layered style: Base UI's is a block, its content as tall as it
       is, so the area overflows and scrolls. -->
  <ScrollArea.Viewport
    data-slot="scroll-area-viewport"
    style="display: block; flex-direction: row; align-items: normal"
    sx={scrollArea.viewport}
  >
    {@render children?.()}
  </ScrollArea.Viewport>
  <ScrollBar />
  <ScrollArea.Corner />
</ScrollArea.Root>
