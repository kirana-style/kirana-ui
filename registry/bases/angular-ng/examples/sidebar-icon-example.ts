import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  breakpoint,
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../core/scales"
import { collapsibleScope, OPEN } from "../../../styles/collapsible.styles"
import { COLLAPSED, WRAPPER_COLLAPSED } from "../../../styles/sidebar.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
  }),
  button: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  div: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  span: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
    transitionDuration: duration[100],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.base]: "90deg" },
  }),
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuButton2: css({
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
  }),
  avatarFallback: css({
    borderRadius: { "*": null, base: radius.lg },
  }),
  div2: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  span3: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  span4: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  header: css({
    display: "flex",
    height: { base: space[16], [WRAPPER_COLLAPSED]: space[12] },
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    transitionProperty: "width,height",
    transitionDuration: "0.15s",
    transitionTimingFunction: "linear",
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  sidebarTrigger: css({
    marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
  }),
  div4: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    padding: space[4],
    paddingTop: space["0"],
  }),
  div5: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: space[4],
    gridTemplateColumns: { [breakpoint.md]: "repeat(3, minmax(0, 1fr))" },
  }),
  div6: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div7: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div8: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
  div9: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: "1 1 0%",
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

const data = {
  user: {
    name: "kirana",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  },
  teams: [
    {
      name: "Acme Inc",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: {
        lucide: "TerminalSquareIcon",
        tabler: "IconTerminal2",
        hugeicons: "ComputerTerminalIcon",
        phosphor: "TerminalIcon",
        remixicon: "RiTerminalBoxLine",
      },
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: {
        lucide: "BotIcon",
        tabler: "IconRobot",
        hugeicons: "RoboticIcon",
        phosphor: "RobotIcon",
        remixicon: "RiRobotLine",
      },
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: {
        lucide: "BookOpen",
        tabler: "IconBook",
        hugeicons: "BookOpen02Icon",
        phosphor: "BookOpenIcon",
        remixicon: "RiBookOpenLine",
      },
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: {
        lucide: "Settings2Icon",
        tabler: "IconSettings",
        hugeicons: "Settings05Icon",
        phosphor: "GearIcon",
        remixicon: "RiSettingsLine",
      },
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: {
        lucide: "FrameIcon",
        tabler: "IconFrame",
        hugeicons: "CropIcon",
        phosphor: "CropIcon",
        remixicon: "RiCropLine",
      },
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: {
        lucide: "PieChartIcon",
        tabler: "IconChartPie",
        hugeicons: "PieChartIcon",
        phosphor: "ChartPieIcon",
        remixicon: "RiPieChartLine",
      },
    },
    {
      name: "Travel",
      url: "#",
      icon: {
        lucide: "MapIcon",
        tabler: "IconMap",
        hugeicons: "MapsIcon",
        phosphor: "MapTrifoldIcon",
        remixicon: "RiMapLine",
      },
    },
  ],
}

