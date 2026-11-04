import "@fontsource-variable/vazirmatn"
import { createSignal } from "solid-js"
import { createCalendar } from "@internationalized/date"
import { Calendar } from "../ui/calendar"
import { DirectionProvider } from "../ui/direction"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function CalendarHijri() {
  /**
   * Upstream's `calendar-hijri`: the Persian (Jalali) calendar, read in Vazirmatn, as its site loads
   * it. React's draws it with React DayPicker's Persian add-on; Ark UI's date picker draws any
   * calendar system `@internationalized/date` has, so this is the registry's own calendar given the
   * Persian one (`createCalendar`) and the `fa-IR` locale, in its direction.
   */

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

  const [date, setDate] = createSignal<Date | undefined>(new Date(2025, 5, 12))

  // The weekdays as React DayPicker's Persian locale writes them, one letter each.
  const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "narrow" })
  const formatters = { formatWeekdayName: (day: Date) => weekday.format(day) }

  return (
    <DirectionProvider locale="fa-IR">
      <div sx={page.example}>
        <div sx={styles.font}>
          <Calendar
            selected={date()}
            onSelectedChange={(details: {
              selected: ReturnType<typeof date>
            }) => setDate(details.selected)}
            mode="single"
            defaultMonth={date()}
            locale="fa-IR"
            dir="rtl"
            createCalendar={createCalendar}
            formatters={formatters}
            sx={styles.calendar}
          />
        </div>
      </div>
    </DirectionProvider>
  )
}
