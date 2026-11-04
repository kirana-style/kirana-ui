<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Sidebar15Icon from "./Sidebar15Icon.svelte"
  import {
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
    isActive?: boolean
    }[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<SidebarMenu {...rest} sx={[className as Sx]}>
  {#each items as item (item.title)}
    <SidebarMenuItem>
      <SidebarMenuButton isActive={item.isActive}>
        {#snippet asChild(props)}
          <a {...props()} href={item.url}>
            {#if item.icon}
              <Sidebar15Icon icon={item.icon} />
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
