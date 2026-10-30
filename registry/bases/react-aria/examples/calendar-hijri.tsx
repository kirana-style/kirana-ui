/**
 * Upstream's `calendar-hijri` on React Aria: the registry's Calendar in the Persian calendar, a
 * locale that asks for it (`fa-AF-u-ca-persian`), read in Vazirmatn, as upstream's site loads it.
 */
import "@fontsource-variable/vazirmatn"
import * as React from "react"
import { CalendarDate } from "@internationalized/date"
import { css } from "@kirana-style/core"
import { I18nProvider } from "react-aria-components"

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

export default function CalendarHijri() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(2025, 6, 12)
  )

  return (
    <div sx={page.example}>
      <div sx={styles.font}>
        <I18nProvider locale="fa-AF-u-ca-persian">
          <Calendar
            value={date ?? null}
            onChange={setDate}
            sx={styles.calendar}
          />
        </I18nProvider>
      </div>
    </div>
  )
}