@Component({
  selector: "sidebar-icon-example",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiSidebarProvider>
      <div kuiSidebar collapsible="icon">
        <div kuiSidebarHeader>
          <ul kuiSidebarMenu>
            <li kuiSidebarMenuItem>
              <ng-container kuiDropdownMenu>
                <button
                  kuiSidebarMenuButton
                  kuiDropdownMenuTrigger
                  size="lg"
                  [sx]="styles.sidebarMenuButton"
                >
                  <span
                    kuiButton
                    size="icon-sm"
                    [attr.native-button]="false"
                    [sx]="styles.button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <line
                        x1="208"
                        y1="128"
                        x2="128"
                        y2="208"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      ></line>
                      <line
                        x1="192"
                        y1="40"
                        x2="40"
                        y2="192"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      ></line>
                    </svg>
                  </span>
                  <div [sx]="styles.div">
                    <span [sx]="styles.span">{{ activeTeam().name }}</span>
                    <span [sx]="styles.span2">{{ activeTeam().plan }}</span>
                  </div>
                  <svg
                    iconPlaceholder
                    lucide="ChevronsUpDownIcon"
                    tabler="IconSelector"
                    hugeicons="UnfoldMoreIcon"
                    phosphor="CaretUpDownIcon"
                    remixicon="RiArrowUpDownLine"
                  ></svg>
                </button>
                <div kuiDropdownMenuContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>Teams</div>
                  </div>
                  <div kuiDropdownMenuGroup>
                    @for (team of data.teams; track team.name) {
                      <div kuiDropdownMenuItem (click)="activeTeam.set(team)">
                        {{ team.name }}
                      </div>
                    }
                  </div>
                </div>
              </ng-container>
            </li>
          </ul>
        </div>
        <div kuiSidebarContent>
          <div kuiSidebarGroup>
            <div kuiSidebarGroupLabel>Platform</div>
            <ul kuiSidebarMenu>
              @for (item of data.navMain; track item.title) {
                <div
                  kuiCollapsible
                  [defaultOpen]="item.isActive"
                  [sx]="collapsibleAnchor"
                >
                  <li kuiSidebarMenuItem>
                    <button
                      kuiSidebarMenuButton
                      kuiCollapsibleTrigger
                      [tooltip]="item.title"
                    >
                      <svg
                        iconPlaceholder
                        [lucide]="item.icon.lucide"
                        [tabler]="item.icon.tabler"
                        [hugeicons]="item.icon.hugeicons"
                        [phosphor]="item.icon.phosphor"
                        [remixicon]="item.icon.remixicon"
                      ></svg>
                      <span>{{ item.title }}</span>
                      <svg
                        iconPlaceholder
                        lucide="ChevronRightIcon"
                        tabler="IconChevronRight"
                        hugeicons="ArrowRight01Icon"
                        phosphor="CaretRightIcon"
                        remixicon="RiArrowRightSLine"
                        [sx]="styles.iconPlaceholder"
                      ></svg>
                    </button>
                    <div kuiCollapsibleContent>
                      <ul kuiSidebarMenuSub>
                        @for (subItem of item.items; track subItem.title) {
                          <li kuiSidebarMenuSubItem>
                            <a
                              kuiSidebarMenuSubButton
                              [attr.href]="subItem.url"
                              >{{ subItem.title }}</a
                            >
                          </li>
                        }
                      </ul>
                    </div>
                  </li>
                </div>
              }
            </ul>
          </div>
          <div kuiSidebarGroup [sx]="styles.sidebarGroup">
            <div kuiSidebarGroupLabel>Projects</div>
            <ul kuiSidebarMenu>
              @for (item of data.projects; track item.name) {
                <li kuiSidebarMenuItem>
                  <a kuiSidebarMenuButton [attr.href]="item.url">
                    <svg
                      iconPlaceholder
                      [lucide]="item.icon.lucide"
                      [tabler]="item.icon.tabler"
                      [hugeicons]="item.icon.hugeicons"
                      [phosphor]="item.icon.phosphor"
                      [remixicon]="item.icon.remixicon"
                    ></svg>
                    {{ item.name }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
        <div kuiSidebarFooter>
          <ul kuiSidebarMenu>
            <li kuiSidebarMenuItem>
              <ng-container kuiDropdownMenu>
                <button
                  kuiSidebarMenuButton
                  kuiDropdownMenuTrigger
                  size="lg"
                  [sx]="styles.sidebarMenuButton2"
                >
                  <span kuiAvatar>
                    <img
                      kuiAvatarImage
                      [attr.src]="data.user.avatar"
                      [attr.alt]="data.user.name"
                    />
                    <span kuiAvatarFallback [sx]="styles.avatarFallback"
                      >CN</span
                    >
                  </span>
                  <div [sx]="styles.div2">
                    <span [sx]="styles.span3">{{ data.user.name }}</span>
                    <span [sx]="styles.span4">{{ data.user.email }}</span>
                  </div>
                  <svg
                    iconPlaceholder
                    lucide="ChevronsUpDownIcon"
                    tabler="IconSelector"
                    hugeicons="UnfoldMoreIcon"
                    phosphor="CaretUpDownIcon"
                    remixicon="RiArrowUpDownLine"
                  ></svg>
                </button>
                <div kuiDropdownMenuContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>
                      <div kuiItem size="xs">
                        <div kuiItemMedia>
                          <span kuiAvatar>
                            <img
                              kuiAvatarImage
                              [attr.src]="data.user.avatar"
                              [attr.alt]="data.user.name"
                            />
                            <span kuiAvatarFallback>CN</span>
                          </span>
                        </div>
                        <div kuiItemContent>
                          <div kuiItemTitle>{{ data.user.name }}</div>
                          <p kuiItemDescription>{{ data.user.email }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>Account</div>
                    <div kuiDropdownMenuItem>Billing</div>
                    <div kuiDropdownMenuItem>Settings</div>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>Log out</div>
                  </div>
                </div>
              </ng-container>
            </li>
          </ul>
        </div>
        <button kuiSidebarRail></button>
      </div>
      <main kuiSidebarInset>
        <header [sx]="styles.header">
          <div [sx]="styles.div3">
            <button kuiSidebarTrigger [sx]="styles.sidebarTrigger"></button>
          </div>
        </header>
        <div [sx]="styles.div4">
          <div [sx]="styles.div5">
            <div [sx]="styles.div6"></div>
            <div [sx]="styles.div7"></div>
            <div [sx]="styles.div8"></div>
          </div>
          <div [sx]="styles.div9"></div>
        </div>
      </main>
    </div>
  `,
})
export default class SidebarIconExample {
  protected readonly activeTeam = signal(data.teams[0])
  protected readonly styles = styles
  protected readonly data = data
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
