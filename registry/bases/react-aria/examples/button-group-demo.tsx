import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  hiddenSmFlex: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "flex" },
  }),
  w40: css({ width: { "*": null, base: space[40] } }),
}

export default function ButtonGroupDemo() {
  const [label, setLabel] = React.useState("personal")

  return (
    <div sx={page.example}>
      <ButtonGroup>
        <ButtonGroup sx={styles.hiddenSmFlex}>
          <Button variant="outline" size="icon" aria-label="Go Back">
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Snooze</Button>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" aria-label="More Options">
              <IconPlaceholder
                lucide="MoreHorizontalIcon"
                tabler="IconDots"
                hugeicons="MoreHorizontalCircle01Icon"
                phosphor="DotsThreeOutlineIcon"
                remixicon="RiMoreLine"
              />
            </Button>
            <DropdownMenu placement="bottom end" sx={styles.w40}>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="MailCheckIcon"
                    tabler="IconMailCheck"
                    hugeicons="MailValidation01Icon"
                    phosphor="EnvelopeIcon"
                    remixicon="RiMailCheckLine"
                  />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ArchiveIcon"
                    tabler="IconArchive"
                    hugeicons="Archive02Icon"
                    phosphor="ArchiveIcon"
                    remixicon="RiArchiveLine"
                  />
                  Archive
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ClockIcon"
                    tabler="IconClock"
                    hugeicons="Clock01Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                  />
                  Snooze
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="CalendarPlusIcon"
                    tabler="IconCalendarPlus"
                    hugeicons="CalendarAdd01Icon"
                    phosphor="CalendarPlusIcon"
                    remixicon="RiCalendarEventLine"
                  />
                  Add to Calendar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ListFilterIcon"
                    tabler="IconFilter"
                    hugeicons="FilterHorizontalIcon"
                    phosphor="FunnelIcon"
                    remixicon="RiFilterLine"
                  />
                  Add to List
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconPlaceholder
                      lucide="TagIcon"
                      tabler="IconTag"
                      hugeicons="Tag01Icon"
                      phosphor="TagIcon"
                      remixicon="RiPriceTag3Line"
                    />
                    Label As...
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    selectionMode="single"
                    selectedKeys={[label]}
                    onSelectionChange={(keys) =>
                      setLabel(keys === "all" ? label : String([...keys][0]))
                    }
                  >
                    <DropdownMenuItem id="personal">Personal</DropdownMenuItem>
                    <DropdownMenuItem id="work">Work</DropdownMenuItem>
                    <DropdownMenuItem id="other">Other</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <IconPlaceholder
                    lucide="Trash2Icon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                  Trash
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
