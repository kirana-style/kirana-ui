import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { addDays, format } from "date-fns"
import { Calendar } from "../../ui/calendar"
import type { DateRange } from "../../ui/calendar"
import { fontWeight, space, spacing } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

const styles = {
  wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
  justifyStartPx25FontNorm: css({
    justifyContent: "flex-start",
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
}

@Component({
  selector: "kui-date-picker-with-range",
  imports: [
    Button,
    Calendar,
    Example,
    Field,
    FieldLabel,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Date Picker Range">
      <div kuiField [sx]="styles.w72">
        <label kuiFieldLabel for="date-picker-range">Date Picker Range</label>
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date-picker-range"
            [sx]="styles.justifyStartPx25FontNorm"
          >
            <svg
              iconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
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
          <div kuiPopoverContent [sx]="styles.wAutoP0" align="start">
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
export class DatePickerWithRange {
  protected readonly date = signal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  protected readonly styles = styles
  protected readonly format = format
}
