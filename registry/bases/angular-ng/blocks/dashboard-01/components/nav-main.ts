import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { theme } from "../../../../../core/tokens"
import { duration, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { Dashboard01Icon } from "./dashboard01-icon"

const styles = {
  sidebarGroupContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  sidebarMenuItem: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
  sidebarMenuButton: css({
    minWidth: { "*": null, base: space[8] },
    backgroundColor: {
      base: theme.primary,
      ":hover": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
    },
    color: {
      base: theme.primaryForeground,
      ":hover": theme.primaryForeground,
      ":active": theme.primaryForeground,
    },
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
  }),
  navMainButton: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    opacity: { [COLLAPSED]: "0%" },
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
    Button,
    Dashboard01Icon,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup>
      <div kuiSidebarGroupContent [sx]="styles.sidebarGroupContent">
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem [sx]="styles.sidebarMenuItem">
            <button
              kuiSidebarMenuButton
              tooltip="Quick Create"
              [sx]="styles.sidebarMenuButton"
            >
              <svg
                iconPlaceholder
                lucide="CirclePlusIcon"
                tabler="IconCirclePlusFilled"
                hugeicons="PlusSignCircleIcon"
                phosphor="PlusCircleIcon"
                remixicon="RiAddCircleFill"
              ></svg>
              <span>Quick Create</span>
            </button>
            <button
              kuiButton
              size="icon"
              [sx]="styles.navMainButton"
              variant="outline"
            >
              <svg
                iconPlaceholder
                lucide="MailIcon"
                tabler="IconMail"
                hugeicons="Mail01Icon"
                phosphor="EnvelopeIcon"
                remixicon="RiMailLine"
              ></svg>
              <span [sx]="styles.navMainSpan">Inbox</span>
            </button>
          </li>
        </ul>
        <ul kuiSidebarMenu>
          @for (item of items(); track item.title) {
            <li kuiSidebarMenuItem>
              <button kuiSidebarMenuButton [tooltip]="item.title">
                @if (item.icon) {
                  <kui-dashboard01-icon [icon]="item.icon" />
                }
                <span>{{ item.title }}</span>
              </button>
            </li>
          }
        </ul>
      </div>
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
    }[]
  >()
  protected readonly styles = styles
}
