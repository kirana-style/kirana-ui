<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import Element from "../../../../lib/svelte/Element.svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
  
    asChild?: Snippet<[PropsFn<"div">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Element as="div" data-slot="sidebar-group-label" data-sidebar="group-label" {...rest} sx={[sidebar.groupLabel, className as Sx]} {asChild}>
  {@render children?.()}
</Element>
