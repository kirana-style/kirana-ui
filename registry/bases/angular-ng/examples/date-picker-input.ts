import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  field: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[48] },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  popoverContent: css({
    width: { "*": null, base: "auto" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

@Component({
  selector: "date-picker-input",
  imports: [
    Calendar,
    Field,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.field">
        <label kuiFieldLabel for="date-required">Subscription Date</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="date-required"
            [value]="value()"
            placeholder="June 01, 2025"
            (input)="typed($any($event.target).value)"
            (keydown)="arrow($event)"
          />
          <div kuiInputGroupAddon align="inline-end">
            <ng-container kuiPopover [(open)]="open">
              <button
                kuiInputGroupButton
                kuiPopoverTrigger
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <svg
                  iconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                ></svg>
                <span [sx]="styles.span">Select date()</span>
              </button>
              <div
                kuiPopoverContent
                [sx]="styles.popoverContent"
                align="end"
                [alignOffset]="-8"
                [sideOffset]="10"
              >
                <div
                  kuiCalendar
                  mode="single"
                  [selected]="date()"
                  [(month)]="month"
                  (selectedChange)="picked($any($event))"
                ></div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class DatePickerInput {
  protected readonly open = signal(false)
  protected readonly date = signal<Date | undefined>(new Date("2025-06-01"))
  protected readonly month = signal<Date | undefined>(this.date())
  protected readonly value = signal(formatDate(this.date()))
  protected readonly styles = styles
  protected readonly formatDate = formatDate
  protected readonly isValidDate = isValidDate
  protected readonly page = page

  protected typed(text: string) {
    this.value.set(text)
    const parsed = new Date(text)
    if (isValidDate(parsed)) {
      this.date.set(parsed)
      this.month.set(parsed)
    }
  }

  protected arrow(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.open.set(true)
    }
  }

  protected picked(selected: Date | undefined) {
    this.date.set(selected)
    this.value.set(formatDate(selected))
    this.open.set(false)
  }
}
