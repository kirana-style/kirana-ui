import { Component, input } from "@angular/core"
import type { SxInput } from "@kirana-style/angular"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { Dashboard01Icon } from "./dashboard01-icon"

@Component({
  selector: "kui-nav-secondary",
  imports: [
    Dashboard01Icon,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
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
                  <kui-dashboard01-icon [icon]="item.icon" />
                }
                <span>{{ item.title }}</span>
              </a>
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
    }[]
  >()
}
