import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { duration, easing } from "../../../../core/scales"
import { collapsibleScope, OPEN } from "../../../../styles/collapsible.styles"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../ui/sidebar"

const styles = {
  navMainIconPlaceholder: css({
    marginLeft: "auto",
    transitionDuration: duration[200],
    transitionProperty: "transform, translate, scale, rotate",
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
          <div
            kuiCollapsible
            [defaultOpen]="item.isActive"
            [sx]="collapsibleAnchor"
          >
            <li kuiSidebarMenuItem>
              <button
                kuiSidebarMenuButton
                kuiCollapsibleTrigger
                [tooltip]="item.title"
              >
                @if (item.icon) {
                  <svg
                    iconPlaceholder
                    [lucide]="item.icon.lucide"
                    [tabler]="item.icon.tabler"
                    [hugeicons]="item.icon.hugeicons"
                    [phosphor]="item.icon.phosphor"
                    [remixicon]="item.icon.remixicon"
                  ></svg>
                }
                <span>{{ item.title }}</span>
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                  [sx]="styles.navMainIconPlaceholder"
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
          </div>
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
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
