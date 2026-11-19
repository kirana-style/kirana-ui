import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { format } from "date-fns"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  datePickerSimpleField: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[44] },
  }),
  datePickerSimpleButton: css({
    justifyContent: { "*": null, base: "flex-start" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  datePickerSimplePopoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

@Component({
  selector: "date-picker-basic",
  imports: [
    Button,
    Calendar,
    Field,
    FieldLabel,
    Popover,
    PopoverContent,
    PopoverTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.datePickerSimpleField">
        <label kuiFieldLabel for="date-picker-simple">Date</label>
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date-picker-simple"
            [sx]="styles.datePickerSimpleButton"
          >
            @if (date(); as chosen) {
              {{ format(chosen, "PPP") }}
            } @else {
              <span>Pick a date()</span>
            }
          </button>
          <div
            kuiPopoverContent
            [sx]="styles.datePickerSimplePopoverContent"
            align="start"
          >
            <div
              kuiCalendar
              mode="single"
              [(selected)]="date"
              [defaultMonth]="date()"
            ></div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DatePickerBasic {
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly format = format
  protected readonly page = page
}
