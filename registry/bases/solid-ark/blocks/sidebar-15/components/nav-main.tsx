import { Sidebar15Icon } from "./sidebar15-icon"
import { For, Show, splitProps } from "solid-js"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
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
  }[]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["items", "class", "sx"])
  return (
    <SidebarMenu {...rest} class={local.class} sx={[local.sx]}>
      <For each={local.items}>
        {(item) => (
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={item.isActive}
              asChild={(childProps) => (
                <a {...childProps()} href={item.url}>
                  <Show when={item.icon}>
                    {(icon) => <Sidebar15Icon icon={icon()} />}
                  </Show>
                  <span>{item.title}</span>
                </a>
              )}
            />
          </SidebarMenuItem>
        )}
      </For>
    </SidebarMenu>
  )
}
