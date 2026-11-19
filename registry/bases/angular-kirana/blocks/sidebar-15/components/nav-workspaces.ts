import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"

const styles = {
  sidebarMenuAction: css({
    left: space[2],
    backgroundColor: theme.sidebarAccent,
    color: theme.sidebarAccentForeground,
    rotate: { "[data-open]": "90deg" },
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

@Component({
  selector: "kui-nav-workspaces",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup>
      <div kuiSidebarGroupLabel>Workspaces</div>
      <div kuiSidebarGroupContent>
        <ul kuiSidebarMenu>
          @for (workspace of workspaces(); track workspace.name) {
            <div kuiCollapsible>
              <li kuiSidebarMenuItem>
                <a kuiSidebarMenuButton href="#">
                  <span>{{ workspace.emoji }}</span>
                  <span>{{ workspace.name }}</span>
                </a>
                <button
                  kuiCollapsibleTrigger
                  kuiSidebarMenuAction
                  dataSlot="sidebar-menu-action"
                  [sx]="styles.sidebarMenuAction"
                  showOnHover
                >
                  <svg
                    iconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  ></svg>
                </button>
                <button kuiSidebarMenuAction showOnHover>
                  <svg
                    iconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  ></svg>
                </button>
                <div kuiCollapsibleContent>
                  <ul kuiSidebarMenuSub>
                    @for (page of workspace.pages; track page.name) {
                      <li kuiSidebarMenuSubItem>
                        <a kuiSidebarMenuSubButton href="#">
                          <span>{{ page.emoji }}</span>
                          <span>{{ page.name }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              </li>
            </div>
          }
          <li kuiSidebarMenuItem>
            <button kuiSidebarMenuButton [sx]="styles.sidebarMenuButton">
              <svg
                iconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              ></svg>
              <span>More</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class NavWorkspaces {
  readonly workspaces = input.required<
    {
      name: string
      emoji: unknown
      pages: {
        name: string
        emoji: unknown
      }[]
    }[]
  >()
  protected readonly styles = styles
}
