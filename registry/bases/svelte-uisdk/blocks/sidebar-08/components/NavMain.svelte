<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Sidebar08Icon from "./Sidebar08Icon.svelte"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../ui/collapsible"
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"

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
    items?: {
    title: string
    url: string
    }[]
    }[]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    sidebarMenuAction: css({
      rotate: { '[aria-expanded="true"]': "90deg" },
    }),
    navMainSpan: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
  }
</script>

<SidebarGroup {...rest} sx={className as Sx}>
  <SidebarGroupLabel>
    Platform
  </SidebarGroupLabel>
  <SidebarMenu>
    {#each items as item (item.title)}
      <Collapsible defaultOpen={item.isActive}>
        {#snippet asChild(props)}
          <SidebarMenuItem {...props()}>
            <SidebarMenuButton tooltip={item.title}>
              {#snippet asChild(props)}
                <a {...props()} href={item.url}>
                  {#if item.icon}
                    <Sidebar08Icon icon={item.icon} />
                  {/if}
                  <span>
                    {item.title}
                  </span>
                </a>
              {/snippet}
            </SidebarMenuButton>
            {#if item.items?.length}
              <CollapsibleTrigger>
                {#snippet asChild(props)}
                  <SidebarMenuAction {...props()} class={props().class} style={props().style} sx={styles.sidebarMenuAction}>
                    <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
                    <span sx={styles.navMainSpan}>
                      Toggle
                    </span>
                  </SidebarMenuAction>
                {/snippet}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {#each item.items as subItem (subItem.title)}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        {#snippet asChild(props)}
                          <a {...props()} href={subItem.url}>
                            <span>
                              {subItem.title}
                            </span>
                          </a>
                        {/snippet}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  {/each}
                </SidebarMenuSub>
              </CollapsibleContent>
            {/if}
          </SidebarMenuItem>
        {/snippet}
      </Collapsible>
    {/each}
  </SidebarMenu>
</SidebarGroup>
