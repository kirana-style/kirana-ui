import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { format } from "date-fns"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  button: css({
    width: { "*": null, base: "212px" },
    justifyContent: { "*": null, base: "space-between" },
    textAlign: { "*": null, base: "left" },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: { '[data-empty="true"]': theme.mutedForeground },
  }),
  popoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

@Component({
  selector: "date-picker-demo",
  imports: [
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiPopover>
        <button
          kuiButton
          kuiPopoverTrigger
          variant="outline"
          [attr.data-empty]="!date()"
          [sx]="styles.button"
        >
          @if (date(); as chosen) {
            {{ format(chosen, "PPP") }}
          } @else {
            <span>Pick a date()</span>
          }
          <svg
            iconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            data-icon="inline-end"
          ></svg>
        </button>
        <div kuiPopoverContent [sx]="styles.popoverContent" align="start">
          <div
            kuiCalendar
            mode="single"
            [(selected)]="date"
            [defaultMonth]="date()"
          ></div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DatePickerDemo {
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly format = format
  protected readonly page = page
}
