<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import SearchForm from "./SearchForm.svelte"
  import VersionSwitcher from "./VersionSwitcher.svelte"
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
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
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

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
</script>

<Sidebar {...rest} sx={[className as Sx]}>
  <SidebarHeader>
    <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
    <SearchForm />
  </SidebarHeader>
  <SidebarContent sx={styles.sidebarContent}>
    <!-- We create a collapsible SidebarGroup for each parent. -->
    {#each data.navMain as item (item.title)}
      <Collapsible title={item.title} defaultOpen sx={collapsibleScope.anchor}>
        <SidebarGroup>
          <SidebarGroupLabel sx={styles.sidebarGroupLabel}>
            {#snippet asChild(props)}
              <CollapsibleTrigger {...props()}>
                {item.title}{" "}
                <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={styles.iconPlaceholder} />
              </CollapsibleTrigger>
            {/snippet}
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {#each item.items as subItem (subItem.title)}
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={subItem.isActive}>
                      {#snippet asChild(props)}
                        <a {...props()} href={subItem.url}>
                          {subItem.title}
                        </a>
                      {/snippet}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {/each}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    {/each}
  </SidebarContent>
  <SidebarRail />
</Sidebar>
