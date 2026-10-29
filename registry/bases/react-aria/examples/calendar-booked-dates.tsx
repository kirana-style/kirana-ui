import { css } from "@kirana-style/core"

import * as React from "react"
import { CalendarDate, isSameDay } from "@internationalized/date"

import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

export default function CalendarBookedDates() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () => new CalendarDate(new Date().getFullYear(), 2, 3)
  )
  const [bookedDates] = React.useState(() =>
    Array.from(
      { length: 15 },
      (_, i) => new CalendarDate(new Date().getFullYear(), 2, 12 + i)
    )
  )

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            value={date}
            onChange={setDate}
            isDateUnavailable={(day) =>
              bookedDates.some((d) => isSameDay(day, d))
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
