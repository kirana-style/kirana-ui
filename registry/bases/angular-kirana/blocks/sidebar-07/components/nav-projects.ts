import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { alpha, theme } from "../../../../../core/tokens"
import { COLLAPSED } from "../../../../../styles/sidebar.styles"
import { visuallyHidden } from "../../../../../styles/visually-hidden.styles"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Sidebar07Icon } from "./sidebar07-icon"

const styles = {
  // Hidden while the sidebar is collapsed to its icons.
  group: css({ display: { [COLLAPSED]: "none" } }),
  action: css({ backgroundColor: { '[aria-expanded="true"]': theme.muted } }),
  // `w-fit`, as upstream's bases write it.
  menu: css({ width: { "*": null, base: "fit-content" } }),
  quiet: css({ color: alpha.sidebarForeground70 }),
}

@Component({
  selector: "kui-nav-projects",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Sidebar07Icon,
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
    <div kuiSidebarGroup [sx]="styles.group">
      <div kuiSidebarGroupLabel>Projects</div>
      <ul kuiSidebarMenu>
        @for (item of projects(); track item.name) {
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton [attr.href]="item.url">
              @if (item.icon) {
                <kui-sidebar07-icon [icon]="item.icon" />
              }
              <span>{{ item.name }}</span>
            </a>
            <ng-container kuiDropdownMenu>
              <button
                kuiSidebarMenuAction
                kuiDropdownMenuTrigger
                showOnHover
                [sx]="styles.action"
              >
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                ></svg>
                <span [sx]="visuallyHidden">More</span>
              </button>
              <div
                kuiDropdownMenuContent
                [sx]="styles.menu"
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
                  ></svg>
                  <span>View Project</span>
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ArrowRightIcon"
                    tabler="IconArrowForward"
                    hugeicons="ArrowRightIcon"
                    phosphor="ShareFatIcon"
                    remixicon="RiShareForwardLine"
                  ></svg>
                  <span>Share Project</span>
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
                  <span>Delete Project</span>
                </div>
              </div>
            </ng-container>
          </li>
        }
        <li kuiSidebarMenuItem>
          <button kuiSidebarMenuButton [sx]="styles.quiet">
            <svg
              iconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeOutlineIcon"
              remixicon="RiMoreLine"
              [sx]="styles.quiet"
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
  protected readonly visuallyHidden = visuallyHidden
}
