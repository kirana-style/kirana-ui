<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

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
  import { css } from "@kirana-style/core"
  import { fontWeight } from "../../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
</script>

<Sidebar {...rest} sx={className as Sx}>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>
        Table of Contents
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.navMain as item (item.title)}
            <SidebarMenuItem>
              <SidebarMenuButton>
                {#snippet asChild(props)}
                  <a {...props()} class={props().class} style={props().style} href={item.url} sx={styles.appSidebarA}>
                    {item.title}
                  </a>
                {/snippet}
              </SidebarMenuButton>
              {#if item.items?.length}
                <SidebarMenuSub>
                  {#each item.items as subItem (subItem.title)}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton isActive={subItem.isActive}>
                        {#snippet asChild(props)}
                          <a {...props()} href={subItem.url}>
                            {subItem.title}
                          </a>
                        {/snippet}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  {/each}
                </SidebarMenuSub>
              {/if}
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarRail />
</Sidebar>
