import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { inEveryStyle } from "../../../../../core/axes"
import { css } from "@kirana-style/core"
import { WRAPPER_COLLAPSED } from "../../../../../styles/sidebar.styles"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  containerSize,
  duration,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../ui/breadcrumb"
import { Button } from "../../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../../ui/sidebar"

const styles = {
  dialogContent: css({
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
    maxHeight: { [breakpoint.md]: "500px" },
    // `md:max-w-[700px] lg:max-w-[800px]`, over Dialog's own width in every style.
    maxWidth: inEveryStyle({
      [breakpoint.md]: "700px",
      [breakpoint.lg]: "800px",
    }),
  }),
  dialogTitle: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  dialogDescription: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  sidebarProvider: css({
    alignItems: { "*": null, base: "flex-start" },
  }),
  settingsDialogSidebar: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  settingsDialogMain: css({
    display: "flex",
    height: "480px",
    flex: "1 1 0%",
    flexDirection: "column",
    overflow: "hidden",
  }),
  settingsDialogHeader: css({
    display: "flex",
    height: { base: space[16], [WRAPPER_COLLAPSED]: space[12] },
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    transitionProperty: "width,height",
    transitionDuration: duration[150],
    transitionTimingFunction: "linear",
  }),
  settingsDialogDiv: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  breadcrumbItem: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  breadcrumbSeparator: css({
    display: { "*": null, base: "none", [breakpoint.md]: "block" },
  }),
  div2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    overflowY: "auto",
    padding: space[4],
    paddingTop: space["0"],
  }),
  div3: css({
    aspectRatio: "16 / 9",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

const data = {
  nav: [
    {
      name: "Notifications",
      icon: {
        lucide: "BellIcon",
        tabler: "IconBell",
        hugeicons: "NotificationIcon",
        phosphor: "BellIcon",
        remixicon: "RiNotificationLine",
      },
    },
    {
      name: "Navigation",
      icon: {
        lucide: "MenuIcon",
        tabler: "IconMenu",
        hugeicons: "Menu09Icon",
        phosphor: "ListIcon",
        remixicon: "RiMenuLine",
      },
    },
    {
      name: "Home",
      icon: {
        lucide: "HomeIcon",
        tabler: "IconHome",
        hugeicons: "HomeIcon",
        phosphor: "HouseIcon",
        remixicon: "RiHomeLine",
      },
    },
    {
      name: "Appearance",
      icon: {
        lucide: "PaintbrushIcon",
        tabler: "IconPalette",
        hugeicons: "PaintBoardIcon",
        phosphor: "PaletteIcon",
        remixicon: "RiPaletteLine",
      },
    },
    {
      name: "Messages & media",
      icon: {
        lucide: "MessageCircleIcon",
        tabler: "IconMessageQuestion",
        hugeicons: "MessageIcon",
        phosphor: "ChatCircleIcon",
        remixicon: "RiChat1Line",
      },
    },
    {
      name: "Language & region",
      icon: {
        lucide: "GlobeIcon",
        tabler: "IconWorld",
        hugeicons: "Globe02Icon",
        phosphor: "GlobeIcon",
        remixicon: "RiGlobalLine",
      },
    },
    {
      name: "Accessibility",
      icon: {
        lucide: "KeyboardIcon",
        tabler: "IconKeyboard",
        hugeicons: "KeyboardIcon",
        phosphor: "KeyboardIcon",
        remixicon: "RiKeyboardLine",
      },
    },
    {
      name: "Mark as read",
      icon: {
        lucide: "CheckIcon",
        tabler: "IconCheck",
        hugeicons: "Tick02Icon",
        phosphor: "CheckIcon",
        remixicon: "RiCheckLine",
      },
    },
    {
      name: "Audio & video",
      icon: {
        lucide: "VideoIcon",
        tabler: "IconVideoPlus",
        hugeicons: "RecordIcon",
        phosphor: "VideoIcon",
        remixicon: "RiVideoLine",
      },
    },
    {
      name: "Connected accounts",
      icon: {
        lucide: "LinkIcon",
        tabler: "IconLink",
        hugeicons: "LinkIcon",
        phosphor: "LinkIcon",
        remixicon: "RiLinksLine",
      },
    },
    {
      name: "Privacy & visibility",
      icon: {
        lucide: "LockIcon",
        tabler: "IconLock",
        hugeicons: "ShieldIcon",
        phosphor: "LockIcon",
        remixicon: "RiLockLine",
      },
    },
    {
      name: "Advanced",
      icon: {
        lucide: "SettingsIcon",
        tabler: "IconSettings",
        hugeicons: "SettingsIcon",
        phosphor: "GearIcon",
        remixicon: "RiSettingsLine",
      },
    },
  ],
}

@Component({
  selector: "kui-settings-dialog",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <ng-container kuiDialog [(open)]="open">
      <button kuiButton kuiDialogTrigger size="sm">Open Dialog</button>
      <div kuiDialogContent [sx]="styles.dialogContent">
        <h2 kuiDialogTitle [sx]="styles.dialogTitle">Settings</h2>
        <p kuiDialogDescription [sx]="styles.dialogDescription">
          Customize your settings here.
        </p>
        <div kuiSidebarProvider [sx]="styles.sidebarProvider">
          <div
            kuiSidebar
            collapsible="none"
            [sx]="styles.settingsDialogSidebar"
          >
            <div kuiSidebarContent>
              <div kuiSidebarGroup>
                <div kuiSidebarGroupContent>
                  <ul kuiSidebarMenu>
                    @for (item of data.nav; track item.name) {
                      <li kuiSidebarMenuItem>
                        <a
                          kuiSidebarMenuButton
                          [isActive]="item.name === 'Messages & media'"
                          href="#"
                        >
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
                          <span>{{ item.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <main [sx]="styles.settingsDialogMain">
            <header [sx]="styles.settingsDialogHeader">
              <div [sx]="styles.settingsDialogDiv">
                <nav kuiBreadcrumb>
                  <ol kuiBreadcrumbList>
                    <li kuiBreadcrumbItem [sx]="styles.breadcrumbItem">
                      <a kuiBreadcrumbLink href="#">Settings</a>
                    </li>
                    <li
                      kuiBreadcrumbSeparator
                      [sx]="styles.breadcrumbSeparator"
                    ></li>
                    <li kuiBreadcrumbItem>
                      <span kuiBreadcrumbPage>Messages & media</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </header>
            <div [sx]="styles.div2">
              @for (_ of Array.from({ length: 10 }); track i; let i = $index) {
                <div [sx]="styles.div3"></div>
              }
            </div>
          </main>
        </div>
      </div>
    </ng-container>
  `,
})
export class SettingsDialog {
  protected readonly open = signal(true)
  protected readonly styles = styles
  protected readonly data = data
  protected readonly Array = Array
}
