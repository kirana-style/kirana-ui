import { Show, createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { breakpoint, spacing } from "../../../core/scales"
import { calendarCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"
import type { DateRange } from "../ui/calendar"

export default function CalendarCustomDays() {
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

  const [range, setRange] = createSignal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar
            mode="range"
            defaultMonth={range()?.from}
            selected={range()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof range>
            }) => setRange(details.selected)}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.cellSizeSpacing10MdCellS}
            formatters={{
              formatMonthDropdown: (date) => {
                return date.toLocaleString("default", { month: "long" })
              },
            }}
            day={({ date, outside }) => (
              <>
                {date.getDate()}{" "}
                <Show when={!outside}>
                  <span>
                    {date.getDay() === 0 || date.getDay() === 6
                      ? "$120"
                      : "$100"}
                  </span>
                </Show>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
