<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import Element from "../../../../lib/svelte/Element.svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"

  let {
    asChild, showOnHover = false,
    class: className,
    children,
    ...rest
  }: {
  
    showOnHover?: boolean
    asChild?: Snippet<[PropsFn<"button">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Element as="button" data-slot="sidebar-menu-action" data-sidebar="menu-action" {...rest} sx={[sidebar.menuAction, showOnHover && sidebar.menuActionOnHover, className as Sx]} {asChild}>
  {@render children?.()}
</Element>
