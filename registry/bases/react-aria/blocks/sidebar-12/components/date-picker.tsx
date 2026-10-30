import * as React from "react"
import { CalendarDate } from "@internationalized/date"

import { Calendar } from "../../../ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "../../../ui/sidebar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { space } from "../../../../../core/scales"

const styles = {
  sidebarGroup: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  datePickerCalendar: css({
    backgroundColor: { "*": null, base: "transparent" },
    // Upstream's `[--cell-size:2.1rem]`, the calendar's own variable.
    [calendarCtx.cellSize]: "2.1rem",
  }),
}

export function DatePicker() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () =>
      new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 12)
  )
  return (
    <SidebarGroup sx={styles.sidebarGroup}>
      <SidebarGroupContent>
        <Calendar
          value={date}
          onChange={setDate}
          captionLayout="dropdown"
          sx={styles.datePickerCalendar}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
