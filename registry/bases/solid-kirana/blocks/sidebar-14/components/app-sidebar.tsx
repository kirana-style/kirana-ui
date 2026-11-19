import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { fontWeight } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function AppSidebar(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
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

  return (
    <Sidebar {...rest} class={local.class} sx={[local.sx]}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={data.navMain}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild={(childProps) => (
                        <a
                          {...childProps()}
                          href={item.url}
                          {...styleProps(
                            childProps().class,
                            styles.appSidebarA
                          )}
                        >
                          {item.title}
                        </a>
                      )}
                    />
                    <Show when={item.items?.length}>
                      <SidebarMenuSub>
                        <For each={item.items}>
                          {(subItem) => (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={subItem.isActive}
                                asChild={(childProps) => (
                                  <a {...childProps()} href={subItem.url}>
                                    {subItem.title}
                                  </a>
                                )}
                              />
                            </SidebarMenuSubItem>
                          )}
                        </For>
                      </SidebarMenuSub>
                    </Show>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
