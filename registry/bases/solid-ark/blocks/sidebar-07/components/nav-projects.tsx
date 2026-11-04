import { Sidebar07Icon } from "./sidebar07-icon"
import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { alpha, theme } from "../../../../../core/tokens"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
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
    // Hidden while the sidebar is collapsed to its icons.
    group: css({ display: { [COLLAPSED]: "none" } }),
    action: css({ backgroundColor: { '[aria-expanded="true"]': theme.muted } }),
    // `w-fit`, as upstream's bases write it.
    menu: css({ width: { "*": null, base: "fit-content" } }),
    quiet: css({ color: alpha.sidebarForeground70 }),
  }

  const ctx = useSidebar()

  return (
    <SidebarGroup class={local.class} sx={[styles.group, local.sx]} {...rest}>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.projects}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={(childProps) => (
                  <a {...childProps()} href={item.url}>
                    <Show when={item.icon}>
                      {(icon) => <Sidebar07Icon icon={icon()} />}
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
                      sx={styles.action}
                    >
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                      <span sx={visuallyHidden}>More</span>
                    </SidebarMenuAction>
                  )}
                />
                <DropdownMenuContent
                  sx={styles.menu}
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
                    />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ArrowRightIcon"
                      tabler="IconArrowForward"
                      hugeicons="ArrowRightIcon"
                      phosphor="ShareFatIcon"
                      remixicon="RiShareForwardLine"
                    />
                    <span>Share Project</span>
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
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton sx={styles.quiet}>
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
              {...styleProps(styles.quiet)}
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
