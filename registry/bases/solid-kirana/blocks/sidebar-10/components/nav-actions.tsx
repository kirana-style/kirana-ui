import { For, Show, createSignal, onMount, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function NavActions(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
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
        icon: {
          lucide: "Settings2Icon",
          tabler: "IconSettings",
          hugeicons: "Settings05Icon",
          phosphor: "GearIcon",
          remixicon: "RiSettingsLine",
        },
      },
      {
        label: "Turn into wiki",
        icon: {
          lucide: "FileTextIcon",
          tabler: "IconFileText",
          hugeicons: "File01Icon",
          phosphor: "FileTextIcon",
          remixicon: "RiFileTextLine",
        },
      },
    ],
    [
      {
        label: "Copy Link",
        icon: {
          lucide: "LinkIcon",
          tabler: "IconLink",
          hugeicons: "LinkIcon",
          phosphor: "LinkIcon",
          remixicon: "RiLinksLine",
        },
      },
      {
        label: "Duplicate",
        icon: {
          lucide: "CopyIcon",
          tabler: "IconCopy",
          hugeicons: "Copy01Icon",
          phosphor: "CopyIcon",
          remixicon: "RiFileCopyLine",
        },
      },
      {
        label: "Move to",
        icon: {
          lucide: "CornerUpRightIcon",
          tabler: "IconCornerUpRight",
          hugeicons: "RedoIcon",
          phosphor: "ArrowBendUpRightIcon",
          remixicon: "RiCornerUpRightLine",
        },
      },
      {
        label: "Move to Trash",
        icon: {
          lucide: "Trash2Icon",
          tabler: "IconTrash",
          hugeicons: "Delete02Icon",
          phosphor: "TrashIcon",
          remixicon: "RiDeleteBinLine",
        },
      },
    ],
    [
      {
        label: "Undo",
        icon: {
          lucide: "CornerUpLeftIcon",
          tabler: "IconCornerUpLeft",
          hugeicons: "UndoIcon",
          phosphor: "ArrowBendUpLeftIcon",
          remixicon: "RiCornerUpLeftLine",
        },
      },
      {
        label: "View analytics",
        icon: {
          lucide: "ChartLineIcon",
          tabler: "IconChartLine",
          hugeicons: "ChartIcon",
          phosphor: "ChartLineIcon",
          remixicon: "RiLineChartLine",
        },
      },
      {
        label: "Version History",
        icon: {
          lucide: "GalleryVerticalEndIcon",
          tabler: "IconLayoutRows",
          hugeicons: "LayoutBottomIcon",
          phosphor: "RowsIcon",
          remixicon: "RiGalleryLine",
        },
      },
      {
        label: "Show delete pages",
        icon: {
          lucide: "TrashIcon",
          tabler: "IconTrash",
          hugeicons: "DeleteIcon",
          phosphor: "TrashIcon",
          remixicon: "RiDeleteBinLine",
        },
      },
      {
        label: "Notifications",
        icon: {
          lucide: "BellIcon",
          tabler: "IconBell",
          hugeicons: "NotificationIcon",
          phosphor: "BellIcon",
          remixicon: "RiNotificationLine",
        },
      },
    ],
    [
      {
        label: "Import",
        icon: {
          lucide: "ArrowUpIcon",
          tabler: "IconArrowUp",
          hugeicons: "ArrowUpIcon",
          phosphor: "ArrowUpIcon",
          remixicon: "RiArrowUpLine",
        },
      },
      {
        label: "Export",
        icon: {
          lucide: "ArrowDownIcon",
          tabler: "IconArrowDown",
          hugeicons: "ArrowDownIcon",
          phosphor: "ArrowDownIcon",
          remixicon: "RiArrowDownLine",
        },
      },
    ],
  ]

  const [isOpen, setIsOpen] = createSignal(false)
  // The menu opens once the page is shown, as upstream's: a tick later, since Ark's Solid popover
  // drops an `open` changed before its machine has started, as this `onMount` runs (LF-011).
  onMount(() => queueMicrotask(() => setIsOpen(true)))

  return (
    <div {...styleProps(local.class, styles.navActionsDiv, local.sx)} {...rest}>
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
      <Popover
        open={isOpen()}
        onOpenChange={(details: { open: ReturnType<typeof isOpen> }) =>
          setIsOpen(details.open)
        }
      >
        <PopoverTrigger
          asChild={(childProps) => (
            <Button
              {...childProps()}
              variant="ghost"
              size="icon"
              sx={styles.button2}
            >
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
            </Button>
          )}
        />
        <PopoverContent sx={styles.popoverContent} align="end">
          <Sidebar collapsible="none" sx={styles.navActionsSidebar}>
            <SidebarContent>
              <For each={data}>
                {(group) => (
                  <SidebarGroup sx={styles.sidebarGroup}>
                    <SidebarGroupContent sx={styles.sidebarGroupContent}>
                      <SidebarMenu>
                        <For each={group}>
                          {(item) => (
                            <SidebarMenuItem>
                              <SidebarMenuButton>
                                <Show when={item.icon}>
                                  <IconPlaceholder {...item.icon} />
                                </Show>
                                <span>{item.label}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )}
                        </For>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )}
              </For>
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
