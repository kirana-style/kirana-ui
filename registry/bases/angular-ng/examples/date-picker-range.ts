import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { addDays, format } from "date-fns"
import { Calendar } from "../ui/calendar"
import type { DateRange } from "../ui/calendar"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  datePickerWithRangeField: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[60] },
  }),
  datePickerWithRangeButton: css({
    justifyContent: { "*": null, base: "flex-start" },
    paddingInline: { "*": null, base: space["2.5"] },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  datePickerWithRangePopoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

@Component({
  selector: "date-picker-range",
  imports: [
    Button,
    Calendar,
    Field,
    FieldLabel,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.datePickerWithRangeField">
        <label kuiFieldLabel for="date-picker-range">Date Picker Range</label>
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date-picker-range"
            [sx]="styles.datePickerWithRangeButton"
          >
            <svg
              iconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            ></svg>
            @if (date()?.from; as from) {
              @if (date()?.to; as to) {
                <!-- Text in a fragment, which React's Button leaves without a label. -->
                <span style="display: contents"
                  >{{ format(from, "LLL dd, y") }} -
                  {{ format(to, "LLL dd, y") }}</span
                >
              } @else {
                {{ format(from, "LLL dd, y") }}
              }
            } @else {
              <span>Pick a date()</span>
            }
          </button>
          <div
            kuiPopoverContent
            [sx]="styles.datePickerWithRangePopoverContent"
            align="start"
          >
            <div
              kuiCalendar
              mode="range"
              [defaultMonth]="date()?.from"
              [(selected)]="date"
              [numberOfMonths]="2"
            ></div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DatePickerRange {
  protected readonly date = signal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  protected readonly styles = styles
  protected readonly format = format
  protected readonly page = page
}
