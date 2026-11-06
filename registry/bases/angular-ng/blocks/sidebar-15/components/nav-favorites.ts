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
import { radius, theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"

const styles = {
  sidebarGroup: css({
    display: { [COLLAPSED]: "none" },
  }),
  sidebarMenuAction: css({
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
  }),
  navFavoritesSpan: css({
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
    width: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
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
  iconPlaceholder4: css({
    color: theme.mutedForeground,
  }),
  sidebarMenuButton: css({
    color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
  }),
}

@Component({
  selector: "kui-nav-favorites",
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
    <div kuiSidebarGroup [sx]="styles.sidebarGroup">
      <div kuiSidebarGroupLabel>Favorites</div>
      <ul kuiSidebarMenu>
        @for (item of favorites(); track item.name) {
          <li kuiSidebarMenuItem>
            <a
              kuiSidebarMenuButton
              [attr.href]="item.url"
              [attr.title]="item.name"
            >
              <span>{{ item.emoji }}</span>
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
                <span [sx]="styles.navFavoritesSpan">More</span>
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
                    lucide="StarOffIcon"
                    tabler="IconStarOff"
                    hugeicons="StarOffIcon"
                    phosphor="StarIcon"
                    remixicon="RiStarOffLine"
                    [sx]="styles.iconPlaceholder"
                  ></svg>
                  <span>Remove from Favorites</span>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="LinkIcon"
                    tabler="IconLink"
                    hugeicons="LinkIcon"
                    phosphor="LinkIcon"
                    remixicon="RiLinksLine"
                    [sx]="styles.iconPlaceholder2"
                  ></svg>
                  <span>Copy Link</span>
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ArrowUpRightIcon"
                    tabler="IconArrowUpRight"
                    hugeicons="ArrowUpRightIcon"
                    phosphor="ArrowUpRightIcon"
                    remixicon="RiArrowRightUpLine"
                    [sx]="styles.iconPlaceholder3"
                  ></svg>
                  <span>Open in New Tab</span>
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
                    [sx]="styles.iconPlaceholder4"
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
            ></svg>
            <span>More</span>
          </button>
        </li>
      </ul>
    </div>
  `,
})
export class NavFavorites {
  readonly favorites = input.required<
    {
      name: string
      url: string
      emoji: string
    }[]
  >()
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly styles = styles
}
