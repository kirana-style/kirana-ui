import { createSignal } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Calendar } from "../ui/calendar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../core/context"
import { radius, theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function CalendarRtl() {
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

  const translation = useTranslation(translations, "ar")
  const [date, setDate] = createSignal<Date | undefined>(new Date())

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Calendar
          mode="single"
          selected={date()}
          onSelectedChange={(details: { selected: ReturnType<typeof date> }) =>
            setDate(details.selected)
          }
          sx={styles.calendar}
          captionLayout="dropdown"
          dir={translation.dir}
          locale={translation.dir === "rtl" ? translation.locale : undefined}
          weekStartsOn={0}
        />
      </div>
    </DirectionProvider>
  )
}
