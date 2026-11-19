<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ScrollArea } from "@kirana-ui/svelte/scroll-area"

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

<ScrollArea.Root data-slot="scroll-area" {...rest} sx={[scrollArea.root, className as Sx]}>
  <ScrollArea.Viewport data-slot="scroll-area-viewport" sx={scrollArea.viewport}>
    {@render children?.()}
  </ScrollArea.Viewport>
  <ScrollBar />
  <ScrollArea.Corner />
</ScrollArea.Root>
