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

<ul data-slot="sidebar-menu" data-sidebar="menu" {...rest} class={className} sx={sidebar.menu}>
  {@render children?.()}
</ul>
