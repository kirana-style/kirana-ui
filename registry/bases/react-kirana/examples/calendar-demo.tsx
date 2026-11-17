import { css } from "@kirana-style/core"

import * as React from "react"

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
  const [date, setDate] = React.useState<Date | undefined>(() => new Date())

  return (
    <div sx={page.example}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        sx={styles.bordered}
        captionLayout="dropdown"
      />
    </div>
  )
}
