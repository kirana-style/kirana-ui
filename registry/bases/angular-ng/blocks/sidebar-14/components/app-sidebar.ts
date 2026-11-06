import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../../../core/scales"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../../../ui/sidebar"

const styles = {
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
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar [side]="side()">
      <div kuiSidebarContent>
        <div kuiSidebarGroup>
          <div kuiSidebarGroupLabel>Table of Contents</div>
          <div kuiSidebarGroupContent>
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
      </div>
      <button kuiSidebarRail></button>
    </div>
  `,
})
export class AppSidebar {
  readonly side = input<"left" | "right">("left")
  protected readonly styles = styles
  protected readonly data = data
}
