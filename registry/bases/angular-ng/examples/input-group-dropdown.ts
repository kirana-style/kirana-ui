import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"

const styles = {
  gridWFullMaxWSmGap4: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[4] },
  }),
  pr15TextXs: css({
    paddingRight: { "*": null, base: spacing(1.5) },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  size3: css({
    width: { "*": null, base: space[3] },
    height: { "*": null, base: space[3] },
  }),
}

@Component({
  selector: "input-group-dropdown",
  imports: [
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWSmGap4">
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Enter file name" />
          <div kuiInputGroupAddon align="inline-end">
            <ng-container kuiDropdownMenu>
              <button
                kuiInputGroupButton
                kuiDropdownMenuTrigger
                variant="ghost"
                aria-label="More"
                size="icon-xs"
              >
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                ></svg>
              </button>
              <div
                kuiDropdownMenuContent
                align="end"
                [sideOffset]="8"
                [alignOffset]="-4"
              >
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>Settings</div>
                  <div kuiDropdownMenuItem>Copy path</div>
                  <div kuiDropdownMenuItem>Open location</div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Enter search query" />
          <div kuiInputGroupAddon align="inline-end">
            <ng-container kuiDropdownMenu>
              <button
                kuiInputGroupButton
                kuiDropdownMenuTrigger
                variant="ghost"
                [sx]="styles.pr15TextXs"
              >
                Search In...
                <svg
                  iconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  [sx]="styles.size3"
                ></svg>
              </button>
              <div
                kuiDropdownMenuContent
                align="end"
                [sideOffset]="8"
                [alignOffset]="-4"
              >
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>Documentation</div>
                  <div kuiDropdownMenuItem>Blog Posts</div>
                  <div kuiDropdownMenuItem>Changelog</div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupDropdown {
  protected readonly styles = styles
  protected readonly page = page
}
