"use client"

import * as React from "react"

import { Button } from "../../../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  navActionsDiv: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    display: { base: "none", [breakpoint.md]: "inline-block" },
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  navActionsButton: css({
    height: { "*": null, base: space[7] },
    width: { "*": null, base: space[7] },
  }),
  button2: css({
    height: { "*": null, base: space[7] },
    width: { "*": null, base: space[7] },
    backgroundColor: { "[data-open]": theme.accent },
  }),
  popoverContent: css({
    width: { "*": null, base: space[56] },
    overflow: { "*": null, base: "hidden" },
    borderRadius: { "*": null, base: radius.lg },
    padding: { "*": null, base: space["0"] },
  }),
  // The popover's width: upstream's `w-(--sidebar-width)` is undefined in the portaled popover, so
  // the sidebar fills it; this token has its 16rem everywhere, so the sidebar says so.
  navActionsSidebar: css({
    width: { "*": null, base: "auto" },
    backgroundColor: "transparent",
  }),
  sidebarGroup: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid", ":last-child": "none" },
  }),
  sidebarGroupContent: css({
    gap: { "*": null, base: space["0"] },
  }),
}

const data = [
  [
    {
      label: "Customize Page",
      icon: (
        <IconPlaceholder
          lucide="Settings2Icon"
          tabler="IconSettings"
          hugeicons="Settings05Icon"
          phosphor="GearIcon"
          remixicon="RiSettingsLine"
        />
      ),
    },
    {
      label: "Turn into wiki",
      icon: (
        <IconPlaceholder
          lucide="FileTextIcon"
          tabler="IconFileText"
          hugeicons="File01Icon"
          phosphor="FileTextIcon"
          remixicon="RiFileTextLine"
        />
      ),
    },
  ],
  [
    {
      label: "Copy Link",
      icon: (
        <IconPlaceholder
          lucide="LinkIcon"
          tabler="IconLink"
          hugeicons="LinkIcon"
          phosphor="LinkIcon"
          remixicon="RiLinksLine"
        />
      ),
    },
    {
      label: "Duplicate",
      icon: (
        <IconPlaceholder
          lucide="CopyIcon"
          tabler="IconCopy"
          hugeicons="Copy01Icon"
          phosphor="CopyIcon"
          remixicon="RiFileCopyLine"
        />
      ),
    },
    {
      label: "Move to",
      icon: (
        <IconPlaceholder
          lucide="CornerUpRightIcon"
          tabler="IconCornerUpRight"
          hugeicons="RedoIcon"
          phosphor="ArrowBendUpRightIcon"
          remixicon="RiCornerUpRightLine"
        />
      ),
    },
    {
      label: "Move to Trash",
      icon: (
        <IconPlaceholder
          lucide="Trash2Icon"
          tabler="IconTrash"
          hugeicons="Delete02Icon"
          phosphor="TrashIcon"
          remixicon="RiDeleteBinLine"
        />
      ),
    },
  ],
  [
    {
      label: "Undo",
      icon: (
        <IconPlaceholder
          lucide="CornerUpLeftIcon"
          tabler="IconCornerUpLeft"
          hugeicons="UndoIcon"
          phosphor="ArrowBendUpLeftIcon"
          remixicon="RiCornerUpLeftLine"
        />
      ),
    },
    {
      label: "View analytics",
      icon: (
        <IconPlaceholder
          lucide="ChartLineIcon"
          tabler="IconChartLine"
          hugeicons="ChartIcon"
          phosphor="ChartLineIcon"
          remixicon="RiLineChartLine"
        />
      ),
    },
    {
      label: "Version History",
      icon: (
        <IconPlaceholder
          lucide="GalleryVerticalEndIcon"
          tabler="IconLayoutRows"
          hugeicons="LayoutBottomIcon"
          phosphor="RowsIcon"
          remixicon="RiGalleryLine"
        />
      ),
    },
    {
      label: "Show delete pages",
      icon: (
        <IconPlaceholder
          lucide="TrashIcon"
          tabler="IconTrash"
          hugeicons="DeleteIcon"
          phosphor="TrashIcon"
          remixicon="RiDeleteBinLine"
        />
      ),
    },
    {
      label: "Notifications",
      icon: (
        <IconPlaceholder
          lucide="BellIcon"
          tabler="IconBell"
          hugeicons="NotificationIcon"
          phosphor="BellIcon"
          remixicon="RiNotificationLine"
        />
      ),
    },
  ],
  [
    {
      label: "Import",
      icon: (
        <IconPlaceholder
          lucide="ArrowUpIcon"
          tabler="IconArrowUp"
          hugeicons="ArrowUpIcon"
          phosphor="ArrowUpIcon"
          remixicon="RiArrowUpLine"
        />
      ),
    },
    {
      label: "Export",
      icon: (
        <IconPlaceholder
          lucide="ArrowDownIcon"
          tabler="IconArrowDown"
          hugeicons="ArrowDownIcon"
          phosphor="ArrowDownIcon"
          remixicon="RiArrowDownLine"
        />
      ),
    },
  ],
]
export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- upstream's: the menu opens once the page is shown.
    setIsOpen(true)
  }, [])
  return (
    <div sx={styles.navActionsDiv}>
      <div sx={styles.div2}>Edit Oct 08</div>
      <Button variant="ghost" size="icon" sx={styles.navActionsButton}>
        <IconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={<Button variant="ghost" size="icon" sx={styles.button2} />}
        >
          <IconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeOutlineIcon"
            remixicon="RiMoreLine"
          />
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="end">
          <Sidebar collapsible="none" sx={styles.navActionsSidebar}>
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} sx={styles.sidebarGroup}>
                  <SidebarGroupContent sx={styles.sidebarGroupContent}>
                    <SidebarMenu>
                      {group.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex}>
                          <SidebarMenuButton>
                            {item.icon} <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
