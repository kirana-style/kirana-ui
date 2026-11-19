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

<div data-slot="sidebar-header" data-sidebar="header" {...rest} class={className} sx={sidebar.header}>
  {@render children?.()}
</div>
