import { Component, input, linkedSignal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

const styles = {
  teamSwitcherSidebarMenuButton: css({
    backgroundColor: { '[data-state="open"]': theme.sidebarAccent },
    color: { '[data-state="open"]': theme.sidebarAccentForeground },
  }),
  teamSwitcherDiv: css({
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
  teamSwitcherDiv2: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  teamSwitcherSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  teamSwitcherSpan2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  teamSwitcherIconPlaceholder: css({
    marginLeft: "auto",
  }),
  teamSwitcherDropdownMenuContent: css({
    width: { "*": null, base: "var(--radix-dropdown-menu-trigger-width)" },
    minWidth: { "*": null, base: space[56] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  teamSwitcherDropdownMenuLabel: css({
    fontSize: { "*": null, base: fontSize.xs },
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  teamSwitcherDropdownMenuItem: css({
    gap: space[2],
    padding: space[2],
  }),
  teamSwitcherDiv3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  teamSwitcherDropdownMenuItem2: css({
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space[2] },
  }),
  teamSwitcherDiv4: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: "transparent",
  }),
  teamSwitcherIconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
  teamSwitcherDiv5: css({
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
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
              [sx]="styles.teamSwitcherSidebarMenuButton"
            >
              <div [sx]="styles.teamSwitcherDiv">
                @if (activeTeam().logo) {
                  <svg
                    iconPlaceholder
                    [lucide]="activeTeam().logo.lucide"
                    [tabler]="activeTeam().logo.tabler"
                    [hugeicons]="activeTeam().logo.hugeicons"
                    [phosphor]="activeTeam().logo.phosphor"
                    [remixicon]="activeTeam().logo.remixicon"
                  ></svg>
                }
              </div>
              <div [sx]="styles.teamSwitcherDiv2">
                <span [sx]="styles.teamSwitcherSpan">{{
                  activeTeam().name
                }}</span>
                <span [sx]="styles.teamSwitcherSpan2">{{
                  activeTeam().plan
                }}</span>
              </div>
              <svg
                iconPlaceholder
                lucide="ChevronsUpDownIcon"
                tabler="IconSelector"
                hugeicons="UnfoldMoreIcon"
                phosphor="CaretUpDownIcon"
                remixicon="RiArrowUpDownLine"
                [sx]="styles.teamSwitcherIconPlaceholder"
              ></svg>
            </button>
            <div
              kuiDropdownMenuContent
              [sx]="styles.teamSwitcherDropdownMenuContent"
              align="start"
              [side]="isMobile() ? 'bottom' : 'right'"
              [sideOffset]="4"
            >
              <div kuiDropdownMenuGroup>
                <div
                  kuiDropdownMenuLabel
                  [sx]="styles.teamSwitcherDropdownMenuLabel"
                >
                  Teams
                </div>
                @for (team of teams(); track team.name; let index = $index) {
                  <div
                    kuiDropdownMenuItem
                    (click)="activeTeam.set(team)"
                    [sx]="styles.teamSwitcherDropdownMenuItem"
                  >
                    <div [sx]="styles.teamSwitcherDiv3">
                      @if (team.logo) {
                        <svg
                          iconPlaceholder
                          [lucide]="team.logo.lucide"
                          [tabler]="team.logo.tabler"
                          [hugeicons]="team.logo.hugeicons"
                          [phosphor]="team.logo.phosphor"
                          [remixicon]="team.logo.remixicon"
                        ></svg>
                      }
                    </div>
                    {{ team.name }}
                    <span kuiDropdownMenuShortcut>⌘{{ index + 1 }}</span>
                  </div>
                }
              </div>
              <div kuiDropdownMenuSeparator></div>
              <div kuiDropdownMenuGroup>
                <div
                  kuiDropdownMenuItem
                  [sx]="styles.teamSwitcherDropdownMenuItem2"
                >
                  <div [sx]="styles.teamSwitcherDiv4">
                    <svg
                      iconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                      [sx]="styles.teamSwitcherIconPlaceholder2"
                    ></svg>
                  </div>
                  <div [sx]="styles.teamSwitcherDiv5">Add team</div>
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
  // The first team until the reader picks another, as React's `useState(teams[0])`.
  protected readonly activeTeam = linkedSignal(() => this.teams()[0])
  protected readonly styles = styles
}
