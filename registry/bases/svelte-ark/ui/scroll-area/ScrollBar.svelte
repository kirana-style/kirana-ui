<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { ScrollAreaScrollbarProps } from "@ark-ui/svelte"

  import {
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    useScrollAreaContext,
  } from "@ark-ui/svelte"

  import { scrollArea } from "../../../../styles/scroll-area.styles"

  let {
    orientation = "vertical", asChild,
    class: className,
    ...rest
  }: {
    orientation?: "vertical" | "horizontal"
    asChild?: ScrollAreaScrollbarProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const context = useScrollAreaContext()
</script>

<!-- Only while there is something to scroll that way, as Base UI's scrollbar. -->
{#if
      orientation === 'vertical' ? context().hasOverflowY : context().hasOverflowX
    }
  <ScrollAreaScrollbar {asChild} data-slot="scroll-area-scrollbar" orientation={orientation} {...rest} sx={[scrollArea.scrollbar, className as Sx]}>
    <ScrollAreaThumb data-slot="scroll-area-thumb" sx={scrollArea.thumb} />
  </ScrollAreaScrollbar>
{/if}
