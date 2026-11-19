import { Sidebar07Icon } from "./sidebar07-icon"
import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { duration, easing } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import {
  OPEN,
  collapsibleScope,
} from "../../../../../styles/collapsible.styles"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"
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
    // A section of the menu, read by its chevron (`group/collapsible`).
    section: css(collapsibleScope.anchor),
    // Turns to point down while its section is open.
    chevron: css({
      marginInlineStart: "auto",
      transitionProperty: "transform, translate, scale, rotate",
      transitionDuration: duration[200],
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
            <>
              <Collapsible
                defaultOpen={item.isActive}
                sx={styles.section}
                asChild={(childProps) => (
                  <SidebarMenuItem {...childProps()}>
                    <CollapsibleTrigger
                      asChild={(childProps2) => (
                        <SidebarMenuButton
                          {...childProps2()}
                          tooltip={item.title}
                        >
                          <Show when={item.icon}>
                            {(icon) => <Sidebar07Icon icon={icon()} />}
                          </Show>
                          <span>{item.title}</span>
                          <IconPlaceholder
                            lucide="ChevronRightIcon"
                            tabler="IconChevronRight"
                            hugeicons="ArrowRight01Icon"
                            phosphor="CaretRightIcon"
                            remixicon="RiArrowRightSLine"
                            {...styleProps(styles.chevron)}
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
