<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu"
  import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { radius, theme } from "../../../../../core/tokens"
  import { space } from "../../../../../core/scales"

  let {
    items,
    class: className,
    ...rest
  }: {
    items: {
    title: string
    url: string
    icon?: unknown
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
    sidebarMenuButton: css({
      backgroundColor: { '[aria-expanded="true"]': theme.muted },
    }),
    iconPlaceholder: css({
      marginLeft: "auto",
    }),
    dropdownMenuContent: css({
      minWidth: { "*": null, base: space[56] },
      borderRadius: { "*": null, base: radius.lg },
    }),
  }

  const ctx = useSidebar()
</script>

<SidebarGroup {...rest} sx={[className as Sx]}>
  <SidebarMenu>
    {#each items as item (item.title)}
      <DropdownMenu>
        <SidebarMenuItem>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <SidebarMenuButton {...props()} class={props().class} style={props().style} sx={styles.sidebarMenuButton}>
                {item.title}{" "}
                <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" sx={styles.iconPlaceholder} />
              </SidebarMenuButton>
            {/snippet}
          </DropdownMenuTrigger>
          {#if item.items?.length}
            <DropdownMenuContent side={ctx.isMobile ? 'bottom' : 'right'} align={ctx.isMobile ? 'end' : 'start'} sx={styles.dropdownMenuContent}>
              {#each item.items as subItem (subItem.title)}
                <DropdownMenuItem>
                  {#snippet asChild(props)}
                    <a {...props()} href={subItem.url}>
                      {subItem.title}
                    </a>
                  {/snippet}
                </DropdownMenuItem>
              {/each}
            </DropdownMenuContent>
          {/if}
        </SidebarMenuItem>
      </DropdownMenu>
    {/each}
  </SidebarMenu>
</SidebarGroup>
