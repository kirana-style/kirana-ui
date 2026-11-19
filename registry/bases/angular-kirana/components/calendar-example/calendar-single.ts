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
}

@Component({
  selector: "kui-calendar-single",
  imports: [Calendar, Card, CardContent, Example, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Single">
      <div kuiCard [sx]="styles.mxAutoWFitP0">
        <div kuiCardContent [sx]="styles.p0">
          <div
            kuiCalendar
            mode="single"
            [(selected)]="date"
            captionLayout="dropdown"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarSingle {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  protected readonly styles = styles
}
