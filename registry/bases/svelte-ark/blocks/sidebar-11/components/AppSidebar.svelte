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
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
  } from "../../../ui/sidebar"
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import Tree from "./Tree.svelte"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const data = {
    changes: [
      {
        file: "README.md",
        state: "M",
      },
      {
        file: "api/hello/route.ts",
        state: "U",
      },
      {
        file: "app/layout.tsx",
        state: "M",
      },
    ],
    tree: [
      [
        "app",
        [
          "api",
          ["hello", ["route.ts"]],
          "page.tsx",
          "layout.tsx",
          ["blog", ["page.tsx"]],
        ],
      ],
      [
        "components",
        ["ui", "button.tsx", "card.tsx"],
        "header.tsx",
        "footer.tsx",
      ],
      ["lib", ["util.ts"]],
      ["public", "favicon.ico", "vercel.svg"],
      ".eslintrc.json",
      ".gitignore",
      "next.config.js",
      "tailwind.config.js",
      "package.json",
      "README.md",
    ],
  }
</script>

<Sidebar {...rest} sx={[className as Sx]}>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>
        Changes
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.changes as item, index (index)}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconPlaceholder lucide="FileIcon" tabler="IconFile" hugeicons="FileIcon" phosphor="FileIcon" remixicon="RiFileLine" />
                {item.file}
              </SidebarMenuButton>
              <SidebarMenuBadge>
                {item.state}
              </SidebarMenuBadge>
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    <SidebarGroup>
      <SidebarGroupLabel>
        Files
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.tree as item, index (index)}
            <Tree item={item} />
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarRail />
</Sidebar>
