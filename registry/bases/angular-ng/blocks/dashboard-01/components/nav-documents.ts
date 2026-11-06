import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Dashboard01Icon } from "./dashboard01-icon"

const styles = {
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuAction: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navDocumentsSpan: css({
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
  dropdownMenuContent: css({
    width: { "*": null, base: space[24] },
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
  iconPlaceholder: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

@Component({
  selector: "kui-nav-documents",
  imports: [
    Dashboard01Icon,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup [sx]="styles.sidebarGroup">
      <div kuiSidebarGroupLabel>Documents</div>
      <ul kuiSidebarMenu>
        @for (item of items(); track item.name) {
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton [attr.href]="item.url">
              @if (item.icon) {
                <kui-dashboard01-icon [icon]="item.icon" />
              }
              <span>{{ item.name }}</span>
            </a>
            <ng-container kuiDropdownMenu>
              <button
                kuiSidebarMenuAction
                kuiDropdownMenuTrigger
                showOnHover
                [sx]="styles.sidebarMenuAction"
              >
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                ></svg>
                <span [sx]="styles.navDocumentsSpan">More</span>
              </button>
              <div
                kuiDropdownMenuContent
                [sx]="styles.dropdownMenuContent"
                [side]="isMobile() ? 'bottom' : 'right'"
                [align]="isMobile() ? 'end' : 'start'"
              >
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="Folder01Icon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  ></svg>
                  <span>Open</span>
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ShareIcon"
                    tabler="IconShare3"
                    hugeicons="Share01Icon"
                    phosphor="ShareIcon"
                    remixicon="RiShareLine"
                  ></svg>
                  <span>Share</span>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuItem variant="destructive">
                  <svg
                    iconPlaceholder
                    lucide="Trash2Icon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  ></svg>
                  <span>Delete</span>
                </div>
              </div>
            </ng-container>
          </li>
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
              [sx]="styles.iconPlaceholder"
            ></svg>
            <span>More</span>
          </button>
        </li>
      </ul>
    </div>
  `,
})
export class NavDocuments {
  readonly items = input.required<
    {
      name: string
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
  protected readonly i18n = useSidebar()
  protected readonly isMobile = this.i18n.isMobile
  protected readonly styles = styles
}
