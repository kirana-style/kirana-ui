import * as React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"
import { I18nProvider } from "react-aria-components"

import { Calendar } from "../ui/calendar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../core/context"
import { radius, theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  // `rounded-lg border [--cell-size:--spacing(9)]`: the border in its colour (upstream's base layer
  // gives every border `border-border`), the cell size through the calendar's own variable.
  calendar: css({
    borderRadius: { "*": null, base: radius.lg },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
    borderColor: theme.border,
    [calendarCtx.cellSize]: { "*": null, base: space[9] },
  }),
}

export default function CalendarRtl() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    today(getLocalTimeZone())
  )

  return (
    <div sx={page.example}>
      <I18nProvider locale="ar">
        <Calendar
          value={date}
          onChange={setDate}
          sx={styles.calendar}
          captionLayout="dropdown"
        />
      </I18nProvider>
    </div>
  )
}
