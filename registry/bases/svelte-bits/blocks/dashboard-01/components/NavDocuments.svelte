<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Dashboard01Icon from "./Dashboard01Icon.svelte"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../../ui/dropdown-menu"
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { COLLAPSED } from "../../../../../styles/sidebar.styles"
  import { theme } from "../../../../../core/tokens"
  import { space } from "../../../../../core/scales"

  let {
    items,
    class: className,
    ...rest
  }: {
    items: {
    name: string
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

  const styles = {
    sidebarGroup: css({
      display: { [COLLAPSED]: "none" },
    }),
    sidebarMenuAction: css({
      backgroundColor: { '[aria-expanded="true"]': theme.muted },
    }),
    navDocumentsSpan: css({
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
    dropdownMenuContent: css({
      width: { "*": null, base: space[24] },
    }),
    sidebarMenuButton: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
    iconPlaceholder: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
  }

  const ctx = useSidebar()
</script>

<SidebarGroup sx={[styles.sidebarGroup, className as Sx]} {...rest}>
  <SidebarGroupLabel>
    Documents
  </SidebarGroupLabel>
  <SidebarMenu>
    {#each items as item (item.name)}
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet asChild(props)}
            <a {...props()} href={item.url}>
              {#if item.icon}
                <Dashboard01Icon icon={item.icon} />
              {/if}
              <span>
                {item.name}
              </span>
            </a>
          {/snippet}
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet asChild(props)}
              <SidebarMenuAction {...props()} class={props().class} style={props().style} showOnHover sx={styles.sidebarMenuAction}>
                <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
                <span sx={styles.navDocumentsSpan}>
                  More
                </span>
              </SidebarMenuAction>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent sx={styles.dropdownMenuContent} side={ctx.isMobile ? 'bottom' : 'right'} align={ctx.isMobile ? 'end' : 'start'}>
            <DropdownMenuItem>
              <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="Folder01Icon" phosphor="FolderIcon" remixicon="RiFolderLine" />
              <span>
                Open
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ShareIcon" tabler="IconShare3" hugeicons="Share01Icon" phosphor="ShareIcon" remixicon="RiShareLine" />
              <span>
                Share
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
              <span>
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton sx={styles.sidebarMenuButton}>
        <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" sx={styles.iconPlaceholder} />
        <span>
          More
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
