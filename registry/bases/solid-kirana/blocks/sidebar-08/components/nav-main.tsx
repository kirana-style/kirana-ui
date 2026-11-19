import { Sidebar08Icon } from "./sidebar08-icon"
import { For, Show, splitProps } from "solid-js"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
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
import type { Sx } from "@kirana-style/core"

export function NavMain(props: {
  items: {
    title: string
    url: string
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
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
    sidebarMenuAction: css({
      rotate: { '[aria-expanded="true"]': "90deg" },
    }),
    navMainSpan: css({
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
  }

  return (
    <SidebarGroup {...rest} class={local.class} sx={[local.sx]}>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.items}>
          {(item) => (
            <>
              <Collapsible
                defaultOpen={item.isActive}
                asChild={(childProps) => (
                  <SidebarMenuItem {...childProps()}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild={(childProps2) => (
                        <a {...childProps2()} href={item.url}>
                          <Show when={item.icon}>
                            {(icon) => <Sidebar08Icon icon={icon()} />}
                          </Show>
                          <span>{item.title}</span>
                        </a>
                      )}
                    />
                    <Show when={item.items?.length}>
                      <>
                        <CollapsibleTrigger
                          asChild={(childProps2) => (
                            <SidebarMenuAction
                              {...childProps2()}
                              sx={styles.sidebarMenuAction}
                            >
                              <IconPlaceholder
                                lucide="ChevronRightIcon"
                                tabler="IconChevronRight"
                                hugeicons="ArrowRight01Icon"
                                phosphor="CaretRightIcon"
                                remixicon="RiArrowRightSLine"
                              />
                              <span sx={styles.navMainSpan}>Toggle</span>
                            </SidebarMenuAction>
                          )}
                        />
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <For each={item.items}>
                              {(subItem) => (
                                <SidebarMenuSubItem>
                                  <SidebarMenuSubButton
                                    asChild={(childProps2) => (
                                      <a {...childProps2()} href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </a>
                                    )}
                                  />
                                </SidebarMenuSubItem>
                              )}
                            </For>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    </Show>
                  </SidebarMenuItem>
                )}
              />
            </>
          )}
        </For>
      </SidebarMenu>
    </SidebarGroup>
  )
}
