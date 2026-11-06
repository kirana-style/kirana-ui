import { Component, input, linkedSignal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontWeight, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar"

const styles = {
  sidebarMenuButton: css({
    backgroundColor: { "[data-open]": theme.sidebarAccent },
    color: { "[data-open]": theme.sidebarAccentForeground },
  }),
  versionSwitcherDiv: css({
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
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
    lineHeight: "1",
  }),
  versionSwitcherSpan: css({
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder2: css({
    marginLeft: "auto",
  }),
  iconPlaceholder3: css({
    marginLeft: "auto",
  }),
}

@Component({
  selector: "kui-version-switcher",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <ul kuiSidebarMenu>
      <li kuiSidebarMenuItem>
        <ng-container kuiDropdownMenu>
          <button
            kuiSidebarMenuButton
            kuiDropdownMenuTrigger
            size="lg"
            [sx]="styles.sidebarMenuButton"
          >
            <div [sx]="styles.versionSwitcherDiv">
              <svg
                iconPlaceholder
                lucide="GalleryVerticalEndIcon"
                tabler="IconLayoutRows"
                hugeicons="LayoutBottomIcon"
                phosphor="RowsIcon"
                remixicon="RiGalleryLine"
                [sx]="styles.iconPlaceholder"
              ></svg>
            </div>
            <div [sx]="styles.div2">
              <span [sx]="styles.versionSwitcherSpan">Documentation</span>
              <span>v{{ selectedVersion() }}</span>
            </div>
            <svg
              iconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
              [sx]="styles.iconPlaceholder2"
            ></svg>
          </button>
          <div kuiDropdownMenuContent align="start">
            @for (version of versions(); track version) {
              <div kuiDropdownMenuItem (select)="selectedVersion.set(version)">
                v{{ version }}
                {{ " " }}
                @if (version === selectedVersion()) {
                  <svg
                    iconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                    [sx]="styles.iconPlaceholder3"
                  ></svg>
                }
              </div>
            }
          </div>
        </ng-container>
      </li>
    </ul>
  `,
})
export class VersionSwitcher {
  readonly versions = input.required<string[]>()
  readonly defaultVersion = input.required<string>()
  protected readonly selectedVersion = linkedSignal(() => this.defaultVersion())
  protected readonly styles = styles
}
