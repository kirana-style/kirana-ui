import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
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
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

@Component({
  selector: "date-picker-dob",
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
        <label kuiFieldLabel for="date()">Date of birth</label>
        <ng-container kuiPopover [(open)]="open">
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            id="date()"
            [sx]="styles.datePickerSimpleButton"
          >
            {{ date()?.toLocaleDateString() ?? "Select date" }}
          </button>
          <div
            kuiPopoverContent
            [sx]="styles.datePickerSimplePopoverContent"
            align="start"
          >
            <div
              kuiCalendar
              mode="single"
              [selected]="date()"
              [defaultMonth]="date()"
              captionLayout="dropdown"
              (selectedChange)="date.set($any($event)); open.set(false)"
            ></div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DatePickerDob {
  protected readonly open = signal(false)
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly page = page
}
