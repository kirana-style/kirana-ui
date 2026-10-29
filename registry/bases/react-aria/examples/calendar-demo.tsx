import { css } from "@kirana-style/core"

import * as React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

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

export default function CalendarDemo() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(() =>
    today(getLocalTimeZone())
  )

  return (
    <div sx={page.example}>
      <Calendar
        value={date}
        onChange={setDate}
        sx={styles.bordered}
        captionLayout="dropdown"
      />
    </div>
  )
}
