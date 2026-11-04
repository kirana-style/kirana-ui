<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"

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

<li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" {...rest} sx={[sidebar.menuSubItem, className as Sx]}>
  {@render children?.()}
</li>
