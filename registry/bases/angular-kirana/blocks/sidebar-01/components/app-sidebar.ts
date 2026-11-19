import { Component } from "@angular/core"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../../ui/sidebar"
import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-switcher"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
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
    SearchForm,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    VersionSwitcher,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar>
      <div kuiSidebarHeader>
        <kui-version-switcher
          [versions]="data.versions"
          [defaultVersion]="data.versions[0]"
        />
        <kui-search-form />
      </div>
      <div kuiSidebarContent>
        @for (item of data.navMain; track item.title) {
          <div kuiSidebarGroup>
            <div kuiSidebarGroupLabel>{{ item.title }}</div>
            <div kuiSidebarGroupContent>
              <ul kuiSidebarMenu>
                @for (subItem of item.items; track subItem.title) {
                  <li kuiSidebarMenuItem>
                    <a
                      kuiSidebarMenuButton
                      [isActive]="subItem.isActive"
                      [attr.href]="subItem.url"
                      >{{ subItem.title }}</a
                    >
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
      <button kuiSidebarRail></button>
    </div>
  `,
})
export class AppSidebar {
  protected readonly data = data
}
