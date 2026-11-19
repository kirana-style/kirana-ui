import { Component, input, linkedSignal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
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
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"
import { Sidebar15Icon } from "./sidebar15-icon"

const styles = {
  sidebarMenuButton: css({
    width: { "*": null, base: "fit-content" },
    paddingInline: { "*": null, base: space["1.5"] },
    backgroundColor: { '[aria-expanded="true"]': theme.muted },
    color: { '[aria-expanded="true"]': theme.foreground },
  }),
  teamSwitcherDiv: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[5],
    height: space[5],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  teamSwitcherSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder: css({
    opacity: "50%",
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[64] },
    borderRadius: { "*": null, base: radius.lg },
  }),
  dropdownMenuLabel: css({
    fontSize: { "*": null, base: fontSize.xs },
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  // `gap-2 p-2`, over the menu item's own.
  dropdownMenuItem: css({
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space[2] },
  }),
  div2: css({
    // Tailwind's `rounded-xs`, outside the radius scale.
    borderRadius: "0.125rem",
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  dropdownMenuItem2: css({
    gap: { "*": null, base: space[2] },
    padding: { "*": null, base: space[2] },
  }),
  div3: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: theme.background,
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
  div4: css({
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
    Sidebar15Icon,
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
              [sx]="styles.sidebarMenuButton"
            >
              <div [sx]="styles.teamSwitcherDiv">
                @if (activeTeam().logo) {
                  <kui-sidebar15-icon [icon]="activeTeam().logo" />
                }
              </div>
              <span [sx]="styles.teamSwitcherSpan">{{
                activeTeam().name
              }}</span>
              <svg
                iconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                [sx]="styles.iconPlaceholder"
              ></svg>
            </button>
            <div
              kuiDropdownMenuContent
              [sx]="styles.dropdownMenuContent"
              align="start"
              side="bottom"
              [sideOffset]="4"
            >
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuLabel [sx]="styles.dropdownMenuLabel">
                  Teams
                </div>
                @for (team of teams(); track team.name; let index = $index) {
                  <div
                    kuiDropdownMenuItem
                    (click)="activeTeam.set(team)"
                    [sx]="styles.dropdownMenuItem"
                  >
                    <div [sx]="styles.div2">
                      @if (team.logo) {
                        <kui-sidebar15-icon [icon]="team.logo" />
                      }
                    </div>
                    {{ team.name }}
                    <span kuiDropdownMenuShortcut>⌘{{ index + 1 }}</span>
                  </div>
                }
              </div>
              <div kuiDropdownMenuSeparator></div>
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuItem [sx]="styles.dropdownMenuItem2">
                  <div [sx]="styles.div3">
                    <svg
                      iconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                      [sx]="styles.iconPlaceholder2"
                    ></svg>
                  </div>
                  <div [sx]="styles.div4">Add team</div>
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
  protected readonly activeTeam = linkedSignal(() => this.teams()[0])
  protected readonly styles = styles
}
