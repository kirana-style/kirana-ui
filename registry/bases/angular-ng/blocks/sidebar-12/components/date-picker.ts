import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { space } from "../../../../../core/scales"
import { Calendar } from "../../../ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "../../../ui/sidebar"

const styles = {
  sidebarGroup: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  datePickerCalendar: css({
    backgroundColor: { "*": null, base: "transparent" },
    // Upstream's `[--cell-size:2.1rem]`, the calendar's own variable.
    [calendarCtx.cellSize]: { "*": null, base: "2.1rem" },
  }),
}

@Component({
  selector: "kui-date-picker",
  imports: [Calendar, SidebarGroup, SidebarGroupContent, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebarGroup [sx]="styles.sidebarGroup">
      <div kuiSidebarGroupContent>
        <div
          kuiCalendar
          mode="single"
          [(selected)]="date"
          captionLayout="dropdown"
          [sx]="styles.datePickerCalendar"
        ></div>
      </div>
    </div>
  `,
})
export class DatePicker {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  protected readonly styles = styles
}
