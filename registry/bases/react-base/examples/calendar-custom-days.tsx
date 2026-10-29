import { css } from "@kirana-style/core"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Calendar, CalendarDayButton } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { breakpoint, spacing } from "../../../core/scales"
import { calendarCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  cellSizeSpacing10MdCellS: css({
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(10),
      [breakpoint.md]: spacing(12),
    },
  }),
}

export default function CalendarCustomDays() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  }))

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.cellSizeSpacing10MdCellS}
            formatters={{
              formatMonthDropdown: (date) => {
                return date.toLocaleString("default", { month: "long" })
              },
            }}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                const isWeekend =
                  day.date.getDay() === 0 || day.date.getDay() === 6

                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {!modifiers.outside && (
                      <span>{isWeekend ? "$120" : "$100"}</span>
                    )}
                  </CalendarDayButton>
                )
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
