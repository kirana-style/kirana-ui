import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { format } from "date-fns"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  fieldGroup: css({
    marginInline: { "*": null, base: "auto" },
    maxWidth: { "*": null, base: containerSize.xs },
    flexDirection: { "*": null, base: "row" },
  }),
  button: css({
    width: { "*": null, base: space[32] },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  popoverContent: css({
    width: { "*": null, base: "auto" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  field: css({
    width: { "*": null, base: space[32] },
  }),
  input: css({
    appearance: { "*": null, base: "none" },
    backgroundColor: theme.background,
    "::-webkit-calendar-picker-indicator": {
      display: "none",
      appearance: "none",
    },
  }),
}

@Component({
  selector: "date-picker-time",
  imports: [
    Button,
    Calendar,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.fieldGroup">
        <div kuiField>
          <label kuiFieldLabel for="date-picker-optional">Date</label>
          <ng-container kuiPopover [(open)]="open">
            <button
              kuiButton
              kuiPopoverTrigger
              variant="outline"
              id="date-picker-optional"
              [sx]="styles.button"
            >
              {{ date() ? format(date()!, "PPP") : "Select date" }}
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
                [selected]="date()"
                captionLayout="dropdown"
                [defaultMonth]="date()"
                (selectedChange)="date.set($any($event)); open.set(false)"
              ></div>
            </div>
          </ng-container>
        </div>
        <div kuiField [sx]="styles.field">
          <label kuiFieldLabel for="time-picker-optional">Time</label>
          <input
            kuiInput
            type="time"
            id="time-picker-optional"
            step="1"
            value="10:30:00"
            [sx]="styles.input"
          />
        </div>
      </div>
    </div>
  `,
})
export default class DatePickerTime {
  protected readonly open = signal(false)
  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly format = format
  protected readonly page = page
}
