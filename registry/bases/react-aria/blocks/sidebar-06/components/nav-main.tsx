"use client"

import {
  DropdownMenu,
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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
  }),
  dropdownMenu: css({
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
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
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <DropdownMenuTrigger>
              <SidebarMenuButton sx={styles.sidebarMenuButton}>
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
              {item.items?.length ? (
                <DropdownMenu
                  placement={isMobile ? "bottom end" : "right top"}
                  sx={styles.dropdownMenu}
                >
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.title} href={subItem.url}>
                      {subItem.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenu>
              ) : null}
            </DropdownMenuTrigger>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
