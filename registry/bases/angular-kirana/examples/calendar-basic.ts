import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Calendar } from "../ui/calendar"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}

@Component({
  selector: "calendar-basic",
  imports: [Calendar, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiCalendar mode="single" [sx]="styles.bordered"></div>
    </div>
  `,
})
export default class CalendarBasic {
  protected readonly styles = styles
  protected readonly page = page
}
