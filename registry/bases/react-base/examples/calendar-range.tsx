import { css } from "@kirana-style/core"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Calendar } from "../ui/calendar"
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
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    })
  )

  return (
    <div sx={page.example}>
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        sx={styles.bordered}
      />
    </div>
  )
}
