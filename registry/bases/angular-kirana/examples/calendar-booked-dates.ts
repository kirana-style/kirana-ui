import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, props as styleProps, select } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"

const styles = {
  // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
  booked: css({
    opacity: { '[data-disabled="true"]': 1 },
    [select.child("button")]: { textDecorationLine: "line-through" },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

const bookedDates = Array.from(
  { length: 15 },
  (_, i) => new Date(new Date().getFullYear(), 0, 12 + i)
)

@Component({
  selector: "calendar-booked-dates",
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
            [disabled]="bookedDates"
            [modifiers]="{
              booked: bookedDates,
            }"
            [modifiersClassNames]="{
              booked: bookedClass,
            }"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export default class CalendarBookedDates {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 6)
  )
  protected readonly styles = styles
  protected readonly bookedDates = bookedDates
  protected readonly bookedClass = styleProps(styles.booked).className ?? ""
  protected readonly page = page
}
