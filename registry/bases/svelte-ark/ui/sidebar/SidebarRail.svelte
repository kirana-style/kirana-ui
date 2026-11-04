<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<button data-sidebar="rail" data-slot="sidebar-rail" aria-label="Toggle Sidebar" tabindex="-1" title="Toggle Sidebar" {...rest} sx={[sidebar.rail, className as Sx]} onclick={ctx.toggleSidebar}></button>
