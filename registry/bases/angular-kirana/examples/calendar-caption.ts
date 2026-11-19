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
  selector: "calendar-caption",
  imports: [Calendar, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiCalendar
        mode="single"
        captionLayout="dropdown"
        [sx]="styles.bordered"
      ></div>
    </div>
  `,
})
export default class CalendarCaption {
  protected readonly styles = styles
  protected readonly page = page
}
