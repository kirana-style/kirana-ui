import { Component } from "@angular/core"
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
  selector: "calendar-multiple",
  imports: [Calendar, Card, CardContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.mxAutoWFitP0">
        <div kuiCardContent [sx]="styles.p0">
          <div kuiCalendar mode="multiple"></div>
        </div>
      </div>
    </div>
  `,
})
export default class CalendarMultiple {
  protected readonly styles = styles
  protected readonly page = page
}
