import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { duration, easing } from "../../../../../core/scales"
import {
  collapsibleScope,
  OPEN,
} from "../../../../../styles/collapsible.styles"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"
import { Sidebar07Icon } from "./sidebar07-icon"

const styles = {
  // A section of the menu, read by its chevron (`group/collapsible`).
  section: css(collapsibleScope.anchor),
  // Turns to point down while its section is open.
  chevron: css({
    marginInlineStart: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.base]: "90deg" },
  }),
}

@Component({
  selector: "kui-nav-main",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Sidebar07Icon,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
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
      <div kuiSidebarGroupLabel>Platform</div>
      <ul kuiSidebarMenu>
        @for (item of items(); track item.title) {
          <li
            kuiSidebarMenuItem
            kuiCollapsible
            [defaultOpen]="item.isActive"
            [sx]="styles.section"
          >
            <button
              kuiSidebarMenuButton
              kuiCollapsibleTrigger
              [tooltip]="item.title"
            >
              @if (item.icon) {
                <kui-sidebar07-icon [icon]="item.icon" />
              }
              <span>{{ item.title }}</span>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                [sx]="styles.chevron"
              ></svg>
            </button>
            <div kuiCollapsibleContent>
              <ul kuiSidebarMenuSub>
                @for (subItem of item.items; track subItem.title) {
                  <li kuiSidebarMenuSubItem>
                    <a kuiSidebarMenuSubButton [attr.href]="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </li>
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
      icon?: {
        lucide: string
        tabler: string
        hugeicons: string
        phosphor: string
        remixicon: string
      }
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  >()
  protected readonly styles = styles
}
