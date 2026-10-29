import { css } from "@kirana-style/core"

import * as React from "react"
import { CalendarDate, isWeekend } from "@internationalized/date"
import { useLocale } from "react-aria-components"
import type { DateRange } from "react-aria-components"

import { RangeCalendar } from "../ui/calendar"
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
  const { locale } = useLocale()
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    start: new CalendarDate(new Date().getFullYear(), 12, 8),
    end: new CalendarDate(new Date().getFullYear(), 12, 8).add({ days: 10 }),
  }))

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <RangeCalendar
            value={range}
            onChange={setRange}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.cellSizeSpacing10MdCellS}
            headerFormat={{ month: "long" }}
            renderCell={({ isOutsideMonth, date, defaultChildren }) => (
              <>
                {defaultChildren}
                {!isOutsideMonth && (
                  <span>{isWeekend(date, locale) ? "$120" : "$100"}</span>
                )}
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
