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
import { Sidebar08Icon } from "./sidebar08-icon"

const styles = {
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuAction: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navProjectsSpan: css({
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
    width: { "*": null, base: space[48] },
  }),
  iconPlaceholder: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder2: css({
    color: theme.mutedForeground,
  }),
  iconPlaceholder3: css({
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "kui-nav-projects",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Sidebar08Icon,
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
      <div kuiSidebarGroupLabel>Projects</div>
      <ul kuiSidebarMenu>
        @for (item of projects(); track item.name) {
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton [attr.href]="item.url">
              @if (item.icon) {
                <kui-sidebar08-icon [icon]="item.icon" />
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
                <span [sx]="styles.navProjectsSpan">More</span>
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
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                    [sx]="styles.iconPlaceholder"
                  ></svg>
                  <span>View Project</span>
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ShareIcon"
                    tabler="IconShare2"
                    hugeicons="Share03Icon"
                    phosphor="ShareIcon"
                    remixicon="RiShareLine"
                    [sx]="styles.iconPlaceholder2"
                  ></svg>
                  <span>Share Project</span>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="Trash2Icon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                    [sx]="styles.iconPlaceholder3"
                  ></svg>
                  <span>Delete Project</span>
                </div>
              </div>
            </ng-container>
          </li>
        }
        <li kuiSidebarMenuItem>
          <button kuiSidebarMenuButton>
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
  `,
})
export class NavProjects {
  readonly projects = input.required<
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
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly styles = styles
}
