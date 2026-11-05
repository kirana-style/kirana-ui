import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent } from "../../ui/card"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  justifyCenter: css({ justifyContent: "center" }),
}

@Component({
  selector: "kui-calendar-week-numbers",
  imports: [Calendar, Card, CardContent, Example, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Week Numbers" [sx]="styles.justifyCenter">
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
export class CalendarWeekNumbers {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )
  protected readonly styles = styles
}
