import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  hiddenSmFlex: css({
    display: { "*": null, base: "none", [breakpoint.sm]: "flex" },
  }),
  w40: css({ width: { "*": null, base: space[40] } }),
}

@Component({
  selector: "button-group-demo",
  imports: [
    Button,
    ButtonGroup,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <div kuiButtonGroup [sx]="styles.hiddenSmFlex">
          <button kuiButton variant="outline" size="icon" aria-label="Go Back">
            <svg
              iconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            ></svg>
          </button>
        </div>
        <div kuiButtonGroup>
          <button kuiButton variant="outline">Archive</button>
          <button kuiButton variant="outline">Report</button>
        </div>
        <div kuiButtonGroup>
          <button kuiButton variant="outline">Snooze</button>
          <ng-container kuiDropdownMenu>
            <button
              kuiButton
              kuiDropdownMenuTrigger
              variant="outline"
              size="icon"
              aria-label="More Options"
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
            <div kuiDropdownMenuContent align="end" [sx]="styles.w40">
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="MailCheckIcon"
                    tabler="IconMailCheck"
                    hugeicons="MailValidation01Icon"
                    phosphor="EnvelopeIcon"
                    remixicon="RiMailCheckLine"
                  ></svg>
                  Mark as Read
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ArchiveIcon"
                    tabler="IconArchive"
                    hugeicons="Archive02Icon"
                    phosphor="ArchiveIcon"
                    remixicon="RiArchiveLine"
                  ></svg>
                  Archive
                </div>
              </div>
              <div kuiDropdownMenuSeparator></div>
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ClockIcon"
                    tabler="IconClock"
                    hugeicons="Clock01Icon"
                    phosphor="ClockIcon"
                    remixicon="RiTimeLine"
                  ></svg>
                  Snooze
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="CalendarPlusIcon"
                    tabler="IconCalendarPlus"
                    hugeicons="CalendarAdd01Icon"
                    phosphor="CalendarPlusIcon"
                    remixicon="RiCalendarEventLine"
                  ></svg>
                  Add to Calendar
                </div>
                <div kuiDropdownMenuItem>
                  <svg
                    iconPlaceholder
                    lucide="ListFilterIcon"
                    tabler="IconFilter"
                    hugeicons="FilterHorizontalIcon"
                    phosphor="FunnelIcon"
                    remixicon="RiFilterLine"
                  ></svg>
                  Add to List
                </div>
                <ng-container kuiDropdownMenuSub>
                  <div kuiDropdownMenuSubTrigger>
                    <svg
                      iconPlaceholder
                      lucide="TagIcon"
                      tabler="IconTag"
                      hugeicons="Tag01Icon"
                      phosphor="TagIcon"
                      remixicon="RiPriceTag3Line"
                    ></svg>
                    Label As...
                  </div>
                  <div kuiDropdownMenuSubContent>
                    <div kuiDropdownMenuRadioGroup [(value)]="label">
                      <div kuiDropdownMenuRadioItem value="personal">
                        Personal
                      </div>
                      <div kuiDropdownMenuRadioItem value="work">Work</div>
                      <div kuiDropdownMenuRadioItem value="other">Other</div>
                    </div>
                  </div>
                </ng-container>
              </div>
              <div kuiDropdownMenuSeparator></div>
              <div kuiDropdownMenuGroup>
                <div kuiDropdownMenuItem variant="destructive">
                  <svg
                    iconPlaceholder
                    lucide="Trash2Icon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  ></svg>
                  Trash
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupDemo {
  protected readonly label = signal("personal")
  protected readonly styles = styles
  protected readonly page = page
}
