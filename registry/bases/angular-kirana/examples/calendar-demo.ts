import { Component, signal } from "@angular/core"
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
  selector: "calendar-demo",
  imports: [Calendar, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiCalendar
        mode="single"
        [(selected)]="date"
        [sx]="styles.bordered"
        captionLayout="dropdown"
      ></div>
    </div>
  `,
})
export default class CalendarDemo {
  protected readonly date = signal<Date | undefined>(new Date())
  protected readonly styles = styles
  protected readonly page = page
}
