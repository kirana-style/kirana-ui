import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Calendar } from "../../ui/calendar"
import type { DateRange } from "../../ui/calendar"
import { breakpoint, space } from "../../../../core/scales"
import { Example } from "../../components/example"
import { Card, CardContent } from "../../ui/card"

const styles = {
  // `lg:col-span-full 2xl:col-span-full`, on an example's container.
  fullRow: css({
    gridColumn: {
      [breakpoint.lg]: "1 / -1",
      [breakpoint["2xl"]]: "1 / -1",
    },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  p12: css({ padding: space[12] }),
}

@Component({
  selector: "kui-calendar-range-multiple-months",
  imports: [Calendar, Card, CardContent, Example, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div
      kuiExample
      title="Range Multiple Months"
      [containerSx]="styles.fullRow"
      [sx]="styles.p12"
    >
      <div kuiCard [sx]="styles.mxAutoWFitP0">
        <div kuiCardContent [sx]="styles.p0">
          <div
            kuiCalendar
            mode="range"
            [defaultMonth]="range()?.from"
            [(selected)]="range"
            [numberOfMonths]="3"
            locale="es"
            fixedWeeks
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarRangeMultipleMonths {
  protected readonly range = signal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 3, 12),
    to: addDays(new Date(new Date().getFullYear(), 3, 12), 60),
  })
  protected readonly styles = styles
}
