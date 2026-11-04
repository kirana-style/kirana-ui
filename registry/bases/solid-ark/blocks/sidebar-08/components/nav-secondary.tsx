import { Sidebar08Icon } from "./sidebar08-icon"
import { For, Show, splitProps } from "solid-js"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import type { Sx } from "@kirana-style/core"

export function NavSecondary(props: {
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
  }[]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["items", "class", "sx"])
  return (
    <SidebarGroup {...rest} class={local.class} sx={[local.sx]}>
      <SidebarGroupContent>
        <SidebarMenu>
          <For each={local.items}>
            {(item) => (
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="sm"
                  asChild={(childProps) => (
                    <a {...childProps()} href={item.url}>
                      <Show when={item.icon}>
                        {(icon) => <Sidebar08Icon icon={icon()} />}
                      </Show>
                      <span>{item.title}</span>
                    </a>
                  )}
                />
              </SidebarMenuItem>
            )}
          </For>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
