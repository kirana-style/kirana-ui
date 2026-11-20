/**
 * Upstream's `calendar-hijri`: the Persian (Jalali) calendar, read in Vazirmatn, as its site loads
 * it. Upstream copies its calendar with React DayPicker's Persian add-on; Kirana UI's calendar lays
 * its months out in any calendar `@internationalized/date` has, so this is the registry's own
 * calendar given the Persian one (`calendarSystem`) and the `fa-IR` locale, in its direction.
 */
import "@fontsource-variable/vazirmatn"
import * as React from "react"
import { css } from "@kirana-style/core"
import { PersianCalendar } from "@internationalized/date"

import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  // Vazirmatn, upstream's `Vazirmatn({ subsets: ["arabic"] })`.
  font: css({ fontFamily: '"Vazirmatn Variable", sans-serif' }),
  // `rounded-lg border`.
  calendar: css({
    borderRadius: { "*": null, base: radius.lg },
    borderWidth: { "*": null, base: "1px" },
    borderStyle: "solid",
    borderColor: theme.border,
  }),
}

const persian = new PersianCalendar()

export default function CalendarHijri() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <div sx={page.example}>
      <div sx={styles.font}>
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          locale={{ code: "fa-IR" }}
          calendarSystem={persian}
          dir="rtl"
          sx={styles.calendar}
        />
      </div>
    </div>
  )
}
