import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../../../ui/sidebar"

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
  appSidebarA: css({
    fontWeight: { "*": null, base: fontWeight.medium },
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
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
}

@Component({
  selector: "kui-app-sidebar",
  imports: [
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
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
        <div kuiSidebarGroup>
          <ul kuiSidebarMenu>
            @for (item of data.navMain; track item.title) {
              <li kuiSidebarMenuItem>
                <a
                  kuiSidebarMenuButton
                  [attr.href]="item.url"
                  [sx]="styles.appSidebarA"
                  >{{ item.title }}</a
                >
                @if (item.items?.length) {
                  <ul kuiSidebarMenuSub>
                    @for (subItem of item.items; track subItem.title) {
                      <li kuiSidebarMenuSubItem>
                        <a
                          kuiSidebarMenuSubButton
                          [isActive]="subItem.isActive"
                          [attr.href]="subItem.url"
                          >{{ subItem.title }}</a
                        >
                      </li>
                    }
                  </ul>
                }
              </li>
            }
          </ul>
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
