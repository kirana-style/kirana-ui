import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavMain(props: {
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
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["items", "class", "sx"])
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

  return (
    <SidebarGroup {...rest} class={local.class} sx={[local.sx]}>
      <SidebarMenu>
        <For each={local.items}>
          {(item) => (
            <DropdownMenu>
              <SidebarMenuItem>
                <DropdownMenuTrigger
                  asChild={(childProps) => (
                    <SidebarMenuButton
                      {...childProps()}
                      sx={styles.sidebarMenuButton}
                    >
                      {item.title}{" "}
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                        {...styleProps(styles.iconPlaceholder)}
                      />
                    </SidebarMenuButton>
                  )}
                />
                <Show when={item.items?.length}>
                  <DropdownMenuContent
                    side={ctx.isMobile ? "bottom" : "right"}
                    align={ctx.isMobile ? "end" : "start"}
                    sx={styles.dropdownMenuContent}
                  >
                    <For each={item.items}>
                      {(subItem) => (
                        <>
                          <DropdownMenuItem
                            asChild={(childProps) => (
                              <a {...childProps()} href={subItem.url}>
                                {subItem.title}
                              </a>
                            )}
                          />
                        </>
                      )}
                    </For>
                  </DropdownMenuContent>
                </Show>
              </SidebarMenuItem>
            </DropdownMenu>
          )}
        </For>
      </SidebarMenu>
    </SidebarGroup>
  )
}
