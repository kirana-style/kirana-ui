import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function AppSidebar(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
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
    sidebarMenu: css({
      gap: { "*": null, base: space[2] },
    }),
    appSidebarA: css({
      fontWeight: { "*": null, base: fontWeight.medium },
    }),
    sidebarMenuSub: css({
      marginLeft: { "*": null, base: space["0"] },
      borderLeftWidth: { "*": null, base: "0px" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderLeftColor: theme.border,
      borderStyle: { "*": null, base: "solid" },
      paddingInline: { "*": null, base: space["1.5"] },
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
    <Sidebar variant="floating" {...rest} class={local.class} sx={[local.sx]}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild={(childProps) => (
                <a {...childProps()} href="#">
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
                </a>
              )}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu sx={styles.sidebarMenu}>
            <For each={data.navMain}>
              {(item) => (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild={(childProps) => (
                      <a
                        {...childProps()}
                        href={item.url}
                        {...styleProps(childProps().class, styles.appSidebarA)}
                      >
                        {item.title}
                      </a>
                    )}
                  />
                  <Show when={item.items?.length}>
                    <SidebarMenuSub sx={styles.sidebarMenuSub}>
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
