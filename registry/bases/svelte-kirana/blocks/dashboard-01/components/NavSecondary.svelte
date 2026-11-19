<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Dashboard01Icon from "./Dashboard01Icon.svelte"
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../../../ui/sidebar"

  let {
    items,
    class: className,
    ...rest
  }: {
    items: {
    title: string
    url: string
    icon: {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
    }
    }[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<SidebarGroup {...rest} sx={className as Sx}>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton>
            {#snippet asChild(props)}
              <a {...props()} href={item.url}>
                {#if item.icon}
                  <Dashboard01Icon icon={item.icon} />
                {/if}
                <span>
                  {item.title}
                </span>
              </a>
            {/snippet}
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
