import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  pl2: css({ paddingLeft: { "*": null, base: space[2] } }),
  w44: css({ width: { "*": null, base: space[44] } }),
}

export default function ButtonGroupDropdown() {
  return (
    <div sx={page.example}>
      <ButtonGroup>
        <Button variant="outline">Follow</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" sx={styles.pl2} />}
          >
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sx={styles.w44}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="VolumeOffIcon"
                  tabler="IconVolume"
                  hugeicons="VolumeOffIcon"
                  phosphor="SpeakerSlashIcon"
                  remixicon="RiVolumeMuteLine"
                />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="AlertTriangleIcon"
                  tabler="IconAlertTriangle"
                  hugeicons="AlertCircleIcon"
                  phosphor="WarningIcon"
                  remixicon="RiErrorWarningLine"
                />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserRoundXIcon"
                  tabler="IconUserX"
                  hugeicons="UserRemove01Icon"
                  phosphor="UserMinusIcon"
                  remixicon="RiUserUnfollowLine"
                />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ShareIcon"
                  tabler="IconShare2"
                  hugeicons="Share03Icon"
                  phosphor="ShareIcon"
                  remixicon="RiShareLine"
                />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
                Copy Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <IconPlaceholder
                  lucide="TrashIcon"
                  tabler="IconTrash"
                  hugeicons="DeleteIcon"
                  phosphor="TrashIcon"
                  remixicon="RiDeleteBinLine"
                />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  )
}
