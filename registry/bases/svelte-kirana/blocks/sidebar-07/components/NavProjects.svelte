<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Sidebar07Icon from "./Sidebar07Icon.svelte"
  import { css } from "@kirana-style/core"
  import { alpha, theme } from "../../../../../core/tokens"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { COLLAPSED } from "../../../../../styles/sidebar.styles"
  import { visuallyHidden } from "../../../../../styles/visually-hidden.styles"
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
    // Hidden while the sidebar is collapsed to its icons.
    group: css({ display: { [COLLAPSED]: "none" } }),
    action: css({ backgroundColor: { '[aria-expanded="true"]': theme.muted } }),
    // `w-fit`, as upstream's bases write it.
    menu: css({ width: { "*": null, base: "fit-content" } }),
    quiet: css({ color: alpha.sidebarForeground70 }),
  }

  const ctx = useSidebar()
</script>

<SidebarGroup sx={[styles.group, className as Sx]} {...rest}>
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
                <Sidebar07Icon icon={item.icon} />
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
              <SidebarMenuAction {...props()} class={props().class} style={props().style} showOnHover sx={styles.action}>
                <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" />
                <span sx={visuallyHidden}>
                  More
                </span>
              </SidebarMenuAction>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent sx={styles.menu} side={ctx.isMobile ? 'bottom' : 'right'} align={ctx.isMobile ? 'end' : 'start'}>
            <DropdownMenuItem>
              <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
              <span>
                View Project
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder lucide="ArrowRightIcon" tabler="IconArrowForward" hugeicons="ArrowRightIcon" phosphor="ShareFatIcon" remixicon="RiShareForwardLine" />
              <span>
                Share Project
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder lucide="Trash2Icon" tabler="IconTrash" hugeicons="Delete02Icon" phosphor="TrashIcon" remixicon="RiDeleteBinLine" />
              <span>
                Delete Project
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton sx={styles.quiet}>
        <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" hugeicons="MoreHorizontalCircle01Icon" phosphor="DotsThreeOutlineIcon" remixicon="RiMoreLine" sx={styles.quiet} />
        <span>
          More
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
