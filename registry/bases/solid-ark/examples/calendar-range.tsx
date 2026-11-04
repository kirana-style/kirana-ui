import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import type { DateRange } from "../ui/calendar"

export default function CalendarRange() {
  const styles = {
    bordered: css({
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
    }),
  }

  const [dateRange, setDateRange] = createSignal<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <div sx={page.example}>
      <Calendar
        mode="range"
        defaultMonth={dateRange()?.from}
        selected={dateRange()}
        onSelectedChange={(details: {
          selected: ReturnType<typeof dateRange>
        }) => setDateRange(details.selected)}
        numberOfMonths={2}
        sx={styles.bordered}
      />
    </div>
  )
}
