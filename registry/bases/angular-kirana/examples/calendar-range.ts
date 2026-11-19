import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Calendar } from "../ui/calendar"
import type { DateRange } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}

@Component({
  selector: "calendar-range",
  imports: [Calendar, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiCalendar
        mode="range"
        [defaultMonth]="dateRange()?.from"
        [(selected)]="dateRange"
        [numberOfMonths]="2"
        [sx]="styles.bordered"
      ></div>
    </div>
  `,
})
export default class CalendarRange {
  protected readonly dateRange = signal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })
  protected readonly styles = styles
  protected readonly page = page
}
