<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Sidebar16Icon from "./Sidebar16Icon.svelte"
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
    projects,
    class: className,
    ...rest
  }: {
    projects: {
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
    navProjectsSpan: css({
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
      width: { "*": null, base: space[48] },
    }),
    iconPlaceholder: css({
      color: theme.mutedForeground,
    }),
    iconPlaceholder2: css({
      color: theme.mutedForeground,
    }),
    iconPlaceholder3: css({
      color: theme.mutedForeground,
    }),
  }

  const ctx = useSidebar()
</script>

<SidebarGroup sx={[styles.sidebarGroup, className as Sx]} {...rest}>
  <SidebarGroupLabel>
    Projects
  </SidebarGroupLabel>
  <SidebarMenu>
    {#each projects as item (item.name)}
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet asChild(props)}
            <a {...props()} href={item.url}>
              {#if item.icon}
                <Sidebar16Icon icon={item.icon} />
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
                <span sx={styles.navProjectsSpan}>
                  More
                </span>
              </SidebarMenuAction>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent sx={styles.dropdownMenuContent} side={ctx.isMobile ? 'bottom' : 'right'} align={ctx.isMobile ? 'end' : 'start'}>
            <DropdownMenuItem>
              <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" sx={styles.iconPlaceholder} />
              <span>
                View Project
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ShareIcon" tabler="IconShare2" hugeicons="Share03Icon" phosphor="ShareIcon" remixicon="RiShareLine" sx={styles.iconPlaceholder2} />
              <span>
                Share Project
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" sx={styles.iconPlaceholder3} />
              <span>
                Delete Project
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton>
        <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
        <span>
          More
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
