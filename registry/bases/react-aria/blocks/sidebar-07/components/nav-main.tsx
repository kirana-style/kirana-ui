"use client"

import { css, props as styleProps } from "@kirana-style/core"

import { duration, easing } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import {
  collapsibleScope,
  OPEN,
} from "../../../../../styles/collapsible.styles"
import { Collapsible, CollapsibleContent } from "../../../ui/collapsible"
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

const styles = {
  // A section of the menu, read by its chevron (`group/collapsible`).
  section: css(collapsibleScope.anchor),
  // Turns to point down while its section is open.
  chevron: css({
    marginInlineStart: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.aria]: "90deg" },
  }),
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultExpanded={item.isActive}
            {...styleProps(styles.section)}
            render={(props) => <SidebarMenuItem {...props} />}
          >
            <SidebarMenuButton slot="trigger" tooltip={item.title}>
              {item.icon}
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
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton href={subItem.url}>
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
