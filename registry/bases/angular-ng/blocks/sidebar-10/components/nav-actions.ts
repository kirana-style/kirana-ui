import { afterNextRender, Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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

@Component({
  selector: "kui-nav-actions",
  imports: [
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.navActionsDiv">
      <div [sx]="styles.div2">Edit Oct 08</div>
      <button
        kuiButton
        variant="ghost"
        size="icon"
        [sx]="styles.navActionsButton"
      >
        <svg
          iconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        ></svg>
      </button>
      <ng-container kuiPopover [(open)]="isOpen">
        <button
          kuiButton
          kuiPopoverTrigger
          variant="ghost"
          size="icon"
          [sx]="styles.button2"
        >
          <svg
            iconPlaceholder
            lucide="MoreHorizontalIcon"
            tabler="IconDots"
            hugeicons="MoreHorizontalCircle01Icon"
            phosphor="DotsThreeOutlineIcon"
            remixicon="RiMoreLine"
          ></svg>
        </button>
        <div kuiPopoverContent [sx]="styles.popoverContent" align="end">
          <div kuiSidebar collapsible="none" [sx]="styles.navActionsSidebar">
            <div kuiSidebarContent>
              @for (group of data; track index; let index = $index) {
                <div kuiSidebarGroup [sx]="styles.sidebarGroup">
                  <div kuiSidebarGroupContent [sx]="styles.sidebarGroupContent">
                    <ul kuiSidebarMenu>
                      @for (
                        item of group;
                        track itemIndex;
                        let itemIndex = $index
                      ) {
                        <li kuiSidebarMenuItem>
                          <button kuiSidebarMenuButton>
                            @if (item.icon) {
                              <svg
                                iconPlaceholder
                                [lucide]="item.icon.lucide"
                                [tabler]="item.icon.tabler"
                                [hugeicons]="item.icon.hugeicons"
                                [phosphor]="item.icon.phosphor"
                                [remixicon]="item.icon.remixicon"
                              ></svg>
                            }
                            <span>{{ item.label }}</span>
                          </button>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class NavActions {
  protected readonly isOpen = signal(false)
  protected readonly styles = styles
  protected readonly data = data

  constructor() {
    // The menu opens once the page is shown, as upstream's.
    afterNextRender(() => this.isOpen.set(true))
  }
}
