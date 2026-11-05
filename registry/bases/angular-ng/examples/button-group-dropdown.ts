import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  pl2: css({ paddingLeft: { "*": null, base: space[2] } }),
  w44: css({ width: { "*": null, base: space[44] } }),
}

@Component({
  selector: "button-group-dropdown",
  imports: [
    Button,
    ButtonGroup,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <button kuiButton variant="outline">Follow</button>
        <ng-container kuiDropdownMenu>
          <button
            kuiButton
            kuiDropdownMenuTrigger
            variant="outline"
            [sx]="styles.pl2"
          >
            <svg
              iconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
            ></svg>
          </button>
          <div kuiDropdownMenuContent align="end" [sx]="styles.w44">
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="VolumeOffIcon"
                  tabler="IconVolume"
                  hugeicons="VolumeOffIcon"
                  phosphor="SpeakerSlashIcon"
                  remixicon="RiVolumeMuteLine"
                ></svg>
                Mute Conversation
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
                Mark as Read
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="AlertTriangleIcon"
                  tabler="IconAlertTriangle"
                  hugeicons="AlertCircleIcon"
                  phosphor="WarningIcon"
                  remixicon="RiErrorWarningLine"
                ></svg>
                Report Conversation
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="UserRoundXIcon"
                  tabler="IconUserX"
                  hugeicons="UserRemove01Icon"
                  phosphor="UserMinusIcon"
                  remixicon="RiUserUnfollowLine"
                ></svg>
                Block User
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="ShareIcon"
                  tabler="IconShare2"
                  hugeicons="Share03Icon"
                  phosphor="ShareIcon"
                  remixicon="RiShareLine"
                ></svg>
                Share Conversation
              </div>
              <div kuiDropdownMenuItem>
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
                Copy Conversation
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem variant="destructive">
                <svg
                  iconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                ></svg>
                Delete Conversation
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ButtonGroupDropdown {
  protected readonly styles = styles
  protected readonly page = page
}
