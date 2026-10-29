import { css, props as styleProps, select } from "@kirana-style/core"

import * as React from "react"

import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { page } from "../../../styles/page.styles"

const styles = {
  // `[&>button]:line-through opacity-100`: a booked day, struck through and not dimmed as disabled.
  booked: css({
    opacity: { '[data-disabled="true"]': 1 },
    [select.child("button")]: { textDecorationLine: "line-through" },
  }),
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

export default function CalendarBookedDates() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), 0, 6)
  )
  const [bookedDates] = React.useState(() =>
    Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 0, 12 + i)
    )
  )

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: styleProps(styles.booked).className ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
