import { css } from "@kirana-style/core"

import * as React from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { calendarCtx, cardCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFitMaxW300Px: css({
    marginInline: "auto",
    width: "fit-content",
    maxWidth: { "*": null, base: "300px" },
  }),
  p0CellSizeSpacing95: css({
    padding: { "*": null, base: "0" },
    [calendarCtx.cellSize]: { "*": null, base: spacing(9.5) },
  }),
  flexFlexWrapGap2BorderT: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  flex1: css({ flex: 1 }),
}

export default function CalendarWithPresets() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    () => new CalendarDate(new Date().getFullYear(), 2, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<CalendarDate>(
    () =>
      new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1)
  )

  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitMaxW300Px} size="sm">
        <CardContent>
          <Calendar
            value={date}
            onChange={setDate}
            focusedValue={currentMonth}
            onFocusChange={setCurrentMonth}
            weeksInMonth={6}
            sx={styles.p0CellSizeSpacing95}
          />
        </CardContent>
        <CardFooter sx={styles.flexFlexWrapGap2BorderT}>
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              sx={styles.flex1}
              onPress={() => {
                const newDate = today(getLocalTimeZone()).add({
                  days: preset.value,
                })
                setDate(newDate)
                setCurrentMonth(newDate)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  )
}
