<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import Element from "../../../../lib/svelte/Element.svelte"
  import type { AsChild } from "../../../../lib/svelte/as-child"
  import { popover } from "../../../../styles/popover.styles"

  // Bits UI's popover has no title part: the heading Base UI's title renders.
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"h2">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Element as="h2" {asChild} data-slot="popover-title" {...rest} sx={[popover.title, className as Sx]}>
  {@render children?.()}
</Element>
