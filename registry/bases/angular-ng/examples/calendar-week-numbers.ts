import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

@Component({
  selector: "calendar-week-numbers",
  imports: [Calendar, Card, CardContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.mxAutoWFitP0">
        <div kuiCardContent [sx]="styles.p0">
          <div
            kuiCalendar
            mode="single"
            [defaultMonth]="date()"
            [(selected)]="date"
            showWeekNumber
          ></div>
        </div>
      </div>
    </div>
  `,
})
export default class CalendarWeekNumbers {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 12)
  )
  protected readonly styles = styles
  protected readonly page = page
}
