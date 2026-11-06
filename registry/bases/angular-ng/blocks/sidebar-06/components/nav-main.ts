import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
  }),
  dropdownMenuContent: css({
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
}

@Component({
  selector: "kui-nav-main",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup>
      <ul kuiSidebarMenu>
        @for (item of items(); track item.title) {
          <ng-container kuiDropdownMenu>
            <li kuiSidebarMenuItem>
              <button
                kuiSidebarMenuButton
                kuiDropdownMenuTrigger
                [sx]="styles.sidebarMenuButton"
              >
                {{ item.title }}
                {{ " " }}
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                  [sx]="styles.iconPlaceholder"
                ></svg>
              </button>
              @if (item.items?.length) {
                <div
                  kuiDropdownMenuContent
                  [side]="isMobile() ? 'bottom' : 'right'"
                  [align]="isMobile() ? 'end' : 'start'"
                  [sx]="styles.dropdownMenuContent"
                >
                  @for (subItem of item.items; track subItem.title) {
                    <a kuiDropdownMenuItem [attr.href]="subItem.url">{{
                      subItem.title
                    }}</a>
                  }
                </div>
              }
            </li>
          </ng-container>
        }
      </ul>
    </div>
  `,
})
export class NavMain {
  readonly items = input.required<
    {
      title: string
      url: string
      icon?: unknown
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  >()
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly styles = styles
}
