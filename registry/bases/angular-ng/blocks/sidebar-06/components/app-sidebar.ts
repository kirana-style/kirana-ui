import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../../ui/sidebar"
import { NavMain } from "./nav-main"
import { SidebarOptInForm } from "./sidebar-opt-in-form"

const styles = {
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
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
    lineHeight: "1",
  }),
  appSidebarSpan: css({
    fontWeight: fontWeight.medium,
  }),
  div3: css({
    padding: space[1],
  }),
}

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
}

@Component({
  selector: "kui-app-sidebar",
  imports: [
    NavMain,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarOptInForm,
    SidebarRail,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar>
      <div kuiSidebarHeader>
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton size="lg" href="#">
              <div [sx]="styles.appSidebarDiv">
                <svg
                  iconPlaceholder
                  lucide="GalleryVerticalEndIcon"
                  tabler="IconLayoutRows"
                  hugeicons="LayoutBottomIcon"
                  phosphor="RowsIcon"
                  remixicon="RiGalleryLine"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </div>
              <div [sx]="styles.div2">
                <span [sx]="styles.appSidebarSpan">Documentation</span>
                <span>v1.0.0</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div kuiSidebarContent>
        <kui-nav-main [items]="data.navMain" />
      </div>
      <div kuiSidebarFooter>
        <div [sx]="styles.div3">
          <kui-sidebar-opt-in-form />
        </div>
      </div>
      <button kuiSidebarRail></button>
    </div>
  `,
})
export class AppSidebar {
  protected readonly styles = styles
  protected readonly data = data
}
