import { Dashboard01Icon } from "./dashboard01-icon"
import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavDocuments(props: {
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
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["items", "class", "sx"])
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

  const sidebar = useSidebar()

  return (
    <SidebarGroup
      class={local.class}
      sx={[styles.sidebarGroup, local.sx]}
      {...rest}
    >
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.items}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={(childProps) => (
                  <a {...childProps()} href={item.url}>
                    <Show when={item.icon}>
                      <Dashboard01Icon icon={item.icon} />
                    </Show>
                    <span>{item.name}</span>
                  </a>
                )}
              />
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(childProps) => (
                    <SidebarMenuAction
                      {...childProps()}
                      showOnHover
                      sx={styles.sidebarMenuAction}
                    >
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                      <span sx={styles.navDocumentsSpan}>More</span>
                    </SidebarMenuAction>
                  )}
                />
                <DropdownMenuContent
                  sx={styles.dropdownMenuContent}
                  side={sidebar.isMobile ? "bottom" : "right"}
                  align={sidebar.isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="FolderIcon"
                      tabler="IconFolder"
                      hugeicons="Folder01Icon"
                      phosphor="FolderIcon"
                      remixicon="RiFolderLine"
                    />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ShareIcon"
                      tabler="IconShare3"
                      hugeicons="Share01Icon"
                      phosphor="ShareIcon"
                      remixicon="RiShareLine"
                    />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconPlaceholder
                      lucide="Trash2Icon"
                      tabler="IconTrash"
                      hugeicons="Delete02Icon"
                      phosphor="TrashIcon"
                      remixicon="RiDeleteBinLine"
                    />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton sx={styles.sidebarMenuButton}>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
              {...styleProps(styles.iconPlaceholder)}
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
