import { Sidebar08Icon } from "./sidebar08-icon"
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

export function NavProjects(props: {
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
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["projects", "class", "sx"])
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

  return (
    <SidebarGroup
      class={local.class}
      sx={[styles.sidebarGroup, local.sx]}
      {...rest}
    >
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.projects}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={(childProps) => (
                  <a {...childProps()} href={item.url}>
                    <Show when={item.icon}>
                      {(icon) => <Sidebar08Icon icon={icon()} />}
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
                      <span sx={styles.navProjectsSpan}>More</span>
                    </SidebarMenuAction>
                  )}
                />
                <DropdownMenuContent
                  sx={styles.dropdownMenuContent}
                  side={ctx.isMobile ? "bottom" : "right"}
                  align={ctx.isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="FolderIcon"
                      tabler="IconFolder"
                      hugeicons="FolderIcon"
                      phosphor="FolderIcon"
                      remixicon="RiFolderLine"
                      {...styleProps(styles.iconPlaceholder)}
                    />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ShareIcon"
                      tabler="IconShare2"
                      hugeicons="Share03Icon"
                      phosphor="ShareIcon"
                      remixicon="RiShareLine"
                      {...styleProps(styles.iconPlaceholder2)}
                    />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="Trash2Icon"
                      tabler="IconTrash"
                      hugeicons="Delete02Icon"
                      phosphor="TrashIcon"
                      remixicon="RiDeleteBinLine"
                      {...styleProps(styles.iconPlaceholder3)}
                    />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
