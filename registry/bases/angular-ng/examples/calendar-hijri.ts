import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import "@fontsource-variable/vazirmatn"
import { createCalendar } from "@internationalized/date"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Calendar } from "../ui/calendar"
import { DirectionProvider } from "../ui/direction"

/**
 * Upstream's `calendar-hijri`: the Persian (Jalali) calendar, read in Vazirmatn, as its site loads
 * it. React's draws it with React DayPicker's Persian add-on; Ark UI's date picker draws any
 * calendar system `@internationalized/date` has, so this is the registry's own calendar given the
 * Persian one (`createCalendar`) and the `fa-IR` locale, in its direction.
 */

const styles = {
  // Vazirmatn, upstream's `Vazirmatn({ subsets: ["arabic"] })`.
  font: css({ fontFamily: '"Vazirmatn Variable", sans-serif' }),
  // `rounded-lg border`.
  calendar: css({
    borderRadius: { "*": null, base: radius.lg },
    borderWidth: { "*": null, base: "1px" },
    borderStyle: "solid",
    borderColor: theme.border,
  }),
}

// The weekdays as React DayPicker's Persian locale writes them, one letter each.
const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "narrow" })
const formatters = { formatWeekdayName: (day: Date) => weekday.format(day) }

@Component({
  selector: "calendar-hijri",
  imports: [Calendar, DirectionProvider, SxDirective],
  template: `
    <ng-container kuiDirectionProvider locale="fa-IR">
      <div [sx]="page.example">
        <div [sx]="styles.font">
          <div
            kuiCalendar
            [(selected)]="date"
            mode="single"
            [defaultMonth]="date()"
            locale="fa-IR"
            dir="rtl"
            [createCalendar]="createCalendar"
            [formatters]="formatters"
            [sx]="styles.calendar"
          ></div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class CalendarHijri {
  protected readonly date = signal<Date | undefined>(new Date(2025, 5, 12))
  protected readonly styles = styles
  protected readonly formatters = formatters
  protected readonly createCalendar = createCalendar
  protected readonly page = page
}
