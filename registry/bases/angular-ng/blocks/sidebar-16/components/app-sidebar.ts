import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

const styles = {
  appSidebarSidebar: css({
    // Upstream's `--header-height`, the site header's.
    top: { "*": null, base: space[14] },
    height: { "*": null, base: `calc(100svh - ${space[14]})` },
  }),
  appSidebarDiv: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[8],
    height: space[8],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  div2: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  appSidebarSpan: css({
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
  appSidebarNavSecondary: css({
    marginTop: "auto",
  }),
}

const data = {
  user: {
    name: "kirana",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  },
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
        lucide: "BookOpenIcon",
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
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: {
        lucide: "LifeBuoyIcon",
        tabler: "IconLifebuoy",
        hugeicons: "ChartRingIcon",
        phosphor: "LifebuoyIcon",
        remixicon: "RiLifebuoyLine",
      },
    },
    {
      title: "Feedback",
      url: "#",
      icon: {
        lucide: "SendIcon",
        tabler: "IconSend",
        hugeicons: "SentIcon",
        phosphor: "PaperPlaneTiltIcon",
        remixicon: "RiSendPlaneLine",
      },
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
  selector: "kui-app-sidebar",
  imports: [
    NavMain,
    NavProjects,
    NavSecondary,
    NavUser,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar [sx]="styles.appSidebarSidebar">
      <div kuiSidebarHeader>
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton size="lg" href="#">
              <div [sx]="styles.appSidebarDiv">
                <svg
                  iconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </div>
              <div [sx]="styles.div2">
                <span [sx]="styles.appSidebarSpan">Acme Inc</span>
                <span [sx]="styles.span2">Enterprise</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div kuiSidebarContent>
        <kui-nav-main [items]="data.navMain" />
        <kui-nav-projects [projects]="data.projects" />
        <kui-nav-secondary
          [items]="data.navSecondary"
          [sx]="styles.appSidebarNavSecondary"
        />
      </div>
      <div kuiSidebarFooter>
        <kui-nav-user [user]="data.user" />
      </div>
    </div>
  `,
})
export class AppSidebar {
  protected readonly styles = styles
  protected readonly data = data
}
