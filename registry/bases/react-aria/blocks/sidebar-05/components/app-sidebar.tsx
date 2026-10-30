"use client"

import * as React from "react"

import { SearchForm } from "./search-form"
import { Collapsible, CollapsibleContent } from "../../../ui/collapsible"
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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { collapsibleScope } from "../../../../../styles/collapsible.styles"
import { sidebarMenuButton } from "../../../../../styles/sidebar.styles"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"

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
  iconPlaceholder2: css({
    marginLeft: "auto",
    display: { [sidebarMenuButton.within('[aria-expanded="true"]')]: "none" },
  }),
  iconPlaceholder3: css({
    marginLeft: "auto",
    display: {
      base: "none",
      [sidebarMenuButton.within('[aria-expanded="true"]')]: "block",
    },
  }),
}

// This is sample data.
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
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="#" size="lg">
              <div sx={styles.appSidebarDiv}>
                <IconPlaceholder
                  lucide="GalleryVerticalEndIcon"
                  tabler="IconLayoutRows"
                  hugeicons="LayoutBottomIcon"
                  phosphor="RowsIcon"
                  remixicon="RiGalleryLine"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </div>
              <div sx={styles.div2}>
                <span sx={styles.appSidebarSpan}>Documentation</span>
                <span>v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultExpanded={index === 1}
                sx={collapsibleScope.anchor}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton slot="trigger">
                    {item.title}{" "}
                    <IconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                      {...styleProps(styles.iconPlaceholder2)}
                    />
                    <IconPlaceholder
                      lucide="MinusIcon"
                      tabler="IconMinus"
                      hugeicons="MinusSignIcon"
                      phosphor="MinusIcon"
                      remixicon="RiSubtractLine"
                      {...styleProps(styles.iconPlaceholder3)}
                    />
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              href={subItem.url}
                              isActive={subItem.isActive}
                            >
                              {subItem.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
