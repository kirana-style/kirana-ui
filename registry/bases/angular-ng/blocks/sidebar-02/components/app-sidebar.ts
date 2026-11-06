import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  OPEN,
  collapsibleScope,
} from "../../../../../styles/collapsible.styles"
import { theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
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

const styles = {
  sidebarContent: css({
    gap: { "*": null, base: space["0"] },
  }),
  sidebarGroupLabel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.base]: "90deg" },
  }),
}

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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
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
    IconPlaceholder,
    SxDirective,
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
      <div kuiSidebarContent [sx]="styles.sidebarContent">
        <!-- We create a collapsible SidebarGroup for each parent. -->
        @for (item of data.navMain; track item.title) {
          <div
            kuiCollapsible
            [attr.title]="item.title"
            defaultOpen
            [sx]="collapsibleAnchor"
          >
            <div kuiSidebarGroup>
              <button
                kuiCollapsibleTrigger
                kuiSidebarGroupLabel
                dataSlot="sidebar-group-label"
                [sx]="styles.sidebarGroupLabel"
              >
                {{ item.title }}
                {{ " " }}
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
            </div>
          </div>
        }
      </div>
      <button kuiSidebarRail></button>
    </div>
  `,
})
export class AppSidebar {
  protected readonly styles = styles
  protected readonly data = data
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
