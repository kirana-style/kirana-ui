import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { format } from "date-fns"
import { fontWeight, space, spacing } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
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
  selector: "kui-date-picker-simple",
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
    <div kuiExample title="Date Picker Simple">
      <div kuiField [sx]="styles.w72">
        <label kuiFieldLabel for="date-picker-simple">Date</label>
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date-picker-simple"
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
            @if (date(); as chosen) {
              {{ format(chosen, "PPP") }}
            } @else {
              <span>Pick a date()</span>
            }
          </button>
          <div kuiPopoverContent [sx]="styles.wAutoP0" align="start">
            <div kuiCalendar mode="single" [(selected)]="date"></div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class DatePickerSimple {
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly format = format
}
