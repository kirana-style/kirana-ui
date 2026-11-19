import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../../../ui/sidebar"
import { Sidebar08Icon } from "./sidebar08-icon"

const styles = {
  sidebarMenuAction: css({
    rotate: { '[aria-expanded="true"]': "90deg" },
  }),
  navMainSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
}

@Component({
  selector: "kui-nav-main",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Sidebar08Icon,
    SidebarGroup,
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
      <div kuiSidebarGroupLabel>Platform</div>
      <ul kuiSidebarMenu>
        @for (item of items(); track item.title) {
          <li kuiSidebarMenuItem kuiCollapsible [defaultOpen]="item.isActive">
            <a
              kuiSidebarMenuButton
              [tooltip]="item.title"
              [attr.href]="item.url"
            >
              @if (item.icon) {
                <kui-sidebar08-icon [icon]="item.icon" />
              }
              <span>{{ item.title }}</span>
            </a>
            @if (item.items?.length) {
              <button
                kuiSidebarMenuAction
                kuiCollapsibleTrigger
                [sx]="styles.sidebarMenuAction"
              >
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                ></svg>
                <span [sx]="styles.navMainSpan">Toggle</span>
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
            }
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
      icon: {
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
