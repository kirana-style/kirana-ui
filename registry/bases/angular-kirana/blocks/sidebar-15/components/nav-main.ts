import { Component, input } from "@angular/core"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { Sidebar15Icon } from "./sidebar15-icon"

@Component({
  selector: "kui-nav-main",
  imports: [Sidebar15Icon, SidebarMenu, SidebarMenuButton, SidebarMenuItem],
  host: { style: "display: contents" },
  template: `
    <ul kuiSidebarMenu>
      @for (item of items(); track item.title) {
        <li kuiSidebarMenuItem>
          <a
            kuiSidebarMenuButton
            [isActive]="item.isActive"
            [attr.href]="item.url"
          >
            @if (item.icon) {
              <kui-sidebar15-icon [icon]="item.icon" />
            }
            <span>{{ item.title }}</span>
          </a>
        </li>
      }
    </ul>
  `,
})
export class NavMain {
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
      isActive?: boolean
    }[]
  >()
}
