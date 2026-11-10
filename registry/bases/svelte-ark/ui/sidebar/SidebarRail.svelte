<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { useSidebar } from "./context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const ctx = useSidebar()
</script>

<button data-sidebar="rail" data-slot="sidebar-rail" aria-label="Toggle Sidebar" tabindex="-1" title="Toggle Sidebar" {...rest} class={className} sx={sidebar.rail} onclick={ctx.toggleSidebar}></button>
