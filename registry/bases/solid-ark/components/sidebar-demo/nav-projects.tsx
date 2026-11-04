import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../ui/sidebar"
import { radius, theme } from "../../../../core/tokens"
import { space } from "../../../../core/scales"
import { COLLAPSED } from "../../../../styles/sidebar.styles"
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
    navProjectsSidebarGroup: css({
      display: { [COLLAPSED]: "none" },
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
    navProjectsDropdownMenuContent: css({
      width: { "*": null, base: space[48] },
      borderRadius: { "*": null, base: radius.lg },
    }),
    navProjectsIconPlaceholder: css({
      color: theme.mutedForeground,
    }),
    navProjectsIconPlaceholder2: css({
      color: theme.mutedForeground,
    }),
    navProjectsIconPlaceholder3: css({
      color: theme.mutedForeground,
    }),
    navProjectsSidebarMenuButton: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
    navProjectsIconPlaceholder4: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
  }

  const ctx = useSidebar()

  return (
    <SidebarGroup
      class={local.class}
      sx={[styles.navProjectsSidebarGroup, local.sx]}
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
                      <IconPlaceholder {...item.icon} />
                    </Show>
                    <span>{item.name}</span>
                  </a>
                )}
              />
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(childProps) => (
                    <SidebarMenuAction {...childProps()} showOnHover>
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
                  sx={styles.navProjectsDropdownMenuContent}
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
                      {...styleProps(styles.navProjectsIconPlaceholder)}
                    />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ForwardIcon"
                      tabler="IconCornerUpRight"
                      hugeicons="RedoIcon"
                      phosphor="ArrowBendUpRightIcon"
                      remixicon="RiCornerUpRightLine"
                      {...styleProps(styles.navProjectsIconPlaceholder2)}
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
                      {...styleProps(styles.navProjectsIconPlaceholder3)}
                    />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton sx={styles.navProjectsSidebarMenuButton}>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
              {...styleProps(styles.navProjectsIconPlaceholder4)}
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
