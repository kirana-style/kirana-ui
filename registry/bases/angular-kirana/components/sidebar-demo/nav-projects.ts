import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import { space } from "../../../../core/scales"
import { COLLAPSED } from "../../../../styles/sidebar.styles"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const styles = {
  navProjectsSidebarGroup: css({
    display: { [COLLAPSED]: "none" },
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
  navProjectsDropdownMenuContent: css({
    width: { "*": null, base: space[48] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  navProjectsIconPlaceholder: css({
    color: theme.mutedForeground,
  }),
  navProjectsIconPlaceholder2: css({
    color: theme.mutedForeground,
  }),
  navProjectsIconPlaceholder3: css({
    color: theme.mutedForeground,
  }),
  navProjectsSidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
  navProjectsIconPlaceholder4: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
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
    <div kuiSidebarGroup [sx]="styles.navProjectsSidebarGroup">
      <div kuiSidebarGroupLabel>Projects</div>
      <ul kuiSidebarMenu>
        @for (item of projects(); track item.name) {
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton [attr.href]="item.url">
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
              <span>{{ item.name }}</span>
            </a>
            <ng-container kuiDropdownMenu>
              <button kuiSidebarMenuAction kuiDropdownMenuTrigger showOnHover>
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
                [sx]="styles.navProjectsDropdownMenuContent"
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
                    [sx]="styles.navProjectsIconPlaceholder"
                  ></svg>
                  <span>View Project</span>
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ForwardIcon"
                    tabler="IconCornerUpRight"
                    hugeicons="RedoIcon"
                    phosphor="ArrowBendUpRightIcon"
                    remixicon="RiCornerUpRightLine"
                    [sx]="styles.navProjectsIconPlaceholder2"
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
                    [sx]="styles.navProjectsIconPlaceholder3"
                  ></svg>
                  <span>Delete Project</span>
                </div>
              </div>
            </ng-container>
          </li>
        }
        <li kuiSidebarMenuItem>
          <button
            kuiSidebarMenuButton
            [sx]="styles.navProjectsSidebarMenuButton"
          >
            <svg
              iconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
              [sx]="styles.navProjectsIconPlaceholder4"
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
