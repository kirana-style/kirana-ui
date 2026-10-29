import { css } from "@kirana-style/core"

import * as React from "react"
import { CalendarDate } from "@internationalized/date"
import type { DateRange } from "react-aria-components"

import { RangeCalendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}

export default function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => ({
      start: new CalendarDate(new Date().getFullYear(), 1, 12),
      end: new CalendarDate(new Date().getFullYear(), 1, 12).add({ days: 30 }),
    })
  )

  return (
    <div sx={page.example}>
      <RangeCalendar
        value={dateRange}
        onChange={setDateRange}
        numberOfMonths={2}
        sx={styles.bordered}
      />
    </div>
  )
}
