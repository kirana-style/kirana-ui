import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Calendar } from "../ui/calendar"
import type { DateRange } from "../ui/calendar"
import { breakpoint, spacing } from "../../../core/scales"
import { calendarCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"
import { Card, CardContent } from "../ui/card"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  cellSizeSpacing10MdCellS: css({
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(10),
      [breakpoint.md]: spacing(12),
    },
  }),
}

@Component({
  selector: "calendar-custom-days",
  imports: [Calendar, Card, CardContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.mxAutoWFitP0">
        <div kuiCardContent [sx]="styles.p0">
          <div
            kuiCalendar
            mode="range"
            [defaultMonth]="range()?.from"
            [(selected)]="range"
            [numberOfMonths]="1"
            captionLayout="dropdown"
            [sx]="styles.cellSizeSpacing10MdCellS"
            [formatters]="formatters"
          >
            <ng-template kuiCalendarDay let-date="date" let-outside="outside">
              {{ date.getDate() }}
              @if (!outside) {
                <span>{{
                  date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100"
                }}</span>
              }
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CalendarCustomDays {
  protected readonly formatters = {
    formatMonthDropdown: (date: Date) =>
      date.toLocaleString("default", { month: "long" }),
  }
  protected readonly range = signal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })
  protected readonly styles = styles
  protected readonly page = page
}
