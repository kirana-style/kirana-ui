<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ScrollAreaRootProps } from "@ark-ui/svelte"

  import {
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaRoot,
    ScrollAreaViewport,
  } from "@ark-ui/svelte"

  import { scrollArea } from "../../../../styles/scroll-area.styles"
  import ScrollBar from "./ScrollBar.svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ScrollAreaRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ScrollAreaRoot {asChild} data-slot="scroll-area" {...rest} sx={[scrollArea.root, className as Sx]}>
  <ScrollAreaViewport data-slot="scroll-area-viewport" sx={scrollArea.viewport}>
    <ScrollAreaContent>
      {@render children?.()}
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollBar />
  <ScrollAreaCorner />
</ScrollAreaRoot>
