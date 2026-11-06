import { Component, input } from "@angular/core"
import type { SxInput } from "@kirana-style/angular"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { Sidebar15Icon } from "./sidebar15-icon"

@Component({
  selector: "kui-nav-secondary",
  imports: [
    Sidebar15Icon,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup [sx]="sx()">
      <div kuiSidebarGroupContent>
        <ul kuiSidebarMenu>
          @for (item of items(); track item.title) {
            <li kuiSidebarMenuItem>
              <a kuiSidebarMenuButton [attr.href]="item.url">
                @if (item.icon) {
                  <kui-sidebar15-icon [icon]="item.icon" />
                }
                <span>{{ item.title }}</span>
              </a>
              @if (item.badge) {
                <div kuiSidebarMenuBadge>{{ item.badge }}</div>
              }
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class NavSecondary {
  /** Styles for its root, as Vue's component gives its root the caller's. */
  readonly sx = input<SxInput>()
  readonly items = input.required<
    {
      title: string
      url: string
      icon: {
        lucide: string
        tabler: string
        hugeicons: string
        phosphor: string
        remixicon: string
      }
      badge?: unknown
    }[]
  >()
}
