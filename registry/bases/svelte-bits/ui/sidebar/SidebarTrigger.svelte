<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
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

<Button data-sidebar="trigger" data-slot="sidebar-trigger" variant="ghost" size="icon-sm" onclick={ctx.toggleSidebar} {...rest} sx={className as Sx}>
  <IconPlaceholder lucide="PanelLeftIcon" tabler="IconLayoutSidebar" hugeicons="SidebarLeftIcon" phosphor="SidebarIcon" remixicon="RiSideBarLine" />
  <span sx={visuallyHidden}>
    Toggle Sidebar
  </span>
</Button>
