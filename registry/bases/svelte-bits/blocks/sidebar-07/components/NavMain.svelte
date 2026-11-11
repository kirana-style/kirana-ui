<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Sidebar07Icon from "./Sidebar07Icon.svelte"
  import { css } from "@kirana-style/core"
  import { duration, easing } from "../../../../../core/scales"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import {
    collapsibleScope,
    OPEN,
  } from "../../../../../styles/collapsible.styles"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../ui/collapsible"
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from "../../../ui/sidebar"

  let {
    items,
    class: className,
    ...rest
  }: {
    items: {
    title: string
    url: string
    icon?: {
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
    // A section of the menu, read by its chevron (`group/collapsible`).
    section: css(collapsibleScope.anchor),
    // Turns to point down while its section is open.
    chevron: css({
      marginInlineStart: "auto",
      transitionProperty: "transform, translate, scale, rotate",
      transitionDuration: duration[200],
      transitionTimingFunction: easing.inOut,
      rotate: { [OPEN.base]: "90deg" },
    }),
  }
</script>

<SidebarGroup {...rest} sx={className as Sx}>
  <SidebarGroupLabel>
    Platform
  </SidebarGroupLabel>
  <SidebarMenu>
    {#each items as item (item.title)}
      <Collapsible defaultOpen={item.isActive} sx={styles.section}>
        {#snippet asChild(props)}
          <SidebarMenuItem {...props()}>
            <CollapsibleTrigger>
              {#snippet asChild(props)}
                <SidebarMenuButton {...props()} tooltip={item.title}>
                  {#if item.icon}
                    <Sidebar07Icon icon={item.icon} />
                  {/if}
                  <span>
                    {item.title}
                  </span>
                  <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={styles.chevron} />
                </SidebarMenuButton>
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
          </SidebarMenuItem>
        {/snippet}
      </Collapsible>
    {/each}
  </SidebarMenu>
</SidebarGroup>
