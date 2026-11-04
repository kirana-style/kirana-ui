import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/sidebar"
import { duration, easing } from "../../../../core/scales"
import { OPEN, collapsibleScope } from "../../../../styles/collapsible.styles"
import type { Sx } from "@kirana-style/core"

export function NavMain(props: {
  items: {
    title: string
    url: string
    icon?: {
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
    navMainIconPlaceholder: css({
      marginLeft: "auto",
      transitionDuration: duration[200],
      transitionProperty: "transform, translate, scale, rotate",
      transitionTimingFunction: easing.inOut,
      rotate: { [OPEN.base]: "90deg" },
    }),
  }

  return (
    <SidebarGroup {...rest} class={local.class} sx={[local.sx]}>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <For each={local.items}>
          {(item) => (
            <Collapsible
              defaultOpen={item.isActive}
              sx={collapsibleScope.anchor}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  asChild={(childProps) => (
                    <SidebarMenuButton {...childProps()} tooltip={item.title}>
                      <Show when={item.icon}>
                        {(icon) => <IconPlaceholder {...icon()} />}
                      </Show>
                      <span>{item.title}</span>
                      <IconPlaceholder
                        lucide="ChevronRightIcon"
                        tabler="IconChevronRight"
                        hugeicons="ArrowRight01Icon"
                        phosphor="CaretRightIcon"
                        remixicon="RiArrowRightSLine"
                        {...styleProps(styles.navMainIconPlaceholder)}
                      />
                    </SidebarMenuButton>
                  )}
                />
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <For each={item.items}>
                      {(subItem) => (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild={(childProps) => (
                              <a {...childProps()} href={subItem.url}>
                                <span>{subItem.title}</span>
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
      </SidebarMenu>
    </SidebarGroup>
  )
}
