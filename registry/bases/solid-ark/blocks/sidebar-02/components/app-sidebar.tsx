import { SearchForm } from "./search-form"
import { VersionSwitcher } from "./version-switcher"
import { For, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
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
import { IconPlaceholder } from "../../../ui/icon-placeholder"
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
import type { Sx } from "@kirana-style/core"

export function AppSidebar(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
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

  return (
    <Sidebar {...rest} class={local.class} sx={[local.sx]}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent sx={styles.sidebarContent}>
        <For each={data.navMain}>
          {(item) => (
            <Collapsible
              title={item.title}
              defaultOpen
              sx={collapsibleScope.anchor}
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  sx={styles.sidebarGroupLabel}
                  asChild={(childProps) => (
                    <CollapsibleTrigger {...childProps()}>
                      {item.title}{" "}
                      <IconPlaceholder
                        lucide="ChevronRightIcon"
                        tabler="IconChevronRight"
                        hugeicons="ArrowRight01Icon"
                        phosphor="CaretRightIcon"
                        remixicon="RiArrowRightSLine"
                        {...styleProps(styles.iconPlaceholder)}
                      />
                    </CollapsibleTrigger>
                  )}
                />
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <For each={item.items}>
                        {(subItem) => (
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              isActive={subItem.isActive}
                              asChild={(childProps) => (
                                <a {...childProps()} href={subItem.url}>
                                  {subItem.title}
                                </a>
                              )}
                            />
                          </SidebarMenuItem>
                        )}
                      </For>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}
        </For>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
