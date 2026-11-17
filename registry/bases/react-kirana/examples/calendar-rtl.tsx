import * as React from "react"
import { arSA, he } from "react-day-picker/locale"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

const locales = {
  ar: arSA,
  he: he,
} as const

export default function CalendarRtl() {
  const { dir, language } = useTranslation(translations, "ar")
  const [date, setDate] = React.useState<Date | undefined>(() => new Date())

  return (
    <div sx={page.example}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        sx={styles.calendar}
        captionLayout="dropdown"
        dir={dir}
        locale={
          dir === "rtl" ? locales[language as keyof typeof locales] : undefined
        }
      />
    </div>
  )
}
