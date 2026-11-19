import { Component } from "@angular/core"
import { IconPlaceholder } from "../../../../../icons/angular"
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
import { Tree } from "./tree"

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

@Component({
  selector: "kui-app-sidebar",
  imports: [
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
    Tree,
    IconPlaceholder,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar>
      <div kuiSidebarContent>
        <div kuiSidebarGroup>
          <div kuiSidebarGroupLabel>Changes</div>
          <div kuiSidebarGroupContent>
            <ul kuiSidebarMenu>
              @for (item of data.changes; track index; let index = $index) {
                <li kuiSidebarMenuItem>
                  <button kuiSidebarMenuButton>
                    <svg
                      iconPlaceholder
                      lucide="FileIcon"
                      tabler="IconFile"
                      hugeicons="FileIcon"
                      phosphor="FileIcon"
                      remixicon="RiFileLine"
                    ></svg>
                    {{ item.file }}
                  </button>
                  <div kuiSidebarMenuBadge>{{ item.state }}</div>
                </li>
              }
            </ul>
          </div>
        </div>
        <div kuiSidebarGroup>
          <div kuiSidebarGroupLabel>Files</div>
          <div kuiSidebarGroupContent>
            <ul kuiSidebarMenu>
              @for (item of data.tree; track index; let index = $index) {
                <kui-tree [item]="item" />
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
  protected readonly data = data
}
