import type { JSX } from "solid-js"
import { For, splitProps } from "solid-js"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavWorkspaces(props: {
  workspaces: {
    name: string
    emoji: JSX.Element
    pages: {
      name: string
      emoji: JSX.Element
    }[]
  }[]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["workspaces", "class", "sx"])
  const styles = {
    sidebarMenuAction: css({
      left: space[2],
      backgroundColor: theme.sidebarAccent,
      color: theme.sidebarAccentForeground,
      rotate: { "[data-open]": "90deg" },
    }),
    sidebarMenuButton: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
  }

  return (
    <SidebarGroup {...rest} class={local.class} sx={[local.sx]}>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <For each={local.workspaces}>
            {(workspace) => (
              <Collapsible>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild={(childProps) => (
                      <a {...childProps()} href="#">
                        <span>{workspace.emoji}</span>
                        <span>{workspace.name}</span>
                      </a>
                    )}
                  />
                  <SidebarMenuAction
                    sx={styles.sidebarMenuAction}
                    showOnHover
                    asChild={(childProps) => (
                      <CollapsibleTrigger {...childProps()}>
                        <IconPlaceholder
                          lucide="ChevronRightIcon"
                          tabler="IconChevronRight"
                          hugeicons="ArrowRight01Icon"
                          phosphor="CaretRightIcon"
                          remixicon="RiArrowRightSLine"
                        />
                      </CollapsibleTrigger>
                    )}
                  />
                  <SidebarMenuAction showOnHover>
                    <IconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                    />
                  </SidebarMenuAction>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <For each={workspace.pages}>
                        {(page) => (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild={(childProps) => (
                                <a {...childProps()} href="#">
                                  <span>{page.emoji}</span>
                                  <span>{page.name}</span>
                                </a>
                              )}
                            />
                          </SidebarMenuSubItem>
                        )}
                      </For>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
              />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
