import { Component, input, linkedSignal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { radius, theme } from "../../../../../core/tokens"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Sidebar07Icon } from "./sidebar07-icon"

const styles = {
  trigger: css({
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
  }),
  logo: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[8],
    height: space[8],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  // The team's name over its plan, each cut short to the room there is.
  text: css({
    display: "grid",
    flex: 1,
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  name: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  plan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  chevron: css({ marginInlineStart: "auto" }),
  // `w-fit`, as upstream's bases write it.
  menu: css({ width: { "*": null, base: "fit-content" } }),
  label: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  // `gap-2 p-2`, which win over every style's.
  item: css({
    gap: { "*": null, base: space[2] },
    paddingBlock: { "*": null, base: space[2] },
    paddingInlineStart: { "*": null, base: space[2] },
    paddingInlineEnd: { "*": null, base: space[2] },
  }),
  badge: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  plus: css({ backgroundColor: "transparent" }),
  plusIcon: css({ width: space[4], height: space[4] }),
  add: css({ fontWeight: fontWeight.medium, color: theme.mutedForeground }),
}

@Component({
  selector: "kui-team-switcher",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    Sidebar07Icon,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (!!activeTeam()) {
      <ul kuiSidebarMenu>
        <li kuiSidebarMenuItem>
          <ng-container kuiDropdownMenu>
            <button
              kuiSidebarMenuButton
              kuiDropdownMenuTrigger
              size="lg"
              [sx]="styles.trigger"
            >
              <div [sx]="styles.logo">
                @if (activeTeam().logo) {
                  <kui-sidebar07-icon [icon]="activeTeam().logo" />
                }
              </div>
              <div [sx]="styles.text">
                <span [sx]="styles.name">{{ activeTeam().name }}</span>
                <span [sx]="styles.plan">{{ activeTeam().plan }}</span>
              </div>
              <svg
                iconPlaceholder
                lucide="ChevronsUpDownIcon"
                tabler="IconSelector"
                hugeicons="UnfoldMoreIcon"
                phosphor="CaretUpDownIcon"
                remixicon="RiArrowUpDownLine"
                [sx]="styles.chevron"
              ></svg>
            </button>
            <div
              kuiDropdownMenuContent
              [sx]="styles.menu"
              align="start"
              [side]="isMobile() ? 'bottom' : 'right'"
              [sideOffset]="4"
            >
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuLabel [sx]="styles.label">Teams</div>
                @for (team of teams(); track team.name; let index = $index) {
                  <div
                    kuiDropdownMenuItem
                    (click)="activeTeam.set(team)"
                    [sx]="styles.item"
                  >
                    <div [sx]="styles.badge">
                      @if (team.logo) {
                        <kui-sidebar07-icon [icon]="team.logo" />
                      }
                    </div>
                    {{ team.name }}
                    <span kuiDropdownMenuShortcut>⌘{{ index + 1 }}</span>
                  </div>
                }
              </div>
              <div kuiDropdownMenuSeparator></div>
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuItem [sx]="styles.item">
                  <div [sx]="[styles.badge, styles.plus]">
                    <svg
                      iconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                      [sx]="styles.plusIcon"
                    ></svg>
                  </div>
                  <div [sx]="styles.add">Add team</div>
                </div>
              </div>
            </div>
          </ng-container>
        </li>
      </ul>
    }
  `,
})
export class TeamSwitcher {
  readonly teams = input.required<
    {
      name: string
      logo: {
        lucide: string
        tabler: string
        hugeicons: string
        phosphor: string
        remixicon: string
      }
      plan: string
    }[]
  >()
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly activeTeam = linkedSignal(() => this.teams()[0])
  protected readonly styles = styles
}
