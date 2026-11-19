<script lang="ts">
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

<li data-slot="sidebar-menu-item" data-sidebar="menu-item" {...rest} class={className} sx={sidebar.menuItem}>
  {@render children?.()}
</li>
