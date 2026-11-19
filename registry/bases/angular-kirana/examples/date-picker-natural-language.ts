import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { parseDate } from "chrono-node"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
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
    maxWidth: { "*": null, base: containerSize.xs },
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
  div: css({
    paddingInline: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span2: css({
    fontWeight: fontWeight.medium,
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

@Component({
  selector: "date-picker-natural-language",
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
        <label kuiFieldLabel for="date-optional">Schedule Date</label>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            id="date-optional"
            [value]="value()"
            placeholder="Tomorrow or next week"
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
                [sideOffset]="8"
              >
                <div
                  kuiCalendar
                  mode="single"
                  [selected]="date()"
                  captionLayout="dropdown"
                  [defaultMonth]="date()"
                  (selectedChange)="picked($any($event))"
                ></div>
              </div>
            </ng-container>
          </div>
        </div>
        <div [sx]="styles.div">
          Your post will be published on{{ " " }}
          <span [sx]="styles.span2">{{ formatDate(date()) }}</span>
          .
        </div>
      </div>
    </div>
  `,
})
export default class DatePickerNaturalLanguage {
  protected readonly open = signal(false)
  protected readonly value = signal("In 2 days")
  protected readonly date = signal<Date | undefined>(
    parseDate(this.value()) || undefined
  )
  protected readonly styles = styles
  protected readonly formatDate = formatDate
  protected readonly parseDate = parseDate
  protected readonly page = page

  protected typed(text: string) {
    this.value.set(text)
    const parsed = parseDate(text)
    if (parsed) {
      this.date.set(parsed)
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
